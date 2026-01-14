
import { useState, useRef, useCallback, useEffect } from 'react';

const DEFAULT_API_KEY = "678a7f9daf9ba4993d8b636a97409d9f8b3421f3";

interface UseDeepgramProps {
  apiKey?: string;
  onTranscript: (text: string) => void;
}

export const useDeepgram = ({ apiKey = DEFAULT_API_KEY, onTranscript }: UseDeepgramProps) => {
  const [isListening, setIsListening] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const stopListening = useCallback(() => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(new Uint8Array([])); // Send empty byte to close stream
      setTimeout(() => {
         socketRef.current?.close();
      }, 200);
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }

    setIsListening(false);
  }, []);

  const startListening = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Nova-2 model with smart formatting for punctuation
      const socket = new WebSocket('wss://api.deepgram.com/v1/listen?model=nova-2&smart_format=true', ['token', apiKey]);
      socketRef.current = socket;

      socket.onopen = () => {
        setIsListening(true);
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.addEventListener('dataavailable', (event) => {
          if (event.data.size > 0 && socket.readyState === WebSocket.OPEN) {
            socket.send(event.data);
          }
        });

        mediaRecorder.start(250); // Send chunks every 250ms
      };

      socket.onmessage = (message) => {
        try {
            const received = JSON.parse(message.data);
            const transcript = received.channel?.alternatives[0]?.transcript;
            if (transcript && received.is_final) {
                onTranscript(transcript);
            }
        } catch (e) {
            console.error("Deepgram parse error", e);
        }
      };

      socket.onclose = () => {
        setIsListening(false);
      };

      socket.onerror = (error) => {
        console.error("Deepgram WebSocket Error", error);
        setIsListening(false);
      };

    } catch (error) {
      console.error("Error accessing microphone:", error);
      setIsListening(false);
    }
  }, [apiKey, onTranscript]);

  const toggleListening = useCallback(() => {
      if (isListening) {
          stopListening();
      } else {
          startListening();
      }
  }, [isListening, startListening, stopListening]);

  useEffect(() => {
      return () => {
          // Cleanup on unmount
          if (isListening) stopListening();
      };
  }, []);

  return { isListening, toggleListening };
};
