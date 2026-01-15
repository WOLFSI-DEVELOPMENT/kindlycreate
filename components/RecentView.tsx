
import React, { useState, useMemo, useRef } from 'react';
import { ComponentItem } from '../types';
import { 
  Folder, File, Image as ImageIcon, FileCode, MessageSquare, 
  MoreHorizontal, Plus, Search, ArrowLeft, Upload, Grid, List 
} from 'lucide-react';

interface GalleryViewProps {
  items: ComponentItem[];
  onSelectItem: (item: ComponentItem) => void;
  onUpdateItems: (items: ComponentItem[]) => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({ items, onSelectItem, onUpdateItems }) => {
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Helpers ---

  const currentFolder = items.find(i => i.id === currentFolderId);
  
  const breadcrumbs = useMemo(() => {
    const path = [];
    let curr = currentFolderId;
    while (curr) {
        const folder = items.find(i => i.id === curr);
        if (folder) {
            path.unshift(folder);
            curr = folder.parentId || null;
        } else {
            break;
        }
    }
    return path;
  }, [currentFolderId, items]);

  const filteredItems = useMemo(() => {
      let filtered = items.filter(item => item.parentId === (currentFolderId || undefined));
      
      // If searching, search EVERYTHING and ignore folders structure
      if (searchQuery.trim()) {
          const terms = searchQuery.toLowerCase().split(/\s+/).filter(Boolean);
          filtered = items.filter(item => {
              const text = (item.title + item.description).toLowerCase();
              return terms.every(term => text.includes(term));
          });
      }

      // Sort: Folders first, then new to old
      return filtered.sort((a, b) => {
          if (a.type === 'folder' && b.type !== 'folder') return -1;
          if (a.type !== 'folder' && b.type === 'folder') return 1;
          return (b.createdAt || 0) - (a.createdAt || 0);
      });
  }, [items, currentFolderId, searchQuery]);

  // --- Actions ---

  const handleCreateFolder = () => {
      const name = prompt("Folder Name:");
      if (!name) return;
      
      const newFolder: ComponentItem = {
          id: `folder-${Date.now()}`,
          title: name,
          description: "Folder",
          category: 'Folder',
          type: 'folder',
          thumbnailClass: 'bg-yellow-50',
          systemPrompt: '',
          views: 0,
          copies: 0,
          createdAt: Date.now(),
          parentId: currentFolderId
      };
      
      onUpdateItems([newFolder, ...items]);
      setIsCreateMenuOpen(false);
  };

  const handleCreatePrompt = () => {
      const title = prompt("Title for your prompt:");
      if (!title) return;
      const promptText = prompt("Enter your prompt text:");
      if (!promptText) return;

      const newItem: ComponentItem = {
          id: `prompt-${Date.now()}`,
          title: title,
          description: promptText,
          category: 'UI Component',
          type: 'prompt',
          thumbnailClass: 'bg-blue-50',
          systemPrompt: promptText,
          views: 0,
          copies: 0,
          createdAt: Date.now(),
          parentId: currentFolderId
      };
      
      onUpdateItems([newItem, ...items]);
      setIsCreateMenuOpen(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files || files.length === 0) return;

      const newItems: ComponentItem[] = [];

      Array.from(files).forEach((file: File) => {
          const isImage = file.type.startsWith('image/');
          const reader = new FileReader();
          
          reader.onload = (event) => {
              const content = event.target?.result as string;
              
              const newItem: ComponentItem = {
                  id: `file-${Date.now()}-${Math.random()}`,
                  title: file.name,
                  description: `Uploaded ${isImage ? 'Image' : 'File'}`,
                  category: isImage ? 'UI Component' : 'File',
                  type: isImage ? 'image' : 'file',
                  thumbnailClass: isImage ? 'bg-gray-100' : 'bg-gray-50',
                  systemPrompt: isImage ? 'Image Asset' : 'File Content',
                  code: isImage ? `<img src="${content}" alt="${file.name}" class="w-full h-auto" />` : content,
                  views: 0,
                  copies: 0,
                  createdAt: Date.now(),
                  parentId: currentFolderId
              };
              
              // We need to update state safely considering async FileReader
              // For simplicity in this demo, we'll force a re-render by calling update immediately for each
              // In prod, you'd promise.all these
              onUpdateItems(prev => [newItem, ...prev]);
          };

          if (isImage) {
              reader.readAsDataURL(file);
          } else {
              reader.readAsText(file);
          }
      });
      
      setIsCreateMenuOpen(false);
  };

  const handleItemClick = (item: ComponentItem) => {
      if (item.type === 'folder') {
          setCurrentFolderId(item.id);
          setSearchQuery('');
      } else {
          onSelectItem(item);
      }
  };

  const getIcon = (item: ComponentItem) => {
      if (item.type === 'folder') return <Folder size={40} className="text-yellow-400 fill-yellow-100" />;
      if (item.type === 'image') return <ImageIcon size={32} className="text-purple-500" />;
      if (item.type === 'prototype') return <FileCode size={32} className="text-indigo-500" />;
      if (item.type === 'file') return <File size={32} className="text-gray-400" />;
      return <MessageSquare size={32} className="text-blue-500" />;
  };

  return (
    <div className="w-full h-full bg-[#FAFAFA] flex flex-col font-sans">
      
      {/* Top Bar */}
      <div className="px-8 py-6 bg-white border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">My Gallery</h1>
              <div className="h-6 w-px bg-gray-200 mx-2"></div>
              
              {/* Breadcrumbs */}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                  <button 
                    onClick={() => setCurrentFolderId(null)}
                    className={`hover:text-black hover:bg-gray-100 px-2 py-1 rounded-md transition-colors ${!currentFolderId ? 'font-bold text-black' : ''}`}
                  >
                      Home
                  </button>
                  {breadcrumbs.map((folder, idx) => (
                      <React.Fragment key={folder.id}>
                          <span>/</span>
                          <button 
                            onClick={() => setCurrentFolderId(folder.id)}
                            className={`hover:text-black hover:bg-gray-100 px-2 py-1 rounded-md transition-colors ${idx === breadcrumbs.length - 1 ? 'font-bold text-black' : ''}`}
                          >
                              {folder.title}
                          </button>
                      </React.Fragment>
                  ))}
              </div>
          </div>

          <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative group">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <input 
                      type="text" 
                      placeholder="Search gallery..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-gray-50 hover:bg-gray-100 focus:bg-white border border-gray-200 focus:border-blue-500 rounded-full py-2 pl-10 pr-4 text-sm w-64 outline-none transition-all"
                  />
              </div>

              {/* View Toggle */}
              <div className="bg-gray-100 p-1 rounded-lg flex border border-gray-200">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                      <Grid size={16} />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                      <List size={16} />
                  </button>
              </div>

              {/* Add New Button */}
              <div className="relative">
                  <button 
                    onClick={() => setIsCreateMenuOpen(!isCreateMenuOpen)}
                    className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-all flex items-center gap-2 shadow-lg active:scale-95"
                  >
                      <Plus size={16} />
                      <span>Add New</span>
                  </button>

                  {isCreateMenuOpen && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setIsCreateMenuOpen(false)}></div>
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-20 animate-fade-in-up origin-top-right">
                            <button onClick={handleCreateFolder} className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm text-gray-700 flex items-center gap-3">
                                <Folder size={16} className="text-yellow-500" /> New Folder
                            </button>
                            <button onClick={handleCreatePrompt} className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm text-gray-700 flex items-center gap-3">
                                <MessageSquare size={16} className="text-blue-500" /> New Prompt
                            </button>
                            <button onClick={() => fileInputRef.current?.click()} className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm text-gray-700 flex items-center gap-3">
                                <Upload size={16} className="text-purple-500" /> Upload File
                            </button>
                        </div>
                      </>
                  )}
                  <input type="file" ref={fileInputRef} className="hidden" multiple onChange={handleFileUpload} />
              </div>
          </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-8">
          
