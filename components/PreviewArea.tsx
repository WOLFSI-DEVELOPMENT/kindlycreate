
import React, { useState, useEffect, useMemo } from 'react';
import { Eye, GitFork, Check, Download, ChevronDown, Copy, Minimize2, Maximize2, Code, Terminal, Sparkles, Monitor, Smartphone, Share, RotateCcw, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Type, Palette, Globe, Loader2, Lock, DollarSign, Mail, Link as LinkIcon, X } from 'lucide-react';
import { PreviewAreaProps } from '../types';
import { RadiantPreview } from './RadiantPreview';
import { PricingSection } from './PricingSection';
import { JellyButton } from './JellyButton';
import { CreepyButton } from './CreepyButton';
import { MixpanelPricing } from './MixpanelPricing';
import { ClickUpCalculator } from './ClickUpCalculator';
import { auth, db } from '../firebase';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// --- CUSTOM SVG ICONS FOR DROPDOWN ---
const CopyIcon = () => <Copy size={16} />;
// ... (Keep existing icon definitions: BlingIcon, ChatGPTIcon, CursorIcon, BoltIcon, V0Icon, LovableIcon, AIStudioIcon, GrokIcon) ...
const BlingIcon = () => (
<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
  <path d="M2 8c4.178346666666666 0 6 -1.75796 6 -6 0 4.242039999999999 1.8089333333333333 6 6 6 -4.191066666666666 0 -6 1.8089333333333333 -6 6 0 -4.191066666666666 -1.8216533333333331 -6 -6 -6Z" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"></path>
</svg>
);

const ChatGPTIcon = () => (
    <svg viewBox="0 0 512 512" width="16" height="16" fill="currentColor" className="text-teal-600">
        <path fillRule="evenodd" clipRule="evenodd" d="M474.123 209.81c11.525-34.577 7.569-72.423-10.838-103.904-27.696-48.168-83.433-72.94-137.794-61.414a127.14 127.14 0 00-95.475-42.49c-55.564 0-104.936 35.781-122.139 88.593-35.781 7.397-66.574 29.76-84.637 61.414-27.868 48.167-21.503 108.72 15.826 150.007-11.525 34.578-7.569 72.424 10.838 103.733 27.696 48.34 83.433 73.111 137.966 61.585 24.084 27.18 58.833 42.835 95.303 42.663 55.564 0 104.936-35.782 122.139-88.594 35.782-7.397 66.574-29.76 84.465-61.413 28.04-48.168 21.676-108.722-15.654-150.008v-.172zm-39.567-87.218c11.01 19.267 15.139 41.803 11.354 63.65-.688-.516-2.064-1.204-2.924-1.72l-101.152-58.49a16.965 16.965 0 00-16.687 0L206.621 194.5v-50.232l97.883-56.597c45.587-26.32 103.732-10.666 130.052 34.921zm-227.935 104.42l49.888-28.9 49.887 28.9v57.63l-49.887 28.9-49.888-28.9v-57.63zm23.223-191.81c22.364 0 43.867 7.742 61.07 22.02-.688.344-2.064 1.204-3.097 1.72L186.666 117.26c-5.161 2.925-8.258 8.43-8.258 14.45v136.934l-43.523-25.116V130.333c0-52.64 42.491-95.13 95.131-95.302l-.172.172zM52.14 168.697c11.182-19.268 28.557-34.062 49.544-41.803V247.14c0 6.02 3.097 11.354 8.258 14.45l118.354 68.295-43.695 25.288-97.711-56.425c-45.415-26.32-61.07-84.465-34.75-130.052zm26.665 220.71c-11.182-19.095-15.139-41.802-11.354-63.65.688.516 2.064 1.204 2.924 1.72l101.152 58.49a16.965 16.965 0 0016.687 0l118.354-68.467v50.232l-97.883 56.425c-45.587 26.148-103.732 10.665-130.052-34.75h.172zm204.54 87.39c-22.192 0-43.867-7.741-60.898-22.02a62.439 62.439 0 003.097-1.72l101.152-58.317c5.16-2.924 8.429-8.43 8.257-14.45V243.527l43.523 25.116v113.022c0 52.64-42.663 95.303-95.131 95.303v-.172zM461.22 343.303c-11.182 19.267-28.729 34.061-49.544 41.63V264.687c0-6.021-3.097-11.526-8.257-14.45L284.893 181.77l43.523-25.116 97.883 56.424c45.587 26.32 61.07 84.466 34.75 130.053l.172.172z"/>
    </svg>
);

const CursorIcon = () => (
    <svg viewBox="0 0 512 512" width="16" height="16" fill="none" className="text-blue-600">
       {/* ... existing SVG content ... */}
       <path d="M0 0h512v512H0z" fill="white" fillOpacity="0" />
       <path d="M176.31 494.743L194.237 325.277L109.919 239.314L436.19 143.729L262.274 442.238L176.31 494.743Z" stroke="currentColor" strokeWidth="40" strokeLinejoin="round"/>
    </svg>
);

