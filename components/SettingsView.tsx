import React, { useState, useEffect } from 'react';
import { ArrowLeft, Key, FileJson, Save, Download, Upload, Trash2, CheckCircle2 } from 'lucide-react';

interface SettingsViewProps {
  onBack: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onBack }) => {
  const [apiKey, setApiKey] = useState('');
  const [instructions, setInstructions] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved'>('idle');

  useEffect(() => {
    // Load from local storage on mount
    const storedKey = localStorage.getItem('kindly_api_key') || '';
    const storedInstr = localStorage.getItem('kindly_custom_instructions') || '';
    setApiKey(storedKey);
    setInstructions(storedInstr);
  }, []);

  const handleSave = () => {
    localStorage.setItem('kindly_api_key', apiKey);
    localStorage.setItem('kindly_custom_instructions', instructions);
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 2000);
  };

  const handleExport = () => {
    const data = {
      apiKey,
      instructions,
      recents: JSON.parse(localStorage.getItem('kindly_recent_items') || '[]'),
      timestamp: Date.now()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kindly-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);
        
        if (data.apiKey) setApiKey(data.apiKey);
        if (data.instructions) setInstructions(data.instructions);
        
        // Save immediately
        if (data.apiKey) localStorage.setItem('kindly_api_key', data.apiKey);
        if (data.instructions) localStorage.setItem('kindly_custom_instructions', data.instructions);
        if (data.recents) localStorage.setItem('kindly_recent_items', JSON.stringify(data.recents));

        alert('Data imported successfully!');
      } catch (err) {
        alert('Failed to import data. Invalid JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const handleClearData = () => {
    if (confirm('Are you sure? This will clear all local settings and history.')) {
      localStorage.clear();
      setApiKey('');
      setInstructions('');
      window.location.reload();
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto bg-white font-sans">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back</span>
        </button>

        <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Settings</h1>
            {saveStatus === 'saved' && (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1.5 rounded-full text-sm font-medium animate-fade-in">
                    <CheckCircle2 size={16} />
                    <span>Saved</span>
                </div>
            )}
        </div>

        <div className="space-y-8">
            {/* API Key Section */}
            <section className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm text-blue-600 border border-gray-100">
                        <Key size={24} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">API Configuration</h2>
                        <p className="text-gray-500 text-sm">Bring your own Gemini API key for higher rate limits.</p>
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Gemini API Key</label>
                    <input 
                        type="password" 
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="AIzaSy..."
                        className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono"
                    />
                    <p className="text-xs text-gray-400">Your key is stored locally in your browser and never sent to our servers.</p>
                </div>
            </section>

            {/* Custom Instructions */}
            <section className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm text-purple-600 border border-gray-100">
                        <FileJson size={24} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Custom Instructions</h2>
                        <p className="text-gray-500 text-sm">Global instructions applied to all your generations.</p>
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">System Prompt Suffix</label>
                    <textarea 
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        placeholder="e.g. Always use TypeScript, prefer functional components..."
                        className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all min-h-[120px] resize-y"
                    />
                </div>
            </section>
            
            <div className="flex justify-end">
                <button 
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-all shadow-lg active:scale-95"
                >
                    <Save size={18} />
                    <span>Save Changes</span>
                </button>
            </div>

            <div className="h-px bg-gray-200 my-8"></div>

            {/* Data Management */}
            <section>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Data Management</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button 
                        onClick={handleExport}
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <Download size={18} />
                        <span>Export Data</span>
                    </button>
                    <div className="relative">
                        <input 
                            type="file" 
                            accept=".json"
                            onChange={handleImport}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                            <Upload size={18} />
                            <span>Import Data</span>
                        </button>
                    </div>
                    <button 
                        onClick={handleClearData}
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-red-100 text-red-600 rounded-xl font-medium hover:bg-red-50 transition-colors"
                    >
                        <Trash2 size={18} />
                        <span>Reset All</span>
                    </button>
                </div>
            </section>
        </div>
      </div>
    </div>
  );
};