          {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                      <Folder size={48} className="text-gray-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Gallery is empty</h3>
                  <p className="text-gray-500 max-w-sm mb-8">Start organizing your AI generations by creating folders or uploading files.</p>
                  <button onClick={handleCreatePrompt} className="text-blue-600 font-medium hover:underline">Create your first prompt</button>
              </div>
          ) : (
              <>
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                        {filteredItems.map(item => (
                            <div 
                                key={item.id} 
                                onClick={() => handleItemClick(item)}
                                className="group relative bg-white rounded-2xl border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer aspect-[4/5] flex flex-col overflow-hidden"
                            >
                                {/* Thumbnail */}
                                <div className={`flex-1 flex items-center justify-center ${item.type === 'folder' ? 'bg-white' : 'bg-gray-50 group-hover:bg-gray-100'} transition-colors relative`}>
                                    {item.type === 'image' && item.code && item.code.includes('<img') ? (
                                        <div dangerouslySetInnerHTML={{ __html: item.code }} className="w-full h-full object-cover pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity" />
                                    ) : (
                                        <div className="transform group-hover:scale-110 transition-transform duration-300">
                                            {getIcon(item)}
                                        </div>
                                    )}
                                    
                                    {/* Quick Actions Overlay */}
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-1.5 bg-white/90 backdrop-blur rounded-full hover:bg-white text-gray-600 shadow-sm border border-gray-200">
                                            <MoreHorizontal size={14} />
                                        </button>
                                    </div>
                                </div>

                                {/* Meta */}
                                <div className="p-4 border-t border-gray-50 bg-white">
                                    <h4 className="font-semibold text-gray-900 text-sm truncate mb-1">{item.title}</h4>
                                    <p className="text-xs text-gray-400 truncate flex items-center gap-1">
                                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Just now'}
                                        {item.type === 'folder' && ` • ${items.filter(i => i.parentId === item.id).length} items`}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-3 font-semibold text-gray-500 w-1/2">Name</th>
                                    <th className="px-6 py-3 font-semibold text-gray-500">Type</th>
                                    <th className="px-6 py-3 font-semibold text-gray-500">Created</th>
                                    <th className="px-6 py-3 font-semibold text-gray-500 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredItems.map(item => (
                                    <tr 
                                        key={item.id} 
                                        onClick={() => handleItemClick(item)}
                                        className="hover:bg-blue-50/50 cursor-pointer transition-colors group"
                                    >
                                        <td className="px-6 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="scale-75 origin-left">{getIcon(item)}</div>
                                                <span className="font-medium text-gray-900">{item.title}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-3">
                                            <span className="capitalize px-2 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-600">{item.type || 'Unknown'}</span>
                                        </td>
                                        <td className="px-6 py-3 text-gray-500">
                                            {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '-'}
                                        </td>
                                        <td className="px-6 py-3 text-right">
                                            <button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <MoreHorizontal size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
              </>
          )}
      </div>
    </div>
  );
};
