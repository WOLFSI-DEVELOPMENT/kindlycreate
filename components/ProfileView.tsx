
import React, { useState } from 'react';
import { User, ComponentItem } from '../types';
import { 
  Mail, Calendar, Zap, Layout, Image as ImageIcon, 
  CreditCard, ChevronRight, LogOut, Globe, DollarSign
} from 'lucide-react';

interface ProfileViewProps {
  user: User;
  items: ComponentItem[];
  onNavigate: (view: any) => void;
  onSignOut?: () => void;
  viewMode?: 'owner' | 'public';
}

export const ProfileView: React.FC<ProfileViewProps> = ({ user, items, onNavigate, onSignOut, viewMode = 'owner' }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'settings'>('overview');

  // Derived stats
  const totalGenerations = items.length;
  const prototypes = items.filter(i => i.type === 'prototype' || i.type === 'dynamic').length;
  const images = items.filter(i => i.type === 'image').length;
  const portfolioUrl = items.find(i => i.portfolioUrl)?.portfolioUrl; // Try to find portfolio from first available item

  return (
    <div className="w-full h-full bg-white font-sans overflow-y-auto">
      
      {/* Minimal Cover */}
      <div className="h-48 w-full bg-zinc-50 border-b border-zinc-100 relative"></div>

      <div className="max-w-5xl mx-auto px-6 sm:px-8">
          
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-start md:items-end -mt-12 mb-8 gap-6">
              {/* Avatar */}
              <div className="relative">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white bg-white shadow-sm overflow-hidden">
                      <img src={user.picture} alt={user.name} className="w-full h-full object-cover" />
                  </div>
              </div>

              {/* User Info */}
              <div className="flex-1 mb-2">
                  <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">{user.name}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-zinc-500 mt-2 text-sm font-medium">
                      {viewMode === 'owner' && <span className="flex items-center gap-1.5"><Mail size={14} /> {user.email}</span>}
                      {portfolioUrl && (
                          <a href={portfolioUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-blue-600 hover:underline">
                              <Globe size={14} /> Website
                          </a>
                      )}
                      <span className="flex items-center gap-1.5"><Calendar size={14} /> Joined 2024</span>
                  </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mb-2 w-full md:w-auto">
                  {viewMode === 'owner' ? (
                      <button onClick={() => setActiveTab('settings')} className="flex-1 md:flex-none px-4 py-2 bg-white border border-zinc-200 text-zinc-700 rounded-full text-sm font-medium hover:bg-zinc-50 transition-colors">
                          Edit Profile
                      </button>
                  ) : (
                      <button className="flex-1 md:flex-none px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                          Follow
                      </button>
                  )}
              </div>
          </div>

          {/* Navigation Tabs - Simple text links */}
          <div className="flex gap-8 border-b border-zinc-100 mb-8">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`pb-3 text-sm font-medium transition-all ${activeTab === 'overview' ? 'text-black border-b-2 border-black' : 'text-zinc-400 hover:text-zinc-600'}`}
              >
                  Creations
              </button>
              {viewMode === 'owner' && (
                  <button 
                    onClick={() => setActiveTab('settings')}
                    className={`pb-3 text-sm font-medium transition-all ${activeTab === 'settings' ? 'text-black border-b-2 border-black' : 'text-zinc-400 hover:text-zinc-600'}`}
                  >
                      Settings
                  </button>
              )}
          </div>

          {activeTab === 'overview' ? (
              <div className="space-y-12 animate-fade-in">
                  
                  {/* KPI Cards - Minimal */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                          <div className="text-zinc-400 text-xs font-medium uppercase tracking-wider mb-1 flex items-center gap-2">
                              <Zap size={12} /> Creations
                          </div>
                          <div className="text-2xl font-bold text-zinc-900">{totalGenerations}</div>
                      </div>
                      <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                          <div className="text-zinc-400 text-xs font-medium uppercase tracking-wider mb-1 flex items-center gap-2">
                              <Layout size={12} /> Prototypes
                          </div>
                          <div className="text-2xl font-bold text-zinc-900">{prototypes}</div>
                      </div>
                      <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                          <div className="text-zinc-400 text-xs font-medium uppercase tracking-wider mb-1 flex items-center gap-2">
                              <ImageIcon size={12} /> Images
                          </div>
                          <div className="text-2xl font-bold text-zinc-900">{images}</div>
                      </div>
                      {viewMode === 'owner' && (
                          <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                              <div className="text-zinc-400 text-xs font-medium uppercase tracking-wider mb-1 flex items-center gap-2">
                                  <CreditCard size={12} /> Plan
                              </div>
                              <div className="text-2xl font-bold text-zinc-900">Free</div>
                          </div>
                      )}
                  </div>

                  {/* Activity List */}
                  <div>
                      <div className="flex items-center justify-between mb-6">
                          <h3 className="text-lg font-bold text-zinc-900">{viewMode === 'owner' ? 'Recent Activity' : 'Public Creations'}</h3>
                      </div>
                      
                      <div className="space-y-3">
                          {items.length === 0 ? (
                              <div className="p-8 text-center text-zinc-400 text-sm border border-dashed border-zinc-200 rounded-xl">
                                  {viewMode === 'owner' ? 'No activity yet. Start creating!' : 'This user hasn\'t published anything yet.'}
                              </div>
                          ) : (
                              items.map((item) => (
                                  <div key={item.id} className="group flex items-center gap-4 p-4 rounded-xl border border-transparent hover:border-zinc-200 hover:bg-zinc-50 transition-colors cursor-pointer" onClick={() => onNavigate('gallery')}>
                                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                                          item.type === 'image' ? 'bg-zinc-200 text-zinc-600' : 
                                          'bg-black text-white'
                                      }`}>
                                          {item.type === 'image' ? <ImageIcon size={16} /> : <Layout size={16} />}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                          <div className="flex items-center gap-2">
                                              <h4 className="text-sm font-medium text-zinc-900 truncate">{item.title}</h4>
                                              {item.isPaid && <span className="text-[10px] bg-zinc-900 text-white px-1.5 py-0.5 rounded font-bold flex items-center gap-0.5"><DollarSign size={8} />{item.price}</span>}
                                          </div>
                                          <p className="text-xs text-zinc-500 line-clamp-1">{item.description}</p>
                                      </div>
                                      <span className="text-xs text-zinc-400">{new Date(item.createdAt || Date.now()).toLocaleDateString()}</span>
                                      <ChevronRight size={16} className="text-zinc-300 group-hover:text-zinc-500" />
                                  </div>
                              ))
                          )}
                      </div>
                  </div>

              </div>
          ) : (
              <div className="max-w-2xl space-y-8 animate-fade-in">
                  {/* Settings only visible to owner */}
                  {viewMode === 'owner' && (
                      <>
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wide">Display Name</label>
                                    <input type="text" value={user.name} disabled className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-600 cursor-not-allowed" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wide">Email</label>
                                    <input type="text" value={user.email} disabled className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-600 cursor-not-allowed" />
                                </div>
                            </div>
                        </div>

                        <hr className="border-zinc-100" />

                        {/* Actions */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-zinc-900">Account Actions</h3>
                            <button onClick={onSignOut} className="w-full flex items-center justify-between p-4 rounded-xl border border-red-100 bg-red-50/50 text-red-600 hover:bg-red-50 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <LogOut size={18} />
                                    <span className="font-medium text-sm">Sign Out</span>
                                </div>
                                <ChevronRight size={16} className="opacity-50 group-hover:opacity-100" />
                            </button>
                        </div>
                      </>
                  )}
              </div>
          )}

      </div>
    </div>
  );
};
