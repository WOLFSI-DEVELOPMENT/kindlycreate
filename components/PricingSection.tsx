
import React from 'react';
import { Check } from 'lucide-react';

export const PricingSection: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#FAFAFA] overflow-y-auto p-8 flex items-center justify-center font-inter text-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
      
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {/* Basic */}
        <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-black/5 flex flex-col hover:border-black/10 transition-colors duration-300">
          <div className="flex items-center justify-between mb-4">
             <h3 className="text-slate-900 font-semibold tracking-tight">Starter</h3>
          </div>
          <div className="flex items-baseline gap-1 mb-6">
            <span className="text-4xl font-bold tracking-tighter text-slate-900">$0</span>
            <span className="text-slate-500 font-medium">/mo</span>
          </div>
          <p className="text-sm text-slate-500 mb-8 leading-relaxed">Perfect for individuals and hobbyists just starting out.</p>
          <button className="w-full py-2.5 rounded-xl border border-black/10 text-slate-900 font-medium hover:bg-slate-50 transition-all active:scale-95 mb-8 text-sm">
            Get Started
          </button>
          <div className="space-y-3 flex-1">
            <Feature text="1 User" />
            <Feature text="5 Projects" />
            <Feature text="Community Support" />
          </div>
        </div>

        {/* Pro - Highlighted */}
        <div className="bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-blue-500/10 relative flex flex-col transform md:-translate-y-4 ring-1 ring-black/5">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
            Pro
          </div>
          <div className="flex items-center justify-between mb-4">
             <h3 className="text-slate-900 font-semibold tracking-tight">Professional</h3>
          </div>
          <div className="flex items-baseline gap-1 mb-6">
            <span className="text-4xl font-bold tracking-tighter text-slate-900">$29</span>
            <span className="text-slate-500 font-medium">/mo</span>
          </div>
          <p className="text-sm text-slate-500 mb-8 leading-relaxed">For power users needing advanced integrations.</p>
          <button className="w-full py-2.5 rounded-xl bg-black text-white font-medium hover:bg-gray-800 transition-all active:scale-95 mb-8 shadow-md shadow-slate-200 text-sm">
            Start Free Trial
          </button>
          <div className="space-y-3 flex-1">
            <Feature text="API Integrations" highlighted />
            <Feature text="Supabase Support" highlighted />
            <Feature text="Custom Tooling" highlighted />
            <Feature text="Unlimited Projects" highlighted />
          </div>
        </div>

        {/* Enterprise */}
        <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-black/5 flex flex-col hover:border-black/10 transition-colors duration-300">
          <div className="flex items-center justify-between mb-4">
             <h3 className="text-slate-900 font-semibold tracking-tight">Enterprise</h3>
          </div>
          <div className="flex items-baseline gap-1 mb-6">
            <span className="text-4xl font-bold tracking-tighter text-slate-900">$99</span>
            <span className="text-slate-500 font-medium">/mo</span>
          </div>
          <p className="text-sm text-slate-500 mb-8 leading-relaxed">Advanced security and control for large organizations.</p>
          <button className="w-full py-2.5 rounded-xl border border-black/10 text-slate-900 font-medium hover:bg-slate-50 transition-all active:scale-95 mb-8 text-sm">
            Contact Sales
          </button>
          <div className="space-y-3 flex-1">
            <Feature text="Everything in Pro" />
            <Feature text="SSO & Security" />
            <Feature text="Dedicated Success Manager" />
            <Feature text="Custom Contracts" />
          </div>
        </div>
      </div>
    </div>
  );
};

const Feature = ({ text, highlighted = false }: { text: string, highlighted?: boolean }) => (
  <div className="flex items-center gap-3">
    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${highlighted ? 'bg-black text-white' : 'bg-slate-100 text-slate-500'}`}>
      <Check size={12} strokeWidth={3} />
    </div>
    <span className={`text-sm ${highlighted ? 'text-slate-900 font-medium' : 'text-slate-600'}`}>{text}</span>
  </div>
);
