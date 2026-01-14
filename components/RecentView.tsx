
import React, { useState, useMemo } from 'react';
import { ComponentItem } from '../types';
import { Eye, Clock, FileCode, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';

interface RecentViewProps {
  items: ComponentItem[];
  onSelectItem: (item: ComponentItem) => void;
}

export const RecentView: React.FC<RecentViewProps> = ({ items, onSelectItem }) => {
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
                if (title.startsWith(term)) score += 5;
            });

            return { item, score };
        })
        .filter(result => result.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(result => result.item);
  }, [items, searchQuery]);

  return (
    <div className="w-full h-full overflow-y-auto bg-[#F9FAFB] font-sans p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Recent Creations</h1>
            <p className="text-gray-500">Your history of generated prompts and prototypes.</p>
          </div>

          {/* Smart Search Input */}
          <div className="relative group w-full md:w-96">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <img src="https://iili.io/f8yBZN9.png" alt="AI" className="w-4 h-4 object-contain opacity-50 grayscale group-focus-within:grayscale-0 group-focus-within:opacity-100 transition-all" />
              </div>
              <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-gray-200 focus:border-blue-500 rounded-full py-3 pl-9 pr-6 text-sm outline-none transition-all placeholder-gray-400 shadow-sm focus:shadow-md"
                  placeholder="Ask Kindly Intelligence..."
              />
          </div>
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && items.length > 0 && (
             <div className="text-center py-20">
                <p className="text-gray-400">No results matching "{searchQuery}"</p>
             </div>
        )}

        {items.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
             <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
               <Clock size={32} />
             </div>
             <h3 className="text-lg font-semibold text-gray-900 mb-2">No recent activity</h3>
             <p className="text-gray-500 max-w-sm text-center">Start creating by generating a prompt or building a prototype from the home page.</p>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              onClick={() => onSelectItem(item)}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all cursor-pointer group flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-4">
                 <div className={`p-2 rounded-lg ${item.type === 'prototype' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                    {item.type === 'prototype' ? <FileCode size={20} /> : <MessageSquare size={20} />}
                 </div>
                 <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Just now'}
                 </span>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">{item.title}</h3>
              <p className="text-sm text-gray-500 mb-6 line-clamp-3 leading-relaxed flex-1">
                {item.description}
              </p>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                 <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Eye size={14} />
                    <span>View Details</span>
                 </div>
                 <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-black group-hover:text-white transition-all">
                    <ArrowRight size={14} />
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
