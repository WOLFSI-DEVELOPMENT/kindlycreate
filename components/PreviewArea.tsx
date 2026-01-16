
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Eye, GitFork, Check, Download, ChevronDown, Copy, Minimize2, Maximize2, Code, Terminal, Sparkles, Monitor, Smartphone, Share, RotateCcw, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Type, Palette, Globe, Loader2, Lock, DollarSign, Mail, Link as LinkIcon, X, ExternalLink } from 'lucide-react';
import { PreviewAreaProps } from '../types';
import { RadiantPreview } from './RadiantPreview';
import { PricingSection } from './PricingSection';
import { JellyButton } from './JellyButton';
import { CreepyButton } from './CreepyButton';
import { MixpanelPricing } from './MixpanelPricing';
import { ClickUpCalculator } from './ClickUpCalculator';
import { auth, db } from '../firebase';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Custom Icons
const BoltIcon = () => <div className="text-orange-500 font-bold text-xs">⚡</div>;
const V0Icon = () => <div className="text-black font-bold text-xs">v0</div>;
const ChatGPTIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
    <path d="M12 2a10 10 0 1 0 10 10H12V2Z" />
    <path d="M12 12 2 12" />
    <path d="M12 12 12 22" />
  </svg>
);

// ... (Keep SyntaxHighlighter) ...
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
  const [copiedCode, setCopiedCode] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
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

  const exportRef = useRef<HTMLDivElement>(null);

  const isPrototype = item.type === 'prototype' || item.type === 'dynamic';
  const showVisualTabs = item.type === 'prototype' || item.category === 'Design System' || item.type === 'dynamic';
  const isLocked = item.isPaid; 

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

  // Click outside export
  useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
          if (exportRef.current && !exportRef.current.contains(event.target as Node)) {
              setExportOpen(false);
          }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCopyPrompt = (text: string) => {
    if (isLocked) { alert("This is a paid component."); return; }
    navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleCopyCode = (text: string) => {
    if (isLocked) { alert("This is a paid component."); return; }
    navigator.clipboard.writeText(text).then(() => {
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
    });
  };

  const handleExport = (platform: 'bolt' | 'v0' | 'chatgpt') => {
      const prompt = encodeURIComponent(item.systemPrompt);
      if (platform === 'bolt') window.open(`https://bolt.new/?prompt=${prompt}`, '_blank');
      if (platform === 'v0') window.open(`https://v0.dev/?q=${prompt}`, '_blank');
      if (platform === 'chatgpt') window.open(`https://chatgpt.com/?q=${prompt}`, '_blank');
      setExportOpen(false);
  };

  const handleDownload = () => {
    if (isLocked) { alert("This is a paid component. Please purchase to download."); return; }
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

  const hasViewControls = showVisualTabs;
  const hasActions = true;

  return (
    <div className="flex-1 flex flex-col h-full bg-white md:bg-gray-50/50 overflow-hidden relative">
      
      {/* Floating Toolbar */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 flex items-center p-1.5 bg-white rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-200/60 backdrop-blur-xl transition-all hover:scale-[1.01]">
          
          {/* Ask Kindly Toggle */}
          {onToggleAskKindly && (
              <div className="flex items-center px-1">
                <button
                    onClick={onToggleAskKindly}
                    className={`p-2 rounded-full transition-all duration-200 ${isAskKindlyActive ? 'bg-indigo-50 text-indigo-600 shadow-sm ring-1 ring-indigo-100' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'}`}
                    title={isAskKindlyActive ? "Close Ask Kindly" : "Open Ask Kindly"}
                >
                    <Sparkles size={18} className={isAskKindlyActive ? "fill-indigo-600" : ""} />
                </button>
              </div>
          )}

          {/* Divider 1 */}
          {onToggleAskKindly && (hasViewControls || hasActions) && (
              <div className="w-px h-5 bg-gray-200 mx-1.5"></div>
          )}

          {/* View Modes */}
          {hasViewControls && (
              <>
                {/* Device Toggles - Only show in Preview Tab */}
                {activeTab === 'preview' && (
                    <div className="flex items-center gap-1 bg-gray-100/80 p-1 rounded-full mr-2">
                        <button 
                            onClick={() => setDeviceMode('desktop')}
                            className={`p-1.5 rounded-full transition-all ${deviceMode === 'desktop' ? 'bg-white shadow text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                            title="Desktop View"
                        >
                            <Monitor size={14} />
                        </button>
                        <button 
                            onClick={() => setDeviceMode('mobile')}
                            className={`p-1.5 rounded-full transition-all ${deviceMode === 'mobile' ? 'bg-white shadow text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                            title="Mobile View"
                        >
                            <Smartphone size={14} />
                        </button>
                    </div>
                )}

                {/* Tab Switcher */}
                <div className="flex items-center bg-gray-100/80 p-1 rounded-full">
                     <button 
                        onClick={() => setActiveTab('preview')} 
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${activeTab === 'preview' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                     >
                        <Eye size={14} /> Canvas
                     </button>
                     <button 
                        onClick={() => setActiveTab('code')} 
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${activeTab === 'code' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                     >
                        <Code size={14} /> Code
                     </button>
                </div>
              </>
          )}

          {/* Divider 2 */}
          {hasViewControls && hasActions && (
              <div className="w-px h-5 bg-gray-200 mx-2"></div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-1 px-1 relative">
                {/* Publish Button */}
                {(item.systemPrompt || item.code) && !published && !isLocked && (
                    <button
                        onClick={handlePublishClick}
                        className={`p-2 rounded-full transition-all text-gray-400 hover:bg-blue-50 hover:text-blue-600`}
                        title="Publish to Community"
                    >
                        <Globe size={18} />
                    </button>
                )}
                
                {/* Dedicated Export Dropdown */}
                <div className="relative" ref={exportRef}>
                    <button 
                        onClick={() => setExportOpen(!exportOpen)}
                        className={`p-2 rounded-full transition-all ${exportOpen ? 'bg-gray-100 text-black' : 'text-gray-400 hover:bg-gray-100 hover:text-gray-900'}`}
                        title="Export"
                    >
                        <Share size={18} />
                    </button>
                    {exportOpen && (
                        <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in-up z-50">
                            <div className="p-1">
                                <button onClick={() => handleCopyPrompt(item.systemPrompt)} className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-gray-50 text-sm text-gray-700 flex items-center gap-2 transition-colors">
                                    {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />} Copy Prompt
                                </button>
                                {item.code && (
                                    <button onClick={() => handleCopyCode(item.code || '')} className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-gray-50 text-sm text-gray-700 flex items-center gap-2 transition-colors">
                                        {copiedCode ? <Check size={14} className="text-green-600" /> : <Code size={14} />} Copy Code
                                    </button>
                                )}
                                <div className="h-px bg-gray-100 my-1"></div>
                                <button onClick={() => handleExport('bolt')} className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-gray-50 text-sm text-gray-700 flex items-center gap-2 transition-colors">
                                    <BoltIcon /> Open in Bolt
                                </button>
                                <button onClick={() => handleExport('v0')} className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-gray-50 text-sm text-gray-700 flex items-center gap-2 transition-colors">
                                    <V0Icon /> Open in v0
                                </button>
                                <button onClick={() => handleExport('chatgpt')} className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-gray-50 text-sm text-gray-700 flex items-center gap-2 transition-colors">
                                    <ChatGPTIcon /> Open in ChatGPT
                                </button>
                                <div className="h-px bg-gray-100 my-1"></div>
                                <button onClick={handleDownload} className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-gray-50 text-sm text-gray-700 flex items-center gap-2 transition-colors">
                                    <Download size={14} /> Download HTML
                                </button>
                            </div>
                        </div>
                    )}
                </div>
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
