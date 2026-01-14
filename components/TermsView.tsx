import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface TermsViewProps {
  onBack: () => void;
}

export const TermsView: React.FC<TermsViewProps> = ({ onBack }) => {
  return (
    <div className="w-full h-full overflow-y-auto bg-white font-sans">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Home</span>
        </button>

        <h1 className="text-4xl font-bold text-gray-900 mb-8 tracking-tight">Terms of Service</h1>
        
        <div className="prose prose-lg text-gray-600 space-y-8">
          <p className="text-sm text-gray-400">Last updated: January 1, 2026</p>
          
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Agreement to Terms</h2>
            <p className="leading-relaxed">By accessing or using our website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Intellectual Property Rights</h2>
            <p className="leading-relaxed">Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Representations</h2>
            <p className="leading-relaxed mb-4">By using the Site, you represent and warrant that:</p>
             <ul className="list-disc pl-5 space-y-2">
              <li>All registration information you submit will be true, accurate, current, and complete;</li>
              <li>You will maintain the accuracy of such information and promptly update such registration information as necessary;</li>
              <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
             </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Prohibited Activities</h2>
            <p className="leading-relaxed">You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Limitation of Liability</h2>
            <p className="leading-relaxed">In no event shall we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site, even if we have been advised of the possibility of such damages.</p>
          </section>
        </div>
      </div>
    </div>
  );
};