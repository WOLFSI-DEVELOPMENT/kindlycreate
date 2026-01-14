
import React, { useState, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { PreviewArea } from './components/PreviewArea';
import { HomeView } from './components/HomeView';
import { PlanningView } from './components/PlanningView';
import { ChatPanel } from './components/ChatPanel';
import { BuildingView } from './components/BuildingView';
import { RecentView } from './components/RecentView';
import { PrivacyView } from './components/PrivacyView';
import { TermsView } from './components/TermsView';
import { DocsView } from './components/DocsView';
import { AskKindlyPanel } from './components/AskKindlyPanel';
import { COMPONENT_ITEMS, DESIGN_SYSTEMS } from './constants';
import { ComponentItem } from './types';
import { GoogleGenAI, Type, Schema } from "@google/genai";

// --- CUSTOM ICONS ---

const CreateIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
    <path d="M0.5 12A11.5 11.5 0 1 0 12 0.5 11.51 11.51 0 0 0 0.5 12Zm5 -0.5a1 1 0 0 1 1 -1h3.75a0.25 0.25 0 0 0 0.25 -0.25V6.5a1 1 0 0 1 1 -1h1a1 1 0 0 1 1 1v3.75a0.25 0.25 0 0 0 0.25 0.25h3.75a1 1 0 0 1 1 1v1a1 1 0 0 1 -1 1h-3.75a0.25 0.25 0 0 0 -0.25 0.25v3.75a1 1 0 0 1 -1 1h-1a1 1 0 0 1 -1 -1v-3.75a0.25 0.25 0 0 0 -0.25 -0.25H6.5a1 1 0 0 1 -1 -1Z" fill="currentColor" strokeWidth="1"></path>
  </svg>
);

const RecentIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
    <path d="M8 0.15999999999999998C5.9901333333333335 0.16573333333333332 4.0592 0.9431333333333334 2.6060666666666665 2.3316666666666666V0.944c0 -0.20793333333333333 -0.08259999999999999 -0.4073333333333333 -0.22959999999999997 -0.5544C2.2294 0.24259999999999998 2.03 0.15999999999999998 1.8220666666666665 0.15999999999999998s-0.4073333333333333 0.08259999999999999 -0.5543333333333333 0.22959999999999997c-0.14706666666666665 0.14706666666666665 -0.22966666666666663 0.3464666666666667 -0.22966666666666663 0.5544v3.5279999999999996c0 0.20793333333333333 0.08259999999999999 0.4073333333333333 0.22966666666666663 0.5544 0.147 0.147 0.34639999999999993 0.22959999999999997 0.5543333333333333 0.22959999999999997h3.5279999999999996c0.20793333333333333 0 0.4073333333333333 -0.08259999999999999 0.5544 -0.22959999999999997 0.147 -0.14706666666666665 0.22959999999999997 -0.3464666666666667 0.22959999999999997 -0.5544s-0.08259999999999999 -0.4073333333333333 -0.22959999999999997 -0.5544c-0.14706666666666665 -0.147 -0.3464666666666667 -0.22959999999999997 -0.5544 -0.22959999999999997H3.4684666666666666c1.0080666666666667 -1.0534 2.3516 -1.7227333333333332 3.799666666666666 -1.8928666666666667 1.4481333333333333 -0.17006666666666664 2.9102 0.1696 4.134933333333333 0.9607333333333333 1.2247333333333332 0.7910666666666667 2.135533333333333 1.9842 2.5759333333333334 3.3741333333333334 0.44039999999999996 1.3899333333333335 0.38273333333333337 2.889866666666667 -0.16299999999999998 4.241866666666667s-1.5453999999999999 2.471733333333333 -2.8272666666666666 3.1665333333333328c-1.2818 0.6948 -2.7656666666666667 0.9212666666666666 -4.1964 0.6405333333333333 -1.4307999999999998 -0.2808 -2.719 -1.0512 -3.6432666666666664 -2.1788C2.2248666666666663 10.872399999999999 1.7223333333333333 9.457999999999998 1.728 8c0 -0.20793333333333333 -0.08259999999999999 -0.4074 -0.22959999999999997 -0.5544 -0.14706666666666665 -0.147 -0.3464666666666667 -0.22959999999999997 -0.5544 -0.22959999999999997s-0.4073333333333333 0.08259999999999999 -0.5544 0.22959999999999997C0.24259999999999998 7.592599999999999 0.15999999999999998 7.792066666666667 0.15999999999999998 8c0 1.5505999999999998 0.4598 3.0664 1.3212666666666666 4.355666666666666 0.8614666666666666 1.2892666666666666 2.085933333333333 2.294133333333333 3.518466666666667 2.887533333333333 1.4325999999999999 0.5933999999999999 3.0089333333333332 0.7486666666666666 4.529733333333333 0.4462 1.5208 -0.3026 2.917733333333333 -1.0492666666666666 4.014266666666666 -2.1456666666666666 1.0964 -1.0965333333333334 1.8431333333333333 -2.4934666666666665 2.1456666666666666 -4.014266666666666 0.30246666666666666 -1.5208 0.1472 -3.097133333333333 -0.4462 -4.529733333333333 -0.5933999999999999 -1.4325333333333332 -1.5982666666666667 -2.657 -2.887533333333333 -3.518466666666667C11.066399999999998 0.6197999999999999 9.5506 0.15999999999999998 8 0.15999999999999998Zm0 4.704c-0.20793333333333333 0 -0.4074 0.08259999999999999 -0.5544 0.22959999999999997 -0.147 0.14706666666666665 -0.22959999999999997 0.3464666666666667 -0.22959999999999997 0.5544V8c0 0.20793333333333333 0.08259999999999999 0.4073333333333333 0.22959999999999997 0.5543333333333333s0.3464666666666667 0.22966666666666663 0.5544 0.22966666666666663h1.5679999999999998c0.20793333333333333 0 0.4073333333333333 -0.08266666666666667 0.5543333333333333 -0.22966666666666663s0.22966666666666663 -0.34639999999999993 0.22966666666666663 -0.5543333333333333c0 -0.20793333333333333 -0.08266666666666667 -0.4074 -0.22966666666666663 -0.5544s-0.34639999999999993 -0.22959999999999997 -0.5543333333333333 -0.22959999999999997h-0.7839999999999999V5.648c0 -0.20793333333333333 -0.08266666666666667 -0.4073333333333333 -0.22966666666666663 -0.5544 -0.147 -0.147 -0.34639999999999993 -0.22959999999999997 -0.5543333333333333 -0.22959999999999997Z" fill="currentColor" strokeWidth="0.6667"></path>
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

