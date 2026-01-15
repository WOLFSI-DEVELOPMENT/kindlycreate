
import React, { useState, useEffect, useRef } from 'react';
import { Mic, ArrowUp, Plus, Sparkles, ChevronDown, Check, X, FileCode, MessageSquare, Image as ImageIcon, ArrowRight, Zap, Loader2, Heart } from 'lucide-react';
import { DESIGN_SYSTEMS } from '../constants';
import { useDeepgram } from '../hooks/useDeepgram';

interface HomeViewProps {
  onSubmit: (prompt: string, mode: 'prompt' | 'prototype' | 'image') => void;
  onNavigate: (view: 'privacy' | 'terms' | 'docs') => void;
}

const TYPING_PHRASES = [
  "generate AI apps.",
  "build complex UIs.",
  "create design systems.",
  "prototype fast.",
  "export code."
];

// --- ICONS ---
const ChatGPTIcon = () => (
    <svg viewBox="0 0 512 512" width="16" height="16" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M474.123 209.81c11.525-34.577 7.569-72.423-10.838-103.904-27.696-48.168-83.433-72.94-137.794-61.414a127.14 127.14 0 00-95.475-42.49c-55.564 0-104.936 35.781-122.139 88.593-35.781 7.397-66.574 29.76-84.637 61.414-27.868 48.167-21.503 108.72 15.826 150.007-11.525 34.578-7.569 72.424 10.838 103.733 27.696 48.34 83.433 73.111 137.966 61.585 24.084 27.18 58.833 42.835 95.303 42.663 55.564 0 104.936-35.782 122.139-88.594 35.782-7.397 66.574-29.76 84.465-61.413 28.04-48.168 21.676-108.722-15.654-150.008v-.172zm-39.567-87.218c11.01 19.267 15.139 41.803 11.354 63.65-.688-.516-2.064-1.204-2.924-1.72l-101.152-58.49a16.965 16.965 0 00-16.687 0L206.621 194.5v-50.232l97.883-56.597c45.587-26.32 103.732-10.666 130.052 34.921zm-227.935 104.42l49.888-28.9 49.887 28.9v57.63l-49.887 28.9-49.888-28.9v-57.63zm23.223-191.81c22.364 0 43.867 7.742 61.07 22.02-.688.344-2.064 1.204-3.097 1.72L186.666 117.26c-5.161 2.925-8.258 8.43-8.258 14.45v136.934l-43.523-25.116V130.333c0-52.64 42.491-95.13 95.131-95.302l-.172.172zM52.14 168.697c11.182-19.268 28.557-34.062 49.544-41.803V247.14c0 6.02 3.097 11.354 8.258 14.45l118.354 68.295-43.695 25.288-97.711-56.425c-45.415-26.32-61.07-84.465-34.75-130.052zm26.665 220.71c-11.182-19.095-15.139-41.802-11.354-63.65.688.516 2.064 1.204 2.924 1.72l101.152 58.49a16.965 16.965 0 0016.687 0l118.354-68.467v50.232l-97.883 56.425c-45.587 26.148-103.732 10.665-130.052-34.75h.172zm204.54 87.39c-22.192 0-43.867-7.741-60.898-22.02a62.439 62.439 0 003.097-1.72l101.152-58.317c5.16-2.924 8.429-8.43 8.257-14.45V243.527l43.523 25.116v113.022c0 52.64-42.663 95.303-95.131 95.303v-.172zM461.22 343.303c-11.182 19.267-28.729 34.061-49.544 41.63V264.687c0-6.021-3.097-11.526-8.257-14.45L284.893 181.77l43.523-25.116 97.883 56.424c45.587 26.32 61.07 84.466 34.75 130.053l.172.172z"/>
    </svg>
);

const CursorIcon = () => (
    <svg viewBox="0 0 512 512" width="16" height="16" fill="none">
        <path d="M255.428 423l148.991-83.5L255.428 256l-148.99 83.5 148.99 83.5z" fill="currentColor" fillOpacity="0.8"/>
        <path d="M255.428 89l-148.99 83.5v167l148.99-83.5V89z" fill="currentColor" fillOpacity="0.6"/>
        <path d="M404.419 172.5L255.428 256l-148.99-83.5h297.981z" fill="currentColor"/>
    </svg>
);

const BoltIcon = () => (
    <svg viewBox="0 0 512 512" width="16" height="16" fill="currentColor">
        <path d="M276.124 373.905c-22.625 0-44.844-8.063-57.594-25.438l-4.5 20.469-83.031 43.312 8.969-43.312 60.468-269.187h74.031l-21.375 94.875c17.25-18.563 33.313-25.438 53.875-25.438 44.406 0 74.031 28.688 74.031 81.156 0 54.125-34.125 123.563-104.874 123.563zm28.374-108.219c0 25.031-18.093 44.031-41.562 44.031-13.156 0-25.062-4.844-32.875-13.344l11.5-49.656c8.625-8.468 18.5-13.312 30.031-13.312 17.688 0 32.906 12.906 32.906 32.281z" />
    </svg>
);

