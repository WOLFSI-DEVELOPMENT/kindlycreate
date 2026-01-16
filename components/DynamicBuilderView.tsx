
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Sparkles } from 'lucide-react';
import { ComponentItem } from '../types';

interface DynamicBuilderViewProps {
  initialPrompt: string;
  onComplete: (item: ComponentItem) => void;
}

const getAI = () => {
  const apiKey = localStorage.getItem('kindly_api_key') || process.env.API_KEY;
  return new GoogleGenAI({ apiKey });
};

const YOUTUBE_API_KEY = "AIzaSyA8BjLi4xJdYNTjBhT4BA0p5HSTcLdultw";

// --- TEMPLATES ---

const generateSaaSTemplate = (data: any, images: string[]) => `
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><script src="https://cdn.tailwindcss.com"></script><link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"><style>body{font-family:'Plus Jakarta Sans',sans-serif;}</style></head>
<body class="bg-gray-50 text-gray-900">
  <!-- Nav -->
  <nav class="flex justify-between items-center py-6 px-10 bg-white border-b border-gray-100"><div class="text-xl font-bold text-blue-600">Nexus.</div><button class="bg-black text-white px-5 py-2 rounded-lg font-medium">Get Started</button></nav>
  
  <!-- Hero -->
  <div class="text-center py-24 px-6 max-w-5xl mx-auto">
    <div class="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 font-semibold text-sm mb-6 border border-blue-100">v2.0 Release</div>
    <h1 contenteditable="true" class="text-6xl md:text-7xl font-bold tracking-tight mb-8 leading-tight outline-none">${data.mainTitle}</h1>
    <p contenteditable="true" class="text-xl text-gray-500 max-w-2xl mx-auto mb-10 outline-none">${data.subtitle}</p>
    <div class="flex justify-center gap-4">
        <button class="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all">${data.callToAction}</button>
        <button class="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all">Documentation</button>
    </div>
  </div>

  <!-- Dashboard Preview -->
  <div class="max-w-6xl mx-auto px-6 mb-32">
    <div class="rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white p-2">
        <img src="${images[0]}" class="w-full rounded-xl" alt="App Preview" />
    </div>
  </div>

  <!-- Features Grid -->
  <div class="bg-white py-24 border-t border-gray-100">
    <div class="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        ${data.featureList.map((f: string, i: number) => `
        <div class="p-8 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors cursor-default group">
            <div class="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform">✦</div>
            <h3 contenteditable="true" class="text-xl font-bold mb-3 outline-none">${f}</h3>
            <p contenteditable="true" class="text-gray-500 leading-relaxed outline-none">Automated workflows that scale with your team's needs.</p>
        </div>`).join('')}
    </div>
  </div>
</body></html>`;

const generatePortfolioTemplate = (data: any, images: string[]) => `
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><script src="https://cdn.tailwindcss.com"></script><link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&display=swap" rel="stylesheet"><style>body{font-family:'Space Grotesk',sans-serif;}</style></head>
<body class="bg-[#0a0a0a] text-white selection:bg-white selection:text-black">
  <div class="max-w-7xl mx-auto px-6 py-12">
    <!-- Header -->
    <header class="flex justify-between items-end mb-32">
        <h1 contenteditable="true" class="text-8xl md:text-9xl font-bold leading-none tracking-tighter outline-none">${data.mainTitle.split(' ')[0]}<br/><span class="text-gray-600">${data.mainTitle.split(' ').slice(1).join(' ')}</span></h1>
        <div class="text-right hidden md:block">
            <p class="text-gray-400">Based in Tokyo</p>
            <p class="text-gray-400">Available for 2026</p>
        </div>
    </header>

    <!-- Gallery -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
        <div class="space-y-8">
            <div class="group relative overflow-hidden rounded-none cursor-pointer">
                <img src="${images[0]}" class="w-full grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" />
                <div class="absolute bottom-4 left-4 bg-white text-black px-4 py-1 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">Project Alpha</div>
            </div>
            <div class="p-12 border border-white/10 flex flex-col justify-between min-h-[400px]">
                <h3 class="text-4xl font-bold">${data.section1Title}</h3>
                <p class="text-xl text-gray-400 max-w-sm">${data.section1Body}</p>
            </div>
        </div>
        <div class="space-y-8 md:pt-32">
             <div class="p-12 bg-white text-black flex flex-col justify-center min-h-[300px]">
                <p class="text-2xl font-medium">"${data.quote}"</p>
                <span class="mt-4 text-sm uppercase tracking-widest">— ${data.quoteAuthor}</span>
            </div>
            <div class="group relative overflow-hidden rounded-none cursor-pointer">
                <img src="${images[1]}" class="w-full grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" />
            </div>
        </div>
    </div>

    <!-- Footer -->
    <div class="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <a href="#" class="text-4xl font-bold hover:text-gray-400 transition-colors underline decoration-1 underline-offset-8">hello@studio.com</a>
        <div class="flex gap-6 text-sm uppercase tracking-widest text-gray-500">
            <span>Instagram</span>
            <span>Twitter</span>
            <span>LinkedIn</span>
        </div>
    </div>
  </div>
</body></html>`;

