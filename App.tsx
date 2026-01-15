
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Sidebar } from './components/Sidebar';
import { PreviewArea } from './components/PreviewArea';
import { HomeView } from './components/HomeView';
import { PlanningView } from './components/PlanningView';
import { ChatPanel } from './components/ChatPanel';
import { BuildingView } from './components/BuildingView';
import { GalleryView } from './components/RecentView'; // Renamed export in file
import { PrivacyView } from './components/PrivacyView';
import { TermsView } from './components/TermsView';
import { DocsView } from './components/DocsView';
import { SettingsView } from './components/SettingsView';
import { AskKindlyPanel } from './components/AskKindlyPanel';
import { CopilotView } from './components/CopilotView';
import { COMPONENT_ITEMS, DESIGN_SYSTEMS } from './constants';
import { ComponentItem, User } from './types';
import { LogOut, Settings, User as UserIcon, Book, Fingerprint, X, Loader2, CheckCircle2, Sparkles, Home, Clock, Menu, Grid, LayoutGrid } from 'lucide-react';

declare global {
  interface Window {
    google: any;
  }
}

// --- CUSTOM ICONS ---

const ExpandIcon = () => (
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
  <path d="M12 22 6 16l1.1 -1.1 4.9 4.9 4.9 -4.9L18 16 12 22Zm-4.9 -12.9L6 8 12 2l6 6 -1.1 1.1L12 4.2l-4.9 4.9Z" fill="currentColor" strokeWidth="0.5"></path>
</svg>
);

const LibraryIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
    <g>
      <path d="M13.0411 4.66667c0.1525 -0.86985 -0.5169 -1.66667 -1.4 -1.66667H4.35859C3.47549 3 2.80615 3.79682 2.95856 4.66667M11.6666 3c0.0189 -0.17272 0.0284 -0.2591 0.0285 -0.33043 0.0015 -0.68242 -0.5125 -1.25581 -1.191 -1.32862C10.4331 1.33333 10.3463 1.33333 10.1725 1.33333H5.82733c-0.17376 0 -0.26065 0 -0.33158 0.00761 -0.67852 0.07282 -1.19254 0.6462 -1.19106 1.32862 0.00016 0.07134 0.00962 0.1577 0.02853 0.33044" stroke="currentColor" strokeWidth="1"></path>
      <path stroke="currentColor" strokeLinecap="round" d="M10 12H6" strokeWidth="1"></path>
      <path d="M1.58901 9.19533c-0.29736 -2.10906 -0.44603 -3.16356 0.18587 -3.84611C2.40678 4.66667 3.53172 4.66667 5.78159 4.66667h4.43681c2.2499 0 3.3748 0 4.0067 0.68255 0.6319 0.68255 0.4832 1.73708 0.1859 3.84611l-0.282 2c-0.2332 1.6539 -0.3497 2.4809 -0.9479 2.9761C12.583 14.6667 11.7008 14.6667 9.9364 14.6667H6.06357c-1.76436 0 -2.64655 0 -3.24468 -0.499 -0.59812 -0.4952 -0.71472 -1.3222 -0.94791 -2.9761l-0.28197 -2Z" stroke="currentColor" strokeWidth="1"></path>
    </g>
  </svg>
);

const DesignSystemIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
    <path d="M2.66666 4a1.33333 1.33333 0 0 1 1.33333 -1.33333h1.33334a1.33333 1.33333 0 0 1 1.33333 1.33333v0.66667a1.33333 1.33333 0 0 1 -1.33333 1.33333H4a1.33333 1.33333 0 0 1 -1.33334 -1.33333z" strokeWidth="1.33333"></path>
    <path d="M2.66666 10a1.33333 1.33333 0 0 1 1.33333 -1.33333h1.33334a1.33333 1.33333 0 0 1 1.33333 1.33333v2a1.33333 1.33333 0 0 1 -1.33333 1.33334H4a1.33333 1.33333 0 0 1 -1.33334 -1.33334z" strokeWidth="1.33333"></path>
    <path d="M9.33334 4a1.33333 1.33333 0 0 1 1.33333 -1.33333h1.33333a1.33333 1.33333 0 0 1 1.33333 1.33333v8a1.33333 1.33333 0 0 1 -1.33333 1.33334h-1.33333a1.33333 1.33333 0 0 1 -1.33333 -1.33334z" strokeWidth="1.33333"></path>
  </svg>
);

