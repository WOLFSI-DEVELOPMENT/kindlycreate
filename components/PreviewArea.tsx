
import React, { useState, useEffect, useMemo } from 'react';
import { Eye, GitFork, Check, Download, ChevronDown, Copy, Minimize2, Maximize2, Code, Terminal, Sparkles, Monitor, Smartphone, Share, RotateCcw } from 'lucide-react';
import { PreviewAreaProps } from '../types';
import { RadiantPreview } from './RadiantPreview';
import { PricingSection } from './PricingSection';
import { JellyButton } from './JellyButton';
import { CreepyButton } from './CreepyButton';
import { MixpanelPricing } from './MixpanelPricing';
import { ClickUpCalculator } from './ClickUpCalculator';

// --- CUSTOM SVG ICONS FOR DROPDOWN ---
const CopyIcon = () => <Copy size={16} />;

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
        <g clipPath="url(#prefix__clip0_5_17)">
            <rect width="512" height="512" rx="122" fill="#000"/>
            <g clipPath="url(#prefix__clip1_5_17)">
                <mask id="prefix__a" style={{maskType:"luminance"}} maskUnits="userSpaceOnUse" x="85" y="89" width="343" height="334">
                    <path d="M85 89h343v334H85V89z" fill="#fff"/>
                </mask>
                <g mask="url(#prefix__a)">
                    <path d="M255.428 423l148.991-83.5L255.428 256l-148.99 83.5 148.99 83.5z" fill="url(#prefix__paint0_linear_5_17)"/>
                    <path d="M404.419 339.5v-167L255.428 89v167l148.991 83.5z" fill="url(#prefix__paint1_linear_5_17)"/>
                    <path d="M255.428 89l-148.99 83.5v167l148.99-83.5V89z" fill="url(#prefix__paint2_linear_5_17)"/>
                    <path d="M404.419 172.5L255.428 423V256l148.991-83.5z" fill="#E4E4E4"/>
                    <path d="M404.419 172.5L255.428 256l-148.99-83.5h297.981z" fill="#fff"/>
                </g>
            </g>
        </g>
        <defs>
            <linearGradient id="prefix__paint0_linear_5_17" x1="255.428" y1="256" x2="255.428" y2="423" gradientUnits="userSpaceOnUse"><stop offset=".16" stopColor="#fff" stopOpacity=".39"/><stop offset=".658" stopColor="#fff" stopOpacity=".8"/></linearGradient>
            <linearGradient id="prefix__paint1_linear_5_17" x1="404.419" y1="173.015" x2="257.482" y2="261.497" gradientUnits="userSpaceOnUse"><stop offset=".182" stopColor="#fff" stopOpacity=".31"/><stop offset=".715" stopColor="#fff" stopOpacity="0"/></linearGradient>
            <linearGradient id="prefix__paint2_linear_5_17" x1="255.428" y1="89" x2="112.a292" y2="342.802" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" stopOpacity=".6"/><stop offset=".667" stopColor="#fff" stopOpacity=".22"/></linearGradient>
            <clipPath id="prefix__clip0_5_17"><path fill="#fff" d="M0 0h512v512H0z"/></clipPath>
            <clipPath id="prefix__clip1_5_17"><path fill="#fff" transform="translate(85 89)" d="M0 0h343v334H0z"/></clipPath>
        </defs>
    </svg>
);

const GrokIcon = () => (
    <svg viewBox="0 0 512 492" width="16" height="16" fill="none" className="text-black">
        <path fillRule="evenodd" clipRule="evenodd" d="M197.76 315.52l170.197-125.803c8.342-6.186 20.267-3.776 24.256 5.803 20.907 50.539 11.563 111.253-30.08 152.939-41.621 41.685-99.562 50.816-152.512 29.994l-57.834 26.816c82.965 56.768 183.701 42.731 246.656-20.33 49.941-50.006 65.408-118.166 50.944-179.627l.128.149c-20.971-90.282 5.162-126.378 58.666-200.17 1.28-1.75 2.56-3.499 3.819-5.291l-70.421 70.507v-.214l-243.883 245.27m-35.072 30.528c-59.563-56.96-49.28-145.088 1.515-195.926 37.568-37.61 99.136-52.97 152.874-30.4l57.707-26.666a166.554 166.554 0 00-39.019-21.334 191.467 191.467 0 00-208.042 41.942c-54.038 54.101-71.04 137.301-41.856 208.298 21.802 53.056-13.931 90.582-49.92 128.47C23.104 463.915 10.304 477.333 0 491.541l162.56-145.386" fill="currentColor"/>
    </svg>
);