const V0Icon = () => (
    <svg viewBox="0 0 512 512" width="16" height="16" fill="currentColor">
        <path d="M304.043 176h119.979c1.877 0 3.754.128 5.546.384L304.341 301.611a38.55 38.55 0 01-.405-5.654V176h-48V295.98c0 48.256 39.723 87.979 87.979 87.979h120v-48H343.936c-1.92 0-3.818-.128-5.653-.384L463.595 210.24a40.03 40.03 0 01.427 5.76v119.958H512v-119.98C512 167.724 472.278 128 424.022 128h-119.98v48zM0 160v.128l163.968 208.81c19.712 25.089 60.01 11.158 60.01-20.756V160H176v146.56L60.928 160H0z"/>
    </svg>
);

const LovableIcon = () => (
    <svg viewBox="0 0 512 512" width="16" height="16" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M151.083 0c83.413 0 151.061 67.819 151.061 151.467v57.6h50.283c83.413 0 151.082 67.797 151.082 151.466 0 83.691-67.626 151.467-151.082 151.467H0V151.467C0 67.84 67.627 0 151.083 0z"/>
    </svg>
);

const AIStudioIcon = () => (
    <svg viewBox="0 0 512 512" width="16" height="16" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M211.648 89.515h-76.651A57.707 57.707 0 0077.291 147.2v242.389a57.707 57.707 0 0057.706 57.707h242.411a57.707 57.707 0 0057.707-57.707V288.128l34.624-23.744v125.227a92.35 92.35 0 01-92.331 92.33H134.997a92.349 92.349 0 01-92.33-92.33v-242.39A92.336 92.336 0 0169.702 81.92a92.33 92.33 0 0165.295-27.05h96.96l-20.309 34.645zM380.16 0c3.093 0 5.717 2.219 6.379 5.248a149.328 149.328 0 0040.533 74.325 149.332 149.332 0 0074.347 40.555c3.029.661 5.248 3.285 5.248 6.4a6.574 6.574 0 01-5.248 6.357 149.338 149.338 0 00-74.326 40.555 149.338 149.338 0 00-40.789 75.413 6.334 6.334 0 01-6.144 5.078 6.334 6.334 0 01-6.144-5.078 149.338 149.338 0 00-40.789-75.413 149.326 149.326 0 00-75.414-40.789 6.338 6.338 0 01-5.077-6.144c0-2.987 2.133-5.547 5.077-6.144a149.336 149.336 0 0075.414-40.79 149.354 149.354 0 0040.554-74.325A6.573 6.573 0 01380.16 0z"/>
    </svg>
);

const GrokIcon = () => (
    <svg viewBox="0 0 512 509.641" width="16" height="16" fill="currentColor">
       <path d="M115.612 0h280.776C459.975 0 512 52.026 512 115.612v278.416c0 63.587-52.025 115.613-115.612 115.613H115.612C52.026 509.641 0 457.615 0 394.028V115.612C0 52.026 52.026 0 115.612 0z"/>
       <path fill="#fff" d="M213.235 306.019l178.976-180.002v.169l51.695-51.763c-.924 1.32-1.86 2.605-2.785 3.89-39.281 54.164-58.46 80.649-43.07 146.922l-.09-.101c10.61 45.11-.744 95.137-37.398 131.836-46.216 46.306-120.167 56.611-181.063 14.928l42.462-19.675c38.863 15.278 81.392 8.57 111.947-22.03 30.566-30.6 37.432-75.159 22.065-112.252-2.92-7.025-11.67-8.795-17.792-4.263l-124.947 92.341zm-25.786 22.437l-.033.034L68.094 435.217c7.565-10.429 16.957-20.294 26.327-30.149 26.428-27.803 52.653-55.359 36.654-94.302-21.422-52.112-8.952-113.177 30.724-152.898 41.243-41.254 101.98-51.661 152.706-30.758 11.23 4.172 21.016 10.114 28.638 15.639l-42.359 19.584c-39.44-16.563-84.629-5.299-112.207 22.313-37.298 37.308-44.84 102.003-1.128 143.81z"/>
    </svg>
);

