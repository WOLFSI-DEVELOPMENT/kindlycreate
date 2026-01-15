
import React, { useState, useEffect, useMemo } from 'react';
import { Search, Book, Sparkles, Cpu, Code, Layers, ArrowLeft, Zap, FileText, Command, Hash, HelpCircle, Bell, ChevronRight, ExternalLink } from 'lucide-react';

interface DocsViewProps {
  onBack: () => void;
}

type DocSection = {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  searchContext: string; // Hidden plain text for the "Smart Search"
};

// --- CONTENT DEFINITIONS ---

const SECTIONS: DocSection[] = [
  {
    id: 'intro',
    title: 'Introduction',
    category: 'Start',
    icon: <Book size={18} />,
    searchContext: "welcome kindly create intelligent interface builder bridge natural language production code designers prototype figma developers tailwind css cursor bolt automate boilerplate",
    content: (
      <div className="space-y-6">
        <p className="text-lg text-gray-600 leading-relaxed">
          Welcome to <strong className="text-gray-900">Kindly Create</strong>, the intelligent interface builder that bridges the gap between natural language and production-ready UI code.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100">
              <h3 className="font-bold text-blue-900 mb-2">For Designers</h3>
              <p className="text-sm text-blue-700">Rapidly prototype ideas, explore different design systems (iOS, Material, Brutalist), and generate high-fidelity previews without touching Figma.</p>
           </div>
           <div className="p-5 bg-purple-50 rounded-2xl border border-purple-100">
              <h3 className="font-bold text-purple-900 mb-2">For Developers</h3>
              <p className="text-sm text-purple-700">Generate clean Tailwind CSS code, export system prompts for Cursor, Bolt, and v0, and automate the boilerplate of UI development.</p>
           </div>
        </div>
      </div>
    )
  },
  {
    id: 'getting-started',
    title: 'Getting Started',
    category: 'Start',
    icon: <FileText size={18} />,
    searchContext: "choose mode prompt generator prototype image generator select design system neo-brutalism enterprise corp visual language",
    content: (
      <div className="space-y-8">
        <section>
            <h3 className="text-xl font-bold text-gray-900 mb-3">1. Choose your Mode</h3>
            <p className="text-gray-600 mb-4">Kindly Create offers three distinct generation modes located in the input bar:</p>
            <ul className="space-y-2 text-gray-600 pl-4 border-l-2 border-gray-100">
                <li><strong className="text-black">Prompt Generator:</strong> Creates detailed system instructions for other AI tools.</li>
                <li><strong className="text-black">Prototype:</strong> Generates a live, interactive HTML/Tailwind preview directly in the app.</li>
                <li><strong className="text-black">Image Generator:</strong> Creates visual assets and UI mockups.</li>
            </ul>
        </section>
        <section>
            <h3 className="text-xl font-bold text-gray-900 mb-3">2. Select a Design System</h3>
            <p className="text-gray-600">
                Click the <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full text-xs font-bold mx-1">+</span> button to select a visual language. 
                This ensures the output matches your desired aesthetic (e.g., "Neo-Brutalism" or "Enterprise Corp") before you even start typing.
            </p>
        </section>
      </div>
    )
  },
  {
    id: 'kindly-intel',
    title: 'Kindly Intelligence',
    category: 'Core',
    icon: <Cpu size={18} />,
    searchContext: "proprietary architecture llm fine-tuned orchestration layer ui ux patterns typography scales accessibility standards smart search blueprint planning context awareness",
    content: (
      <div className="space-y-6">
        <div className="p-6 bg-gradient-to-r from-indigo-900 to-black rounded-2xl text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-20">
                <Sparkles size={100} />
            </div>
            <h3 className="text-2xl font-bold mb-2 relative z-10">Kindly Intelligence v1</h3>
            <p className="text-indigo-100 relative z-10 max-w-lg">
                Our newly released AI-powered text processing API. Global Edge deployment for low latency, enabled for all origins, and completely free.
            </p>
        </div>
        <div className="prose prose-gray">
            <p>The new intelligence engine powers the "Ask Kindly" assistant and the <strong>Image Generator</strong>, offering specialized creative support including:</p>
            <ul className="list-disc pl-5 space-y-2">
                <li><strong>Visual Generation:</strong> Create production-ready UI assets and mockups from text descriptions.</li>
                <li><strong>Rewrite:</strong> Rephrase text with synonyms and improved flow.</li>
                <li><strong>Summarize:</strong> Extract key sentences and condense information.</li>
                <li><strong>Explain:</strong> Simplify complex words and add context.</li>
                <li><strong>Shorten:</strong> Remove filler words and redundancy.</li>
            </ul>
        </div>
      </div>
    )
  },
  {
    id: 'api-ref',
    title: 'API Reference',
    category: 'Developers',
    icon: <Code size={18} />,
    searchContext: "public beta free authentication header authorization bearer token endpoints post generate component get systems list kindly intelligence process",
    content: (
      <div className="space-y-6">
        <div className="flex items-center gap-3 p-4 bg-green-50 text-green-800 rounded-xl border border-green-100">
            <Zap size={20} />
            <span className="font-medium">The Kindly Intelligence API is live and requires no API key.</span>
        </div>
        
        <div className="space-y-2">
            <h3 className="font-bold text-gray-900">Base URL</h3>
            <div className="bg-[#1e1e1e] p-3 rounded-lg">
                <code className="text-blue-400 font-mono text-sm">https://kindly-intelligence.vercel.app/api</code>
            </div>
        </div>

        <div className="space-y-4">
            <h3 className="font-bold text-gray-900">Process Text</h3>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg font-mono text-sm border border-gray-200">
                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold">POST</span>
                <span className="text-gray-600">/process</span>
            </div>
            
            <p className="text-sm text-gray-600">Request Body:</p>
            <div className="bg-[#1e1e1e] p-4 rounded-xl overflow-x-auto text-sm">
<pre className="text-gray-300">
{`{
  "text": "Your text here...",
  "mode": "rewrite" // summarize | explain | shorten
}`}
</pre>
            </div>

            <p className="text-sm text-gray-600">Response:</p>
            <div className="bg-[#1e1e1e] p-4 rounded-xl overflow-x-auto text-sm">
<pre className="text-gray-300">
{`{
  "success": true,
  "data": {
    "result": "Processed text...",
    "stats": {
      "compressionRatio": "50.0%",
      "processingTimeMs": 12
    }
  }
}`}
</pre>
            </div>
        </div>
      </div>
    )
  },
  {
    id: 'design-systems',
    title: 'Design Systems',
    category: 'Core',
    icon: <Layers size={18} />,
    searchContext: "modern classic neo-brutalism dark glass linear-esque soft pastel enterprise aesthetics tokens border radius shadows color palettes typography",
    content: (
      <div className="space-y-6">
        <p className="text-gray-600">Kindly Create comes with pre-configured design tokens for popular aesthetics. These affect border radius, shadows, color palettes, and typography.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
                { name: 'Modern Classic', desc: 'Standard SaaS look. Clean blues and grays.' },
                { name: 'Neo-Brutalism', desc: 'Bold borders, high contrast, hard shadows.' },
                { name: 'Dark Glass', desc: 'Frosted glass effects on deep backgrounds.' },
                { name: 'Linear-esque', desc: 'Subtle borders, dark mode, refined gradients.' },
                { name: 'Soft Pastel', desc: 'Gentle colors, rounded organic shapes.' },
                { name: 'Enterprise', desc: 'Information dense, compact, serious.' }
            ].map((ds) => (
                <div key={ds.name} className="p-4 border border-gray-100 rounded-xl hover:border-gray-300 transition-colors">
                    <h4 className="font-bold text-gray-900">{ds.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">{ds.desc}</p>
                </div>
            ))}
        </div>
      </div>
    )
  },
  {
    id: 'changelog',
    title: 'Changelog',
    category: 'Developers',
    icon: <Hash size={18} />,
    searchContext: "updates version history smart search docs gemini 3.0 integration export tools bolt lovable kindly intelligence api v1",
    content: (
        <div className="space-y-8">
            <div className="relative pl-6 border-l-2 border-gray-100">
                <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-white"></div>
                <div className="text-sm text-gray-400 mb-1">v3.0.0 • Today</div>
                <h4 className="font-bold text-gray-900 mb-2">Kindly Intelligence v1</h4>
                <p className="text-sm text-gray-600">Released the standalone Kindly Intelligence API. Updated Ask Kindly panel to use the new /process endpoint for faster, specialized text operations. Added Image Generation capabilities.</p>
            </div>
            <div className="relative pl-6 border-l-2 border-gray-100">
                <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-gray-300 ring-4 ring-white"></div>
                <div className="text-sm text-gray-400 mb-1">v2.1.0 • Last Week</div>
                <h4 className="font-bold text-gray-900 mb-2">Smart Search & Docs</h4>
                <p className="text-sm text-gray-600">Introduced "Ask Kindly Intelligence" smart search across the app.</p>
            </div>
            <div className="relative pl-6 border-l-2 border-gray-100">
                <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-gray-300 ring-4 ring-white"></div>
                <div className="text-sm text-gray-400 mb-1">v2.0.0 • 2 Weeks Ago</div>
                <h4 className="font-bold text-gray-900 mb-2">Gemini 3.0 Integration</h4>
                <p className="text-sm text-gray-600">Upgraded core generation engine to Gemini 3.0 Flash.</p>
            </div>
        </div>
    )
  }
];