const BoltIcon = () => (
    <svg viewBox="0 0 512 512" width="16" height="16" fill="currentColor" className="text-orange-500">
        <path d="M505.998 130.999v250c0 69-56 124.999-125 124.999h-250C62 505.998 6 449.998 6 380.998v-250C6 62 62 6 131 6h250c69 0 124.999 56 124.999 125z" fill="currentColor" fillOpacity="0.1" />
        <path d="M276.124 373.905c-22.625 0-44.844-8.063-57.594-25.438l-4.5 20.469-83.031 43.312 8.969-43.312 60.468-269.187h74.031l-21.375 94.875c17.25-18.563 33.313-25.438 53.875-25.438 44.406 0 74.031 28.688 74.031 81.156 0 54.125-34.125 123.563-104.874 123.563zm28.374-108.219c0 25.031-18.093 44.031-41.562 44.031-13.156 0-25.062-4.844-32.875-13.344l11.5-49.656c8.625-8.468 18.5-13.312 30.031-13.312 17.688 0 32.906 12.906 32.906 32.281z" />
    </svg>
);

const V0Icon = () => (
    <svg viewBox="0 0 512 512" width="16" height="16" fill="currentColor" className="text-black">
        <path d="M304.043 176h119.979c1.877 0 3.754.128 5.546.384L304.341 301.611a38.55 38.55 0 01-.405-5.654V176h-48V295.98c0 48.256 39.723 87.979 87.979 87.979h120v-48H343.936c-1.92 0-3.818-.128-5.653-.384L463.595 210.24a40.03 40.03 0 01.427 5.76v119.958H512v-119.98C512 167.724 472.278 128 424.022 128h-119.98v48zM0 160v.128l163.968 208.81c19.712 25.089 60.01 11.158 60.01-20.756V160H176v146.56L60.928 160H0z"/>
    </svg>
);

