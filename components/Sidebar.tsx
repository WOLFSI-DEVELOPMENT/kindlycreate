
import React, { useState, useMemo } from 'react';
import { Eye, GitFork, Sparkles } from 'lucide-react';
import { SidebarProps } from '../types';

export const Sidebar: React.FC<SidebarProps> = ({ items, selectedId, onSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Smart Weighted Search Logic
  const filteredItems = useMemo(() => {
      if (!searchQuery.trim()) return items;

      const terms = searchQuery.toLowerCase().split(/\s+/).filter(Boolean);

      return items
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
  }, [items, searchQuery]);

  return (
    <div className="w-full md:w-[380px] h-full flex flex-col bg-white overflow-hidden">
      
      {/* Smart Search Header */}
      <div className="p-4 border-b border-gray-100 bg-white z-10 shrink-0">
          <div className="relative group">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <img src="https://iili.io/f8yBZN9.png" alt="AI" className="w-4 h-4 object-contain opacity-50 grayscale group-focus-within:grayscale-0 group-focus-within:opacity-100 transition-all" />
              </div>
              <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-50 hover:bg-gray-100 focus:bg-white border border-transparent focus:border-gray-200 rounded-full py-2 pl-9 pr-4 text-sm outline-none transition-all placeholder-gray-400"
                  placeholder="Ask Kindly Intelligence..."
              />
          </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {filteredItems.length === 0 ? (
            <div className="text-center py-10 px-4">
                <p className="text-sm text-gray-400">No results found for "{searchQuery}"</p>
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
                <div className={`w-20 h-16 squircle-sm flex-shrink-0 ${item.thumbnailClass} ${isSelected ? 'ring-2 ring-gray-200' : ''} flex items-center justify-center`}>
                    <div className="w-12 h-2 bg-black/5 rounded-full"></div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <h3 className={`text-sm font-semibold truncate ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                    {item.title}
                    </h3>
                    
                    {/* Stats */}
                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-1 mb-1.5">
                    <div className="flex items-center gap-1">
                        <Eye size={12} />
                        <span>{item.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <GitFork size={12} />
                        <span>{item.copies}</span>
                    </div>
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