// ... (classifyIntent function remains the same)
const classifyIntent = (input: string) => {
    const text = input.toLowerCase();
    
    // 1. Mode Scoring
    const scores = { prompt: 0, prototype: 0, image: 0 };
    
    const rules = [
        { terms: ['image', 'photo', 'picture', 'logo', 'icon', 'illustration', 'sketch', 'drawing', 'art', 'texture', 'background', 'wallpaper', 'poster'], mode: 'image', weight: 10 },
        { terms: ['generate an image', 'create a logo', 'design an icon'], mode: 'image', weight: 20 },
        
        { terms: ['app', 'website', 'dashboard', 'interface', 'ui', 'screen', 'page', 'component', 'widget', 'layout', 'form', 'table', 'chart', 'navbar', 'sidebar', 'footer', 'button', 'input'], mode: 'prototype', weight: 5 },
        { terms: ['code', 'html', 'css', 'react', 'tailwind', 'javascript', 'functional', 'interactive', 'prototype', 'working', 'demo'], mode: 'prototype', weight: 10 },
        
        { terms: ['prompt', 'explain', 'describe', 'write', 'text', 'story', 'guide', 'tutorial', 'documentation', 'readme', 'help', 'question'], mode: 'prompt', weight: 5 },
        { terms: ['system instruction', 'system prompt', 'how to'], mode: 'prompt', weight: 10 }
    ];

    rules.forEach(rule => {
        // @ts-ignore
        if (rule.terms.some(term => text.includes(term))) {
            // @ts-ignore
            scores[rule.mode] += rule.weight;
        }
    });

    // Default to 'prompt' if low confidence, otherwise pick max
    let detectedMode: 'prompt' | 'prototype' | 'image' = 'prompt';
    if (scores.image > scores.prototype && scores.image > scores.prompt) detectedMode = 'image';
    else if (scores.prototype > scores.image && scores.prototype > scores.prompt) detectedMode = 'prototype';
    else if (scores.prototype > 0) detectedMode = 'prototype'; // Bias towards prototype for UI builder context

    // 2. Design System Detection
    let detectedDsId: string | null = null;
    
    const dsKeywords: Record<string, string[]> = {
        'ds-retro': ['retro', '90s', 'windows 95', 'old school', 'pixel', 'vintage', 'classic pc', 'nostalgic'],
        'ds-neobrutalism': ['brutalist', 'neo-brutalism', 'bold', 'sharp', 'contrast', 'pop', 'quirky', 'hard shadow'],
        'ds-glass': ['glass', 'glassmorphism', 'frosted', 'blur', 'translucent', 'transparent', 'icy'],
        'ds-ios': ['ios', 'apple', 'cupertino', 'iphone', 'clean', 'mobile style'],
        'ds-cyberpunk': ['cyberpunk', 'neon', 'sci-fi', 'futuristic', 'hacker', 'glitch', 'high tech'],
        'ds-corp': ['corporate', 'enterprise', 'business', 'data', 'dense', 'professional', 'saas'],
        'ds-pastel': ['pastel', 'soft', 'gentle', 'cute', 'cream', 'calm'],
        'ds-mono': ['monochrome', 'black and white', 'fashion', 'minimalist', 'stark'],
        'ds-wireframe': ['wireframe', 'lo-fi', 'blueprint', 'sketch', 'structure', 'layout only'],
        'ds-material': ['material', 'google', 'android', 'material you', 'dynamic'],
        'ds-nature': ['nature', 'organic', 'earth', 'green', 'eco', 'plant'],
        'ds-elegant': ['elegant', 'luxury', 'gold', 'serif', 'classy', 'fancy']
    };

    for (const [id, keywords] of Object.entries(dsKeywords)) {
        if (keywords.some(k => text.includes(k))) {
            detectedDsId = id;
            break; // Stop at first strong match
        }
    }

    return { mode: detectedMode, designSystemId: detectedDsId };
};