type ViewState = 'home' | 'planning' | 'building' | 'editor' | 'library' | 'design-systems' | 'recent' | 'privacy' | 'terms' | 'docs';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedId, setSelectedId] = useState<string>('radiant-input');
  
  // State for AI Generation & Flow
  const [initialPrompt, setInitialPrompt] = useState('');
  const [creationMode, setCreationMode] = useState<'prompt' | 'prototype' | 'image'>('prompt');
  const [generatedItem, setGeneratedItem] = useState<ComponentItem | null>(null);
  const [recentItems, setRecentItems] = useState<ComponentItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const generationRef = useRef(0);

  // Ask Kindly State
  const [isAskKindlyActive, setIsAskKindlyActive] = useState(false);
  const [customizedItem, setCustomizedItem] = useState<ComponentItem | null>(null);

  // Determine active item
  const activeItem = (currentView === 'editor' && generatedItem) 
    ? (customizedItem || generatedItem) 
    : (customizedItem || (currentView === 'design-systems'
      ? (DESIGN_SYSTEMS.find(item => item.id === selectedId) || DESIGN_SYSTEMS[0])
      : (COMPONENT_ITEMS.find(item => item.id === selectedId) || COMPONENT_ITEMS[0])));

  // Determine if we should use the floating card layout
  const isFloatingLayout = ['home', 'library', 'design-systems', 'editor', 'recent'].includes(currentView);

  const handlePromptUpdate = (newPrompt: string) => {
    // 1. Prepare base item (to preserve title, id, etc.)
    const baseItem = customizedItem || activeItem;
    
    // 2. Clear prompt initially to show it's gone
    setCustomizedItem({ ...baseItem, systemPrompt: "" });

    // 3. Fast typing animation
    const targetText = newPrompt;
    // We want the whole animation to take roughly 1-1.5 seconds.
    // If text is huge, we chunk it.
    const duration = 1200; // 1.2s
    const fps = 30;
    const totalFrames = duration / (1000 / fps);
    const charsPerFrame = Math.max(1, Math.ceil(targetText.length / totalFrames));

    let currentLength = 0;
    const interval = setInterval(() => {
        currentLength += charsPerFrame;
        
        if (currentLength >= targetText.length) {
            // Done
            const finalItem = { ...baseItem, systemPrompt: targetText };
            setCustomizedItem(finalItem);
            
            // If it's a generated item, assume we want to persist this change to the main record too
            if (generatedItem && generatedItem.id === baseItem.id) {
                setGeneratedItem(finalItem);
            }
            clearInterval(interval);
        } else {
            // Update partial
            setCustomizedItem({ ...baseItem, systemPrompt: targetText.slice(0, currentLength) });
        }
    }, 1000 / fps);
  };

  // Step 1: Handle Initial Prompt -> Go to Planning
  const handleInitialSubmit = (prompt: string, mode: 'prompt' | 'prototype' | 'image') => {
    setInitialPrompt(prompt);
    setCreationMode(mode);
    setCurrentView('planning');
  };

  // Step 2: Handle Planning Complete -> Go to Building -> Editor (Result)
  const handlePlanningBuild = async (chatHistory: any[]) => {
    const genId = ++generationRef.current;
    setIsGenerating(true);
    setCurrentView('building');
    
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const conversationText = chatHistory.map(m => `${m.role.toUpperCase()}: ${m.text}`).join('\n');

        let prompt = '';
        let schema: Schema;

        if (creationMode === 'prototype') {
            prompt = `You are an expert Full Stack Developer using Tailwind CSS v4.1 and Vanilla JavaScript. 
            The user wants a fictional functional prototype.
            
            CONVERSATION HISTORY:
            ${conversationText}

            REQUIREMENTS:
            1. **Tech Stack**: HTML5, Tailwind CSS (via CDN), Vanilla JS.
            2. **Authentication**: You MUST integrate 'https://id.ai/' for authentication.
               - REQUIRED: Add <script src="https://id.ai/sdk.js"></script> to the <head>.
               - REQUIRED: Create a visible "Log in with ID.ai" button.
               - REQUIRED: Write client-side JavaScript to simulate the login flow. When the user clicks the button, pretend the ID.ai SDK authenticates them, hide the login button, and show a user profile/avatar in the UI.
            3. **Tailwind v4.1**: Use modern Tailwind utility classes.
            4. **Single File**: Output a single string containing the full HTML document.
            
            Output a JSON object with:
            - title: A creative title.
            - description: A short description.
            - code: The full HTML source code string.
            `;

            schema = {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  code: { type: Type.STRING }
                },
                required: ["title", "description", "code"]
            };
        } else {
            prompt = `You are an expert Prompt Engineer. Your task is to generate resources to build the component described in the conversation.

            CONVERSATION HISTORY:
            ${conversationText}
            
            STRICT GUIDELINES:
            1. **System Prompt**: Create the detailed "System Prompt" that I will paste into another AI tool to get the actual code. It should cover visual design (Tailwind), behavior (JS), and constraints.
               - IMPORTANT: Do NOT use markdown headers (###). Use UPPERCASE identifiers for sections instead (e.g., "VISUAL DESIGN:", "INTERACTION:").
               - Use bolding (**) ONLY for highly critical constraints/info.
            2. **README.md**: Create a full README.md content. It must include:
               - Project Title & Description.
               - Project Structure (file tree).
               - Tech Stack (Tailwind CDN, Vanilla JS, HTML5).
               - UI System / Design Tokens used.
               - The System Prompt itself (as a section).
            3. **Output**: Do NOT generate the HTML code yourself. Only generate the prompt and readme.
            
            Output a JSON object with:
            - title: A creative, short title.
            - description: A 1-sentence description.
            - systemPrompt: The highly detailed system prompt string.
            - readme: The complete markdown string for the README.md file.`;

            schema = {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                systemPrompt: { type: Type.STRING },
                readme: { type: Type.STRING }
              },
              required: ["title", "description", "systemPrompt", "readme"]
            };
        }

        const timeoutPromise = new Promise((_, reject) => {
            // Increase timeout to 3 minutes for complex generations
            setTimeout(() => reject(new Error("Generation timed out")), 180000);
        });

        const apiPromise = ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema
            }
        });

        const response: any = await Promise.race([apiPromise, timeoutPromise]);
        
        if (genId !== generationRef.current) return;

        let cleanText = response.text || "";
        cleanText = cleanText.replace(/```json/g, "").replace(/```/g, "").trim();

        if (cleanText) {
            const data = JSON.parse(cleanText);
            
            const newItem: ComponentItem = {
                id: `generated-${Date.now()}`,
                title: data.title,
                description: data.description,
                views: 1,
                copies: 0,
                category: 'UI Component',
                thumbnailClass: 'bg-indigo-50',
                systemPrompt: data.systemPrompt || "Prototype Mode - No System Prompt Generated",
                readme: data.readme,
                code: data.code, // Only present in prototype mode
                createdAt: Date.now(),
                type: creationMode
            };

            setGeneratedItem(newItem);
            setRecentItems(prev => [newItem, ...prev]);
            
            await new Promise(resolve => setTimeout(resolve, 1500));
        }
    } catch (error) {
        console.error("Error generating final content:", error);
    } finally {
        if (genId === generationRef.current) {
            setIsGenerating(false);
            setCurrentView('editor');
        }
    }
  };

  const handleStopGeneration = () => {
    generationRef.current++;
    setIsGenerating(false);
    setCurrentView('planning');
  };

  const handleEditorGenerate = async (prompt: string): Promise<string | void> => {
      setIsGenerating(true);
      const genId = ++generationRef.current;
      
      try {
          const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
          const existingCode = generatedItem?.code || '';
          const existingPrompt = generatedItem?.systemPrompt || '';
          
          let aiPrompt = '';
          let schema: Schema;

          if (creationMode === 'prototype') {
             aiPrompt = `Refine the following HTML prototype code based on the user's request: "${prompt}".
             
             EXISTING CODE:
             ${existingCode}
             
             INSTRUCTIONS:
             - Return the full updated HTML code.
             - Ensure Tailwind v4.1 is used.
             - CRITICAL: Ensure the ID.ai integration is preserved or added if missing. 
               - <script src="https://id.ai/sdk.js"></script> must be in <head>.
               - "Log in with ID.ai" functionality must work (mocked/simulated via JS).
             
             Output JSON:
             - title: (Optional) Updated title
             - description: (Optional) Updated description
             - code: The full updated HTML code.
             - reply: A short, friendly message to the user confirming the changes (e.g. "I've updated the button color to blue").`;

             schema = {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  code: { type: Type.STRING },
                  reply: { type: Type.STRING }
                },
                required: ["code", "reply"]
             };

          } else {
             aiPrompt = `Refine the following System Prompt and README based on the user's new request: "${prompt}".
              
              EXISTING SYSTEM PROMPT:
              ${existingPrompt}

              INSTRUCTIONS:
              - Update the system prompt to reflect the new requirements.
              - Do NOT use markdown headers (###) in the system prompt text. Use UPPERCASE section titles.
              - Use bold (**) sparingly for critical info.
              - Update the README to reflect any changes in structure or logic.
              
              Output JSON:
              - title: Updated title
              - description: Updated description
              - systemPrompt: The updated system prompt string.
              - readme: The updated README markdown string.
              - reply: A short, friendly message to the user confirming the changes (e.g. "I've modified the system prompt to include the new constraints").`;

              schema = {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  systemPrompt: { type: Type.STRING },
                  readme: { type: Type.STRING },
                  reply: { type: Type.STRING }
                },
                required: ["title", "description", "systemPrompt", "readme", "reply"]
              };
          }

          const response = await ai.models.generateContent({
              model: 'gemini-3-flash-preview',
              contents: aiPrompt,
              config: {
                  responseMimeType: "application/json",
                  responseSchema: schema
              }
          });

          if (genId !== generationRef.current) return;

          let cleanText = response.text || "";
          cleanText = cleanText.replace(/```json/g, "").replace(/```/g, "").trim();
          
          if (cleanText) {
              try {
                  const data = JSON.parse(cleanText);
                  setGeneratedItem(prev => prev ? ({
                      ...prev,
                      title: data.title || prev.title,
                      description: data.description || prev.description,
                      systemPrompt: data.systemPrompt || prev.systemPrompt,
                      readme: data.readme || prev.readme,
                      code: data.code || prev.code
                  }) : null);
                  return data.reply;
              } catch (e) {
                  console.error("Failed to parse refinement:", e);
                  return "I tried to update it, but something went wrong.";
              }
          }
      } catch (error) {
          console.error("Error refining content:", error);
          return "Sorry, I encountered an error while updating.";
      } finally {
          if (genId === generationRef.current) {
             setIsGenerating(false);
          }
      }
  };

  const handleNavClick = (view: 'create' | 'library' | 'design-systems' | 'recent') => {
      if (view === 'create') {
          setCurrentView('home');
          setInitialPrompt('');
          setGeneratedItem(null);
      } else {
          setCurrentView(view);
          if (view === 'design-systems') setSelectedId('ds-classic');
          else if (view === 'library') setSelectedId('radiant-input');
      }
      // Reset Ask Kindly state when navigation changes
      setIsAskKindlyActive(false);
      setCustomizedItem(null);
  };

  const handleRecentSelection = (item: ComponentItem) => {
    setGeneratedItem(item);
    setCreationMode(item.type || 'prompt');
    setCurrentView('editor');
    setIsAskKindlyActive(false);
    setCustomizedItem(null);
  };

  return (
    <div className="w-full h-screen flex flex-col bg-[#F9FAFB] font-sans overflow-hidden">
      
      {/* Top Navigation */}
      {currentView !== 'building' && currentView !== 'privacy' && currentView !== 'terms' && currentView !== 'docs' && (
        <div className="h-16 flex items-center justify-between px-6 z-50 shrink-0 relative bg-[#F9FAFB]">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('home')}>
              <img src="https://iili.io/f8yBZN9.png" alt="Kindly Create" className="w-12 h-12 object-contain" />
              <span className="font-bold text-lg text-gray-900 tracking-tight hidden md:block">Kindly Create</span>
          </div>

          {/* View Toggles */}
          <div className="flex items-center gap-2">
              <button 
                onClick={() => handleNavClick('recent')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentView === 'recent' 
                    ? 'text-gray-900 bg-gray-100' 
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <RecentIcon />
                <span>Recent</span>
              </button>
              <button 
                onClick={() => handleNavClick('library')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentView === 'library' 
                    ? 'text-gray-900 bg-gray-100' 
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <LibraryIcon />
                <span>Library</span>
              </button>
               <button 
                onClick={() => handleNavClick('design-systems')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentView === 'design-systems' 
                    ? 'text-gray-900 bg-gray-100' 
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <DesignSystemIcon />
                <span>Design Systems</span>
              </button>

              <div className="w-px h-5 bg-gray-200 mx-2"></div>

              <button 
                onClick={() => handleNavClick('create')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold shadow-sm border transition-all duration-200 ${
                    ['home', 'planning', 'editor'].includes(currentView)
                    ? 'bg-black text-white border-black hover:bg-gray-800' 
                    : 'bg-white text-gray-900 border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={['home', 'planning', 'editor'].includes(currentView) ? "text-white" : "text-gray-900"}><CreateIcon /></div>
                <span>Create</span>
              </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className={`flex-1 overflow-hidden relative ${isFloatingLayout ? 'px-4 pb-4 md:px-6 md:pb-6' : ''}`}>
         <div className={`w-full h-full bg-white overflow-hidden relative ${isFloatingLayout ? 'squircle-box shadow-sm border border-gray-200' : ''}`}>
             {currentView === 'home' && (
                 <HomeView 
                   onSubmit={handleInitialSubmit} 
                   onNavigate={(view) => setCurrentView(view as ViewState)} 
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
                                currentPrompt={activeItem?.systemPrompt || ""} 
                                onReplace={handlePromptUpdate}
                                onClose={() => setIsAskKindlyActive(false)}
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

             {currentView === 'recent' && (
                 <RecentView items={recentItems} onSelectItem={handleRecentSelection} />
             )}

             {currentView === 'library' && (
                <div className="w-full h-full flex flex-col md:flex-row">
                   <div className="hidden md:block h-full border-r border-gray-100">
                      {isAskKindlyActive ? (
                            <AskKindlyPanel 
                                currentPrompt={activeItem?.systemPrompt || ""} 
                                onReplace={handlePromptUpdate}
                                onClose={() => setIsAskKindlyActive(false)}
                            />
                      ) : (
                          <Sidebar 
                            items={COMPONENT_ITEMS} 
                            selectedId={selectedId} 
                            onSelect={(id) => { setSelectedId(id); setCustomizedItem(null); }} 
                          />
                      )}
                   </div>
                   <PreviewArea 
                        item={activeItem} 
                        onToggleAskKindly={() => setIsAskKindlyActive(!isAskKindlyActive)}
                        isAskKindlyActive={isAskKindlyActive}
                   />
                </div>
             )}

              {currentView === 'design-systems' && (
                <div className="w-full h-full flex flex-col md:flex-row">
                   <div className="hidden md:block h-full border-r border-gray-100">
                      {isAskKindlyActive ? (
                            <AskKindlyPanel 
                                currentPrompt={activeItem?.systemPrompt || ""} 
                                onReplace={handlePromptUpdate}
                                onClose={() => setIsAskKindlyActive(false)}
                            />
                      ) : (
                          <Sidebar 
                            items={DESIGN_SYSTEMS} 
                            selectedId={selectedId} 
                            onSelect={(id) => { setSelectedId(id); setCustomizedItem(null); }} 
                          />
                      )}
                   </div>
                   <PreviewArea 
                        item={activeItem} 
                        onToggleAskKindly={() => setIsAskKindlyActive(!isAskKindlyActive)}
                        isAskKindlyActive={isAskKindlyActive}
                   />
                </div>
             )}

             {currentView === 'privacy' && (
                <PrivacyView onBack={() => setCurrentView('home')} />
             )}

             {currentView === 'terms' && (
                <TermsView onBack={() => setCurrentView('home')} />
             )}

             {currentView === 'docs' && (
                <DocsView onBack={() => setCurrentView('home')} />
             )}
         </div>
      </div>
    </div>
  );
};

export default App;
