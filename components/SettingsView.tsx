
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Key, FileJson, Save, Download, Upload, Trash2, CheckCircle2, BrainCircuit, Paperclip, File as FileIcon, X } from 'lucide-react';

interface SettingsViewProps {
  onBack: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onBack }) => {
  const [apiKey, setApiKey] = useState('');
  const [instructions, setInstructions] = useState('');
  const [knowledgeCode, setKnowledgeCode] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<{name: string, size: number}[]>([]);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load from local storage on mount
    const storedKey = localStorage.getItem('kindly_api_key') || '';
    const storedInstr = localStorage.getItem('kindly_custom_instructions') || '';
    const storedKnowledge = localStorage.getItem('kindly_knowledge_code') || '';
    const storedFiles = JSON.parse(localStorage.getItem('kindly_knowledge_files') || '[]');
    
    setApiKey(storedKey);
    setInstructions(storedInstr);
    setKnowledgeCode(storedKnowledge);
    setUploadedFiles(storedFiles);
  }, []);

  const handleSave = () => {
    localStorage.setItem('kindly_api_key', apiKey);
    localStorage.setItem('kindly_custom_instructions', instructions);
    localStorage.setItem('kindly_knowledge_code', knowledgeCode);
    localStorage.setItem('kindly_knowledge_files', JSON.stringify(uploadedFiles));
    
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 2000);
  };

  const handleKnowledgeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) return;

      const newFiles = Array.from(files).map((f: File) => ({ name: f.name, size: f.size }));
      const updatedList = [...uploadedFiles, ...newFiles];
      setUploadedFiles(updatedList);
      
      // Simulate storage of content (In real app, upload to vector DB)
      localStorage.setItem('kindly_knowledge_files', JSON.stringify(updatedList));
  };

  const removeFile = (index: number) => {
      const newList = [...uploadedFiles];
      newList.splice(index, 1);
      setUploadedFiles(newList);
  };

  const handleExport = () => {
    const data = {
      apiKey,
      instructions,
      knowledgeCode,
      knowledgeFiles: uploadedFiles,
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
        if (data.knowledgeCode) setKnowledgeCode(data.knowledgeCode);
        if (data.knowledgeFiles) setUploadedFiles(data.knowledgeFiles);
        
        // Save immediately
        handleSave();
        if (data.recents) localStorage.setItem('kindly_recent_items', JSON.stringify(data.recents));

        alert('Data imported successfully!');
      } catch (err) {
        alert('Failed to import data. Invalid JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const handleClearData = () => {
    if (confirm('Are you sure? This will clear all local settings, knowledge base, and gallery.')) {
      localStorage.clear();
      setApiKey('');
      setInstructions('');
      setKnowledgeCode('');
      setUploadedFiles([]);
      window.location.reload();
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto bg-white font-sans">
      <div className="max-w-4xl mx-auto px-6 py-12 pb-32">
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

        <div className="space-y-10">
            
            {/* Knowledge Base Section */}
            <section className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100 shadow-sm">
                <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-white rounded-xl shadow-sm text-indigo-600 border border-indigo-100">
                        <BrainCircuit size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Custom Knowledge Base</h2>
                        <p className="text-gray-600 text-sm mt-1">
                            Train the AI on your specific standards. Upload documentation, code snippets, or branding guidelines.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Raw Code / Rules */}
                    <div className="space-y-3">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Custom Training Rules / Code</label>
                        <textarea 
                            value={knowledgeCode}
                            onChange={(e) => setKnowledgeCode(e.target.value)}
                            placeholder="// Paste your component library API, strict coding rules, or style guide json here..."
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs font-mono text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all min-h-[250px] resize-y"
                        />
                    </div>

                    {/* File Uploads */}
                    <div className="space-y-3">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Knowledge Files</label>
                        
                        <div 
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-indigo-200 bg-white/50 hover:bg-white rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:border-indigo-400 group h-[120px]"
                        >
                            <Upload size={24} className="text-indigo-300 group-hover:text-indigo-500 mb-2 transition-colors" />
                            <p className="text-sm font-medium text-gray-600">Click to upload files</p>
                            <p className="text-[10px] text-gray-400">Support PDF, MD, TXT, ZIP (Unlimited)</p>
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                multiple 
                                className="hidden" 
                                onChange={handleKnowledgeUpload} 
                            />
                        </div>

                        {/* File List */}
                        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden max-h-[120px] overflow-y-auto">
                            {uploadedFiles.length === 0 ? (
                                <div className="p-4 text-center text-xs text-gray-400 italic">No files uploaded</div>
                            ) : (
                                <div className="divide-y divide-gray-50">
                                    {uploadedFiles.map((f, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 text-xs hover:bg-gray-50">
                                            <div className="flex items-center gap-2 overflow-hidden">
                                                <FileIcon size={14} className="text-gray-400 flex-shrink-0" />
                                                <span className="truncate text-gray-700 font-medium">{f.name}</span>
                                            </div>
                                            <button onClick={() => removeFile(i)} className="text-gray-400 hover:text-red-500 transition-colors">
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

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
                </div>
            </section>

            {/* Custom Instructions */}
            <section className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm text-purple-600 border border-gray-100">
                        <FileJson size={24} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">System Prompt Suffix</h2>
                        <p className="text-gray-500 text-sm">Global instructions appended to every generation prompt.</p>
                    </div>
                </div>
                <div className="space-y-2">
                    <textarea 
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        placeholder="e.g. Always use TypeScript, prefer functional components..."
                        className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all min-h-[100px] resize-y"
                    />
                </div>
            </section>
            
            <div className="flex justify-end sticky bottom-6 z-20">
                <button 
                    onClick={handleSave}
                    className="flex items-center gap-2 px-8 py-3 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl active:scale-95 border-2 border-white/20"
                >
                    <Save size={18} />
                    <span>Save All Changes</span>
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