export const HomeView: React.FC<HomeViewProps> = ({ onSubmit, onNavigate }) => {
  const [inputValue, setInputValue] = useState('');
  const [generationMode, setGenerationMode] = useState<'prompt' | 'prototype' | 'image'>('prompt');
  
  // Smart Select State
  const [isSmartSelect, setIsSmartSelect] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Design System Selection State
  const [isSystemOpen, setIsSystemOpen] = useState(false);
  const [isModeOpen, setIsModeOpen] = useState(false);
  const [selectedSystemId, setSelectedSystemId] = useState<string | null>(null);
  const activeSystemItem = DESIGN_SYSTEMS.find(ds => ds.id === selectedSystemId);
  const systemDropdownRef = useRef<HTMLDivElement>(null);
  const modeDropdownRef = useRef<HTMLDivElement>(null);

  // Typing Effect State
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Product Hunt Modal State
  const [showThankYouModal, setShowThankYouModal] = useState(false);

  // Deepgram Hook
  const { isListening, toggleListening } = useDeepgram({
      onTranscript: (text) => setInputValue(prev => {
          const newText = prev ? prev.trim() + ' ' + text : text;
          return newText;
      })
  });

  // Check for Product Hunt Referral
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('ref') === 'producthunt') {
      setShowThankYouModal(true);
    }
  }, []);

  // Kindly Intelligence Smart Select Logic
  useEffect(() => {
    if (!isSmartSelect || !inputValue.trim()) {
        setIsAnalyzing(false);
        return;
    }
    
    // Simulate "thinking" time for UX (200ms), then execute local logic
    setIsAnalyzing(true);
    const timer = setTimeout(() => {
        const result = classifyIntent(inputValue);
        
        if (result.mode !== generationMode) {
            setGenerationMode(result.mode);
        }
        if (result.designSystemId && result.designSystemId !== selectedSystemId) {
            setSelectedSystemId(result.designSystemId);
        }
        setIsAnalyzing(false);
    }, 400); // Short delay to show the "Analyzing..." state visually

    return () => clearTimeout(timer);
  }, [inputValue, isSmartSelect, generationMode, selectedSystemId]);

  // Main Hero Typing Effect
  useEffect(() => {
    const currentPhrase = TYPING_PHRASES[phraseIndex];
    let typeSpeed = 80;
    if (isDeleting) typeSpeed = 40; 
    if (isPaused) typeSpeed = 2000;

    const timer = setTimeout(() => {
      if (isPaused) {
        setIsPaused(false);
        setIsDeleting(true);
        return;
      }

      if (isDeleting) {
        if (charIndex > 0) {
          setCharIndex((prev) => prev - 1);
        } else {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % TYPING_PHRASES.length);
        }
      } else {
        if (charIndex < currentPhrase.length) {
          setCharIndex((prev) => prev + 1);
        } else {
          setIsPaused(true);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, isPaused, phraseIndex]);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (systemDropdownRef.current && !systemDropdownRef.current.contains(event.target as Node)) {
            setIsSystemOpen(false);
        }
        if (modeDropdownRef.current && !modeDropdownRef.current.contains(event.target as Node)) {
            setIsModeOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleFinalSubmit();
    }
  };

  const handleFinalSubmit = () => {
      if (!inputValue.trim()) return;
      
      let finalPrompt = inputValue;
      if (activeSystemItem && generationMode !== 'image') {
          finalPrompt = `Using the "${activeSystemItem.title}" design system style (${activeSystemItem.systemPrompt}), please build: ${inputValue}`;
      }
      onSubmit(finalPrompt, generationMode);
  };

  const handleExport = (urlTemplate: string) => {
      if (!inputValue.trim()) return;
      const url = urlTemplate.replace(/\{YOUR_PROMPT(_HERE)?\}/g, encodeURIComponent(inputValue));
      window.open(url, '_blank');
  };

  const getModeLabel = () => {
      if (generationMode === 'prompt') return 'Prompt Generator';
      if (generationMode === 'prototype') return 'Prototype';
      return 'Image Generator';
  };

  const getModeIcon = () => {
      if (generationMode === 'prompt') return <MessageSquare size={14} />;
      if (generationMode === 'prototype') return <FileCode size={14} />;
      return <ImageIcon size={14} />;
  };

  const FAQItem = ({ question, answer }: { question: string, answer: string }) => (
      <div className="border-b border-gray-100 py-4 last:border-0">
          <h4 className="text-sm font-bold text-gray-900 mb-1">{question}</h4>
          <p className="text-sm text-gray-500 leading-relaxed">{answer}</p>
      </div>
  );

  return (
    <div className="w-full h-full overflow-y-auto bg-white font-sans scroll-smooth relative">
      
      {/* --- BLUE BLUR OVERLAY (Scrolls with view, simulating fixed bottom) --- */}
      {/* Very thin white gradient blur, removed blue tint */}
      <div className="fixed bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-[100]"></div>

      {/* --- HERO SECTION --- */}
      <div className="flex flex-col items-center justify-center min-h-[85vh] relative pt-10 overflow-hidden">
          
          {/* Hero Background Image */}
          <div className="absolute inset-0 z-0">
              <img 
                  src="https://iili.io/fS3NdIs.md.jpg" 
                  alt="Hero Background" 
                  className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/90"></div>
          </div>

          <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center">

            {/* Header Text */}
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight text-center drop-shadow-sm">
              Kindly Create
            </h1>

            {/* Auto-Typing Subtext */}
            <div className="h-8 mb-12 flex items-center justify-center text-lg md:text-xl text-gray-600 font-medium drop-shadow-sm">
              <span className="mr-2">Chat with AI to</span>
              <span className="text-gray-900 font-semibold relative">
                {TYPING_PHRASES[phraseIndex].substring(0, charIndex)}
                <span className="absolute -right-[2px] top-1 bottom-1 w-[2px] bg-blue-500 animate-pulse"></span>
              </span>
            </div>
            
            {/* Input Container (Modified structure for connected footer) */}
            <div className="w-full max-w-3xl bg-white/90 backdrop-blur-sm border border-gray-200 squircle-box shadow-[0_8px_40px_-10px_rgba(0,0,0,0.1)] flex flex-col relative group focus-within:ring-2 focus-within:ring-blue-100 transition-all z-20 overflow-hidden">
                
                {/* Main Input Area */}
                <div className="p-4 flex flex-col min-h-[120px]">
                    <textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Describe your idea..." 
                        className="flex-1 w-full bg-transparent border-none outline-none text-xl text-gray-800 placeholder-gray-400 resize-none p-2 font-light"
                        rows={2}
                        autoFocus
                    />

                    {/* Selected System Pill */}
                    {activeSystemItem && generationMode !== 'image' && (
                        <div className="px-2 mb-2 animate-fade-in-up">
                            <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full">
                                <div className={`w-3 h-3 rounded-full ${activeSystemItem.thumbnailClass.split(' ')[0]}`}></div>
                                <span className="text-xs font-medium text-gray-700">{activeSystemItem.title}</span>
                                <button 
                                    onClick={() => setSelectedSystemId(null)}
                                    className="ml-1 p-0.5 hover:bg-gray-200 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X size={12} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Bottom Actions Row */}
                    <div className="flex justify-between items-center mt-auto pt-2 border-t border-transparent">
                        {/* Left: + and Mode Switcher */}
                        <div className="flex items-center gap-3">
                            
                             {/* Design System Toggle */}
                             {generationMode !== 'image' && (
                                <div className="relative" ref={systemDropdownRef}>
                                    <button
                                        onClick={() => setIsSystemOpen(!isSystemOpen)}
                                        className={`p-2 rounded-full transition-all text-gray-400 hover:text-gray-600 hover:bg-gray-50 ${isSystemOpen ? 'bg-gray-100 text-gray-900' : ''}`}
                                        title="Select Design System"
                                    >
                                        <Plus size={20} strokeWidth={2} />
                                    </button>
                                    {isSystemOpen && (
                                        <div className="absolute bottom-full left-0 mb-4 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in-up origin-bottom-left max-h-[400px] overflow-y-auto z-50">
                                            <div className="p-3 bg-gray-50 border-b border-gray-100 sticky top-0 z-10">
                                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Select Style</h4>
                                            </div>
                                            <div className="p-2 space-y-1">
                                                {DESIGN_SYSTEMS.map(ds => (
                                                    <button 
                                                        key={ds.id}
                                                        onClick={() => { setSelectedSystemId(ds.id); setIsSystemOpen(false); }}
                                                        className={`w-full text-left p-2 rounded-xl flex items-center gap-3 transition-colors ${selectedSystemId === ds.id ? 'bg-black text-white' : 'hover:bg-gray-50 text-gray-700'}`}
                                                    >
                                                        <div className={`w-8 h-8 rounded-lg border flex-shrink-0 ${ds.thumbnailClass} ${selectedSystemId === ds.id ? 'border-white/20' : 'border-gray-200'}`}></div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="font-medium text-sm truncate">{ds.title}</div>
                                                        </div>
                                                        {selectedSystemId === ds.id && <Check size={14} />}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                             )}

                             {/* Mode Toggle */}
                             <div className="relative" ref={modeDropdownRef}>
                                 <button
                                    onClick={() => setIsModeOpen(!isModeOpen)}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium transition-colors shadow-sm ${
                                        isSmartSelect 
                                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-purple-200 text-gray-800' 
                                        : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-700'
                                    }`}
                                 >
                                     {isSmartSelect && (
                                         <div className="mr-1">
                                             {isAnalyzing ? (
                                                 <Loader2 size={12} className="text-purple-500 animate-spin" />
                                             ) : (
                                                 <img src="https://iili.io/f8yBZN9.png" alt="AI" className="w-3 h-3 object-contain" />
                                             )}
                                         </div>
                                     )}
                                     {getModeIcon()}
                                     <span>{getModeLabel()}</span>
                                     <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${isModeOpen ? 'rotate-180' : ''}`} />
                                 </button>

                                 {isModeOpen && (
                                     <div className="absolute bottom-full left-0 mb-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-fade-in-up origin-bottom-left z-50">
                                         <div className="p-1 space-y-0.5">
                                             <button
                                                onClick={() => { setGenerationMode('prompt'); setIsModeOpen(false); setIsSmartSelect(false); }}
                                                className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors ${generationMode === 'prompt' && !isSmartSelect ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'}`}
                                             >
                                                 <MessageSquare size={16} />
                                                 Prompt Generator
                                             </button>
                                             <button
                                                onClick={() => { setGenerationMode('prototype'); setIsModeOpen(false); setIsSmartSelect(false); }}
                                                className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors ${generationMode === 'prototype' && !isSmartSelect ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'}`}
                                             >
                                                 <FileCode size={16} />
                                                 Prototype
                                             </button>
                                              <button
                                                onClick={() => { setGenerationMode('image'); setIsModeOpen(false); setIsSmartSelect(false); }}
                                                className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors ${generationMode === 'image' && !isSmartSelect ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'}`}
                                             >
                                                 <ImageIcon size={16} />
                                                 Image Generator
                                             </button>

                                             <div className="h-px bg-gray-100 my-1 mx-2"></div>

                                             <button
                                                onClick={() => { setIsSmartSelect(!isSmartSelect); setIsModeOpen(false); }}
                                                className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between group transition-colors ${isSmartSelect ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}
                                             >
                                                 <div className="flex items-center gap-2">
                                                     <img src="https://iili.io/f8yBZN9.png" alt="AI" className="w-4 h-4 object-contain" />
                                                     <span className="text-sm font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                                                         Smart Select
                                                     </span>
                                                 </div>
                                                 <div className={`w-8 h-4 rounded-full relative transition-colors ${isSmartSelect ? 'bg-black' : 'bg-gray-200'}`}>
                                                     <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-transform shadow-sm ${isSmartSelect ? 'left-[18px]' : 'left-0.5'}`}></div>
                                                 </div>
                                             </button>
                                         </div>
                                     </div>
                                 )}
                             </div>

                        </div>

                        {/* Right: Mic & Send */}
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={toggleListening}
                                className={`text-gray-400 hover:text-gray-600 transition-colors ${isListening ? 'text-red-500 animate-pulse' : ''}`}
                            >
                                <Mic size={20} strokeWidth={2} />
                            </button>
                            <button 
                                onClick={handleFinalSubmit}
                                disabled={!inputValue.trim()}
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                                    inputValue.trim() 
                                    ? 'bg-gray-100 text-gray-900 hover:bg-black hover:text-white shadow-sm hover:shadow-md' 
                                    : 'bg-gray-50 text-gray-300 cursor-not-allowed'
                                }`}
                            >
                                <ArrowUp size={20} strokeWidth={2.5} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Connected Export Tools Bar */}
                <div className="bg-gray-50 border-t border-gray-100 py-3 px-5 flex items-center justify-between backdrop-blur-md">
                   <span className="text-xs font-semibold text-gray-500">Export prompts to</span>
                   <div className="flex items-center gap-4 text-gray-400">
                      <div className="hover:text-gray-900 transition-colors cursor-pointer" title="ChatGPT" onClick={() => handleExport('https://chatgpt.com/?q={YOUR_PROMPT_HERE}')}><ChatGPTIcon /></div>
                      <div className="hover:text-gray-900 transition-colors cursor-pointer" title="Cursor" onClick={() => handleExport('cursor://link/prompt?text={YOUR_PROMPT}')}><CursorIcon /></div>
                      <div className="hover:text-gray-900 transition-colors cursor-pointer" title="Bolt" onClick={() => handleExport('https://bolt.new/?prompt={YOUR_PROMPT}')}><BoltIcon /></div>
                      <div className="hover:text-gray-900 transition-colors cursor-pointer" title="v0" onClick={() => handleExport('https://v0.dev/?q={YOUR_PROMPT}')}><V0Icon /></div>
                      <div className="hover:text-gray-900 transition-colors cursor-pointer" title="Lovable" onClick={() => handleExport('https://lovable.dev/?autosubmit=true#prompt={YOUR_PROMPT_HERE}')}><LovableIcon /></div>
                      <div className="hover:text-gray-900 transition-colors cursor-pointer" title="Google AI Studio" onClick={() => handleExport('https://aistudio.google.com/apps?autosubmit=true&prompt={YOUR_PROMPT}')}><AIStudioIcon /></div>
                      <div className="hover:text-gray-900 transition-colors cursor-pointer" title="Grok" onClick={() => handleExport('https://grok.com/?q={YOUR_PROMPT_HERE}')}><GrokIcon /></div>
                   </div>
                </div>
            </div>
            
            {/* Footer / Hints */}
            <div className="mt-8 flex gap-4 text-xs text-gray-500 font-medium tracking-wide relative z-10">
                <div className="flex items-center gap-1.5">
                    <Sparkles size={12} />
                    <span>Gemini 3.0 Flash</span>
                </div>
                <div>•</div>
                <div>Supports Tailwind</div>
                <div>•</div>
                <div>Vanilla JS</div>
            </div>

          </div>
      </div>

      {/* ... (Rest of component sections: Kindly Intelligence, Product Hunt, Launch Steps, FAQ, Footer, Modal) */}
      <div className="w-full bg-white py-24 border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-6">
              
              {/* Main Header */}
              <div className="text-center mb-16">
                  <h2 
                    className="text-4xl md:text-6xl font-medium tracking-tight mb-6 pb-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent inline-block leading-tight"
                    style={{ fontFamily: '"Google Sans Flex", sans-serif' }}
                  >
                      Kindly Intelligence
                  </h2>
                  <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                      Introducing the first version of our proprietary AI model. Now available as a high-speed, edge-deployed API.
                  </p>
              </div>

              {/* Text Article with Features */}
              <div className="max-w-3xl mx-auto space-y-12">
                  
                  {/* Feature 1 */}
                  <div className="space-y-3">
                      <div className="flex items-center gap-3">
                          <h3 className="text-2xl font-bold text-black tracking-tight">
                              Global Edge API
                          </h3>
                          <span className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">New</span>
                      </div>
                      <p className="text-lg text-gray-600 leading-relaxed font-normal">
                          The Kindly Intelligence API is now live. Deployed to the Global Edge for ultra-low latency, it powers the "Ask Kindly" assistant with specialized text processing capabilities including Rewrite, Summarize, Explain, and Shorten.
                      </p>
                  </div>

                  {/* Feature 2 */}
                  <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-black tracking-tight">
                          No Rate Limits
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed font-normal">
                          We believe in accessible intelligence. The API is completely free to use with no API key required and generous fair-use policies, making it perfect for rapid development and testing.
                      </p>
                  </div>

                  {/* Feature 3 */}
                  <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-black tracking-tight">
                          Processing Stats
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed font-normal">
                          Gain insights into your text transformations. The API returns detailed statistics with every response, including compression ratios, word counts, and processing time in milliseconds.
                      </p>
                  </div>

                  {/* Feature 4 - Smart Search */}
                  <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-black tracking-tight">
                          JavaScript SDK
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed font-normal">
                          Easy integration for any JS environment. Check the documentation for simple fetch examples to start using Kindly Intelligence in your own applications today.
                      </p>
                  </div>

                  {/* Feature 5 - Image Gen */}
                  <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-black tracking-tight">
                          Visual Generation
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed font-normal">
                          The Image Generator is now powered by Kindly Intelligence. Generate stunning UI assets, icons, and textures with prompt coherence optimized specifically for interface design.
                      </p>
                  </div>

                  <div className="pt-8 text-center">
                      <button 
                        onClick={() => onNavigate('docs')}
                        className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
                      >
                          View API Docs <ArrowRight size={16} />
                      </button>
                  </div>

              </div>
          </div>
      </div>

      {/* --- PRODUCT HUNT SECTION --- */}
      <div className="w-full bg-white py-16 border-t border-gray-100 flex flex-col items-center justify-center">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">We are live on Product Hunt</p>
          <a href="https://www.producthunt.com/products/kindly-create?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-kindly-create" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform duration-300">
              <img 
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1063096&theme=dark&t=1768439031070" 
                  alt="Kindly Create - The AI Interface Architect. Prompt to Production-Ready Code. | Product Hunt" 
                  style={{ width: '250px', height: '54px' }} 
                  width="250" 
                  height="54" 
              />
          </a>
      </div>

      {/* --- REST OF THE PAGE --- */}
      <div className="w-full py-20 bg-white border-t border-gray-100">
         <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-16 tracking-tight">Launch in 3 easy steps:</h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 relative">
                {/* Step 1 */}
                <div className="flex flex-col items-center max-w-[280px]">
                    <div className="text-[120px] font-bold text-gray-100 leading-none mb-4">1</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Describe your idea</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">Enter a simple prompt describing the component or system you want to build.</p>
                </div>
                <div className="hidden md:block text-gray-200">
                    <ArrowRight size={32} strokeWidth={3} />
                </div>
                {/* Step 2 */}
                <div className="flex flex-col items-center max-w-[280px]">
                    <div className="text-[120px] font-bold text-gray-100 leading-none mb-4">2</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Get the Prompt</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">Instantly receive a high-fidelity system prompt tailored for AI coding tools.</p>
                </div>
                <div className="hidden md:block text-gray-200">
                    <ArrowRight size={32} strokeWidth={3} />
                </div>
                {/* Step 3 */}
                <div className="flex flex-col items-center max-w-[280px]">
                    <div className="text-[120px] font-bold text-gray-100 leading-none mb-4">3</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Build with AI</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">Export to Cursor, Bolt, or v0 and watch your application come to life.</p>
                </div>
            </div>
            <div className="mt-16">
                <button 
                    onClick={() => document.querySelector('textarea')?.focus()}
                    className="bg-black text-white px-8 py-3.5 rounded-full font-bold text-lg hover:bg-gray-800 transition-transform active:scale-95 shadow-xl shadow-gray-200"
                >
                    Start Building
                </button>
            </div>
         </div>
      </div>

      {/* --- FAQ SECTION --- */}
      <div className="w-full py-24 bg-white border-t border-gray-100 mb-10">
        <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4 tracking-tight">Frequently Asked Questions</h2>
            <p className="text-center text-gray-500 mb-12">Everything you need to know about Kindly Create.</p>
            <div className="space-y-4">
                <FAQItem 
                    question="What is Kindly Create?" 
                    answer="Kindly Create is a specialized prompt engineering platform. It helps developers generate high-fidelity, comprehensive system prompts that can be pasted into AI coding tools like Cursor, Bolt, and v0 to build better UI components faster." 
                />
                <FAQItem 
                    question="Which AI models does it use?" 
                    answer="We currently utilize Google's Gemini 3.0 Flash for core generation and our own Kindly Intelligence API for text processing and refinement." 
                />
                <FAQItem 
                    question="Can I export to any tool?" 
                    answer="Yes! We provide direct export links for ChatGPT, Cursor, Bolt, v0, Lovable, Grok, and Google AI Studio. You can also copy the prompt to your clipboard for use in any other tool." 
                />
                <FAQItem 
                    question="Is it free to use?" 
                    answer="Yes, Kindly Create is currently free to use. Our goal is to provide the best prompt engineering resources to the developer community." 
                />
            </div>
        </div>
      </div>

      {/* --- FOOTER --- */}
      <footer className="w-full bg-black text-white pt-20 pb-12 rounded-t-[48px] relative z-20 mt-20">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"></div>
          <div className="max-w-6xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                  <div className="col-span-1 md:col-span-2 space-y-4">
                      <div className="flex items-center gap-2">
                          <img src="https://iili.io/f8yBZN9.png" alt="Kindly Create" className="w-8 h-8 object-contain brightness-0 invert" />
                          <span className="font-bold text-xl tracking-tight">Kindly Create</span>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                          Empowering developers with AI-driven design systems and production-ready code. Build faster, design better with intelligent prompt engineering.
                      </p>
                  </div>
                  <div>
                      <h4 className="font-bold mb-6 text-sm uppercase tracking-wider text-gray-500">Product</h4>
                      <ul className="space-y-3 text-sm text-gray-400">
                          <li><a href="#" className="hover:text-white transition-colors">Prompt Generator</a></li>
                          <li><a href="#" className="hover:text-white transition-colors">Design Systems</a></li>
                          <li><a href="#" className="hover:text-white transition-colors">Component Library</a></li>
                          <li><button onClick={() => onNavigate('docs')} className="hover:text-white transition-colors text-left">Documentation</button></li>
                      </ul>
                  </div>
                  <div>
                      <h4 className="font-bold mb-6 text-sm uppercase tracking-wider text-gray-500">Legal</h4>
                      <ul className="space-y-3 text-sm text-gray-400">
                          <li><button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors text-left">Privacy Policy</button></li>
                          <li><button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors text-left">Terms of Service</button></li>
                      </ul>
                  </div>
              </div>
              <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-medium">
                  <span>© 2026 Kindly Create. All rights reserved.</span>
                  <div className="flex gap-6">
                      <a href="#" className="hover:text-white transition-colors">Twitter</a>
                      <a href="#" className="hover:text-white transition-colors">GitHub</a>
                      <a href="#" className="hover:text-white transition-colors">Discord</a>
                  </div>
              </div>
          </div>
      </footer>

      {/* --- THANK YOU MODAL (Product Hunt) --- */}
      {showThankYouModal && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative text-center">
                <button 
                    onClick={() => setShowThankYouModal(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors"
                >
                    <X size={20} />
                </button>
                <div className="w-16 h-16 bg-orange-50 text-[#FF6154] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart size={32} fill="currentColor" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome, Hunter! 😻</h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                    Thank you so much for checking us out on Product Hunt. We're excited to have you here building the future of UI with us.
                </p>
                <button 
                    onClick={() => setShowThankYouModal(false)}
                    className="w-full py-3 bg-[#FF6154] hover:bg-[#d94e43] text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-200 active:scale-95"
                >
                    Let's Build!
                </button>
            </div>
        </div>
      )}
    </div>
  );
};