type ViewState = 'home' | 'planning' | 'building' | 'editor' | 'library' | 'design-systems' | 'gallery' | 'privacy' | 'terms' | 'docs' | 'settings' | 'copilot';

// --- GOOGLE GENAI CONFIG ---
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// --- MAGIC PROMPT HELPER (Powered by Gemini 3.0 Flash) ---
const generateMagicPrompt = async (prompt: string) => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Gemini Generation Error:", error);
        return null;
    }
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedId, setSelectedId] = useState<string>('radiant-input');
  
  // State for AI Generation & Flow
  const [initialPrompt, setInitialPrompt] = useState('');
  const [creationMode, setCreationMode] = useState<'prompt' | 'prototype' | 'image'>('prompt');
  const [generatedItem, setGeneratedItem] = useState<ComponentItem | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const generationRef = useRef(0);

  // Responsive State
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // Init
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize galleryItems from LocalStorage (Previously recentItems)
  const [galleryItems, setGalleryItems] = useState<ComponentItem[]>(() => {
      if (typeof window !== 'undefined') {
          const saved = localStorage.getItem('kindly_gallery_items');
          // Fallback to old key if new one doesn't exist
          const oldSaved = localStorage.getItem('kindly_recent_items');
          
          try {
              if (saved) return JSON.parse(saved);
              if (oldSaved) return JSON.parse(oldSaved);
              return [];
          } catch (e) {
              console.error("Failed to parse gallery items", e);
              return [];
          }
      }
      return [];
  });

  // Ask Kindly State
  const [isAskKindlyActive, setIsAskKindlyActive] = useState(false);
  const [customizedItem, setCustomizedItem] = useState<ComponentItem | null>(null);

  // Auth & Profile State
  const [user, setUser] = useState<User | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [loginState, setLoginState] = useState<'idle' | 'success'>('idle');
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Create Dropdown State
  const [createDropdownOpen, setCreateDropdownOpen] = useState(false);
  const createDropdownRef = useRef<HTMLDivElement>(null);

  // --- PERSISTENCE LOGIC ---
  useEffect(() => {
      localStorage.setItem('kindly_gallery_items', JSON.stringify(galleryItems));
  }, [galleryItems]);

  // --- ROUTING LOGIC ---
  useEffect(() => {
    // 1. Handle Initial Load
    const path = window.location.pathname;
    if (path === '/settings') setCurrentView('settings');
    else if (path === '/docs') setCurrentView('docs');
    else if (path === '/library') setCurrentView('library');
    else if (path === '/design-systems') setCurrentView('design-systems');
    else if (path === '/privacy') setCurrentView('privacy');
    else if (path === '/terms') setCurrentView('terms');
    else if (path === '/gallery') setCurrentView('gallery');
    else if (path === '/copilot') setCurrentView('copilot');
    else setCurrentView('home');

    // 2. Handle Browser Back Button
    const onPopState = () => {
        const p = window.location.pathname;
        if (p === '/settings') setCurrentView('settings');
        else if (p === '/docs') setCurrentView('docs');
        else if (p === '/library') setCurrentView('library');
        else if (p === '/design-systems') setCurrentView('design-systems');
        else if (p === '/privacy') setCurrentView('privacy');
        else if (p === '/terms') setCurrentView('terms');
        else if (p === '/gallery') setCurrentView('gallery');
        else if (p === '/copilot') setCurrentView('copilot');
        else setCurrentView('home');
    };
    window.addEventListener('popstate', onPopState);

    // 3. Close menus on outside click
    const handleClickOutside = (event: MouseEvent) => {
        if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
            setShowUserMenu(false);
        }
        if (createDropdownRef.current && !createDropdownRef.current.contains(event.target as Node)) {
            setCreateDropdownOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
        window.removeEventListener('popstate', onPopState);
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Update URL when view changes
  const navigateTo = (view: ViewState) => {
      setCurrentView(view);
      const path = view === 'home' ? '/' : `/${view}`;
      // Wrap pushState in try-catch to prevent crashes in restricted environments (e.g. blob/sandbox)
      try {
        window.history.pushState({}, '', path);
      } catch (e) {
        console.warn('Navigation state update failed (likely due to sandbox environment):', e);
      }
      
      // Reset contextual states
      setIsAskKindlyActive(false);
      setCustomizedItem(null);
      setCreateDropdownOpen(false);
  };

  // --- AUTH LOGIC ---
  useEffect(() => {
      // Load Google Identity Script
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
          if (window.google) {
              window.google.accounts.id.initialize({
                  client_id: '14206322756-fq1h2kfqdij9lpjj5n4r48g2j11ubqbq.apps.googleusercontent.com',
                  callback: handleGoogleLogin
              });
          }
      };
      document.body.appendChild(script);

      // Check LocalStorage for persisting session
      const storedUser = localStorage.getItem('kindly_user');
      if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    // Re-render Google button when modal opens
    if (showLoginModal && window.google) {
        window.google.accounts.id.renderButton(
            document.getElementById('google-btn-container'),
            { theme: 'outline', size: 'large', width: '100%', text: 'continue_with' }
        );
    }
  }, [showLoginModal]);

  const handleGoogleLogin = (response: any) => {
      // Decode JWT (Basic decoding for demo)
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      
      const payload = JSON.parse(jsonPayload);
      
      const newUser: User = {
          name: payload.name,
          email: payload.email,
          picture: payload.picture
      };

      finishLogin(newUser);
  };

  const handlePasskeyLogin = async () => {
      // Mock WebAuthn flow
      try {
        if (window.PublicKeyCredential) {
            // In a real app, we'd fetch challenge from server
            // await navigator.credentials.create({ ...options });
            // For UI demo:
            await new Promise(resolve => setTimeout(resolve, 1000));
            const mockUser: User = {
                name: "Passkey User",
                email: "user@kindly.ai",
                picture: "https://ui-avatars.com/api/?name=Passkey+User&background=random"
            };
            finishLogin(mockUser);
        } else {
            alert("WebAuthn not supported on this device.");
        }
      } catch (e) {
          console.error(e);
      }
  };

  const finishLogin = (newUser: User) => {
      setLoginState('success');
      setUser(newUser);
      localStorage.setItem('kindly_user', JSON.stringify(newUser));
      
      setTimeout(() => {
          setShowLoginModal(false);
          setLoginState('idle');
      }, 1500);
  };

  const handleSignOut = () => {
      setUser(null);
      localStorage.removeItem('kindly_user');
      setShowUserMenu(false);
      navigateTo('home');
  };

  // Determine active item
  const activeItem = (currentView === 'editor' && generatedItem) 
    ? (customizedItem || generatedItem) 
    : (customizedItem || (currentView === 'design-systems'
      ? (DESIGN_SYSTEMS.find(item => item.id === selectedId) || DESIGN_SYSTEMS[0])
      : (COMPONENT_ITEMS.find(item => item.id === selectedId) || COMPONENT_ITEMS[0])));

  // All page containers are now curved (floating style)
  const isFloatingLayout = true;

  const handleItemUpdate = (updates: Partial<ComponentItem>) => {
    const baseItem = customizedItem || activeItem;
    const finalItem = { ...baseItem, ...updates };
    setCustomizedItem(finalItem);
    
    if (generatedItem && generatedItem.id === baseItem.id) {
        setGeneratedItem(finalItem);
    }
    // Persist update to gallery items if it exists there
    setGalleryItems(prev => {
        const exists = prev.some(i => i.id === finalItem.id);
        if (exists) {
            return prev.map(item => item.id === finalItem.id ? finalItem : item);
        }
        return prev;
    });
  };

  // Handler for Canvas Generation from Ask Kindly
  const handleCanvasGeneration = async (title: string, prompt: string, preGeneratedCode?: string) => {
      // Create a new component item container
      const newItem: ComponentItem = {
          id: `generated-${Date.now()}`,
          title: title,
          description: "Generated via Ask Kindly Canvas",
          views: 1,
          copies: 0,
          category: 'UI Component',
          thumbnailClass: 'bg-indigo-50',
          systemPrompt: prompt, 
          code: preGeneratedCode || `<!-- Building ${title}... -->`, 
          createdAt: Date.now(),
          type: 'prototype'
      };

      if (!preGeneratedCode) {
          // Fallback: Generate the actual code in the background if not provided
          const systemPrompt = `ACT AS: Senior Frontend Developer.
          TASK: Write code for a functional UI prototype.
          CONTEXT: The user wants a single-file HTML prototype using Tailwind CSS.
          USER PROMPT: ${prompt}
          
          INSTRUCTIONS:
          1. Generate a COMPLETE, WORKING HTML file.
          2. Use Tailwind CSS via CDN.
          3. Use Vanilla JavaScript for interactivity.
          4. The code must be self-contained in a single file.
          
          OUTPUT FORMAT:
          Return ONLY raw JSON (no markdown) with this structure:
          {
            "code": "<!DOCTYPE html><html>...</html>"
          }
          `;

          try {
              const rawText = await generateMagicPrompt(systemPrompt);
              let cleanText = rawText || "";
              cleanText = cleanText.replace(/```json/g, "").replace(/```/g, "").trim();
              const data = JSON.parse(cleanText);
              
              if (data.code) {
                  newItem.code = data.code;
              }
          } catch (e) {
              console.error("Failed to generate canvas code:", e);
          }
      }

      setGeneratedItem(newItem);
      setGalleryItems(prev => [newItem, ...prev]);
      setCreationMode('prototype');
      navigateTo('editor');
  };

  const handleInitialSubmit = (prompt: string, mode: 'prompt' | 'prototype' | 'image') => {
    setInitialPrompt(prompt);
    setCreationMode(mode);
    navigateTo('planning');
  };

  const handlePlanningBuild = async (chatHistory: any[]) => {
    const genId = ++generationRef.current;
    
    // IMAGE MODE: Directly save without hitting magic prompt again
    if (creationMode === 'image') {
        const lastImageMsg = chatHistory.slice().reverse().find((m: any) => m.image);
        if (lastImageMsg) {
             const newItem: ComponentItem = {
                 id: `img-${Date.now()}`,
                 title: `Generated Image ${new Date().toLocaleTimeString()}`,
                 description: initialPrompt,
                 category: 'UI Component', // Using existing category literal
                 type: 'image',
                 thumbnailClass: 'bg-gray-100',
                 systemPrompt: initialPrompt,
                 // Storing as HTML for preview compatibility
                 code: `<img src="${lastImageMsg.image}" alt="Generated" class="w-full h-full object-contain" />`, 
                 createdAt: Date.now(),
                 views: 0, 
                 copies: 0
             };
             setGeneratedItem(newItem);
             setGalleryItems(prev => [newItem, ...prev]);
             // For images, skip the building animation
             navigateTo('editor');
             return;
        }
    }

    // TEXT/PROTOTYPE MODE
    setIsGenerating(true);
    navigateTo('building');
    
    try {
        const conversationText = chatHistory.map(m => `${m.role.toUpperCase()}: ${m.text}`).join('\n');

        let prompt = '';
        if (creationMode === 'prototype') {
            prompt = `ACT AS: Senior Frontend Developer.
            TASK: Write code for a functional UI prototype.
            CONTEXT: The user wants a single-file HTML prototype using Tailwind CSS.
            USER PROMPT HISTORY:
            ${conversationText}
            
            INSTRUCTIONS:
            1. Generate a COMPLETE, WORKING HTML file.
            2. Use Tailwind CSS via CDN.
            3. Use Vanilla JavaScript for interactivity.
            4. The code must be self-contained in a single file.
            
            OUTPUT FORMAT:
            Return ONLY raw JSON (no markdown) with this structure:
            {
              "title": "Title of the prototype",
              "description": "Short description of functionality",
              "code": "<!DOCTYPE html><html>...</html>"
            }
            `;
        } else {
            prompt = `ACT AS: Expert Prompt Engineer.
            TASK: Write a system prompt for an LLM.
            CONTEXT: The user wants a text prompt they can paste into an AI coding tool (like Cursor or Bolt).
            USER PROMPT HISTORY:
            ${conversationText}
            
            INSTRUCTIONS:
            1. Do NOT write code. Write a PROMPT describing how to write code.
            2. The 'systemPrompt' field should contain the detailed instructions for the AI.
            3. The 'readme' field should be a markdown guide.
            
            OUTPUT FORMAT:
            Return ONLY raw JSON (no markdown) with this structure:
            {
              "title": "Title of the prompt",
              "description": "Short description",
              "systemPrompt": "You are an expert developer...",
              "readme": "# Guide..."
            }
            `;
        }

        const rawText = await generateMagicPrompt(prompt);
        if (genId !== generationRef.current) return;

        if (!rawText) {
             console.warn("Magic Prompt returned empty response");
             setIsGenerating(false);
             navigateTo('planning');
             return;
        }

        let cleanText = rawText || "";
        cleanText = cleanText.replace(/```json/g, "").replace(/```/g, "").trim();

        if (cleanText) {
            try {
                const data = JSON.parse(cleanText);
                const newItem: ComponentItem = {
                    id: `generated-${Date.now()}`,
                    title: data.title,
                    description: data.description,
                    views: 1,
                    copies: 0,
                    category: 'UI Component',
                    thumbnailClass: 'bg-indigo-50',
                    systemPrompt: data.systemPrompt || "Prototype Mode",
                    readme: data.readme,
                    code: data.code,
                    createdAt: Date.now(),
                    type: creationMode
                };
                setGeneratedItem(newItem);
                setGalleryItems(prev => [newItem, ...prev]);
                await new Promise(resolve => setTimeout(resolve, 1500));
            } catch (e) {
                console.error("Failed to parse Magic Prompt response:", e);
            }
        }
    } catch (error) {
        console.error("Error generating:", error);
    } finally {
        if (genId === generationRef.current) {
            setIsGenerating(false);
            navigateTo('editor');
        }
    }
  };

  const handleStopGeneration = () => {
    generationRef.current++;
    setIsGenerating(false);
    navigateTo('planning');
  };

  const handleEditorGenerate = async (prompt: string): Promise<string | void> => {
    if (!generatedItem && !customizedItem) return;
    setIsGenerating(true);
    
    try {
        const currentItem = customizedItem || generatedItem!;
        
        if (currentItem.type === 'prototype') {
             const currentCode = currentItem.code || "";
             const systemPrompt = `You are an expert UI Engineer. 
             Modify the following code based on the user's request.
             Return ONLY the FULL updated HTML code. Do not include markdown fences or explanation.
             
             CURRENT CODE:
             ${currentCode}
             
             USER REQUEST:
             ${prompt}`;

             const newCode = await generateMagicPrompt(systemPrompt);
             const cleanCode = newCode?.replace(/```html/g, '').replace(/```/g, '').trim();
             
             if (cleanCode) {
                 const updatedItem = { ...currentItem, code: cleanCode };
                 setCustomizedItem(updatedItem);
                 // Persist refinement to local storage via galleryItems update
                 setGalleryItems(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
                 return "I've updated the prototype based on your request.";
             }
        } else {
             // Prompt generation mode
             const currentSystemPrompt = currentItem.systemPrompt || "";
             const metaPrompt = `You are an expert Prompt Engineer.
             Refine the following system prompt based on the user's request.
             Return ONLY the new system prompt text.
             
             CURRENT PROMPT:
             ${currentSystemPrompt}
             
             USER REQUEST:
             ${prompt}`;
             
             const text = await generateMagicPrompt(metaPrompt);
             
             if (text) {
                 const updatedItem = { ...currentItem, systemPrompt: text };
                 setCustomizedItem(updatedItem);
                 // Persist refinement to local storage via galleryItems update
                 setGalleryItems(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
                 return "I've updated the system prompt.";
             }
        }
        return "I couldn't complete the update.";
    } catch (e) {
        console.error(e);
        return "Error generating update.";
    } finally {
        setIsGenerating(false);
    }
  };
  
  const handleNavClick = (view: 'library' | 'design-systems' | 'gallery') => {
      navigateTo(view);
      if (view === 'design-systems') setSelectedId('ds-classic');
      else if (view === 'library') setSelectedId('radiant-input');
  };

  const handleGallerySelection = (item: ComponentItem) => {
    setGeneratedItem(item);
    setCreationMode(item.type || 'prompt');
    navigateTo('editor');
  };

  // --- MOBILE NAVIGATION COMPONENT ---
  const MobileNav = () => (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black text-white h-20 flex items-center justify-around z-[100] pb-2 rounded-t-[20px] shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <button 
            onClick={() => navigateTo('home')} 
            className={`flex flex-col items-center gap-1 p-2 ${currentView === 'home' ? 'text-white' : 'text-white/50'}`}
        >
            <Home size={22} strokeWidth={currentView === 'home' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Home</span>
        </button>
        
        <button 
            onClick={() => handleNavClick('gallery')} 
            className={`flex flex-col items-center gap-1 p-2 ${currentView === 'gallery' ? 'text-white' : 'text-white/50'}`}
        >
            <LayoutGrid size={22} strokeWidth={currentView === 'gallery' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Gallery</span>
        </button>

        <button 
            onClick={() => handleNavClick('library')} 
            className={`flex flex-col items-center gap-1 p-2 ${currentView === 'library' || currentView === 'design-systems' ? 'text-white' : 'text-white/50'}`}
        >
            <Menu size={22} strokeWidth={currentView === 'library' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Library</span>
        </button>

        <button 
            onClick={() => navigateTo('copilot')} 
            className={`flex flex-col items-center gap-1 p-2 ${currentView === 'copilot' ? 'text-blue-400' : 'text-white/50'}`}
        >
            <Sparkles size={22} strokeWidth={currentView === 'copilot' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Copilot</span>
        </button>
    </div>
  );

  return (
    <div className="w-full h-screen flex flex-col bg-[#F9FAFB] font-sans overflow-hidden">
      
      {/* Top Navigation (Desktop) */}
      {currentView !== 'building' && (
        <div className="hidden md:flex h-16 items-center justify-between px-6 z-50 shrink-0 relative bg-[#F9FAFB]">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo('home')}>
              <img src="https://iili.io/f8yBZN9.png" alt="Kindly Create" className="w-12 h-12 object-contain" />
              <span className="font-bold text-lg text-gray-900 tracking-tight hidden md:block">Kindly Create</span>
          </div>

          {/* View Toggles */}
          <div className="flex items-center gap-2">
              <button onClick={() => handleNavClick('gallery')} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentView === 'gallery' ? 'text-gray-900 bg-gray-100' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>
                <LayoutGrid size={16} />
                <span>My Gallery</span>
              </button>
              <button onClick={() => handleNavClick('library')} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentView === 'library' ? 'text-gray-900 bg-gray-100' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>
                <LibraryIcon />
                <span>Library</span>
              </button>
               <button onClick={() => handleNavClick('design-systems')} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentView === 'design-systems' ? 'text-gray-900 bg-gray-100' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>
                <DesignSystemIcon />
                <span>Design Systems</span>
              </button>

              <div className="w-px h-5 bg-gray-200 mx-2"></div>

              {/* Create / Expand Dropdown */}
              <div className="relative" ref={createDropdownRef}>
                  <button 
                    onClick={() => setCreateDropdownOpen(!createDropdownOpen)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold shadow-sm border transition-all duration-200 ${
                        createDropdownOpen
                        ? 'bg-gray-100 text-gray-900 border-gray-300'
                        : ['home', 'planning', 'editor', 'copilot'].includes(currentView)
                            ? 'bg-black text-white border-black hover:bg-gray-800' 
                            : 'bg-white text-gray-900 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={createDropdownOpen ? "text-gray-900" : (['home', 'planning', 'editor', 'copilot'].includes(currentView) ? "text-white" : "text-gray-900")}><ExpandIcon /></div>
                    <span>Create</span>
                  </button>

                  {createDropdownOpen && (
                      <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 p-1.5 overflow-hidden animate-fade-in-up">
                          <button onClick={() => navigateTo('home')} className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-gray-50 text-sm text-gray-700 flex items-center gap-3 transition-colors">
                              <Home size={16} /> Kindly Create
                          </button>
                          <button onClick={() => navigateTo('copilot')} className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-gray-50 text-sm text-gray-700 flex items-center gap-3 transition-colors">
                              <Sparkles size={16} className="text-blue-500" /> Kindly Copilot
                          </button>
                      </div>
                  )}
              </div>

              {/* Login / User Section */}
              {!user ? (
                  <button 
                    onClick={() => setShowLoginModal(true)}
                    className="ml-2 px-4 py-2.5 rounded-full text-sm font-bold bg-white border border-gray-200 hover:border-gray-300 text-gray-900 transition-all hover:bg-gray-50"
                  >
                      Sign In
                  </button>
              ) : (
                  <div className="relative ml-2" ref={userMenuRef}>
                      <button 
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="flex items-center gap-2 px-2 py-1.5 bg-white border border-gray-200 rounded-full hover:shadow-sm transition-all pr-4"
                      >
                          <img src={user.picture} alt={user.name} className="w-7 h-7 rounded-full object-cover border border-gray-100" />
                          <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">{user.name}</span>
                      </button>

                      {/* User Dropdown */}
                      {showUserMenu && (
                          <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 p-1.5 overflow-hidden animate-fade-in-up">
                             <div className="px-3 py-2 border-b border-gray-50 mb-1">
                                 <div className="text-xs font-medium text-gray-500">Signed in as</div>
                                 <div className="text-sm font-bold text-gray-900 truncate">{user.email}</div>
                             </div>
                             <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-700 flex items-center gap-2">
                                 <UserIcon size={16} /> Profile
                             </button>
                             <button onClick={() => { setShowUserMenu(false); navigateTo('settings'); }} className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-700 flex items-center gap-2">
                                 <Settings size={16} /> Settings
                             </button>
                             <button onClick={() => { setShowUserMenu(false); navigateTo('docs'); }} className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-700 flex items-center gap-2">
                                 <Book size={16} /> Documentation
                             </button>
                             <div className="h-px bg-gray-50 my-1"></div>
                             <button onClick={handleSignOut} className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 text-sm text-red-600 flex items-center gap-2 font-medium">
                                 <LogOut size={16} /> Sign Out
                             </button>
                          </div>
                      )}
                  </div>
              )}
          </div>
        </div>
      )}

      {/* Mobile Top Header (Minimal) */}
      <div className="md:hidden h-14 flex items-center justify-center border-b border-gray-100 bg-white/80 backdrop-blur-md z-50 shrink-0 sticky top-0">
          <div className="flex items-center gap-2" onClick={() => navigateTo('home')}>
              <img src="https://iili.io/f8yBZN9.png" alt="Kindly Create" className="w-8 h-8 object-contain" />
              <span className="font-bold text-base text-gray-900 tracking-tight">Kindly Create</span>
          </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
          <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-[32px] p-8 w-full max-w-md shadow-2xl relative overflow-hidden animate-fade-in-up">
                  <button onClick={() => setShowLoginModal(false)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 transition-colors">
                      <X size={20} />
                  </button>

                  {loginState === 'success' ? (
                      <div className="flex flex-col items-center justify-center py-10 animate-fade-in">
                          <CheckCircle2 size={64} className="text-green-500 mb-4" />
                          <h2 className="text-2xl font-bold text-gray-900">Logged In!</h2>
                          <p className="text-gray-500">Welcome back, {user?.name}</p>
                      </div>
                  ) : (
                      <>
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                            <p className="text-gray-500 text-sm">Sign in to save your prompts and access pro features.</p>
                        </div>

                        <div className="space-y-4">
                            <div id="google-btn-container" className="h-10"></div>
                            
                            <div className="relative py-2">
                                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                                <div className="relative flex justify-center text-xs"><span className="px-2 bg-white text-gray-400">OR</span></div>
                            </div>

                            <button 
                                onClick={handlePasskeyLogin}
                                className="w-full flex items-center justify-center gap-2 bg-black text-white rounded-lg py-2.5 font-medium hover:bg-gray-800 transition-colors"
                            >
                                <Fingerprint size={20} />
                                <span>Sign in with Passkey</span>
                            </button>
                        </div>
                        
                        <p className="text-center text-xs text-gray-400 mt-6">
                            By continuing, you agree to our Terms of Service and Privacy Policy.
                        </p>
                      </>
                  )}
              </div>
          </div>
      )}

      {/* Main Content Area - Global Curved & Floating Layout */}
      <div className={`flex-1 overflow-hidden relative ${isFloatingLayout ? 'p-3 pb-24 md:px-6 md:pb-6' : ''}`}>
         <div className={`w-full h-full bg-white overflow-hidden relative shadow-sm border border-gray-200 squircle-3xl`}>
             {currentView === 'home' && (
                 <HomeView 
                   onSubmit={handleInitialSubmit} 
                   onNavigate={(view) => navigateTo(view as ViewState)} 
                 />
             )}

             {currentView === 'planning' && (
                 <PlanningView 
                   initialPrompt={initialPrompt} 
                   onBuild={handlePlanningBuild} 
                   creationMode={creationMode}
                 />
             )}
             
             {currentView === 'building' && (
                 <BuildingView onStop={handleStopGeneration} />
             )}

             {currentView === 'editor' && (
                 <div className="w-full h-full flex flex-col md:flex-row">
                    <div className="hidden md:block h-full border-r border-gray-100">
                        {isAskKindlyActive ? (
                            <AskKindlyPanel 
                                activeItem={activeItem} 
                                onUpdateItem={handleItemUpdate}
                                onClose={() => setIsAskKindlyActive(false)}
                                onGenerateCanvas={handleCanvasGeneration}
                            />
                        ) : (
                            <ChatPanel onGenerate={handleEditorGenerate} isGenerating={isGenerating} />
                        )}
                    </div>
                    <PreviewArea 
                        item={activeItem} 
                        onToggleAskKindly={() => setIsAskKindlyActive(!isAskKindlyActive)}
                        isAskKindlyActive={isAskKindlyActive}
                    />
                 </div>
             )}

             {currentView === 'copilot' && (
                 <CopilotView userName={user ? user.name.split(' ')[0] : 'Creator'} />
             )}

             {currentView === 'gallery' && (
                 <GalleryView 
                    items={galleryItems} 
                    onSelectItem={handleGallerySelection}
                    onUpdateItems={setGalleryItems} 
                 />
             )}

             {currentView === 'library' && (
                <div className="w-full h-full flex flex-col md:flex-row">
                   <div className={`${isMobile ? 'w-full' : 'hidden md:block h-full border-r border-gray-100'}`}>
                      {isAskKindlyActive ? (
                            <AskKindlyPanel 
                                activeItem={activeItem} 
                                onUpdateItem={handleItemUpdate}
                                onClose={() => setIsAskKindlyActive(false)}
                                onGenerateCanvas={handleCanvasGeneration}
                            />
                      ) : (
                          <Sidebar 
                            items={COMPONENT_ITEMS} 
                            selectedId={selectedId} 
                            onSelect={(id) => { 
                                setSelectedId(id); 
                                setCustomizedItem(null);
                                if (isMobile) navigateTo('editor'); 
                            }} 
                          />
                      )}
                   </div>
                   <div className="hidden md:block flex-1 h-full">
                       <PreviewArea 
                            item={activeItem} 
                            onToggleAskKindly={() => setIsAskKindlyActive(!isAskKindlyActive)}
                            isAskKindlyActive={isAskKindlyActive}
                       />
                   </div>
                </div>
             )}

              {currentView === 'design-systems' && (
                <div className="w-full h-full flex flex-col md:flex-row">
                   <div className={`${isMobile ? 'w-full' : 'hidden md:block h-full border-r border-gray-100'}`}>
                      {isAskKindlyActive ? (
                            <AskKindlyPanel 
                                activeItem={activeItem} 
                                onUpdateItem={handleItemUpdate}
                                onClose={() => setIsAskKindlyActive(false)}
                                onGenerateCanvas={handleCanvasGeneration}
                            />
                      ) : (
                          <Sidebar 
                            items={DESIGN_SYSTEMS} 
                            selectedId={selectedId} 
                            onSelect={(id) => { 
                                setSelectedId(id); 
                                setCustomizedItem(null); 
                                if (isMobile) navigateTo('editor');
                            }} 
                          />
                      )}
                   </div>
                   <div className="hidden md:block flex-1 h-full">
                       <PreviewArea 
                            item={activeItem} 
                            onToggleAskKindly={() => setIsAskKindlyActive(!isAskKindlyActive)}
                            isAskKindlyActive={isAskKindlyActive}
                       />
                   </div>
                </div>
             )}
             
             {currentView === 'settings' && (
                 <SettingsView onBack={() => navigateTo('home')} />
             )}

             {currentView === 'privacy' && (
                <PrivacyView onBack={() => navigateTo('home')} />
             )}

             {currentView === 'terms' && (
                <TermsView onBack={() => navigateTo('home')} />
             )}

             {currentView === 'docs' && (
                <DocsView onBack={() => navigateTo('home')} />
             )}
         </div>
      </div>

      <MobileNav />
    </div>
  );
};

export default App;