export const DocsView: React.FC<DocsViewProps> = ({ onBack }) => {
  const [activeSectionId, setActiveSectionId] = useState('intro');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<DocSection[]>([]);

  const activeSection = useMemo(() => 
    SECTIONS.find(s => s.id === activeSectionId) || SECTIONS[0], 
  [activeSectionId]);

  // --- Smart Search Logic ---
  useEffect(() => {
    if (!searchQuery.trim()) {
        setSearchResults([]);
        setIsSearching(false);
        return;
    }

    setIsSearching(true);
    const timer = setTimeout(() => {
        const terms = searchQuery.toLowerCase().split(/\s+/).filter(Boolean);
        
        const scoredResults = SECTIONS.map(section => {
            let score = 0;
            const title = section.title.toLowerCase();
            const category = section.category.toLowerCase();
            const context = section.searchContext.toLowerCase();

            // Scoring Algorithm
            terms.forEach(term => {
                if (title.includes(term)) score += 10;          // Highest priority for title match
                if (category.includes(term)) score += 5;        // Medium priority for category
                if (context.includes(term)) score += 2;         // Lower priority for context keywords
                if (title.startsWith(term)) score += 5;         // Bonus for starting with term
            });

            return { section, score };
        })
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(item => item.section);

        setSearchResults(scoredResults);
        setIsSearching(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchSelect = (id: string) => {
      setActiveSectionId(id);
      setSearchQuery('');
      setSearchResults([]);
  };

  const NavGroup = ({ category }: { category: string }) => (
      <div className="mb-6">
          <div className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">{category}</div>
          <nav className="space-y-0.5">
              {SECTIONS.filter(s => s.category === category).map(section => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSectionId(section.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors text-left ${
                        activeSectionId === section.id 
                        ? 'bg-gray-200/50 text-gray-900 font-medium' 
                        : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                      <span className={activeSectionId === section.id ? 'text-gray-900' : 'text-gray-400'}>
                        {section.icon}
                      </span>
                      <span className="text-sm">{section.title}</span>
                  </button>
              ))}
          </nav>
      </div>
  );

  return (
    <div className="w-full h-full bg-[#F8F9FB] text-[#111827] font-sans flex overflow-hidden">
      
      {/* --- SIDEBAR --- */}
      <div className="w-64 bg-[#F8F9FB] border-r border-gray-200 flex-col hidden md:flex shrink-0">
         <div className="p-5 flex items-center gap-2 cursor-pointer" onClick={onBack}>
            <img src="https://iili.io/f8yBZN9.png" alt="Kindly" className="w-6 h-6 object-contain" />
            <span className="font-bold text-gray-900 tracking-tight">KindlyDocs</span>
         </div>

         <div className="flex-1 overflow-y-auto px-3 py-2">
            <NavGroup category="Start" />
            <NavGroup category="Core" />
            <NavGroup category="Developers" />
         </div>

         <div className="p-4 border-t border-gray-200">
             <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors w-full px-2 py-2 rounded-lg hover:bg-gray-100">
                 <ArrowLeft size={16} />
                 <span>Back to App</span>
             </button>
         </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col h-full bg-white md:rounded-tl-[32px] md:shadow-[-10px_-10px_30px_rgba(0,0,0,0.02)] overflow-hidden relative">
         
         {/* Top Bar / Search Header */}
         <div className="h-20 border-b border-gray-100 flex items-center px-6 md:px-10 gap-6 bg-white/80 backdrop-blur-md z-20 sticky top-0">
             
             {/* Mobile Back */}
             <button onClick={onBack} className="md:hidden text-gray-500">
                 <ArrowLeft size={20} />
             </button>

             {/* The "Ask Kindly Intelligence" Search Bar */}
             <div className="flex-1 max-w-2xl relative group">
                 <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                     <img src="https://iili.io/f8yBZN9.png" alt="AI" className="w-5 h-5 object-contain opacity-50 grayscale group-focus-within:grayscale-0 group-focus-within:opacity-100 transition-all" />
                 </div>
                 <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-100 focus:bg-white focus:border-gray-300 hover:bg-gray-100 rounded-full py-3 pl-12 pr-12 text-sm outline-none transition-all placeholder-gray-400 shadow-sm focus:shadow-md"
                    placeholder="Search documentation..."
                 />
                 <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                     {isSearching ? (
                         <div className="w-4 h-4 border-2 border-gray-200 border-t-gray-400 rounded-full animate-spin"></div>
                     ) : (
                         <span className="text-xs text-gray-300 font-medium">⌘K</span>
                     )}
                 </div>

                 {/* Smart Search Results Dropdown */}
                 {searchQuery && (
                     <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in-up p-2 z-50">
                         {searchResults.length > 0 ? (
                             <>
                                <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                    <Sparkles size={12} className="text-purple-500" />
                                    Kindly Intelligence Result
                                </div>
                                {searchResults.map(result => (
                                    <div 
                                        key={result.id} 
                                        onClick={() => handleSearchSelect(result.id)}
                                        className="p-3 hover:bg-gray-50 rounded-xl cursor-pointer group flex items-center gap-3 transition-colors"
                                    >
                                        <div className="text-gray-400 group-hover:text-blue-500">{result.icon}</div>
                                        <div>
                                            <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors text-sm">{result.title}</div>
                                            <div className="text-[10px] text-gray-400 uppercase">{result.category}</div>
                                        </div>
                                        <ChevronRight size={14} className="ml-auto text-gray-300 group-hover:text-blue-400" />
                                    </div>
                                ))}
                             </>
                         ) : (
                             <div className="p-8 text-center text-gray-400 text-sm">
                                 No answers found. Try "design systems" or "api".
                             </div>
                         )}
                     </div>
                 )}
             </div>

             {/* Right Actions */}
             <div className="hidden md:flex items-center gap-4 text-gray-400">
                 <button className="hover:text-gray-600 transition-colors flex items-center gap-1.5 text-sm font-medium">
                    <HelpCircle size={18} />
                    <span>Support</span>
                 </button>
                 <div className="w-px h-4 bg-gray-200"></div>
                 <button className="hover:text-gray-600 transition-colors">
                    <Bell size={18} />
                 </button>
                 <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-100 to-purple-100 border border-white shadow-sm ring-1 ring-gray-100"></div>
             </div>
         </div>

         {/* Scrollable Content Area */}
         <div className="flex-1 overflow-y-auto p-6 md:p-12">
             <div className="max-w-3xl mx-auto animate-fade-in-up">
                 
                 {/* Breadcrumbs */}
                 <div className="flex items-center gap-2 text-xs font-medium text-gray-400 mb-6 uppercase tracking-wider">
                    <span>{activeSection.category}</span>
                    <ChevronRight size={12} />
                    <span className="text-gray-900">{activeSection.title}</span>
                 </div>

                 {/* Title */}
                 <div className="mb-10 pb-8 border-b border-gray-100">
                     <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-gray-100 rounded-2xl text-gray-900">
                            {React.cloneElement(activeSection.icon as React.ReactElement, { size: 32 })}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">{activeSection.title}</h1>
                     </div>
                 </div>

                 {/* Content Body */}
                 <div className="prose prose-lg prose-gray max-w-none">
                     {activeSection.content}
                 </div>

                 {/* Footer Links */}
                 <div className="mt-16 pt-8 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-gray-100 hover:border-gray-300 hover:bg-gray-50 transition-all cursor-pointer group">
                        <div className="text-xs font-bold text-gray-400 uppercase mb-1">Next Reading</div>
                        <div className="font-semibold text-gray-900 group-hover:text-blue-600 flex items-center gap-2">
                            How to Prompt <ArrowLeft className="rotate-180" size={16} />
                        </div>
                    </div>
                    <div className="p-4 rounded-xl border border-gray-100 hover:border-gray-300 hover:bg-gray-50 transition-all cursor-pointer group text-right">
                        <div className="text-xs font-bold text-gray-400 uppercase mb-1">Community</div>
                        <div className="font-semibold text-gray-900 group-hover:text-blue-600 flex items-center justify-end gap-2">
                            Join Discord <ExternalLink size={16} />
                        </div>
                    </div>
                 </div>

             </div>
         </div>
      </div>
    </div>
  );
};
