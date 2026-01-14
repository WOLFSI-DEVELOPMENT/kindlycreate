
import React, { useState, useEffect, useRef } from 'react';
import { Mic, ArrowUp, Plus, Sparkles, ChevronDown, Check, X, FileCode, MessageSquare, Image as ImageIcon, ArrowRight, Zap, Loader2 } from 'lucide-react';
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

// --- KINDLY INTELLIGENCE ENGINE (Local) ---
// A weighted scoring system to determine intent without external APIs.
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

  // Deepgram Hook
  const { isListening, toggleListening } = useDeepgram({
      onTranscript: (text) => setInputValue(prev => {
          const newText = prev ? prev.trim() + ' ' + text : text;
          return newText;
      })
  });

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
    <div className="w-full h-full overflow-y-auto bg-white font-sans scroll-smooth">
      
      {/* --- HERO SECTION --- */}
      <div className="flex flex-col items-center justify-center min-h-[85vh] relative pt-10">
          
          <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center">

            {/* Header Text */}
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight text-center">
              Kindly Create
            </h1>

            {/* Auto-Typing Subtext */}
            <div className="h-8 mb-12 flex items-center justify-center text-lg md:text-xl text-gray-500 font-medium">
              <span className="mr-2">Chat with AI to</span>
              <span className="text-gray-900 font-semibold relative">
                {TYPING_PHRASES[phraseIndex].substring(0, charIndex)}
                <span className="absolute -right-[2px] top-1 bottom-1 w-[2px] bg-blue-500 animate-pulse"></span>
              </span>
            </div>
            
            {/* Input Container */}
            <div className="w-full max-w-3xl bg-white border border-gray-100 rounded-[32px] shadow-[0_8px_40px_-10px_rgba(0,0,0,0.08)] p-4 flex flex-col min-h-[180px] relative group focus-within:ring-1 focus-within:ring-gray-200 transition-all">
                
                {/* Text Area */}
                <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Describe your idea..." 
                    className="flex-1 w-full bg-transparent border-none outline-none text-xl text-gray-800 placeholder-gray-300 resize-none p-2 font-light"
                    rows={3}
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
                        
                         {/* Design System Toggle (Via Plus Button) */}
                         {generationMode !== 'image' && (
                            <div className="relative" ref={systemDropdownRef}>
                                <button
                                    onClick={() => setIsSystemOpen(!isSystemOpen)}
                                    className={`p-2 rounded-full transition-all text-gray-400 hover:text-gray-600 hover:bg-gray-50 ${isSystemOpen ? 'bg-gray-100 text-gray-900' : ''}`}
                                    title="Select Design System"
                                >
                                    <Plus size={20} strokeWidth={2} />
                                </button>
                                {/* Dropdown Logic */}
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

                         {/* Mode Toggle (Prompt Generator vs Prototype vs Image) */}
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

                                         {/* Divider */}
                                         <div className="h-px bg-gray-100 my-1 mx-2"></div>

                                         {/* Smart Select Toggle inside Dropdown */}
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
                                             {/* Toggle Switch Visual */}
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
            
            {/* Footer / Hints */}
            <div className="mt-8 flex gap-4 text-xs text-gray-400 font-medium tracking-wide">
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

      {/* --- KINDLY INTELLIGENCE SECTION --- */}
      <div className="w-full bg-white py-24 border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-6">
              
              {/* Main Header */}
              <div className="text-center mb-16">
                  <h2 
                    className="text-4xl md:text-6xl font-medium tracking-tight mb-6 pb-3 bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent inline-block leading-tight"
                    style={{ fontFamily: '"Google Sans Flex", sans-serif' }}
                  >
                      Kindly Intelligence
                  </h2>
                  <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                      We are building the future of AI-assisted design. The Kindly team is currently developing a proprietary AI model specifically fine-tuned for UI/UX generation.
                  </p>
              </div>

              {/* Text Article with Features */}
              <div className="max-w-3xl mx-auto space-y-12">
                  
                  {/* Feature 1 */}
                  <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-black tracking-tight">
                          Proprietary AI Model
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed font-normal">
                          The Kindly team is developing a proprietary AI model designed to generate superior prompts and power a next-generation upgraded version of Ask Kindly.
                      </p>
                  </div>

                  {/* Feature 2 */}
                  <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-black tracking-tight">
                          Fine-Tuned for UI
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed font-normal">
                          This new intelligence engine is being fine-tuned to understand the nuances of modern UI development, enabling it to craft system instructions that yield pixel-perfect results in tools like Cursor and v0.
                      </p>
                  </div>

                  {/* Feature 3 */}
                  <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-black tracking-tight">
                          Deep Context Awareness
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed font-normal">
                          Beyond better prompts, Kindly Intelligence will bring deep context awareness to our platform, allowing for complex refactoring and architectural reasoning that goes far beyond standard LLM capabilities.
                      </p>
                  </div>

                  {/* Feature 4 - Smart Search */}
                  <div className="space-y-3">
                      <div className="flex items-center gap-3">
                          <h3 
                              className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent inline-block"
                              style={{ fontFamily: '"Google Sans Flex", sans-serif' }}
                          >
                              Smart Search
                          </h3>
                          <span className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Beta</span>
                      </div>
                      <p className="text-lg text-gray-600 leading-relaxed font-normal">
                          Now available across our library and documentation. Ask Kindly Intelligence to find components based on intent, context, and vague descriptions, not just keyword matching.
                      </p>
                  </div>

                  {/* Feature 5 - Smart Select (NEW) */}
                  <div className="space-y-3">
                      <div className="flex items-center gap-3">
                          <h3 
                              className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent inline-block"
                              style={{ fontFamily: '"Google Sans Flex", sans-serif' }}
                          >
                              Smart Select
                          </h3>
                          <span className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Beta</span>
                      </div>
                      <p className="text-lg text-gray-600 leading-relaxed font-normal">
                          Intelligent mode switching. Kindly Intelligence inspects your prompt in real-time to determine if you need a code prototype, a prompt resource, or visual assets, automatically configuring the environment for the best result.
                      </p>
                  </div>

                  {/* Feature 6 */}
                  <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-black tracking-tight">
                          Free for Everyone
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed font-normal">
                          We believe in democratizing design intelligence. Kindly Intelligence and its API will be completely free to use, ensuring that every developer has access to world-class UI generation tools.
                      </p>
                  </div>

              </div>
          </div>
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
                    answer="We currently utilize Google's Gemini 3.0 Flash and Pro models for their superior reasoning capabilities and speed, ensuring your generated prompts are detailed and accurate." 
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
    </div>
  );
};
