import React from 'react';
import { Check } from 'lucide-react';

export const MixpanelPricing: React.FC = () => {
  return (
    <div className="w-full h-full overflow-y-auto bg-slate-50 font-inter">
      {/* Header */}
      <div className="w-full bg-[#100C27] py-24 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,#4f46e5_0%,transparent_40%)] opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,#818cf8_0%,transparent_40%)] opacity-20"></div>
        
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">Simple, transparent pricing</h1>
          <p className="text-indigo-200/80 text-xl max-w-2xl mx-auto font-light">
            Choose the plan that's right for your growth stage.
          </p>
        </div>
      </div>

      {/* Pricing Cards Container - Overlapping Header */}
      <div className="max-w-6xl mx-auto px-6 -mt-20 pb-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Free */}
          <PricingCard 
            title="Free"
            price="0"
            description="For startups & hobbyists."
            features={['100K Monthly Tracked Users', 'Unlimited Data History', 'Core Reports']}
            btnText="Get Started"
            btnStyle="bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
          />

          {/* Growth */}
          <PricingCard 
            title="Growth"
            price="24"
            description="For growing teams."
            features={['Everything in Free', 'Unlimited Saved Reports', 'Cohort Analysis', 'Group Analytics']}
            highlight={true}
            btnText="Try Growth"
            btnStyle="bg-[#4F46E5] text-white hover:bg-[#4338ca] shadow-lg shadow-indigo-500/30 border border-transparent"
          />

          {/* Enterprise */}
          <PricingCard 
            title="Enterprise"
            price="Custom"
            description="For large organizations."
            features={['Everything in Growth', 'SSO & Advanced Security', 'Data Governance', 'Dedicated Support']}
            btnText="Contact Sales"
            btnStyle="bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
          />
        </div>
      </div>
    </div>
  );
};

const PricingCard = ({ title, price, description, features, highlight, btnText, btnStyle }: any) => (
  <div className={`bg-white rounded-2xl p-8 flex flex-col ${highlight ? 'shadow-2xl ring-1 ring-indigo-500/20 relative z-10 scale-105' : 'shadow-xl shadow-slate-200/50 border border-slate-100'}`}>
    <h3 className={`text-xl font-bold mb-2 ${highlight ? 'text-indigo-600' : 'text-slate-900'}`}>{title}</h3>
    <p className="text-slate-500 text-sm mb-8 font-medium">{description}</p>
    
    <div className="mb-8 border-b border-slate-100 pb-8">
      {price === 'Custom' ? (
        <span className="text-4xl font-bold text-slate-900 tracking-tight">Custom</span>
      ) : (
        <div className="flex items-baseline">
          <span className="text-5xl font-bold text-slate-900 tracking-tight">${price}</span>
          <span className="text-slate-400 font-medium ml-1">/mo</span>
        </div>
      )}
    </div>

    <div className="space-y-4 flex-1 mb-8">
      {features.map((f: string, i: number) => (
        <div key={i} className="flex items-start gap-3">
          <div className="mt-1">
             <Check size={16} className="text-[#4F46E5]" strokeWidth={3} />
          </div>
          <span className="text-sm text-slate-600 font-medium leading-relaxed">{f}</span>
        </div>
      ))}
    </div>

    <button className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-200 active:scale-95 ${btnStyle}`}>
      {btnText}
    </button>
  </div>
);