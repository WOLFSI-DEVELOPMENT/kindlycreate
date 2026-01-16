
import React, { useState, useMemo, useEffect } from 'react';
import { Eye, GitFork, Sparkles, Globe, Lock, User } from 'lucide-react';
import { SidebarProps, ComponentItem } from '../types';
import { db } from '../firebase';
import { collection, query, orderBy, limit, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

export const Sidebar: React.FC<SidebarProps> = ({ items, selectedId, onSelect, onNavigateToProfile }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'curated' | 'community'>('curated');
  const [communityItems, setCommunityItems] = useState<ComponentItem[]>([]);
  const [loadingCommunity, setLoadingCommunity] = useState(false);

  // Fetch Community Items
  useEffect(() => {
    if (activeTab === 'community') {
      const fetchCommunity = async () => {
        setLoadingCommunity(true);
        try {
          const q = query(collection(db, "community_prompts"), orderBy("publishedAt", "desc"), limit(50));
          const querySnapshot = await getDocs(q);
          const fetchedItems: ComponentItem[] = [];
          querySnapshot.forEach((doc) => {
            // Map Firestore data to ComponentItem
            const data = doc.data();
            fetchedItems.push({ 
                id: doc.id, 
                ...data,
                // Ensure required fields exist
                title: data.title || "Untitled",
                description: data.description || "No description",
                views: data.views || 0,
                copies: data.copies || 0,
                category: data.category || 'UI Component',
                thumbnailClass: data.thumbnailClass || 'bg-gray-100',
                systemPrompt: data.systemPrompt || '',
            } as ComponentItem);
          });
          setCommunityItems(fetchedItems);
        } catch (error) {
          console.error("Error fetching community items:", error);
        } finally {
          setLoadingCommunity(false);
        }
      };
      fetchCommunity();
    }
  }, [activeTab]);

  // Determine which list to filter
  const sourceItems = activeTab === 'curated' ? items : communityItems;

  // Smart Weighted Search Logic
  const filteredItems = useMemo(() => {
      if (!searchQuery.trim()) return sourceItems;

      const terms = searchQuery.toLowerCase().split(/\s+/).filter(Boolean);

      return sourceItems
        .map(item => {
            let score = 0;
            const title = item.title.toLowerCase();
            const desc = item.description.toLowerCase();
            const prompt = (item.systemPrompt || '').toLowerCase();

            terms.forEach(term => {
                if (title.includes(term)) score += 10;
                if (desc.includes(term)) score += 5;
                if (prompt.includes(term)) score += 2;
                if (title.startsWith(term)) score += 5; // Bonus for starting match
            });

            return { item, score };
        })
        .filter(result => result.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(result => result.item);
  }, [sourceItems, searchQuery]);

  return (
    <div className="w-full md:w-[380px] h-full flex flex-col bg-white overflow-hidden">
      
      {/* Header & Search */}
      <div className="p-4 border-b border-gray-100 bg-white z-10 shrink-0 space-y-3">
          {/* Tabs */}
          <div className="flex bg-gray-100 p-1 rounded-xl">
              <button 
                onClick={() => setActiveTab('curated')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'curated' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                  <Lock size={12} /> Curated
              </button>
              <button 
                onClick={() => setActiveTab('community')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'community' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                  <Globe size={12} /> Community
              </button>
          </div>

          <div className="relative group">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <img src="https://iili.io/f8yBZN9.png" alt="AI" className="w-4 h-4 object-contain opacity-50 grayscale group-focus-within:grayscale-0 group-focus-within:opacity-100 transition-all" />
              </div>
              <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-50 hover:bg-gray-100 focus:bg-white border border-transparent focus:border-gray-200 rounded-full py-2 pl-9 pr-4 text-sm outline-none transition-all placeholder-gray-400"
                  placeholder={activeTab === 'curated' ? "Search curated library..." : "Search community..."}
              />
          </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {loadingCommunity && activeTab === 'community' ? (
            <div className="flex flex-col items-center justify-center py-10 space-y-3">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xs text-gray-400">Loading community...</p>
            </div>
        ) : filteredItems.length === 0 ? (
            <div className="text-center py-10 px-4">
                <p className="text-sm text-gray-400">No results found.</p>
                {activeTab === 'community' && <p className="text-xs text-gray-300 mt-1">Be the first to publish!</p>}
            </div>
        ) : (
            filteredItems.map((item) => {
            const isSelected = item.id === selectedId;
            return (
                <div
                key={item.id}
                onClick={() => onSelect(item.id)}
                className={`group flex items-start gap-4 p-3 squircle cursor-pointer transition-all duration-200 ${
                    isSelected
                    ? 'bg-gray-50 shadow-sm'
                    : 'bg-transparent hover:bg-white hover:shadow-sm'
                }`}
                >
                {/* Thumbnail Placeholder */}
                <div className={`w-20 h-16 squircle-sm flex-shrink-0 ${item.thumbnailClass} ${isSelected ? 'ring-2 ring-gray-200' : ''} flex items-center justify-center overflow-hidden bg-gray-100 text-gray-400`}>
                    {activeTab === 'community' ? (
                        <div className="w-full h-full flex flex-col items-center justify-center">
                            <Globe size={16} className="mb-1 opacity-50" />
                            {item.isPaid && <span className="text-[10px] bg-black text-white px-1.5 rounded-sm font-bold">${item.price}</span>}
                        </div>
                    ) : (
                        <div className="w-12 h-2 bg-black/5 rounded-full"></div>
                    )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <h3 className={`text-sm font-semibold truncate ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                    {item.title}
                    </h3>
                    
                    {/* Stats */}
                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-1 mb-1.5">
                        {activeTab === 'community' && (item as any).authorName ? (
                            <div 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if(onNavigateToProfile && item.authorId) onNavigateToProfile(item.authorId, item.authorName || 'User');
                                }}
                                className="flex items-center gap-1 text-blue-500 font-medium truncate max-w-[100px] hover:underline cursor-pointer"
                            >
                                <User size={10} />
                                <span className="truncate">{(item as any).authorName}</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-1">
                                <Eye size={12} />
                                <span>{item.views.toLocaleString()}</span>
                            </div>
                        )}
                        
                        {activeTab === 'curated' && (
                            <div className="flex items-center gap-1">
                                <GitFork size={12} />
                                <span>{item.copies}</span>
                            </div>
                        )}
                    </div>

                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {item.description}
                    </p>
                </div>
                </div>
            );
            })
        )}
      </div>
    </div>
  );
};
