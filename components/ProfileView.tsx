
import React, { useState } from 'react';
import { User, ComponentItem } from '../types';
import { 
  Camera, Mail, Calendar, Zap, Layout, Image as ImageIcon, 
  Settings, LogOut, CreditCard, Bell, Shield, ChevronRight, Edit2 
} from 'lucide-react';

interface ProfileViewProps {
  user: User;
  items: ComponentItem[];
  onNavigate: (view: any) => void; // Using any for ViewState to avoid circular deps if types aren't shared perfectly
  onSignOut: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ user, items, onNavigate, onSignOut }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'settings'>('overview');

  // Derived stats
  const totalGenerations = items.length;
  const prototypes = items.filter(i => i.type === 'prototype' || i.type === 'dynamic').length;
  const images = items.filter(i => i.type === 'image').length;
  const prompts = items.filter(i => i.type === 'prompt').length;

  return (
    <div className="w-full h-full bg-[#F9FAFB] font-sans overflow-y-auto">
      
      {/* Cover Image & Header */}
      <div className="relative h-64 w-full bg-white">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
          
          {/* Content Container */}
          <div className="max-w-5xl mx-auto px-6 h-full flex items-end pb-8 relative z-10">
              <div className="flex flex-col md:flex-row items-end md:items-center gap-6 w-full translate-y-12 md:translate-y-16">
                  {/* Avatar */}
                  <div className="relative group">
                      <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
                          <img src={user.picture} alt={user.name} className="w-full h-full object-cover" />
                      </div>
                      <button className="absolute bottom-1 right-1 p-2 bg-white rounded-full shadow-md text-gray-500 hover:text-black transition-colors">
                          <Camera size={16} />
                      </button>
                  </div>

                  {/* Info */}
                  <div className="flex-1 mb-2 md:mb-0">
                      <h1 className="text-3xl font-bold text-gray-900 leading-tight">{user.name}</h1>
                      <div className="flex items-center gap-4 text-gray-500 mt-1 text-sm">
                          <span className="flex items-center gap-1.5"><Mail size={14} /> {user.email}</span>
                          <span className="flex items-center gap-1.5"><Calendar size={14} /> Joined Jan 2024</span>
                      </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mb-2">
                      <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
                          Edit Profile
                      </button>
                      <button className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shadow-lg">
                          Upgrade Plan
                      </button>
                  </div>
              </div>
          </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-20">
          
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-8">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'overview' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                  Overview
              </button>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'settings' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                  Settings
              </button>
          </div>

          {activeTab === 'overview' ? (
              <div className="space-y-8 animate-fade-in-up">
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
                          <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                              <Zap size={14} className="text-yellow-500" /> Total Creations
                          </div>
                          <div className="text-3xl font-bold text-gray-900">{totalGenerations}</div>
                      </div>
                      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
                          <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                              <Layout size={14} className="text-blue-500" /> Prototypes
                          </div>
                          <div className="text-3xl font-bold text-gray-900">{prototypes}</div>
                      </div>
                      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
                          <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                              <ImageIcon size={14} className="text-purple-500" /> Images
                          </div>
                          <div className="text-3xl font-bold text-gray-900">{images}</div>
                      </div>
                      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
                          <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                              <CreditCard size={14} className="text-green-500" /> Current Plan
                          </div>
                          <div className="text-3xl font-bold text-gray-900">Free</div>
                      </div>
                  </div>

                  {/* Recent Activity */}
                  <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                          {items.length === 0 ? (
                              <div className="p-8 text-center text-gray-500 text-sm">No activity yet. Start building!</div>
                          ) : (
                              items.slice(0, 5).map((item, i) => (
                                  <div key={item.id} className="flex items-center gap-4 p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => onNavigate('gallery')}>
                                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-sm shrink-0 ${
                                          item.type === 'image' ? 'bg-purple-500' :
                                          item.type === 'prototype' ? 'bg-blue-500' :
                                          item.type === 'dynamic' ? 'bg-indigo-600' : 'bg-gray-500'
                                      }`}>
                                          {item.type === 'image' ? <ImageIcon size={16} /> : <Layout size={16} />}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                          <h4 className="text-sm font-semibold text-gray-900 truncate">{item.title}</h4>
                                          <p className="text-xs text-gray-500 truncate">{new Date(item.createdAt || Date.now()).toLocaleDateString()} • {item.type}</p>
                                      </div>
                                      <div className="text-gray-300">
                                          <ChevronRight size={16} />
                                      </div>
                                  </div>
                              ))
                          )}
                      </div>
                      <button onClick={() => onNavigate('gallery')} className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
                          View all history <ChevronRight size={14} />
                      </button>
                  </div>

              </div>
          ) : (
              <div className="space-y-6 animate-fade-in-up max-w-3xl">
                  
                  {/* Account Settings */}
                  <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <Settings size={18} /> Account Settings
                      </h3>
                      <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                  <label className="text-xs font-bold text-gray-500 uppercase">Full Name</label>
                                  <input type="text" value={user.name} disabled className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-500 cursor-not-allowed" />
                              </div>
                              <div className="space-y-1">
                                  <label className="text-xs font-bold text-gray-500 uppercase">Email Address</label>
                                  <input type="text" value={user.email} disabled className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-500 cursor-not-allowed" />
                              </div>
                          </div>
                      </div>
                  </section>

                  {/* Preferences */}
                  <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <Bell size={18} /> Preferences
                      </h3>
                      <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                              <div>
                                  <div className="text-sm font-medium text-gray-900">Email Notifications</div>
                                  <div className="text-xs text-gray-500">Receive updates about new features.</div>
                              </div>
                              <div className="w-10 h-6 bg-black rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                              <div>
                                  <div className="text-sm font-medium text-gray-900">Dark Mode</div>
                                  <div className="text-xs text-gray-500">Switch between light and dark themes.</div>
                              </div>
                              <div className="w-10 h-6 bg-gray-200 rounded-full relative cursor-pointer"><div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div></div>
                          </div>
                      </div>
                  </section>

                  {/* Danger Zone */}
                  <section className="bg-white rounded-2xl border border-red-100 shadow-sm p-6">
                      <h3 className="text-lg font-bold text-red-600 mb-4 flex items-center gap-2">
                          <Shield size={18} /> Danger Zone
                      </h3>
                      <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600">Sign out of your account on this device.</div>
                          <button onClick={onSignOut} className="px-4 py-2 bg-red-50 text-red-600 border border-red-100 rounded-lg text-sm font-bold hover:bg-red-100 transition-colors flex items-center gap-2">
                              <LogOut size={16} /> Sign Out
                          </button>
                      </div>
                  </section>

              </div>
          )}

      </div>
    </div>
  );
};
