import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface PrivacyViewProps {
  onBack: () => void;
}

export const PrivacyView: React.FC<PrivacyViewProps> = ({ onBack }) => {
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

        <h1 className="text-4xl font-bold text-gray-900 mb-8 tracking-tight">Privacy Policy</h1>
        
        <div className="prose prose-lg text-gray-600 space-y-8">
          <p className="text-sm text-gray-400">Last updated: January 1, 2026</p>
          
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="leading-relaxed">Welcome to Kindly Create. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Data We Collect</h2>
            <p className="leading-relaxed mb-4">We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-gray-900">Identity Data</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong className="text-gray-900">Contact Data</strong> includes email address and telephone numbers.</li>
              <li><strong className="text-gray-900">Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
              <li><strong className="text-gray-900">Usage Data</strong> includes information about how you use our website, products and services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Data</h2>
            <p className="leading-relaxed mb-4">We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
              <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
              <li>Where we need to comply with a legal obligation.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
            <p className="leading-relaxed">We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Contact Us</h2>
            <p className="leading-relaxed">If you have any questions about this privacy policy or our privacy practices, please contact us at: support@kindlycreate.com</p>
          </section>
        </div>
      </div>
    </div>
  );
};