
import React, { useState, useEffect } from 'react';
import { ArrowUp, Check, Zap, Edit3, Layers, Monitor, BarChart3, PieChart, MousePointer2, Sparkles } from 'lucide-react';
import { AnimatedSphere } from './AnimatedSphere';

type Phase = 
  | 'idle' 
  | 'typing' 
  | 'expanding' 
  | 'analyzing'
  | 'blueprint' 
  | 'style-hover'
  | 'style-click'
  | 'cursor-move-gen'
  | 'click-gen' 
  | 'generating' 
  | 'editor-reveal' 
  | 'zoom-input' 
  | 'typing-refine' 
  | 'refining-process'
  | 'ui-transform' 
  | 'outro';

export const AppShowcase: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('idle');
  const [text, setText] = useState('');
  const [refineText, setRefineText] = useState('');

  useEffect(() => {
    let timeouts: ReturnType<typeof setTimeout>[] = [];
    
    const schedule = (fn: () => void, delay: number) => {
      timeouts.push(setTimeout(fn, delay));
    };

    const runSequence = () => {
      setPhase('idle');
      setText('');
      setRefineText('');

      // 1. Typing "Build a SaaS dashboard" (Slower)
      schedule(() => setPhase('typing'), 800);
      const prompt = "Build a SaaS analytics dashboard";
      for(let i = 0; i < prompt.length; i++) {
        schedule(() => setText(prompt.slice(0, i + 1)), 1000 + (i * 60));
      }

      // 2. Expand to Planning
      schedule(() => setPhase('expanding'), 3200);

      // 3. Analyzing (Thinking)
      schedule(() => setPhase('analyzing'), 4000);

      // 4. Blueprint Items Pop-in
      schedule(() => setPhase('blueprint'), 5500);

      // 5. Style Selection Interaction
      schedule(() => setPhase('style-hover'), 7500);
      schedule(() => setPhase('style-click'), 8500);

      // 6. Move to Generate
      schedule(() => setPhase('cursor-move-gen'), 9500);
      schedule(() => setPhase('click-gen'), 10500);

      // 7. Generation Explosion (Code Matrix)
      schedule(() => setPhase('generating'), 10800);

      // 8. Editor Reveal (First Draft)
      schedule(() => setPhase('editor-reveal'), 13500);

      // 9. Refinement Sequence (Zoom & Type)
      schedule(() => setPhase('zoom-input'), 16500);
      schedule(() => setPhase('typing-refine'), 17500);
      const editPrompt = "Add a revenue chart";
      for(let i = 0; i < editPrompt.length; i++) {
        schedule(() => setRefineText(editPrompt.slice(0, i + 1)), 17500 + (i * 70));
      }

      // 10. Process Refinement
      schedule(() => setPhase('refining-process'), 19500);

      // 11. UI Transformation (Final Result)
      schedule(() => setPhase('ui-transform'), 21000);

      // 12. Outro
      schedule(() => setPhase('outro'), 25000);

      // Loop
      schedule(runSequence, 30000);
    };

    runSequence();
    return () => timeouts.forEach(clearTimeout);
  }, []);

  const isCursorVisible = ['style-hover', 'style-click', 'cursor-move-gen', 'click-gen'].includes(phase);
  const isInputPhase = ['idle', 'typing', 'expanding', 'analyzing', 'blueprint', 'style-hover', 'style-click', 'cursor-move-gen', 'click-gen'].includes(phase);
  const isEditorPhase = ['editor-reveal', 'zoom-input', 'typing-refine', 'refining-process', 'ui-transform'].includes(phase);

  return (
    <div className="w-full px-2 md:px-6 pb-20 overflow-hidden">
      {/* Container Card */}
      <div className="relative w-full max-w-7xl mx-auto aspect-[16/9] bg-[#F8F9FC] rounded-[32px] md:rounded-[64px] overflow-hidden shadow-2xl border-[6px] border-white ring-1 ring-black/5 isolate transform transition-all duration-700 hover:scale-[1.01]">
        
        {/* --- Background Elements --- */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
        <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[100%] bg-purple-200/30 rounded-full blur-[150px] animate-blob mix-blend-multiply"></div>
        <div className="absolute -bottom-[30%] -right-[10%] w-[70%] h-[100%] bg-blue-200/30 rounded-full blur-[150px] animate-blob animation-delay-4000 mix-blend-multiply"></div>

        {/* --- STAGE: Camera Wrapper --- */}
        <div className={`w-full h-full transition-transform duration-[2000ms] ease-[cubic-bezier(0.25,1,0.5,1)] flex items-center justify-center perspective-1000
            ${phase === 'zoom-input' || phase === 'typing-refine' ? 'scale-[2.2] translate-y-[28%] translate-x-[-18%]' : 'scale-100'}
        `}>

            {/* --- ACT 1: Input & Planning Interface --- */}
            <div className={`relative transition-all duration-[1200ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] 
                ${['idle', 'typing'].includes(phase) ? 'w-[480px] h-[72px] rounded-full' : 'w-[900px] h-[600px] rounded-[32px]'}
                ${isInputPhase ? 'opacity-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10 pointer-events-none absolute'}
                z-20 bg-white/90 backdrop-blur-xl shadow-2xl border border-white/50
            `}>
                {/* Chat Header / Input Bar */}
                <div className={`flex items-center px-3 w-full h-[72px] border-b border-transparent transition-all duration-500 ${!['idle', 'typing'].includes(phase) ? 'border-gray-100' : ''}`}>
                    {/* Icon Area */}
                    <div className="w-12 h-12 ml-1 rounded-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 text-gray-400 shadow-inner">
                        {['idle', 'typing'].includes(phase) ? <Zap size={20} /> : <AnimatedSphere className="w-8 h-8" />}
                    </div>
                    
                    {/* Text Field */}
                    <div className="flex-1 px-5 text-xl font-medium text-gray-800 truncate flex items-center">
                        {text}
                        {phase === 'typing' && <span className="w-0.5 h-6 bg-blue-500 ml-1 animate-pulse"/>}
                    </div>

                    {/* Submit Button */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${text ? 'bg-black text-white scale-100' : 'bg-gray-100 text-gray-300 scale-90'}`}>
                        <ArrowUp size={20} strokeWidth={2.5} />
                    </div>
                </div>

                {/* Expanded Content Area */}
                <div className={`p-10 h-[calc(100%-72px)] flex flex-col transition-opacity duration-700 ${['idle', 'typing', 'expanding'].includes(phase) ? 'opacity-0' : 'opacity-100'}`}>
                    
                    {/* Message Bubble */}
                    <div className="flex gap-6 mb-8">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex-shrink-0 shadow-lg"></div>
                        <div className="flex-1 space-y-2">
                            <div className="bg-gray-50/80 p-6 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm max-w-2xl">
                                <p className="text-gray-600 leading-relaxed">
                                    I'll design a modern analytics dashboard for SaaS. 
                                    {['analyzing', 'blueprint'].includes(phase) && <span className="inline-block w-1.5 h-1.5 bg-gray-400 rounded-full ml-2 animate-bounce"></span>}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Blueprint Cards */}
                    <div className="grid grid-cols-2 gap-4 mb-auto">
                        <div className={`bg-white border border-gray-100 p-5 rounded-2xl shadow-sm transition-all duration-700 delay-100 transform ${['blueprint', 'style-hover', 'style-click', 'cursor-move-gen', 'click-gen'].includes(phase) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            <div className="flex items-center gap-3 mb-3 text-indigo-600">
                                <Layers size={20} />
                                <span className="font-bold text-sm uppercase tracking-wider">Structure</span>
                            </div>
                            <div className="space-y-2">
                                <div className="h-2 w-3/4 bg-gray-100 rounded-full"></div>
                                <div className="h-2 w-1/2 bg-gray-100 rounded-full"></div>
                            </div>
                        </div>
                        <div className={`bg-white border border-gray-100 p-5 rounded-2xl shadow-sm transition-all duration-700 delay-300 transform ${['blueprint', 'style-hover', 'style-click', 'cursor-move-gen', 'click-gen'].includes(phase) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            <div className="flex items-center gap-3 mb-3 text-purple-600">
                                <Monitor size={20} />
                                <span className="font-bold text-sm uppercase tracking-wider">Components</span>
                            </div>
                            <div className="space-y-2">
                                <div className="h-2 w-2/3 bg-gray-100 rounded-full"></div>
                                <div className="h-2 w-5/6 bg-gray-100 rounded-full"></div>
                            </div>
                        </div>
                    </div>

                    {/* Style Selection Row */}
                    <div className={`mt-6 pt-6 border-t border-gray-100 flex items-center justify-between transition-all duration-700 delay-500 ${['blueprint', 'style-hover', 'style-click', 'cursor-move-gen', 'click-gen'].includes(phase) ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="flex gap-3">
                            {['Light', 'Dark', 'Navy'].map((style, i) => (
                                <div key={style} className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-300 ${
                                    style === 'Dark' && ['style-click', 'cursor-move-gen', 'click-gen'].includes(phase)
                                    ? 'bg-gray-900 text-white border-gray-900 shadow-md scale-105'
                                    : 'bg-white border-gray-200 text-gray-600'
                                }`}>
                                    {style} Mode
                                </div>
                            ))}
                        </div>
                        <button 
                            className={`px-8 py-3 bg-black text-white rounded-xl font-bold text-sm shadow-xl transition-transform duration-200 flex items-center gap-2 ${phase === 'click-gen' ? 'scale-95 bg-gray-800' : 'hover:scale-105'}`}
                        >
                            <Zap size={16} className="fill-current" />
                            Generate
                        </button>
                    </div>
                </div>
            </div>

            {/* --- ACT 2: Generation Code Stream --- */}
            <div className={`absolute inset-0 z-30 flex items-center justify-center bg-black transition-opacity duration-500 ${phase === 'generating' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="w-full max-w-4xl p-8 space-y-4 opacity-50 font-mono text-green-500/80 text-sm overflow-hidden h-[400px] relative mask-gradient">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div key={i} className="animate-pulse whitespace-nowrap" style={{ animationDelay: `${i * 50}ms` }}>
                            {`<div className="flex-${i % 2 === 0 ? 'row' : 'col'} items-center p-${i + 2} rounded-xl bg-white shadow-sm">`}
                        </div>
                    ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/10 backdrop-blur-md px-8 py-4 rounded-full border border-white/20 text-white font-bold animate-pulse">
                        Generating Component...
                    </div>
                </div>
            </div>

            {/* --- ACT 3: Editor & Result --- */}
            <div className={`absolute inset-0 z-20 flex items-center justify-center transition-all duration-1000 ${isEditorPhase ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                <div className="w-[95%] h-[90%] bg-white rounded-3xl shadow-2xl border border-gray-200 flex overflow-hidden ring-1 ring-black/5">
                    
                    {/* Left: Chat Sidebar */}
                    <div className="w-[340px] border-r border-gray-100 bg-gray-50/50 flex flex-col">
                        <div className="p-5 border-b border-gray-100 bg-white">
                            <div className="flex gap-2 mb-1">
                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            </div>
                        </div>
                        <div className="flex-1 p-5 space-y-5">
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">U</div>
                                <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 text-sm text-gray-600">{text}</div>
                            </div>
                            <div className="flex gap-3 flex-row-reverse">
                                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white"><Sparkles size={14} /></div>
                                <div className="bg-indigo-600 text-white p-3 rounded-2xl rounded-tr-none shadow-md text-sm">Dashboard v1 ready.</div>
                            </div>
                            
                            {/* The Edit Request */}
                            {['typing-refine', 'refining-process', 'ui-transform'].includes(phase) && (
                                <div className="flex gap-3 animate-slide-up">
                                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">U</div>
                                    <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 text-sm text-gray-600">
                                        {refineText || <span className="animate-pulse">|</span>}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Zoom Target */}
                        <div className="p-5 bg-white border-t border-gray-100">
                            <div className={`h-12 border rounded-xl flex items-center px-3 gap-2 transition-all duration-300 ${phase === 'typing-refine' ? 'border-indigo-500 ring-4 ring-indigo-500/10' : 'border-gray-200'}`}>
                                <span className="text-sm text-gray-400 flex-1">
                                    {phase === 'typing-refine' ? '' : 'Type a change...'}
                                </span>
                                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white"><ArrowUp size={16} /></div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Preview Canvas */}
                    <div className={`flex-1 p-8 md:p-12 flex items-center justify-center bg-gray-50 transition-colors duration-1000 relative overflow-hidden`}>
                        {/* Dot Pattern */}
                        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:16px_16px]"></div>

                        {/* Mock Dashboard */}
                        <div className={`w-full max-w-2xl bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden flex flex-col transition-all duration-1000 ${phase === 'ui-transform' ? 'scale-[1.02] shadow-indigo-200/50' : ''}`}>
                            {/* Nav */}
                            <div className="h-16 border-b border-gray-100 flex items-center justify-between px-6 bg-white">
                                <div className="flex gap-4 items-center">
                                    <div className="w-8 h-8 bg-indigo-600 rounded-lg"></div>
                                    <div className="h-3 w-24 bg-gray-100 rounded-full"></div>
                                </div>
                                <div className="h-8 w-8 bg-gray-100 rounded-full"></div>
                            </div>
                            
                            {/* Body */}
                            <div className="p-6 grid grid-cols-3 gap-6">
                                {/* Stats */}
                                <div className="col-span-1 h-32 bg-indigo-50/50 rounded-xl border border-indigo-100 p-4">
                                    <div className="h-2 w-12 bg-indigo-200 rounded mb-2"></div>
                                    <div className="h-6 w-20 bg-indigo-600 rounded mb-4"></div>
                                    <div className="h-2 w-full bg-indigo-100 rounded mt-auto"></div>
                                </div>
                                <div className="col-span-1 h-32 bg-gray-50 rounded-xl border border-gray-100 p-4"></div>
                                <div className="col-span-1 h-32 bg-gray-50 rounded-xl border border-gray-100 p-4"></div>

                                {/* Main Chart - Animates in */}
                                <div className={`col-span-3 h-64 rounded-xl border border-gray-100 p-6 flex items-end gap-2 transition-all duration-1000 ${phase === 'ui-transform' ? 'bg-white' : 'bg-gray-50'}`}>
                                    {phase === 'ui-transform' ? (
                                        // Bar Chart Animation
                                        <>
                                            {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                                                <div key={i} className="flex-1 bg-indigo-500 rounded-t-lg transition-all duration-1000 ease-out" style={{ height: `${h}%`, opacity: 0, animation: `growUp 0.8s ease-out ${i * 0.1}s forwards` }}></div>
                                            ))}
                                        </>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                            <BarChart3 size={48} strokeWidth={1} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        {/* --- CURSOR (Independent Layer) --- */}
        <div 
            className={`absolute z-50 pointer-events-none transition-all duration-1000 ease-in-out`}
            style={{
                opacity: isCursorVisible ? 1 : 0,
                top: phase === 'style-hover' ? '70%' : phase === 'cursor-move-gen' ? '70%' : '50%',
                left: phase === 'style-hover' ? '30%' : phase === 'cursor-move-gen' ? '85%' : '50%',
                transform: `translate(${phase === 'style-click' || phase === 'click-gen' ? '2px, 2px' : '0, 0'}) scale(${phase === 'style-click' || phase === 'click-gen' ? 0.9 : 1})`
            }}
        >
            <MousePointer2 size={32} className="fill-black text-white drop-shadow-xl" />
        </div>

        {/* --- OUTRO OVERLAY --- */}
        <div className={`absolute inset-0 z-40 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center transition-opacity duration-1000 ${phase === 'outro' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter text-center">
                Built in <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">seconds</span>.
            </h2>
            <p className="text-gray-400 text-xl md:text-2xl mb-12 font-light">From prompt to production-ready code.</p>
            <button className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-2xl shadow-white/20">
                Start Building Free
            </button>
        </div>

      </div>
      
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-bounce-subtle {
            animation: bounce-subtle 3s infinite;
        }
        @keyframes bounce-subtle {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }
        @keyframes growUp {
            from { height: 0%; opacity: 0; }
            to { opacity: 1; }
        }
        .mask-gradient {
            mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
        }
        @keyframes slide-up {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
            animation: slide-up 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

// Helper for displaying refinement text progressively
const editPromptMsg = (phase: Phase, text: string) => {
    if (phase === 'zoom-input') return '';
    return text;
}