const BoltIcon = () => <div className="text-orange-500 font-bold text-xs">⚡</div>;
const V0Icon = () => <div className="text-black font-bold text-xs">v0</div>;
const LovableIcon = () => <div className="text-pink-500 font-bold text-xs">♥</div>;
const AIStudioIcon = () => <div className="text-blue-500 font-bold text-xs">AI</div>;
const GrokIcon = () => <div className="text-gray-800 font-bold text-xs">G</div>;

const SyntaxHighlighter = ({ code }: { code: string }) => {
    // ... existing implementation ...
    const highlightedCode = useMemo(() => {
        if (!code) return null;
        const tokens = code.split(/([<>=" \n])/g);
        return tokens.map((token, index) => {
            if (token === '<' || token === '>' || token === '/>' || token === '</') return <span key={index} className="text-blue-400">{token}</span>;
            if (token.startsWith('"') || token.endsWith('"')) return <span key={index} className="text-orange-300">{token}</span>;
            if (token === '=') return <span key={index} className="text-pink-400">{token}</span>;
            return <span key={index} className="text-gray-300">{token}</span>;
        });
    }, [code]);

    const lines = code ? code.split('\n') : [];

    return (
        <div className="flex font-mono text-xs md:text-sm bg-[#1e1e1e] text-[#d4d4d4] h-full overflow-hidden">
            <div className="flex-shrink-0 flex flex-col items-end px-3 py-4 text-[#858585] bg-[#1e1e1e] border-r border-[#333] select-none min-w-[3rem] text-right">
                {lines.map((_, i) => <div key={i} className="leading-6">{i + 1}</div>)}
            </div>
            <pre className="flex-1 overflow-auto p-4 leading-6 whitespace-pre">{highlightedCode}</pre>
        </div>
    );
};

interface PreviewAreaPropsWithExtensions extends PreviewAreaProps {
    onToggleAskKindly?: () => void;
    isAskKindlyActive?: boolean;
}

export const PreviewArea: React.FC<PreviewAreaPropsWithExtensions> = ({ item, onToggleAskKindly, isAskKindlyActive }) => {
  const [copied, setCopied] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'prompt' | 'readme'>('preview');
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');
  
  // Publishing State
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);
  const [publishForm, setPublishForm] = useState({
      isPaid: false,
      price: '5',
      contactEmail: '',
      portfolioUrl: ''
  });

  const isPrototype = item.type === 'prototype' || item.type === 'dynamic';
  const showVisualTabs = item.type === 'prototype' || item.category === 'Design System' || item.type === 'dynamic';
  const isDynamic = item.type === 'dynamic';
  const isLocked = item.isPaid; // If the item is marked as paid/locked

  // Load user email into form
  useEffect(() => {
      const user = auth.currentUser;
      if (user?.email) {
          setPublishForm(prev => ({ ...prev, contactEmail: user.email || '' }));
      }
  }, [showPublishModal]);

  useEffect(() => {
    if (showVisualTabs) setActiveTab('preview');
    else setActiveTab('prompt');
    setPublished(false);
  }, [item.id, showVisualTabs]); 

  const handleCopy = () => {
    // Prevent copying if locked
    if (isLocked) { alert("This is a paid component. Please purchase to access source code."); return; }

    let textToCopy = '';
    if (activeTab === 'prompt') textToCopy = item.systemPrompt;
    else if (activeTab === 'code') textToCopy = item.code || '';
    else if (activeTab === 'readme') textToCopy = item.readme || '';
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = () => {
    if (isLocked) { alert("This is a paid component. Please purchase to download."); return; }
    // ... existing download logic ...
    let textToDownload = item.code || '';
    if (!textToDownload) return;
    const blob = new Blob([textToDownload], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${item.id}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePublishClick = () => {
      const user = auth.currentUser;
      if (!user) { alert("You must be logged in to publish."); return; }
      setShowPublishModal(true);
  };

  const confirmPublish = async () => {
      const user = auth.currentUser;
      if (!user) return;

      setPublishing(true);
      try {
          await addDoc(collection(db, "community_prompts"), {
              ...item,
              authorId: user.uid,
              authorName: user.displayName || 'Anonymous',
              authorPhoto: user.photoURL,
              publishedAt: Date.now(),
              id: item.id || `pub-${Date.now()}`,
              views: 0,
              copies: 0,
              // Commerce fields
              isPaid: publishForm.isPaid,
              price: publishForm.isPaid ? publishForm.price : null,
              contactEmail: publishForm.contactEmail,
              portfolioUrl: publishForm.portfolioUrl
          });
          setPublished(true);
          setShowPublishModal(false);
      } catch (e) {
          console.error("Error publishing:", e);
          alert("Failed to publish.");
      } finally {
          setPublishing(false);
      }
  };

  const renderComponent = () => {
    // If locked and not the owner (simple check, ideally check auth id vs author id)
    // For now, if item.isPaid is true, we block code view and show watermark on preview
    
    // Generated Code Preview
    if (item.code) {
        const srcDoc = item.code.trim().startsWith('<!DOCTYPE html>') || item.code.trim().startsWith('<html')
            ? item.code 
            : `<html><head><script src="https://cdn.tailwindcss.com"></script></head><body class="bg-gray-50 flex items-center justify-center min-h-screen p-4">${item.code}</body></html>`;

       return (
         <div className="relative w-full h-full">
             <iframe
                title="Live Preview"
                className={`w-full h-full border-none bg-white ${isLocked ? 'blur-sm pointer-events-none' : ''}`}
                sandbox="allow-scripts allow-same-origin"
                srcDoc={srcDoc}
             />
             {isLocked && (
                 <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/5 z-10 backdrop-blur-sm">
                     <div className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-sm border border-gray-200">
                         <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                             <Lock size={32} />
                         </div>
                         <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium Component</h3>
                         <div className="text-4xl font-bold text-gray-900 mb-4">${item.price}</div>
                         <p className="text-gray-500 mb-6 text-sm">Purchase this component to access the source code and prompt.</p>
                         <div className="space-y-3">
                             <a href={`mailto:${item.contactEmail}?subject=Purchase Request: ${item.title}`} className="block w-full py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-colors">
                                 Buy Now
                             </a>
                             {item.portfolioUrl && (
                                 <a href={item.portfolioUrl} target="_blank" rel="noreferrer" className="block w-full py-3 bg-white border border-gray-200 text-gray-900 rounded-xl font-bold hover:bg-gray-50 transition-colors">
                                     View Portfolio
                                 </a>
                             )}
                         </div>
                     </div>
                 </div>
             )}
         </div>
       );
    }
    
    return <div className="p-10 text-center text-gray-400">Preview not available</div>;
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white md:bg-gray-50/50 overflow-hidden relative">
      
      {/* Floating Toolbar */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 p-1.5 bg-white rounded-full shadow-lg border border-gray-200">
          
          {/* View Modes */}
          <div className="flex items-center gap-1">
                {showVisualTabs && (
                    <>
                        <button 
                            onClick={() => setDeviceMode('desktop')}
                            className={`p-2 rounded-full transition-all ${deviceMode === 'desktop' ? 'bg-white text-black shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                            title="Desktop"
                        >
                            <Monitor size={16} />
                        </button>
                        <button 
                            onClick={() => setDeviceMode('mobile')}
                            className={`p-2 rounded-full transition-all ${deviceMode === 'mobile' ? 'bg-white text-black shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                            title="Mobile"
                        >
                            <Smartphone size={16} />
                        </button>
                        <div className="w-px h-4 bg-gray-200 mx-1"></div>
                        <button 
                            onClick={() => setActiveTab('preview')} 
                            className={`p-2 rounded-full transition-all ${activeTab === 'preview' ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                            title="Canvas"
                        >
                            <Eye size={16} />
                        </button>
                        <button 
                            onClick={() => setActiveTab('code')} 
                            className={`p-2 rounded-full transition-all ${activeTab === 'code' ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                            title="Code"
                        >
                            {isLocked ? <Lock size={16} /> : <Code size={16} />}
                        </button>
                    </>
                )}
          </div>

          <div className="w-px h-4 bg-gray-200 mx-1"></div>

          {/* Actions */}
          <div className="flex items-center gap-1 relative">
                {/* Publish Button */}
                {(item.systemPrompt || item.code) && !published && !isLocked && (
                    <button
                        onClick={handlePublishClick}
                        className={`p-2 rounded-full transition-all text-gray-500 hover:bg-blue-50 hover:text-blue-600`}
                        title="Publish to Community"
                    >
                        <Globe size={16} />
                    </button>
                )}
                
                {/* Actions that might be blocked if locked */}
                <button onClick={handleCopy} className="p-2 rounded-full text-gray-500 hover:bg-gray-100">
                    {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                </button>
                <button onClick={handleDownload} className="p-2 rounded-full text-gray-500 hover:bg-gray-100">
                    <Download size={16} />
                </button>
          </div>
      </div>

      {/* Content */}
      <div className={`flex-1 overflow-auto relative bg-white transition-all duration-300 ${deviceMode === 'mobile' && activeTab === 'preview' ? 'flex justify-center items-center bg-gray-100' : ''}`}>
        
        {activeTab === 'preview' && showVisualTabs && (
           <div className={`transition-all duration-300 ${deviceMode === 'mobile' ? 'w-[375px] h-[667px] rounded-3xl overflow-hidden border-8 border-gray-900 shadow-2xl bg-white' : 'w-full h-full bg-white'}`}>
               {renderComponent()}
           </div>
        )}
        
        {activeTab === 'code' && showVisualTabs && (
            isLocked ? (
                <div className="flex flex-col items-center justify-center h-full bg-[#1e1e1e] text-gray-400">
                    <Lock size={48} className="mb-4 text-gray-600" />
                    <p>Source code is hidden for premium components.</p>
                </div>
            ) : (
                <SyntaxHighlighter code={item.code || '// No code generated yet'} />
            )
        )}

        {/* Prompt View */}
        {activeTab === 'prompt' && !isPrototype && (
          <div className="w-full h-full flex flex-col items-center pt-24 px-6 md:px-20 bg-white overflow-y-auto">
             <div className="max-w-4xl w-full pb-20">
                 {isLocked ? (
                     <div className="text-center text-gray-400">
                         <Lock size={48} className="mx-auto mb-4" />
                         <p>Prompt is hidden for premium components.</p>
                     </div>
                 ) : (
                     <pre className="whitespace-pre-wrap font-sans text-gray-800 text-lg leading-relaxed">
                        {item.systemPrompt}
                     </pre>
                 )}
             </div>
          </div>
        )}
      </div>

      {/* Publish Modal */}
      {showPublishModal && (
          <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
              <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden relative">
                  <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                      <h3 className="text-xl font-bold text-gray-900">Publish to Community</h3>
                      <button onClick={() => setShowPublishModal(false)} className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 text-gray-500"><X size={18} /></button>
                  </div>
                  
                  <div className="p-6 space-y-6">
                      <div className="p-4 bg-blue-50 text-blue-700 rounded-xl text-sm leading-relaxed">
                          Your component will be visible to everyone in the Community Library. You can choose to make it free or charge for access.
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                          <button 
                            onClick={() => setPublishForm(p => ({...p, isPaid: false}))}
                            className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${!publishForm.isPaid ? 'border-black bg-gray-50' : 'border-gray-100 hover:border-gray-200'}`}
                          >
                              <Globe size={24} className={!publishForm.isPaid ? 'text-black' : 'text-gray-400'} />
                              <span className={`font-bold ${!publishForm.isPaid ? 'text-black' : 'text-gray-500'}`}>Free & Open</span>
                          </button>
                          <button 
                            onClick={() => setPublishForm(p => ({...p, isPaid: true}))}
                            className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${publishForm.isPaid ? 'border-black bg-gray-50' : 'border-gray-100 hover:border-gray-200'}`}
                          >
                              <DollarSign size={24} className={publishForm.isPaid ? 'text-black' : 'text-gray-400'} />
                              <span className={`font-bold ${publishForm.isPaid ? 'text-black' : 'text-gray-500'}`}>Paid & Locked</span>
                          </button>
                      </div>

                      {publishForm.isPaid && (
                          <div className="animate-fade-in">
                              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Price ($)</label>
                              <div className="relative">
                                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                  <input 
                                    type="number" 
                                    value={publishForm.price} 
                                    onChange={e => setPublishForm(p => ({...p, price: e.target.value}))}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-8 pr-4 py-3 outline-none focus:border-black transition-colors" 
                                  />
                              </div>
                          </div>
                      )}

                      <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Contact Email {publishForm.isPaid && <span className="text-red-500">*</span>}</label>
                          <div className="relative">
                              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                              <input 
                                type="email" 
                                value={publishForm.contactEmail} 
                                onChange={e => setPublishForm(p => ({...p, contactEmail: e.target.value}))}
                                placeholder="For inquiries or purchase"
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 outline-none focus:border-black transition-colors" 
                              />
                          </div>
                      </div>

                      <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Portfolio Website (Optional)</label>
                          <div className="relative">
                              <LinkIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                              <input 
                                type="url" 
                                value={publishForm.portfolioUrl} 
                                onChange={e => setPublishForm(p => ({...p, portfolioUrl: e.target.value}))}
                                placeholder="https://your-portfolio.com"
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 outline-none focus:border-black transition-colors" 
                              />
                          </div>
                      </div>
                  </div>

                  <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
                      <button onClick={() => setShowPublishModal(false)} className="px-5 py-2.5 text-gray-500 hover:text-gray-900 font-medium transition-colors">Cancel</button>
                      <button 
                        onClick={confirmPublish}
                        disabled={publishing}
                        className="px-8 py-2.5 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg active:scale-95 flex items-center gap-2"
                      >
                          {publishing ? <Loader2 size={16} className="animate-spin" /> : 'Publish Now'}
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};
