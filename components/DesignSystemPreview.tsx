
import React from 'react';
import { ComponentItem } from '../types';
import { Bell, Search, User, Settings, Check, AlertCircle, ChevronRight, Plus, MoreHorizontal, Layout as LayoutIcon, Type as TypeIcon, Palette } from 'lucide-react';

export const DesignSystemPreview: React.FC<{ item: ComponentItem }> = ({ item }) => {
  const t = item.tokens;
  if (!t) return <div className="p-10 text-center text-gray-500">No design tokens defined for this system.</div>;

  return (
    <div className={`w-full h-full overflow-y-auto ${t.bg} ${t.font} transition-colors duration-500`}>
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 space-y-20 pb-40">
        
        {/* Hero Header */}
        <div className="border-b border-black/5 pb-12">
          <div className="flex items-center gap-3 mb-6">
             <div className={`px-3 py-1 text-xs font-bold uppercase tracking-widest ${t.textSecondary} border ${t.border} rounded-full`}>
                Design System
             </div>
          </div>
          <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${t.textPrimary} tracking-tight`}>{item.title}</h1>
          <p className={`text-xl md:text-2xl max-w-3xl leading-relaxed ${t.textSecondary} opacity-90`}>{item.description}</p>
        </div>

        {/* 1. Typography Specimen */}
        <section>
            <SectionHeader icon={<TypeIcon size={20} />} title="Typography" subtitle="Font hierarchy and weights" t={t} />
            <div className={`p-8 md:p-12 ${t.cardBg} ${t.radius} ${t.shadow} space-y-8 overflow-hidden`}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-baseline border-b border-black/5 pb-8">
                    <div className={`col-span-3 text-sm ${t.textSecondary} font-mono`}>Display (H1)</div>
                    <div className={`col-span-9 text-5xl md:text-6xl font-bold ${t.textPrimary}`}>The quick brown fox.</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-baseline border-b border-black/5 pb-8">
                    <div className={`col-span-3 text-sm ${t.textSecondary} font-mono`}>Heading (H2)</div>
                    <div className={`col-span-9 text-3xl md:text-4xl font-bold ${t.textPrimary}`}>Jumps over the lazy dog.</div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-baseline border-b border-black/5 pb-8">
                    <div className={`col-span-3 text-sm ${t.textSecondary} font-mono`}>Subheading (H3)</div>
                    <div className={`col-span-9 text-2xl font-semibold ${t.textPrimary}`}>Visual hierarchy matters.</div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-baseline">
                    <div className={`col-span-3 text-sm ${t.textSecondary} font-mono`}>Body</div>
                    <div className={`col-span-9 text-lg leading-relaxed ${t.textSecondary}`}>
                        Design is not just what it looks like and feels like. Design is how it works. Good design is obvious. Great design is transparent.
                    </div>
                </div>
            </div>
        </section>

        {/* 2. Color Palette */}
        <section>
             <SectionHeader icon={<Palette size={20} />} title="Color Palette" subtitle="Core system colors" t={t} />
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                 {/* Primary */}
                 <div className={`p-6 ${t.cardBg} ${t.radius} ${t.shadow} flex flex-col gap-4`}>
                    <div className={`h-24 w-full rounded-lg ${t.primaryBtn} shadow-sm border border-black/5`}></div>
                    <div>
                        <div className={`font-bold ${t.textPrimary}`}>Primary</div>
                        <div className={`text-xs ${t.textSecondary} opacity-70`}>Action Color</div>
                    </div>
                 </div>
                 {/* Background */}
                 <div className={`p-6 ${t.cardBg} ${t.radius} ${t.shadow} flex flex-col gap-4`}>
                    <div className={`h-24 w-full rounded-lg ${t.bg} border ${t.border}`}></div>
                    <div>
                        <div className={`font-bold ${t.textPrimary}`}>Surface</div>
                        <div className={`text-xs ${t.textSecondary} opacity-70`}>Base Background</div>
                    </div>
                 </div>
                 {/* Text Primary */}
                 <div className={`p-6 ${t.cardBg} ${t.radius} ${t.shadow} flex flex-col gap-4`}>
                    <div className={`h-24 w-full rounded-lg ${t.textPrimary.split(' ')[0].replace('text-', 'bg-')}`}></div>
                    <div>
                        <div className={`font-bold ${t.textPrimary}`}>Foreground</div>
                        <div className={`text-xs ${t.textSecondary} opacity-70`}>Main Text</div>
                    </div>
                 </div>
                 {/* Secondary */}
                 <div className={`p-6 ${t.cardBg} ${t.radius} ${t.shadow} flex flex-col gap-4`}>
                    <div className={`h-24 w-full rounded-lg bg-gray-200`}></div>
                    <div>
                        <div className={`font-bold ${t.textPrimary}`}>Neutral</div>
                        <div className={`text-xs ${t.textSecondary} opacity-70`}>Borders & Subtlety</div>
                    </div>
                 </div>
             </div>
        </section>

        {/* 3. Interactive Elements */}
        <section>
          <SectionHeader icon={<LayoutIcon size={20} />} title="Components" subtitle="Buttons, Inputs, and Cards" t={t} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             
             {/* Interactive Column */}
             <div className={`p-8 md:p-10 ${t.cardBg} ${t.radius} ${t.shadow} flex flex-col justify-center space-y-10`}>
                <div>
                    <label className={`text-xs font-bold uppercase tracking-wider ${t.textSecondary} mb-4 block`}>Buttons</label>
                    <div className="flex flex-wrap gap-4 items-center">
                        <button className={`px-6 py-2.5 ${t.radius} ${t.primaryBtn} transition-transform active:scale-95 font-medium`}>Primary Action</button>
                        <button className={`px-6 py-2.5 ${t.radius} ${t.secondaryBtn} transition-transform active:scale-95 font-medium`}>Secondary</button>
                        <button className={`w-10 h-10 flex items-center justify-center ${t.radius} ${t.secondaryBtn} transition-transform active:scale-95`}><Plus size={20} /></button>
                    </div>
                </div>
                
                <div>
                    <label className={`text-xs font-bold uppercase tracking-wider ${t.textSecondary} mb-4 block`}>Inputs</label>
                    <div className="space-y-4 max-w-sm">
                        <div className="relative group">
                            <User className={`absolute left-4 top-1/2 -translate-y-1/2 ${t.textSecondary} group-focus-within:text-current`} size={18} />
                            <input type="text" placeholder="Username" className={`w-full pl-11 pr-4 py-3 outline-none transition-all ${t.input} ${t.radius}`} />
                        </div>
                        <div className="relative group">
                            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 ${t.textSecondary} group-focus-within:text-current`} size={18} />
                            <input type="text" placeholder="Search documentation..." className={`w-full pl-11 pr-4 py-3 outline-none transition-all ${t.input} ${t.radius}`} />
                        </div>
                    </div>
                </div>

                <div>
                    <label className={`text-xs font-bold uppercase tracking-wider ${t.textSecondary} mb-4 block`}>Toggles</label>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 ${t.radius} border ${t.border} flex items-center justify-center ${t.bg} shadow-sm`}>
                                <Check size={14} className={`${t.textPrimary}`} strokeWidth={3} />
                            </div>
                            <span className={`${t.textPrimary} text-sm font-medium`}>Checkbox</span>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <div className={`w-11 h-6 ${t.primaryBtn} rounded-full relative transition-opacity hover:opacity-90`}>
                                <div className="absolute right-1 top-1 bottom-1 w-4 bg-white rounded-full shadow-sm"></div>
                            </div>
                            <span className={`${t.textPrimary} text-sm font-medium`}>Active</span>
                        </div>
                    </div>
                </div>
             </div>

             {/* Cards Column */}
             <div className="space-y-8">
                  {/* Standard Card */}
                  <div className={`p-8 ${t.cardBg} ${t.radius} ${t.border ? `border ${t.border}` : ''} ${t.shadow} flex flex-col`}>
                      <div className="flex justify-between items-start mb-6">
                          <div className={`w-12 h-12 ${t.radius} bg-gray-100/10 border ${t.border} flex items-center justify-center ${t.textPrimary}`}>
                              <Settings size={24} />
                          </div>
                          <span className={`px-2 py-1 rounded-md bg-gray-100/50 text-[10px] uppercase font-bold tracking-widest ${t.textSecondary}`}>v2.4</span>
                      </div>
                      <h4 className={`text-xl font-bold mb-2 ${t.textPrimary}`}>System Configuration</h4>
                      <p className={`text-sm ${t.textSecondary} mb-6 leading-relaxed`}>Manage your system preferences and global settings from this centralized dashboard panel.</p>
                      <button className={`text-sm font-bold ${t.accent} flex items-center gap-2 mt-auto hover:underline`}>Configure <ChevronRight size={16} /></button>
                  </div>

                  {/* Profile Row */}
                  <div className={`p-6 ${t.cardBg} ${t.radius} ${t.border ? `border ${t.border}` : ''} ${t.shadow} flex items-center gap-5`}>
                        <div className={`w-14 h-14 ${t.radius} bg-gray-200 overflow-hidden relative flex-shrink-0`}>
                            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" alt="User" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                             <h4 className={`text-base font-bold ${t.textPrimary} truncate`}>Emily Chen</h4>
                             <p className={`text-xs ${t.textSecondary} truncate`}>Senior Product Designer</p>
                        </div>
                        <button className={`w-9 h-9 flex items-center justify-center ${t.radius} ${t.secondaryBtn}`}><MoreHorizontal size={16} /></button>
                  </div>
             </div>
          </div>
        </section>

      </div>
    </div>
  );
};

const SectionHeader = ({ icon, title, subtitle, t }: any) => (
    <div className="flex items-start gap-4 mb-8">
        <div className={`p-3 rounded-xl bg-gray-100/50 ${t.textPrimary} border ${t.border}`}>
            {icon}
        </div>
        <div>
            <h2 className={`text-2xl font-bold ${t.textPrimary}`}>{title}</h2>
            <p className={`${t.textSecondary} text-sm`}>{subtitle}</p>
        </div>
    </div>
);
