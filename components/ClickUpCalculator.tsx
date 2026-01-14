import React, { useState } from 'react';

export const ClickUpCalculator: React.FC = () => {
  const [users, setUsers] = useState(10);
  const costPerUserCompetitor = 12;
  const costPerUserClickUp = 5; // Simplified for demo
  
  const currentCost = users * costPerUserCompetitor * 12;
  const clickUpCost = users * costPerUserClickUp * 12;
  const savings = currentCost - clickUpCost;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#F8F9FD] p-6 font-inter">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 p-10 md:p-12">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-3 tracking-tight">ROI Calculator</h2>
        <p className="text-center text-slate-500 mb-12 text-lg">See how much you can save by switching.</p>

        {/* Slider Section */}
        <div className="mb-14 px-4">
           <div className="flex justify-between items-end mb-6">
             <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Team Size</label>
             <div className="bg-indigo-50 text-indigo-600 px-4 py-1 rounded-full font-bold text-xl tabular-nums">
               {users} users
             </div>
           </div>
           
           <div className="relative h-2 bg-slate-100 rounded-full">
              <div 
                className="absolute top-0 left-0 h-full bg-indigo-500 rounded-full" 
                style={{ width: `${(users / 100) * 100}%` }}
              ></div>
              <input 
                type="range" 
                min="1" 
                max="100" 
                value={users} 
                onChange={(e) => setUsers(parseInt(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-2 border-indigo-500 rounded-full shadow-md pointer-events-none transition-all"
                style={{ left: `calc(${(users / 100) * 100}% - 12px)` }}
              ></div>
           </div>
           
           <div className="flex justify-between text-[10px] font-bold text-slate-300 mt-4 uppercase tracking-wider">
             <span>1 User</span>
             <span>100 Users</span>
           </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-2 gap-6 mb-10">
           <div className="text-center p-6 bg-rose-50/50 rounded-2xl border border-rose-100">
              <div className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2">Current Cost</div>
              <div className="text-4xl font-bold text-rose-600 tracking-tight mb-1 tabular-nums">${currentCost.toLocaleString()}</div>
              <div className="text-xs text-rose-400/70 font-medium">per year</div>
           </div>
           
           <div className="text-center p-6 bg-emerald-50/50 rounded-2xl border border-emerald-100 relative overflow-hidden group">
              <div className="absolute inset-0 bg-emerald-100/20 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-2xl"></div>
              <div className="relative z-10">
                <div className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">Your Savings</div>
                <div className="text-4xl font-bold text-emerald-600 tracking-tight mb-1 tabular-nums">${savings.toLocaleString()}</div>
                <div className="text-xs text-emerald-500/70 font-medium">{(savings/currentCost * 100).toFixed(0)}% decrease</div>
              </div>
           </div>
        </div>

        <button className="w-full py-4 bg-[#7B68EE] hover:bg-[#6c5ce7] text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-200 active:scale-[0.98] text-lg">
          Start Saving Today
        </button>
      </div>
    </div>
  );
};