const LovableIcon = () => (
    <svg viewBox="0 0 512 512" width="16" height="16" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M151.083 0c83.413 0 151.061 67.819 151.061 151.467v57.6h50.283c83.413 0 151.082 67.797 151.082 151.466 0 83.691-67.626 151.467-151.082 151.467H0V151.467C0 67.84 67.627 0 151.083 0z" fill="url(#lovable_paint0_radial)"/>
        <defs>
            <radialGradient id="lovable_paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(92.545 118.724 174.844) scale(480.474 650.325)">
                <stop offset=".25" stopColor="#FE7B02"/>
                <stop offset=".433" stopColor="#FE4230"/>
                <stop offset=".548" stopColor="#FE529A"/>
                <stop offset=".654" stopColor="#DD67EE"/>
                <stop offset=".95" stopColor="#4B73FF"/>
            </radialGradient>
        </defs>
    </svg>
);

const AIStudioIcon = () => (
    <svg viewBox="0 0 512 512" width="16" height="16" fill="none">
        <g clipPath="url(#aistudio_clip0)" fillRule="evenodd" clipRule="evenodd" fill="#000">
            <path d="M211.648 89.515h-76.651A57.707 57.707 0 0077.291 147.2v242.389a57.707 57.707 0 0057.706 57.707h242.411a57.707 57.707 0 0057.707-57.707V288.128l34.624-23.744v125.227a92.35 92.35 0 01-92.331 92.33H134.997a92.349 92.349 0 01-92.33-92.33v-242.39A92.336 92.336 0 0169.702 81.92a92.33 92.33 0 0165.295-27.05h96.96l-20.309 34.645z"/>
            <path d="M380.16 0c3.093 0 5.717 2.219 6.379 5.248a149.328 149.328 0 0040.533 74.325 149.332 149.332 0 0074.347 40.555c3.029.661 5.248 3.285 5.248 6.4a6.574 6.574 0 01-5.248 6.357 149.338 149.338 0 00-74.326 40.555 149.338 149.338 0 00-40.789 75.413 6.334 6.334 0 01-6.144 5.078 6.334 6.334 0 01-6.144-5.078 149.338 149.338 0 00-40.789-75.413 149.326 149.326 0 00-75.414-40.789 6.338 6.338 0 01-5.077-6.144c0-2.987 2.133-5.547 5.077-6.144a149.336 149.336 0 0075.414-40.79 149.354 149.354 0 0040.554-74.325A6.573 6.573 0 01380.16 0z"/>
        </g>
        <defs>
            <clipPath id="aistudio_clip0"><path fill="#fff" d="M0 0h512v512H0z"/></clipPath>
        </defs>
    </svg>
);

const SyntaxHighlighter = ({ code }: { code: string }) => {
    // A simple tokenizer to colorize HTML/Tailwind
    const highlightedCode = useMemo(() => {
        const tokens = code.split(/([<>=" \n])/g);
        
        return tokens.map((token, index) => {
            if (token === '<' || token === '>' || token === '/>' || token === '</') {
                return <span key={index} className="text-blue-400">{token}</span>;
            }
            if (token.startsWith('"') || token.endsWith('"')) {
                return <span key={index} className="text-orange-300">{token}</span>;
            }
            if (token === '=') {
                return <span key={index} className="text-pink-400">{token}</span>;
            }
            if (['div', 'span', 'button', 'input', 'head', 'body', 'html', 'script', 'style', 'link', 'h1', 'h2', 'h3', 'p', 'ul', 'li', 'a', 'label', 'svg', 'path', 'circle', 'line', 'polyline', 'polygon', 'rect', 'defs', 'clipPath', 'g', 'mask', 'linearGradient', 'stop'].includes(token)) {
                return <span key={index} className="text-blue-300">{token}</span>;
            }
            if (token.trim().startsWith('<!--')) {
                return <span key={index} className="text-green-600">{token}</span>;
            }
            return <span key={index} className="text-gray-300">{token}</span>;
        });
    }, [code]);

    const lines = code.split('\n');

    return (
        <div className="flex font-mono text-xs md:text-sm bg-[#1e1e1e] text-[#d4d4d4] h-full overflow-hidden">
            {/* Line Numbers */}
            <div className="flex-shrink-0 flex flex-col items-end px-3 py-4 text-[#858585] bg-[#1e1e1e] border-r border-[#333] select-none min-w-[3rem] text-right">
                {lines.map((_, i) => (
                    <div key={i} className="leading-6">{i + 1}</div>
                ))}
            </div>
            {/* Code Content */}
            <pre className="flex-1 overflow-auto p-4 leading-6 whitespace-pre">
                {highlightedCode}
            </pre>
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

  // If item changes and has no code, force prompt view (or readme if prompted)
  useEffect(() => {
    // If it's a design system, we now have code, so we default to preview
    if (item.category === 'Design System') {
        setActiveTab('preview');
        return;
    }
    
    if (!item.code && item.systemPrompt) {
        setActiveTab('prompt');
    } else if (item.code) {
        setActiveTab('preview');
    }
  }, [item]);

  const handleCopy = () => {
    let textToCopy = '';
    if (activeTab === 'prompt') textToCopy = item.systemPrompt;
    else if (activeTab === 'code') textToCopy = item.code || '';
    else if (activeTab === 'readme') textToCopy = item.readme || '';
    
    if (!textToCopy) return;
    
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => console.error('Failed to copy:', err));
  };

  const handleDownload = () => {
    let textToDownload = '';
    let fileName = '';

    if (activeTab === 'prompt') {
        textToDownload = item.systemPrompt;
        fileName = `${item.id}-prompt.txt`;
    } else if (activeTab === 'code') {
        textToDownload = item.code || '';
        fileName = `${item.id}-code.html`;
    } else if (activeTab === 'readme') {
        textToDownload = item.readme || '';
        fileName = `README.md`;
    }

    if (!textToDownload) return;

    const blob = new Blob([textToDownload], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const openUrl = (urlTemplate: string) => {
    const url = urlTemplate.replace(/\{YOUR_PROMPT(_HERE)?\}/g, encodeURIComponent(item.systemPrompt));
    window.open(url, '_blank');
    setDropdownOpen(false);
  };

  const renderComponent = () => {
    switch (item.id) {
      case 'radiant-input': return <RadiantPreview />;
      case 'pricing-section': return <PricingSection />;
      case 'jelly-button': return <JellyButton />;
      case 'creepy-button': return <CreepyButton />;
      case 'mixpanel-pricing': return <MixpanelPricing />;
      case 'clickup-calc': return <ClickUpCalculator />;
    }

    if (item.code) {
        // Detect if the code is a full HTML document (typical for Design Systems)
        const isFullHtml = item.code.trim().startsWith('<!DOCTYPE html>') || item.code.trim().startsWith('<html');
        
        // If it's full HTML, serve it directly. If it's a snippet, wrap it.
        const srcDoc = isFullHtml 
            ? item.code 
            : `<html><head><script src="https://cdn.tailwindcss.com"></script></head><body class="bg-gray-50 flex items-center justify-center min-h-screen p-4">${item.code}</body></html>`;

       return (
         <iframe
            title="Live Preview"
            className="w-full h-full border-none bg-white"
            sandbox="allow-scripts allow-same-origin"
            srcDoc={srcDoc}
         />
       );
    }
    
    return <div className="p-10 text-center text-gray-400">Preview not available</div>;
  };

  // If no code, hide tabs and show clean prompt view header
  const isPromptOnly = !item.code;

  return (
    <div className="flex-1 flex flex-col h-full bg-white md:bg-gray-50/50 overflow-hidden relative">
      
      {/* Floating Toolbar */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 p-1.5 bg-white rounded-full shadow-lg border border-gray-200">
          
          {/* Device Toggles */}
          {!isPromptOnly && (
              <div className="flex bg-gray-100 rounded-full p-1">
                  <button 
                    onClick={() => setDeviceMode('desktop')}
                    className={`p-2 rounded-full transition-all ${deviceMode === 'desktop' ? 'bg-white text-black shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                    title="Desktop View"
                  >
                      <Monitor size={16} />
                  </button>
                  <button 
                    onClick={() => setDeviceMode('mobile')}
                    className={`p-2 rounded-full transition-all ${deviceMode === 'mobile' ? 'bg-white text-black shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                    title="Mobile View"
                  >
                      <Smartphone size={16} />
                  </button>
              </div>
          )}

          {!isPromptOnly && <div className="w-px h-4 bg-gray-200 mx-1"></div>}

          {/* View Modes */}
          <div className="flex items-center gap-1">
             {!isPromptOnly && (
                <>
                    <button 
                        onClick={() => setActiveTab('preview')} 
                        className={`p-2 rounded-full transition-all ${activeTab === 'preview' ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                        title="Preview"
                    >
                        <Eye size={16} />
                    </button>
                    <button 
                        onClick={() => setActiveTab('code')} 
                        className={`p-2 rounded-full transition-all ${activeTab === 'code' ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                        title="Code"
                    >
                        <Code size={16} />
                    </button>
                </>
             )}
             <button 
                onClick={() => setActiveTab('prompt')} 
                className={`p-2 rounded-full transition-all ${activeTab === 'prompt' ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                title="System Prompt"
             >
                <Terminal size={16} />
             </button>
          </div>

          <div className="w-px h-4 bg-gray-200 mx-1"></div>

          {/* Actions */}
          <div className="flex items-center gap-1 relative">
              {onToggleAskKindly && (
                  <button 
                    onClick={onToggleAskKindly}
                    className={`p-2 rounded-full transition-all ${isAskKindlyActive ? 'bg-purple-100 text-purple-600' : 'text-gray-500 hover:bg-gray-100'}`}
                    title="Ask Kindly"
                  >
                      <BlingIcon />
                  </button>
              )}

              {/* Copy Button */}
              <button 
                onClick={handleCopy}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-all"
                title="Copy to Clipboard"
              >
                {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
              </button>

              {/* Download Button */}
              <button 
                onClick={handleDownload}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-all"
                title="Download File"
              >
                <Download size={16} />
              </button>
              
              <div className="relative">
                  <button 
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 px-3 py-2 bg-black text-white rounded-full text-xs font-bold hover:bg-gray-800 transition-colors"
                  >
                      <span>Export</span>
                      <ChevronDown size={12} className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Export Dropdown */}
                  {dropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)}></div>
                      <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-1.5 overflow-hidden">
                        <button onClick={() => openUrl('https://chatgpt.com/?q={YOUR_PROMPT_HERE}')} className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-700 text-xs font-medium transition-colors">
                            <ChatGPTIcon /> ChatGPT
                        </button>
                        <button onClick={() => openUrl('cursor://link/prompt?text={YOUR_PROMPT}')} className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-700 text-xs font-medium transition-colors">
                            <CursorIcon /> Cursor
                        </button>
                        <button onClick={() => openUrl('https://bolt.new/?prompt={YOUR_PROMPT}')} className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-700 text-xs font-medium transition-colors">
                            <BoltIcon /> Bolt
                        </button>
                         <button onClick={() => openUrl('https://v0.dev/?q={YOUR_PROMPT}')} className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-700 text-xs font-medium transition-colors">
                            <V0Icon /> v0
                        </button>
                        <button onClick={() => openUrl('https://lovable.dev/?autosubmit=true#prompt={YOUR_PROMPT_HERE}')} className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-700 text-xs font-medium transition-colors">
                            <LovableIcon /> Lovable
                        </button>
                        <div className="h-px bg-gray-100 my-1"></div>
                        <button onClick={() => { handleCopy(); setDropdownOpen(false); }} className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-700 text-xs font-medium transition-colors">
                            <CopyIcon /> {copied ? 'Copied!' : 'Copy Prompt'}
                        </button>
                      </div>
                    </>
                  )}
              </div>
          </div>
      </div>

      {/* Content */}
      <div className={`flex-1 overflow-auto relative bg-white transition-all duration-300 ${deviceMode === 'mobile' && activeTab === 'preview' ? 'flex justify-center items-center bg-gray-100' : ''}`}>
        
        {activeTab === 'preview' && !isPromptOnly && (
           <div className={`transition-all duration-300 ${deviceMode === 'mobile' ? 'w-[375px] h-[667px] rounded-3xl overflow-hidden border-8 border-gray-900 shadow-2xl bg-white' : 'w-full h-full bg-white'}`}>
               {renderComponent()}
           </div>
        )}
        
        {activeTab === 'code' && !isPromptOnly && (
            <SyntaxHighlighter code={item.code || ''} />
        )}

        {/* Prompt View */}
        {activeTab === 'prompt' && (
          <div className="w-full h-full flex flex-col items-center pt-24 px-6 md:px-20 bg-white overflow-y-auto">
             <div className="max-w-4xl w-full pb-20">
                 <div className="relative mb-6">
                    <pre className="whitespace-pre-wrap font-sans text-gray-800 text-lg leading-relaxed">
                        {item.systemPrompt}
                    </pre>
                 </div>
             </div>
          </div>
        )}

        {/* README View */}
        {activeTab === 'readme' && (
          <div className="w-full h-full flex flex-col items-center pt-24 px-6 md:px-20 bg-white overflow-y-auto">
             <div className="max-w-4xl w-full pb-20">
                 <div className="relative mb-6 border border-gray-100 rounded-lg p-8 bg-gray-50/50">
                    <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 leading-relaxed">
                        {item.readme}
                    </pre>
                 </div>
             </div>
          </div>
        )}

      </div>
    </div>
  );
};