const generateEditorialTemplate = (data: any, images: string[], videoId: string | null) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', sans-serif; }
    h1, h2, h3, .serif { font-family: 'Playfair Display', serif; }
    [contenteditable]:empty:before { content: attr(placeholder); color: #9ca3af; cursor: text; }
    [contenteditable]:focus { outline: none; }
  </style>
</head>
<body class="bg-white min-h-screen text-slate-900 pb-24">
  <div class="h-64 w-full bg-gradient-to-b from-blue-50 via-purple-50 to-white"></div>
  <div class="max-w-4xl mx-auto px-8 relative z-10 -mt-32">
      <div class="mb-20">
          <div class="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-widest text-purple-600 uppercase bg-purple-50 rounded-full border border-purple-100">Editorial</div>
          <h1 contenteditable="true" class="text-6xl md:text-7xl font-bold leading-tight mb-8 text-gray-900 outline-none">${data.mainTitle}</h1>
          <p contenteditable="true" class="text-2xl text-gray-500 font-light leading-relaxed outline-none max-w-2xl">${data.subtitle}</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
          <div>
              <h2 contenteditable="true" class="text-3xl font-bold mb-4 outline-none">${data.section1Title}</h2>
              <p contenteditable="true" class="text-lg text-gray-600 leading-relaxed outline-none">${data.section1Body}</p>
          </div>
          <div class="relative group">
              <div class="absolute -inset-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl opacity-50 group-hover:opacity-75 transition-opacity blur-lg"></div>
              <img src="${images[0]}" class="relative w-full aspect-[4/3] object-cover rounded-2xl shadow-sm" alt="Visual 1" />
          </div>
      </div>
      <div class="my-32 text-center max-w-2xl mx-auto">
          <p contenteditable="true" class="serif text-4xl italic text-gray-800 leading-normal mb-6 outline-none">"${data.quote}"</p>
          <p contenteditable="true" class="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase outline-none">— ${data.quoteAuthor}</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
          <div class="relative group order-2 md:order-1">
              <div class="absolute -inset-2 bg-gradient-to-tr from-orange-100 to-pink-100 rounded-3xl opacity-50 group-hover:opacity-75 transition-opacity blur-lg"></div>
              <img src="${images[1]}" class="relative w-full aspect-[4/3] object-cover rounded-2xl shadow-sm" alt="Visual 2" />
          </div>
          <div class="order-1 md:order-2">
              <h2 contenteditable="true" class="text-3xl font-bold mb-4 outline-none">${data.section2Title}</h2>
              <p contenteditable="true" class="text-lg text-gray-600 leading-relaxed outline-none">${data.section2Body}</p>
              <ul class="mt-6 space-y-3">
                  ${data.featureList.map((f: string) => `<li class="flex items-start gap-3"><span class="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5"></span><span contenteditable="true" class="text-gray-600 outline-none">${f}</span></li>`).join('')}
              </ul>
          </div>
      </div>
      <div class="mb-32 relative rounded-3xl overflow-hidden shadow-xl">
          <img src="${images[2]}" class="w-full h-96 object-cover" alt="Banner" />
          <div class="absolute inset-0 bg-black/20 flex items-center justify-center">
              <h3 contenteditable="true" class="text-white text-4xl font-bold text-center drop-shadow-lg outline-none">Visual Impact</h3>
          </div>
      </div>
      ${videoId ? `
      <div class="mb-32">
          <div class="text-center mb-12">
              <h2 contenteditable="true" class="text-3xl font-bold mb-4 outline-none">${data.videoTitle}</h2>
              <p contenteditable="true" class="text-lg text-gray-600 outline-none max-w-xl mx-auto">${data.videoDescription}</p>
          </div>
          <div class="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
              <iframe src="https://www.youtube.com/embed/${videoId}" class="absolute inset-0 w-full h-full" frameborder="0" allowfullscreen></iframe>
          </div>
      </div>` : ''}
      <div class="max-w-2xl mx-auto text-center">
          <h2 contenteditable="true" class="text-3xl font-bold mb-6 outline-none">Ready to Launch?</h2>
          <p contenteditable="true" class="text-lg text-gray-500 mb-8 outline-none">Summarize the article or provide a call to action here.</p>
          <button class="bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 shadow-lg">${data.callToAction}</button>
      </div>
  </div>
</body></html>`;

export const DynamicBuilderView: React.FC<DynamicBuilderViewProps> = ({ initialPrompt, onComplete }) => {
  const [status, setStatus] = useState('Initializing...');
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const buildDynamicPage = async () => {
        try {
            setStatus('Sourcing visuals...');
            
            // 1. Fetch Images (Pexels) & Video (YouTube)
            const images: string[] = [];
            let videoId: string | null = null;

            try {
                const pexelsRes = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(initialPrompt)}&per_page=3&orientation=landscape`, {
                    headers: { Authorization: "8Mh8jDK5VAgGnnmNYO2k0LqdaLL8lbIR4ou5Vnd8Zod0cETWahEx1MKf" }
                });
                if (pexelsRes.ok) {
                    const pexelsData = await pexelsRes.json();
                    if (pexelsData.photos) pexelsData.photos.forEach((p: any) => images.push(p.src.large2x));
                }
            } catch (e) { console.error("Pexels error", e); }

            try {
                const ytRes = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(initialPrompt)}&type=video&key=${YOUTUBE_API_KEY}`);
                if (ytRes.ok) {
                    const ytData = await ytRes.json();
                    if (ytData.items && ytData.items.length > 0) videoId = ytData.items[0].id.videoId;
                }
            } catch (e) { console.error("YouTube error", e); }

            while (images.length < 3) images.push(`https://placehold.co/800x600/f3f4f6/9ca3af?text=Image+${images.length + 1}`);

            setStatus('Drafting content...');

            // 2. Generate Content
            let contentData = {
                mainTitle: initialPrompt,
                subtitle: "A curated layout generated for your idea.",
                section1Title: "The Beginning",
                section1Body: "Start your story here.",
                quote: "Design is intelligence made visible.",
                quoteAuthor: "Alina Wheeler",
                section2Title: "The Process",
                section2Body: "Dive deeper into the details.",
                featureList: ["Key feature one", "Key feature two", "Key feature three"],
                callToAction: "Get Started",
                videoTitle: "Featured Content",
                videoDescription: "Watch to learn more."
            };

            try {
                const systemPrompt = `You are an expert editorial writer.
                Generate content for topic: "${initialPrompt}".
                Return valid JSON with keys: mainTitle, subtitle, section1Title, section1Body, quote, quoteAuthor, section2Title, section2Body, featureList (array), callToAction, videoTitle, videoDescription.`;

                const ai = getAI();
                const response = await ai.models.generateContent({
                    model: 'gemini-3-flash-preview',
                    contents: systemPrompt,
                });
                const cleanText = response.text?.replace(/```json/g, "").replace(/```/g, "").trim() || "{}";
                const json = JSON.parse(cleanText);
                contentData = { ...contentData, ...json };
            } catch (e) { console.error("AI Content Gen failed", e); }

            setStatus('Assembling template...');

            // 3. Determine Template & Generate HTML
            // Simple randomization or keyword detection logic
            const isSaaS = initialPrompt.toLowerCase().includes('saas') || initialPrompt.toLowerCase().includes('dashboard') || initialPrompt.toLowerCase().includes('startup');
            const isPortfolio = initialPrompt.toLowerCase().includes('portfolio') || initialPrompt.toLowerCase().includes('artist') || initialPrompt.toLowerCase().includes('gallery');
            
            let html = '';
            if (isSaaS) {
                html = generateSaaSTemplate(contentData, images);
            } else if (isPortfolio) {
                html = generatePortfolioTemplate(contentData, images);
            } else {
                html = generateEditorialTemplate(contentData, images, videoId);
            }

            await new Promise(r => setTimeout(r, 1000));

            const newItem: ComponentItem = {
                id: `dynamic-${Date.now()}`,
                title: initialPrompt,
                description: isSaaS ? "SaaS Landing Page" : (isPortfolio ? "Portfolio Gallery" : "Editorial Layout"),
                category: 'UI Component',
                type: 'dynamic',
                thumbnailClass: isSaaS ? 'bg-blue-50' : 'bg-gray-900',
                systemPrompt: initialPrompt,
                code: html,
                views: 0,
                copies: 0,
                createdAt: Date.now()
            };

            onComplete(newItem);

        } catch (error) {
            console.error(error);
            setStatus('Error creating page.');
        }
    };

    buildDynamicPage();
  }, [initialPrompt, onComplete]);

  return (
    <div className="w-full h-full bg-white relative flex flex-col font-sans overflow-hidden">
        <div className="h-48 bg-gradient-to-b from-blue-50 via-purple-50 to-white w-full shrink-0"></div>
        <div className="max-w-4xl mx-auto w-full px-8 -mt-20 relative z-10 flex-1 flex flex-col">
            <div className="space-y-4 mb-16 text-center">
                <div className="h-12 bg-gray-100 rounded-lg w-3/4 mx-auto animate-pulse"></div>
                <div className="h-4 bg-gray-50 rounded w-1/2 mx-auto animate-pulse"></div>
            </div>
            <div className="space-y-24">
                <div className="grid grid-cols-2 gap-12 items-center">
                    <div className="space-y-4">
                        <div className="h-6 bg-gray-100 rounded w-1/3 animate-pulse"></div>
                        <div className="space-y-2">
                            <div className="h-3 bg-gray-50 rounded w-full animate-pulse delay-75"></div>
                            <div className="h-3 bg-gray-50 rounded w-5/6 animate-pulse delay-150"></div>
                        </div>
                    </div>
                    <div className="aspect-[4/3] bg-gray-100 rounded-2xl animate-pulse"></div>
                </div>
            </div>
            <div className="absolute bottom-12 left-0 right-0 flex justify-center">
                <div className="bg-white border border-gray-100 shadow-lg rounded-full px-6 py-3 flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-blue-500 animate-spin-slow" />
                    <span className="text-sm font-medium text-gray-600">{status}</span>
                </div>
            </div>
        </div>
    </div>
  );
};
