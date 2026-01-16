
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Sparkles } from 'lucide-react';
import { ComponentItem } from '../types';

interface DynamicBuilderViewProps {
  initialPrompt: string;
  onComplete: (item: ComponentItem) => void;
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const YOUTUBE_API_KEY = "AIzaSyA8BjLi4xJdYNTjBhT4BA0p5HSTcLdultw";

export const DynamicBuilderView: React.FC<DynamicBuilderViewProps> = ({ initialPrompt, onComplete }) => {
  const [status, setStatus] = useState('Initializing...');
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const buildDynamicPage = async () => {
        try {
            setStatus('Sourcing visuals...');
            
            // 1. Fetch Images (Pexels) & Video (YouTube)
            const images: string[] = [];
            let videoId: string | null = null;

            // Pexels Search
            try {
                const pexelsRes = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(initialPrompt)}&per_page=3&orientation=landscape`, {
                    headers: { Authorization: "8Mh8jDK5VAgGnnmNYO2k0LqdaLL8lbIR4ou5Vnd8Zod0cETWahEx1MKf" }
                });
                
                if (pexelsRes.ok) {
                    const pexelsData = await pexelsRes.json();
                    if (pexelsData.photos) {
                        pexelsData.photos.forEach((p: any) => images.push(p.src.large2x));
                    }
                } else {
                    console.warn("Pexels API returned non-OK status:", pexelsRes.status);
                }
            } catch (e) {
                console.error("Pexels error", e);
            }

            // YouTube Search
            try {
                const ytRes = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(initialPrompt)}&type=video&key=${YOUTUBE_API_KEY}`);
                if (ytRes.ok) {
                    const ytData = await ytRes.json();
                    if (ytData.items && ytData.items.length > 0) {
                        videoId = ytData.items[0].id.videoId;
                    }
                }
            } catch (e) {
                console.error("YouTube error", e);
            }

            // Fallbacks
            while (images.length < 3) {
                images.push(`https://placehold.co/800x600/f3f4f6/9ca3af?text=Image+${images.length + 1}`);
            }

            setStatus('Drafting content...');

            // 2. Generate Content JSON via AI
            let contentData = {
                mainTitle: initialPrompt,
                subtitle: "A curated layout generated for your idea.",
                section1Title: "The Beginning",
                section1Body: "Start your story here. Describe the inception of the idea.",
                quote: "Design is intelligence made visible.",
                quoteAuthor: "Alina Wheeler",
                section2Title: "The Process",
                section2Body: "Dive deeper into the details. How does it work?",
                featureList: ["Key feature one", "Key feature two", "Key feature three"],
                callToAction: "Get Started",
                videoTitle: "Featured Content",
                videoDescription: "Watch to learn more about this topic."
            };

            try {
                const systemPrompt = `You are an expert editorial writer.
                Generate compelling website content based on the user's topic: "${initialPrompt}".
                
                Return a JSON object with these keys:
                - mainTitle: A catchy, high-impact headline (max 6 words)
                - subtitle: A subheadline enticing the reader (max 20 words)
                - section1Title: Heading for the first section (introductory)
                - section1Body: Two sentences introducing the concept
                - quote: An inspiring quote relevant to the topic
                - quoteAuthor: Author of the quote
                - section2Title: Heading for the second section (details)
                - section2Body: Two sentences explaining the benefits or process
                - featureList: Array of 3 short, punchy feature points
                - callToAction: A 2-3 word button label (e.g., "Join Now")
                - videoTitle: A title for a video section about this topic
                - videoDescription: A short teaser for the video

                Output ONLY valid JSON. No markdown formatting.`;

                const response = await ai.models.generateContent({
                    model: 'gemini-3-flash-preview',
                    contents: systemPrompt,
                });

                const cleanText = response.text?.replace(/```json/g, "").replace(/```/g, "").trim() || "{}";
                const json = JSON.parse(cleanText);
                
                // Merge with defaults in case of missing keys
                contentData = { ...contentData, ...json };

            } catch (e) {
                console.error("AI Content Generation failed, using defaults", e);
            }

            setStatus('Assembling template...');

            // 3. Create the Template using the generated content
            const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', sans-serif; }
    h1, h2, h3, .serif { font-family: 'Playfair Display', serif; }
    [contenteditable]:empty:before {
        content: attr(placeholder);
        color: #9ca3af;
        cursor: text;
    }
    [contenteditable]:focus { outline: none; }
  </style>
</head>
<body class="bg-white min-h-screen text-slate-900 pb-24">
  
  <!-- Header Gradient -->
  <div class="h-64 w-full bg-gradient-to-b from-blue-50 via-purple-50 to-white"></div>

  <!-- Main Content -->
  <div class="max-w-4xl mx-auto px-8 relative z-10 -mt-32">
      
      <!-- Title Section -->
      <div class="mb-20">
          <div class="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-widest text-purple-600 uppercase bg-purple-50 rounded-full border border-purple-100">
              Editorial
          </div>
          <h1 contenteditable="true" class="text-6xl md:text-7xl font-bold leading-tight mb-8 text-gray-900 outline-none">${contentData.mainTitle}</h1>
          <p contenteditable="true" class="text-2xl text-gray-500 font-light leading-relaxed outline-none max-w-2xl">
              ${contentData.subtitle}
          </p>
      </div>

      <!-- Section 1: Text Left, Image Right -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
          <div>
              <h2 contenteditable="true" class="text-3xl font-bold mb-4 outline-none">${contentData.section1Title}</h2>
              <p contenteditable="true" class="text-lg text-gray-600 leading-relaxed outline-none">
                  ${contentData.section1Body}
              </p>
          </div>
          <div class="relative group">
              <div class="absolute -inset-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl opacity-50 group-hover:opacity-75 transition-opacity blur-lg"></div>
              <img src="${images[0]}" class="relative w-full aspect-[4/3] object-cover rounded-2xl shadow-sm" alt="Visual 1" />
          </div>
      </div>

      <!-- Quote Break -->
      <div class="my-32 text-center max-w-2xl mx-auto">
          <p contenteditable="true" class="serif text-4xl italic text-gray-800 leading-normal mb-6 outline-none">
              "${contentData.quote}"
          </p>
          <p contenteditable="true" class="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase outline-none">
              — ${contentData.quoteAuthor}
          </p>
      </div>

      <!-- Section 2: Image Left, Text Right -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
          <div class="relative group order-2 md:order-1">
              <div class="absolute -inset-2 bg-gradient-to-tr from-orange-100 to-pink-100 rounded-3xl opacity-50 group-hover:opacity-75 transition-opacity blur-lg"></div>
              <img src="${images[1]}" class="relative w-full aspect-[4/3] object-cover rounded-2xl shadow-sm" alt="Visual 2" />
          </div>
          <div class="order-1 md:order-2">
              <h2 contenteditable="true" class="text-3xl font-bold mb-4 outline-none">${contentData.section2Title}</h2>
              <p contenteditable="true" class="text-lg text-gray-600 leading-relaxed outline-none">
                  ${contentData.section2Body}
              </p>
              <ul class="mt-6 space-y-3">
                  <li class="flex items-start gap-3">
                      <span class="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5"></span>
                      <span contenteditable="true" class="text-gray-600 outline-none">${contentData.featureList[0] || 'Feature 1'}</span>
                  </li>
                  <li class="flex items-start gap-3">
                      <span class="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2.5"></span>
                      <span contenteditable="true" class="text-gray-600 outline-none">${contentData.featureList[1] || 'Feature 2'}</span>
                  </li>
                  <li class="flex items-start gap-3">
                      <span class="w-1.5 h-1.5 rounded-full bg-pink-500 mt-2.5"></span>
                      <span contenteditable="true" class="text-gray-600 outline-none">${contentData.featureList[2] || 'Feature 3'}</span>
                  </li>
              </ul>
          </div>
      </div>

      <!-- Full Width Image -->
      <div class="mb-32 relative rounded-3xl overflow-hidden shadow-xl">
          <img src="${images[2]}" class="w-full h-96 object-cover" alt="Banner" />
          <div class="absolute inset-0 bg-black/20 flex items-center justify-center">
              <h3 contenteditable="true" class="text-white text-4xl font-bold text-center drop-shadow-lg outline-none">
                  Visual Impact
              </h3>
          </div>
      </div>

      ${videoId ? `
      <!-- Video Section -->
      <div class="mb-32">
          <div class="text-center mb-12">
              <h2 contenteditable="true" class="text-3xl font-bold mb-4 outline-none">${contentData.videoTitle}</h2>
              <p contenteditable="true" class="text-lg text-gray-600 outline-none max-w-xl mx-auto">${contentData.videoDescription}</p>
          </div>
          <div class="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
              <iframe 
                  src="https://www.youtube.com/embed/${videoId}" 
                  title="YouTube video player" 
                  frameborder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen 
                  class="absolute inset-0 w-full h-full"
              ></iframe>
          </div>
      </div>
      ` : ''}

      <!-- Footer / Conclusion -->
      <div class="max-w-2xl mx-auto text-center">
          <h2 contenteditable="true" class="text-3xl font-bold mb-6 outline-none">Ready to Launch?</h2>
          <p contenteditable="true" class="text-lg text-gray-500 mb-8 outline-none">
              Summarize the article or provide a call to action here.
          </p>
          <button class="bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 shadow-lg">
              ${contentData.callToAction}
          </button>
      </div>

  </div>
</body>
</html>`;

            await new Promise(r => setTimeout(r, 1000)); // Slight delay for effect

            const newItem: ComponentItem = {
                id: `dynamic-${Date.now()}`,
                title: initialPrompt,
                description: "Dynamic Article Layout",
                category: 'UI Component',
                type: 'dynamic',
                thumbnailClass: 'bg-gradient-to-br from-blue-50 to-purple-50',
                systemPrompt: initialPrompt,
                code: html,
                views: 0,
                copies: 0,
                createdAt: Date.now()
            };

            onComplete(newItem);

        } catch (error) {
            console.error(error);
            setStatus('Error creating page.');
        }
    };

    buildDynamicPage();
  }, [initialPrompt, onComplete]);

  return (
    <div className="w-full h-full bg-white relative flex flex-col font-sans overflow-hidden">
        {/* Header Gradient */}
        <div className="h-48 bg-gradient-to-b from-blue-50 via-purple-50 to-white w-full shrink-0"></div>
        
        {/* Content Skeleton */}
        <div className="max-w-4xl mx-auto w-full px-8 -mt-20 relative z-10 flex-1 flex flex-col">
            
            {/* Title Skeleton */}
            <div className="space-y-4 mb-16 text-center">
                <div className="h-12 bg-gray-100 rounded-lg w-3/4 mx-auto animate-pulse"></div>
                <div className="h-4 bg-gray-50 rounded w-1/2 mx-auto animate-pulse"></div>
            </div>

            {/* Alternating Layout Skeleton */}
            <div className="space-y-24">
                {/* Row 1 */}
                <div className="grid grid-cols-2 gap-12 items-center">
                    <div className="space-y-4">
                        <div className="h-6 bg-gray-100 rounded w-1/3 animate-pulse"></div>
                        <div className="space-y-2">
                            <div className="h-3 bg-gray-50 rounded w-full animate-pulse delay-75"></div>
                            <div className="h-3 bg-gray-50 rounded w-full animate-pulse delay-100"></div>
                            <div className="h-3 bg-gray-50 rounded w-5/6 animate-pulse delay-150"></div>
                        </div>
                    </div>
                    <div className="aspect-[4/3] bg-gray-100 rounded-2xl animate-pulse"></div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-2 gap-12 items-center">
                    <div className="aspect-[4/3] bg-gray-100 rounded-2xl animate-pulse"></div>
                    <div className="space-y-4">
                        <div className="h-6 bg-gray-100 rounded w-1/3 animate-pulse"></div>
                        <div className="space-y-2">
                            <div className="h-3 bg-gray-50 rounded w-full animate-pulse delay-75"></div>
                            <div className="h-3 bg-gray-50 rounded w-full animate-pulse delay-100"></div>
                            <div className="h-3 bg-gray-50 rounded w-5/6 animate-pulse delay-150"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Status Indicator */}
            <div className="absolute bottom-12 left-0 right-0 flex justify-center">
                <div className="bg-white border border-gray-100 shadow-lg rounded-full px-6 py-3 flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-blue-500 animate-spin-slow" />
                    <span className="text-sm font-medium text-gray-600">{status}</span>
                </div>
            </div>
        </div>
    </div>
  );
};
