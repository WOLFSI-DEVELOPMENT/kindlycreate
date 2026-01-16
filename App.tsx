
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Sidebar } from './components/Sidebar';
import { PreviewArea } from './components/PreviewArea';
import { HomeView } from './components/HomeView';
import { PlanningView } from './components/PlanningView';
import { BuildingView } from './components/BuildingView';
import { DynamicBuilderView } from './components/DynamicBuilderView';
import { GalleryView } from './components/RecentView';
import { PrivacyView } from './components/PrivacyView';
import { TermsView } from './components/TermsView';
import { DocsView } from './components/DocsView';
import { SettingsView } from './components/SettingsView';
import { AskKindlyPanel } from './components/AskKindlyPanel';
import { ProfileView } from './components/ProfileView';
import { COMPONENT_ITEMS, DESIGN_SYSTEMS } from './constants';
import { ComponentItem, User } from './types';
import { LogOut, Settings, User as UserIcon, Book, Fingerprint, X, CheckCircle2, Sparkles, Home, Menu, LayoutGrid, Plus, Mail, Phone, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { 
  auth, 
  googleProvider, 
  twitterProvider,
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  db 
} from './firebase';
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

declare global {
  interface Window {
    google: any;
    recaptchaVerifier: any;
  }
}

// ... (Keep existing Icon Components: LibraryIcon, DesignSystemIcon) ...
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

type ViewState = 'home' | 'planning' | 'building' | 'dynamic-building' | 'editor' | 'library' | 'design-systems' | 'gallery' | 'privacy' | 'terms' | 'docs' | 'settings' | 'ask-kindly' | 'profile' | 'public-profile';

// Helper to get AI instance with dynamic key
const getAI = () => {
  const apiKey = localStorage.getItem('kindly_api_key') || process.env.API_KEY;
  return new GoogleGenAI({ apiKey });
};

const generateMagicPrompt = async (prompt: string) => {
    try {
        const ai = getAI();
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
  
  // Public Profile State
  const [publicProfileUser, setPublicProfileUser] = useState<User | null>(null);
  const [publicProfileItems, setPublicProfileItems] = useState<ComponentItem[]>([]);
  
  // ... (Keep existing State) ...
  const [initialPrompt, setInitialPrompt] = useState('');
  const [creationMode, setCreationMode] = useState<'prompt' | 'prototype' | 'image' | 'dynamic'>('prompt');
  const [generatedItem, setGeneratedItem] = useState<ComponentItem | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const generationRef = useRef(0);
  const [studioItem, setStudioItem] = useState<ComponentItem | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // Init
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [galleryItems, setGalleryItems] = useState<ComponentItem[]>(() => {
      if (typeof window !== 'undefined') {
          const saved = localStorage.getItem('kindly_gallery_items');
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

  const [isAskKindlyActive, setIsAskKindlyActive] = useState(true);
  const [customizedItem, setCustomizedItem] = useState<ComponentItem | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [loginState, setLoginState] = useState<'idle' | 'success'>('idle');
  const [authMode, setAuthMode] = useState<'main' | 'email-in' | 'email-up' | 'phone'>('main');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [loginMessage, setLoginMessage] = useState<string>(''); // For the "Oh no" message
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<any>(null);

  const userMenuRef = useRef<HTMLDivElement>(null);

  // ... (Keep existing Persistence Logic) ...
  useEffect(() => {
      try {
        localStorage.setItem('kindly_gallery_items', JSON.stringify(galleryItems));
      } catch (e) {
        console.warn("Failed to save gallery items to local storage (likely quota exceeded).", e);
      }
  }, [galleryItems]);

  // Auth Guard Helper
  const requireAuth = (action: () => void, message: string = "You must be logged in to use this feature.") => {
      if (user) {
          action();
      } else {
          setLoginMessage(message);
          setShowLoginModal(true);
      }
  };

  // --- ROUTING LOGIC ---
  useEffect(() => {
    // ... (Existing basic routing) ...
    const path = window.location.pathname;
    if (path === '/settings') setCurrentView('settings');
    // ... (others)
    else if (path === '/profile') setCurrentView('profile');
    else setCurrentView('home');

    // Handle Pop State
    const onPopState = () => {
        // ... (Existing basic routing logic) ...
        const p = window.location.pathname;
        if (p === '/settings') setCurrentView('settings');
        else if (p === '/profile') setCurrentView('profile');
        else setCurrentView('home');
    };
    window.addEventListener('popstate', onPopState);

    const handleClickOutside = (event: MouseEvent) => {
        if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
            setShowUserMenu(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
        window.removeEventListener('popstate', onPopState);
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navigateTo = (view: ViewState) => {
      setCurrentView(view);
      const path = view === 'home' ? '/' : `/${view}`;
      try {
        window.history.pushState({}, '', path);
      } catch (e) {
        console.warn('Navigation state update failed:', e);
      }
      setCustomizedItem(null);
  };

  const handleNavigateToPublicProfile = async (authorId: string, authorName: string) => {
      // 1. Set View
      setCurrentView('public-profile');
      
      // 2. Setup mock User object for the profile header (in a real app, fetch full user profile doc)
      setPublicProfileUser({
          name: authorName,
          email: '', // Don't show email for public profile unless fetched securely
          picture: `https://ui-avatars.com/api/?name=${authorName}&background=random`
      });

      // 3. Fetch Public Items
      try {
          const q = query(collection(db, "community_prompts"), where("authorId", "==", authorId));
          const querySnapshot = await getDocs(q);
          const items: ComponentItem[] = [];
          querySnapshot.forEach((doc) => {
              const data = doc.data();
              items.push({ id: doc.id, ...data } as ComponentItem);
          });
          setPublicProfileItems(items);
      } catch (e) {
          console.error("Error fetching public profile items:", e);
          setPublicProfileItems([]);
      }
  };

  // ... (Keep all Auth Logic) ...
  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
          if (firebaseUser) {
              const newUser: User = { 
                  name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || firebaseUser.phoneNumber || 'User', 
                  email: firebaseUser.email || firebaseUser.phoneNumber || '', 
                  picture: firebaseUser.photoURL || `https://ui-avatars.com/api/?name=${firebaseUser.displayName || 'User'}`,
                  uid: firebaseUser.uid
              };
              setUser(newUser);
              localStorage.setItem('kindly_user', JSON.stringify(newUser));
          } else {
              if (localStorage.getItem('kindly_user')) {
                  setUser(null);
                  localStorage.removeItem('kindly_user');
              }
          }
      });
      return () => unsubscribe();
  }, []);

  const resetAuthForm = () => {
      setAuthMode('main');
      setAuthError('');
      setLoginMessage('');
      setEmail('');
      setPassword('');
      setPhoneNumber('');
      setOtp('');
      setConfirmationResult(null);
      setAuthLoading(false);
  };

  const handleFirebaseLogin = async () => {
      setAuthLoading(true);
      setAuthError('');
      try {
          await signInWithPopup(auth, googleProvider);
          setLoginState('success');
          setTimeout(() => { setShowLoginModal(false); setLoginState('idle'); resetAuthForm(); }, 1500);
      } catch (error: any) {
          console.error("Firebase Login Error", error);
          setAuthError(error.message);
      } finally {
          setAuthLoading(false);
      }
  };

  const handleTwitterLogin = async () => {
      setAuthLoading(true);
      setAuthError('');
      try {
          await signInWithPopup(auth, twitterProvider);
          setLoginState('success');
          setTimeout(() => { setShowLoginModal(false); setLoginState('idle'); resetAuthForm(); }, 1500);
      } catch (error: any) {
          console.error("Twitter Login Error", error);
          setAuthError(error.message);
      } finally {
          setAuthLoading(false);
      }
  };

  const handleEmailAuth = async () => {
      if (!email || !password) {
          setAuthError('Please fill in all fields.');
          return;
      }
      setAuthLoading(true);
      setAuthError('');
      try {
          if (authMode === 'email-in') {
              await signInWithEmailAndPassword(auth, email, password);
          } else {
              await createUserWithEmailAndPassword(auth, email, password);
          }
          setLoginState('success');
          setTimeout(() => { setShowLoginModal(false); setLoginState('idle'); resetAuthForm(); }, 1500);
      } catch (error: any) {
          console.error("Auth Error", error);
          setAuthError(error.message.replace('Firebase: ', ''));
      } finally {
          setAuthLoading(false);
      }
  };

  const handlePhoneLogin = async () => {
      if (!phoneNumber) {
          setAuthError('Please enter a phone number.');
          return;
      }
      setAuthLoading(true);
      setAuthError('');
      try {
          if (!window.recaptchaVerifier) {
              window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                  'size': 'invisible',
                  'callback': () => {}
              });
          }
          const confirmation = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
          setConfirmationResult(confirmation);
          setAuthError('');
      } catch (error: any) {
          console.error("Phone Auth Error", error);
          setAuthError(error.message);
          window.recaptchaVerifier?.clear();
          window.recaptchaVerifier = null;
      } finally {
          setAuthLoading(false);
      }
  };

  const handleVerifyOtp = async () => {
      if (!otp || !confirmationResult) return;
      setAuthLoading(true);
      setAuthError('');
      try {
          await confirmationResult.confirm(otp);
          setLoginState('success');
          setTimeout(() => { setShowLoginModal(false); setLoginState('idle'); resetAuthForm(); }, 1500);
      } catch (error: any) {
          console.error("OTP Error", error);
          setAuthError('Invalid verification code.');
      } finally {
          setAuthLoading(false);
      }
  };

  const handleSignOut = async () => {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem('kindly_user');
      setShowUserMenu(false);
      navigateTo('home');
  };

  // ... (Keep existing Generation Handlers: handleCanvasGeneration, handleStudioGeneration, handleInitialSubmit, etc.) ...
  const activeItem = (currentView === 'editor' && generatedItem) 
    ? (customizedItem || generatedItem) 
    : (customizedItem || (currentView === 'design-systems'
      ? (DESIGN_SYSTEMS.find(item => item.id === selectedId) || DESIGN_SYSTEMS[0])
      : (COMPONENT_ITEMS.find(item => item.id === selectedId) || COMPONENT_ITEMS[0])));

  const isFloatingLayout = true;

  const handleItemUpdate = (updates: Partial<ComponentItem>) => {
    if (currentView === 'ask-kindly' && studioItem) {
        setStudioItem({ ...studioItem, ...updates });
        return;
    }
    const baseItem = customizedItem || activeItem;
    const finalItem = { ...baseItem, ...updates };
    setCustomizedItem(finalItem);
    if (generatedItem && generatedItem.id === baseItem.id) {
        setGeneratedItem(finalItem);
    }
    setGalleryItems(prev => {
        const exists = prev.some(i => i.id === finalItem.id);
        if (exists) {
            return prev.map(item => item.id === finalItem.id ? finalItem : item);
        }
        return prev;
    });
  };

  const handleCanvasGeneration = async (title: string, prompt: string, preGeneratedCode?: string) => {
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
          const systemPrompt = `ACT AS: Senior Frontend Developer.
          TASK: Write code for a functional UI prototype.
          CONTEXT: The user wants a single-file HTML prototype using Tailwind CSS.
          USER PROMPT: ${prompt}
          OUTPUT FORMAT: JSON { "code": "..." }`;

          try {
              const rawText = await generateMagicPrompt(systemPrompt);
              let cleanText = rawText || "";
              cleanText = cleanText.replace(/```json/g, "").replace(/```/g, "").trim();
              const data = JSON.parse(cleanText);
              if (data.code) newItem.code = data.code;
          } catch (e) { console.error("Failed to generate canvas code:", e); }
      }

      setGeneratedItem(newItem);
      setGalleryItems(prev => [newItem, ...prev]);
      setCreationMode('prototype');
      navigateTo('editor');
  };

  const handleStudioGeneration = async (title: string, prompt: string, preGeneratedCode?: string) => {
      const newItem: ComponentItem = {
          id: `studio-${Date.now()}`,
          title: title,
          description: "Studio Creation",
          views: 0,
          copies: 0,
          category: 'UI Component',
          thumbnailClass: 'bg-black text-white',
          systemPrompt: prompt,
          code: preGeneratedCode,
          createdAt: Date.now(),
          type: 'dynamic'
      };
      setStudioItem(newItem);
      setGalleryItems(prev => [newItem, ...prev]); 
  };

  const handleInitialSubmit = (prompt: string, mode: 'prompt' | 'prototype' | 'image' | 'dynamic') => {
    // Require Auth Check
    requireAuth(() => {
        setInitialPrompt(prompt);
        setCreationMode(mode);
        if (mode === 'dynamic') navigateTo('dynamic-building');
        else navigateTo('planning');
    }, "Oh no! You need to log in to use the AI generator.");
  };

  const handleDynamicBuildComplete = (item: ComponentItem) => {
      setGeneratedItem(item);
      setGalleryItems(prev => [item, ...prev]);
      navigateTo('editor');
  };

  const handlePlanningBuild = async (chatHistory: any[]) => {
    const genId = ++generationRef.current;
    if (creationMode === 'image') {
        const lastImageMsg = chatHistory.slice().reverse().find((m: any) => m.image);
        if (lastImageMsg) {
             const newItem: ComponentItem = {
                 id: `img-${Date.now()}`,
                 title: `Generated Image ${new Date().toLocaleTimeString()}`,
                 description: initialPrompt,
                 category: 'UI Component',
                 type: 'image',
                 thumbnailClass: 'bg-gray-100',
                 systemPrompt: initialPrompt,
                 code: `<img src="${lastImageMsg.image}" alt="Generated" class="w-full h-full object-contain" />`, 
                 createdAt: Date.now(),
                 views: 0, copies: 0
             };
             setGeneratedItem(newItem);
             setGalleryItems(prev => [newItem, ...prev]);
             navigateTo('editor');
             return;
        }
    }
    setIsGenerating(true);
    navigateTo('building');
    
    try {
        const conversationText = chatHistory.map(m => `${m.role.toUpperCase()}: ${m.text}`).join('\n');
        let prompt = `ACT AS: Senior Frontend Developer... CONTEXT: Single-file HTML prototype using Tailwind CSS... USER HISTORY: ${conversationText} ... OUTPUT JSON { "code": ... }`;
        const rawText = await generateMagicPrompt(prompt);
        if (genId !== generationRef.current) return;
        let cleanText = rawText || "";
        cleanText = cleanText.replace(/```json/g, "").replace(/```/g, "").trim();
        if (cleanText) {
            try {
                const data = JSON.parse(cleanText);
                const newItem: ComponentItem = {
                    id: `generated-${Date.now()}`,
                    title: data.title || "New Prototype",
                    description: data.description || "Generated Component",
                    views: 1, copies: 0, category: 'UI Component', thumbnailClass: 'bg-indigo-50',
                    systemPrompt: data.systemPrompt || "Prototype Mode",
                    readme: data.readme,
                    code: data.code,
                    createdAt: Date.now(),
                    type: creationMode
                };
                setGeneratedItem(newItem);
                setGalleryItems(prev => [newItem, ...prev]);
                await new Promise(resolve => setTimeout(resolve, 1500));
            } catch (e) { console.error("Failed to parse Magic Prompt response:", e); }
        }
    } catch (error) { console.error("Error generating:", error); } finally {
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
  
  const handleNavClick = (view: 'library' | 'design-systems' | 'gallery' | 'ask-kindly') => {
      if (view === 'gallery' && !user) {
          requireAuth(() => {}, "Oh no! Log in to access your gallery.");
          return;
      }
      navigateTo(view as ViewState);
      if (view === 'design-systems') setSelectedId('ds-classic');
      else if (view === 'library') setSelectedId('radiant-input');
  };

  const handleGallerySelection = (item: ComponentItem) => {
    setGeneratedItem(item);
    if (item.type === 'prototype' || item.type === 'image' || item.type === 'dynamic') {
      setCreationMode(item.type);
    } else {
      setCreationMode('prompt');
    }
    navigateTo('editor');
  };

  // ... (Keep MobileNav) ...
  const MobileNav = () => (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black text-white h-20 flex items-center justify-around z-[100] pb-2 rounded-t-[20px] shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <button onClick={() => navigateTo('home')} className={`flex flex-col items-center gap-1 p-2 ${currentView === 'home' ? 'text-white' : 'text-white/50'}`}>
            <Home size={22} strokeWidth={currentView === 'home' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Home</span>
        </button>
        <button onClick={() => handleNavClick('gallery')} className={`flex flex-col items-center gap-1 p-2 ${currentView === 'gallery' ? 'text-white' : 'text-white/50'}`}>
            <LayoutGrid size={22} strokeWidth={currentView === 'gallery' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Gallery</span>
        </button>
        <button onClick={() => handleNavClick('ask-kindly')} className={`flex flex-col items-center gap-1 p-2 ${currentView === 'ask-kindly' ? 'text-white' : 'text-white/50'}`}>
            <Sparkles size={22} strokeWidth={currentView === 'ask-kindly' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Studio</span>
        </button>
        <button onClick={() => handleNavClick('library')} className={`flex flex-col items-center gap-1 p-2 ${currentView === 'library' || currentView === 'design-systems' ? 'text-white' : 'text-white/50'}`}>
            <Menu size={22} strokeWidth={currentView === 'library' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Library</span>
        </button>
    </div>
  );

  return (
    <div className="w-full h-screen flex flex-col bg-[#F9FAFB] font-sans overflow-hidden">
      
      {/* Top Navigation (Desktop) - SAME AS BEFORE */}
      {currentView !== 'building' && currentView !== 'dynamic-building' && (
        <div className="hidden md:flex h-16 items-center justify-between px-6 z-50 shrink-0 relative bg-[#F9FAFB]">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo('home')}>
              <img src="https://iili.io/f8yBZN9.png" alt="Kindly Create" className="w-12 h-12 object-contain" />
              <span className="font-bold text-lg text-gray-900 tracking-tight hidden md:block">Kindly Create</span>
          </div>

          <div className="flex items-center gap-2">
              <button onClick={() => handleNavClick('gallery')} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentView === 'gallery' ? 'text-gray-900 bg-gray-100' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>
                <LayoutGrid size={16} />
                <span>My Gallery</span>
              </button>
              
              <button onClick={() => handleNavClick('ask-kindly')} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentView === 'ask-kindly' ? 'text-gray-900 bg-gray-100' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>
                <Sparkles size={16} />
                <span>Ask Kindly</span>
              </button>

              <button onClick={() => handleNavClick('library')} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentView === 'library' ? 'text-gray-900 bg-gray-100' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>
                <LibraryIcon />
                <span>Library</span>
              </button>
               <button onClick={() => handleNavClick('design-systems')} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentView === 'design-systems' ? 'text-gray-900 bg-gray-100' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>
                <DesignSystemIcon />
                <span>Design Systems</span>
              </button>

              <div className="ml-2 flex items-center bg-white border border-gray-200 rounded-full p-1.5 pl-1.5 shadow-sm hover:shadow-md transition-all">
                  <button 
                      onClick={() => navigateTo('home')}
                      className="w-9 h-9 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 hover:scale-105 active:scale-95 transition-all"
                      title="Create New"
                  >
                      <Plus size={18} strokeWidth={2.5} />
                  </button>

                  <div className="w-px h-5 bg-gray-200 mx-3"></div>

                  {!user ? (
                      <button onClick={() => { setLoginMessage(''); setShowLoginModal(true); }} className="pr-4 pl-1 text-sm font-bold text-gray-900 hover:text-gray-600 transition-colors">Sign In</button>
                  ) : (
                      <div className="relative" ref={userMenuRef}>
                          <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center gap-2 pr-3">
                              <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full object-cover border border-gray-100" />
                              <span className="text-sm font-bold text-gray-700 max-w-[100px] truncate">{user.name}</span>
                          </button>
                          {showUserMenu && (
                              <div className="absolute right-0 top-full mt-4 w-60 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 p-1.5 overflow-hidden animate-fade-in-up">
                                 <div className="px-3 py-3 border-b border-gray-50 mb-1 bg-gray-50/50 rounded-t-xl">
                                     <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Signed in as</div>
                                     <div className="text-sm font-bold text-gray-900 truncate">{user.email}</div>
                                 </div>
                                 <button onClick={() => { setShowUserMenu(false); navigateTo('profile'); }} className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-gray-50 text-sm text-gray-700 flex items-center gap-3 transition-colors"><UserIcon size={16} /> Profile</button>
                                 <button onClick={() => { setShowUserMenu(false); navigateTo('settings'); }} className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-gray-50 text-sm text-gray-700 flex items-center gap-3 transition-colors"><Settings size={16} /> Settings</button>
                                 <button onClick={() => { setShowUserMenu(false); navigateTo('docs'); }} className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-gray-50 text-sm text-gray-700 flex items-center gap-3 transition-colors"><Book size={16} /> Documentation</button>
                                 <div className="h-px bg-gray-50 my-1"></div>
                                 <button onClick={handleSignOut} className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-red-50 text-sm text-red-600 flex items-center gap-3 font-medium transition-colors"><LogOut size={16} /> Sign Out</button>
                              </div>
                          )}
                      </div>
                  )}
              </div>
          </div>
        </div>
      )}

      {/* Mobile Top Header */}
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
                  <button onClick={() => { setShowLoginModal(false); resetAuthForm(); }} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 transition-colors z-10"><X size={20} /></button>
                  
                  {loginState === 'success' ? (
                      <div className="flex flex-col items-center justify-center py-10 animate-fade-in">
                          <CheckCircle2 size={64} className="text-green-500 mb-4" />
                          <h2 className="text-2xl font-bold text-gray-900">Successfully Logged In!</h2>
                          <p className="text-gray-500">Welcome back, {user?.name}</p>
                      </div>
                  ) : (
                      <>
                        {/* Oh No Message */}
                        {loginMessage && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-6 flex items-start gap-3 border border-red-100 animate-fade-in">
                                <AlertCircle size={20} className="shrink-0 mt-0.5" />
                                <span className="text-sm font-medium">{loginMessage}</span>
                            </div>
                        )}

                        {authMode === 'main' && (
                            <>
                                <div className="text-center mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                                    <p className="text-gray-500 text-sm">Sign in to save your prompts and access pro features.</p>
                                </div>
                                <div className="space-y-4">
                                    <button onClick={handleFirebaseLogin} className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 rounded-xl py-3 font-medium hover:bg-gray-50 transition-colors">
                                        {authLoading ? <Loader2 className="animate-spin" size={20} /> : <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />}
                                        <span>Continue with Google</span>
                                    </button>
                                    <button onClick={handleTwitterLogin} className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 rounded-xl py-3 font-medium hover:bg-gray-50 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 462.799">
                                            <path fillRule="nonzero" d="M403.229 0h78.506L310.219 196.04 512 462.799H354.002L230.261 301.007 88.669 462.799h-78.56l183.455-209.683L0 0h161.999l111.856 147.88L403.229 0zm-27.556 415.805h43.505L138.363 44.527h-46.68l283.99 371.278z"/>
                                        </svg>
                                        <span>Continue with X</span>
                                    </button>
                                    <button onClick={() => setAuthMode('email-in')} className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 rounded-xl py-3 font-medium hover:bg-gray-50 transition-colors">
                                        <Mail size={18} />
                                        <span>Continue with Email</span>
                                    </button>
                                    <button onClick={() => setAuthMode('phone')} className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 rounded-xl py-3 font-medium hover:bg-gray-50 transition-colors">
                                        <Phone size={18} />
                                        <span>Continue with Phone</span>
                                    </button>
                                </div>
                            </>
                        )}
                        {(authMode === 'email-in' || authMode === 'email-up') && (
                            <div className="animate-fade-in">
                                <button onClick={() => setAuthMode('main')} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 mb-6">
                                    <ArrowLeft size={16} /> Back
                                </button>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">{authMode === 'email-in' ? 'Log In' : 'Sign Up'}</h2>
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black transition-colors" placeholder="name@example.com" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Password</label>
                                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black transition-colors" placeholder="••••••••" />
                                    </div>
                                    {authError && <p className="text-red-500 text-xs">{authError}</p>}
                                    <button onClick={handleEmailAuth} className="w-full bg-black text-white rounded-xl py-3 font-bold hover:bg-gray-800 transition-colors flex justify-center">{authLoading ? <Loader2 className="animate-spin" size={20} /> : (authMode === 'email-in' ? 'Log In' : 'Sign Up')}</button>
                                </div>
                                <div className="mt-6 text-center text-sm text-gray-500">
                                    {authMode === 'email-in' ? "Don't have an account? " : "Already have an account? "}
                                    <button onClick={() => { setAuthMode(authMode === 'email-in' ? 'email-up' : 'email-in'); setAuthError(''); }} className="text-black font-bold hover:underline">{authMode === 'email-in' ? 'Sign Up' : 'Log In'}</button>
                                </div>
                            </div>
                        )}
                        {authMode === 'phone' && (
                            <div className="animate-fade-in">
                                <button onClick={() => setAuthMode('main')} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 mb-6">
                                    <ArrowLeft size={16} /> Back
                                </button>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Phone Login</h2>
                                <div className="space-y-4">
                                    {!confirmationResult ? (
                                        <>
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold text-gray-500 uppercase">Phone Number</label>
                                                <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black transition-colors" placeholder="+1 555 555 5555" />
                                            </div>
                                            <div id="recaptcha-container"></div>
                                            {authError && <p className="text-red-500 text-xs">{authError}</p>}
                                            <button onClick={handlePhoneLogin} className="w-full bg-black text-white rounded-xl py-3 font-bold hover:bg-gray-800 transition-colors flex justify-center">{authLoading ? <Loader2 className="animate-spin" size={20} /> : 'Send Code'}</button>
                                        </>
                                    ) : (
                                        <>
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold text-gray-500 uppercase">Verification Code</label>
                                                <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black transition-colors text-center tracking-widest text-lg font-mono" placeholder="123456" />
                                            </div>
                                            {authError && <p className="text-red-500 text-xs">{authError}</p>}
                                            <button onClick={handleVerifyOtp} className="w-full bg-black text-white rounded-xl py-3 font-bold hover:bg-gray-800 transition-colors flex justify-center">{authLoading ? <Loader2 className="animate-spin" size={20} /> : 'Verify & Login'}</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                        {authMode === 'main' && (
                            <p className="text-center text-xs text-gray-400 mt-6">By continuing, you agree to our Terms of Service and Privacy Policy.</p>
                        )}
                      </>
                  )}
              </div>
          </div>
      )}

      {/* Main Content Area */}
      <div className={`flex-1 overflow-hidden relative ${isFloatingLayout ? 'p-3 pb-24 md:px-6 md:pb-6' : ''}`}>
         <div className={`w-full h-full bg-white overflow-hidden relative shadow-sm border border-gray-200 squircle-3xl`}>
             {currentView === 'home' && <HomeView onSubmit={handleInitialSubmit} onNavigate={(view) => navigateTo(view as ViewState)} user={user} />}
             {currentView === 'planning' && <PlanningView initialPrompt={initialPrompt} onBuild={handlePlanningBuild} creationMode={creationMode as any} />}
             {currentView === 'building' && <BuildingView onStop={handleStopGeneration} />}
             {currentView === 'dynamic-building' && <DynamicBuilderView initialPrompt={initialPrompt} onComplete={handleDynamicBuildComplete} />}

             {/* EDITOR */}
             {currentView === 'editor' && (
                 <div className="w-full h-full flex flex-col md:flex-row">
                    {isAskKindlyActive && (
                        <div className="hidden md:block h-full border-r border-gray-100 flex-shrink-0">
                            <AskKindlyPanel activeItem={activeItem} onUpdateItem={handleItemUpdate} onClose={() => setIsAskKindlyActive(false)} onGenerateCanvas={handleCanvasGeneration} user={user} requireAuth={requireAuth} />
                        </div>
                    )}
                    <PreviewArea item={activeItem} onToggleAskKindly={() => setIsAskKindlyActive(!isAskKindlyActive)} isAskKindlyActive={isAskKindlyActive} />
                 </div>
             )}

             {currentView === 'gallery' && <GalleryView items={galleryItems} onSelectItem={handleGallerySelection} onUpdateItems={setGalleryItems} />}

             {/* ASK KINDLY STUDIO */}
             {currentView === 'ask-kindly' && (
                 <div className="w-full h-full flex flex-col md:flex-row">
                    <div className="hidden md:block h-full border-r border-gray-100 flex-shrink-0">
                        <AskKindlyPanel 
                            activeItem={studioItem || undefined}
                            onUpdateItem={handleItemUpdate}
                            onClose={() => navigateTo('home')}
                            onGenerateCanvas={handleStudioGeneration}
                            isStudioMode={true}
                            user={user}
                            requireAuth={requireAuth}
                        />
                    </div>
                    <div className="flex-1 h-full">
                        {studioItem ? (
                            <PreviewArea 
                                item={studioItem} 
                                onToggleAskKindly={() => {}} 
                                isAskKindlyActive={true}
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-gray-50/50">
                                <div className="w-20 h-20 bg-white rounded-3xl border border-gray-200 shadow-sm flex items-center justify-center mb-6">
                                    <Sparkles size={40} className="text-gray-300" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Ask Kindly Studio</h3>
                                <p className="text-gray-500 max-w-sm leading-relaxed">
                                    Use the panel on the left to generate slides, documents, or new UI concepts. Your creations will appear here.
                                </p>
                            </div>
                        )}
                    </div>
                 </div>
             )}

             {/* PROFILE */}
             {currentView === 'profile' && user && (
                 <ProfileView user={user} items={galleryItems} onNavigate={navigateTo} onSignOut={handleSignOut} />
             )}

             {/* PUBLIC PROFILE */}
             {currentView === 'public-profile' && publicProfileUser && (
                 <ProfileView 
                    user={publicProfileUser} 
                    items={publicProfileItems} 
                    onNavigate={() => {}} 
                    viewMode="public"
                 />
             )}

             {currentView === 'library' && (
                <div className="w-full h-full flex flex-col md:flex-row">
                   <div className={`${isMobile ? 'w-full' : 'hidden md:block h-full border-r border-gray-100'}`}>
                      {isAskKindlyActive ? (
                            <AskKindlyPanel activeItem={activeItem} onUpdateItem={handleItemUpdate} onClose={() => setIsAskKindlyActive(false)} onGenerateCanvas={handleCanvasGeneration} user={user} requireAuth={requireAuth} />
                      ) : (
                          <Sidebar 
                            items={COMPONENT_ITEMS} 
                            selectedId={selectedId} 
                            onSelect={(id) => { setSelectedId(id); setCustomizedItem(null); if (isMobile) navigateTo('editor'); }} 
                            onNavigateToProfile={handleNavigateToPublicProfile}
                          />
                      )}
                   </div>
                   <div className="hidden md:block flex-1 h-full">
                       <PreviewArea item={activeItem} onToggleAskKindly={() => setIsAskKindlyActive(!isAskKindlyActive)} isAskKindlyActive={isAskKindlyActive} />
                   </div>
                </div>
             )}

              {currentView === 'design-systems' && (
                <div className="w-full h-full flex flex-col md:flex-row">
                   <div className={`${isMobile ? 'w-full' : 'hidden md:block h-full border-r border-gray-100'}`}>
                      {isAskKindlyActive ? (
                            <AskKindlyPanel activeItem={activeItem} onUpdateItem={handleItemUpdate} onClose={() => setIsAskKindlyActive(false)} onGenerateCanvas={handleCanvasGeneration} user={user} requireAuth={requireAuth} />
                      ) : (
                          <Sidebar items={DESIGN_SYSTEMS} selectedId={selectedId} onSelect={(id) => { setSelectedId(id); setCustomizedItem(null); if (isMobile) navigateTo('editor'); }} />
                      )}
                   </div>
                   <div className="hidden md:block flex-1 h-full">
                       <PreviewArea item={activeItem} onToggleAskKindly={() => setIsAskKindlyActive(!isAskKindlyActive)} isAskKindlyActive={isAskKindlyActive} />
                   </div>
                </div>
             )}
             
             {currentView === 'settings' && <SettingsView onBack={() => navigateTo('home')} />}
             {currentView === 'privacy' && <PrivacyView onBack={() => navigateTo('home')} />}
             {currentView === 'terms' && <TermsView onBack={() => navigateTo('home')} />}
             {currentView === 'docs' && <DocsView onBack={() => navigateTo('home')} />}
         </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
};

export default App;
