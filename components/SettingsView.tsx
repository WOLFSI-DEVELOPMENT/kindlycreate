
import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Key, FileJson, Save, Download, Upload, 
  Trash2, CheckCircle2, BrainCircuit, File as FileIcon, X, 
  Settings, Database, Plus
} from 'lucide-react';

interface SettingsViewProps {
  onBack: () => void;
}

type SettingsTab = 'general' | 'knowledge' | 'data';

export const SettingsView: React.FC<SettingsViewProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  
  // State
  const [apiKey, setApiKey] = useState('');
  const [instructions, setInstructions] = useState('');
  const [knowledgeCode, setKnowledgeCode] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<{name: string, size: number}[]>([]);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load Data
  useEffect(() => {
    const storedKey = localStorage.getItem('kindly_api_key') || '';
    const storedInstr = localStorage.getItem('kindly_custom_instructions') || '';
    const storedKnowledge = localStorage.getItem('kindly_knowledge_code') || '';
    const storedFiles = JSON.parse(localStorage.getItem('kindly_knowledge_files') || '[]');
    
    setApiKey(storedKey);
    setInstructions(storedInstr);
    setKnowledgeCode(storedKnowledge);
    setUploadedFiles(storedFiles);
  }, []);

  // Save Data
  const handleSave = () => {
    localStorage.setItem('kindly_api_key', apiKey);
    localStorage.setItem('kindly_custom_instructions', instructions);
    localStorage.setItem('kindly_knowledge_code', knowledgeCode);
    localStorage.setItem('kindly_knowledge_files', JSON.stringify(uploadedFiles));
    
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 2000);
  };

  // Handlers
  const handleKnowledgeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) return;
      const newFiles = Array.from(files).map((f: File) => ({ name: f.name, size: f.size }));
      setUploadedFiles(prev => [...prev, ...newFiles]);
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
      recents: JSON.parse(localStorage.getItem('kindly_gallery_items') || '[]'),
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
        handleSave();
        alert('Data imported successfully!');
      } catch (err) {
        alert('Failed to import data.');
      }
    };
    reader.readAsText(file);
  };

  const handleClearData = () => {
    if (confirm('Are you sure? This will clear all local settings, knowledge base, and gallery.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  // Render Helpers
  const TabButton = ({ id, label, icon: Icon }: { id: SettingsTab, label: string, icon: any }) => (
    <button 
        onClick={() => setActiveTab(id)}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
            activeTab === id 
            ? 'bg-black text-white shadow-lg' 
            : 'text-gray-500 hover:bg-gray-100'
        }`}
    >
        <Icon size={18} />
        <span>{label}</span>
    </button>
  );

  return (
    <div className="w-full h-full bg-[#F8F9FB] font-sans flex overflow-hidden">
      
      {/* --- Sidebar --- */}
      <div className="w-64 flex-shrink-0 flex flex-col border-r border-gray-200 bg-white/50 backdrop-blur-sm p-6">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-8 px-2"
          >
            <ArrowLeft size={18} />
            <span className="font-bold text-sm">Back</span>
          </button>

          <h1 className="text-2xl font-bold text-gray-900 mb-8 px-2 tracking-tight">Settings</h1>

          <div className="space-y-2 flex-1">
              <TabButton id="general" label="General" icon={Settings} />
              <TabButton id="knowledge" label="Knowledge Base" icon={BrainCircuit} />
              <TabButton id="data" label="Data" icon={Database} />
          </div>

          <div className="mt-auto pt-6 border-t border-gray-100">
             <div className="bg-blue-50 p-4 rounded-2xl">
                 <p className="text-xs text-blue-600 font-medium mb-1">Status</p>
                 <div className="flex items-center gap-2 text-sm font-bold text-blue-900">
                     <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                     <span>Sync Active</span>
                 </div>
             </div>
          </div>
      </div>

      {/* --- Main Content Area --- */}
      <div className="flex-1 overflow-y-auto p-8 md:p-12 relative">
          
          <div className="max-w-2xl mx-auto space-y-12 pb-24">
              
              {/* === GENERAL TAB === */}
              {activeTab === 'general' && (
                  <div className="space-y-10 animate-fade-in">
                      <div>
                          <h2 className="text-lg font-bold text-gray-900 mb-1">API Configuration</h2>
                          <p className="text-sm text-gray-500 mb-6">Connect your Gemini API key for higher limits.</p>
                          
                          <div className="relative group">
                              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                                  <Key size={18} />
                              </div>
                              <input 
                                  type="password" 
                                  value={apiKey}
                                  onChange={(e) => setApiKey(e.target.value)}
                                  placeholder="Paste your Google API Key here..."
                                  className="w-full bg-white pl-12 pr-6 py-4 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-none outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-mono transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
                              />
                          </div>
                      </div>

                      <div>
                          <h2 className="text-lg font-bold text-gray-900 mb-1">System Instructions</h2>
                          <p className="text-sm text-gray-500 mb-6">Global rules applied to every generation.</p>
                          
                          <div className="relative group">
                              <div className="absolute left-5 top-6 text-gray-400">
                                  <FileJson size={18} />
                              </div>
                              <textarea 
                                  value={instructions}
                                  onChange={(e) => setInstructions(e.target.value)}
                                  placeholder="e.g. Always use TypeScript, prefer functional components, avoid using jQuery..."
                                  className="w-full bg-white pl-12 pr-6 py-6 rounded-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-none outline-none focus:ring-2 focus:ring-purple-500/20 text-sm min-h-[200px] resize-none transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] leading-relaxed"
                              />
                          </div>
                      </div>
                  </div>
              )}

              {/* === KNOWLEDGE BASE TAB === */}
              {activeTab === 'knowledge' && (
                  <div className="space-y-8 animate-fade-in">
                      <div className="flex justify-between items-end">
                          <div>
                              <h2 className="text-lg font-bold text-gray-900 mb-1">Custom Knowledge</h2>
                              <p className="text-sm text-gray-500">Train the AI on your specific coding standards.</p>
                          </div>
                          <button 
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-black text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-gray-800 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl active:scale-95"
                          >
                              <Plus size={16} /> Upload Files
                          </button>
                      </div>

                      {/* File List - Floating Style */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {uploadedFiles.map((f, i) => (
                              <div key={i} className="bg-white p-4 rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center justify-between group hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)] transition-all">
                                  <div className="flex items-center gap-3 overflow-hidden">
                                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                                          <FileIcon size={18} />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                          <p className="text-sm font-bold text-gray-900 truncate">{f.name}</p>
                                          <p className="text-[10px] text-gray-400">{(f.size / 1024).toFixed(1)} KB</p>
                                      </div>
                                  </div>
                                  <button onClick={() => removeFile(i)} className="text-gray-300 hover:text-red-500 transition-colors p-2">
                                      <X size={16} />
                                  </button>
                              </div>
                          ))}
                          
                          {/* Empty State */}
                          {uploadedFiles.length === 0 && (
                              <div 
                                onClick={() => fileInputRef.current?.click()}
                                className="col-span-2 border-2 border-dashed border-gray-200 rounded-[24px] p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-gray-300 hover:bg-white/50 transition-all"
                              >
                                  <Upload size={24} className="text-gray-300 mb-2" />
                                  <p className="text-sm font-medium text-gray-500">Drop files here or click to upload</p>
                                  <p className="text-xs text-gray-400 mt-1">Supports PDF, MD, TXT</p>
                              </div>
                          )}
                          <input type="file" ref={fileInputRef} multiple className="hidden" onChange={handleKnowledgeUpload} />
                      </div>

                      <div className="h-px bg-gray-200 my-8"></div>

                      <div>
                          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Raw Training Rules</h3>
                          <textarea 
                              value={knowledgeCode}
                              onChange={(e) => setKnowledgeCode(e.target.value)}
                              placeholder="// Paste your component library API or strict coding rules here..."
                              className="w-full bg-white p-6 rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-none outline-none focus:ring-2 focus:ring-indigo-500/20 text-xs font-mono text-gray-600 min-h-[300px] resize-y transition-all"
                          />
                      </div>
                  </div>
              )}

              {/* === DATA TAB === */}
              {activeTab === 'data' && (
                  <div className="space-y-8 animate-fade-in">
                      <div>
                          <h2 className="text-lg font-bold text-gray-900 mb-1">Data Management</h2>
                          <p className="text-sm text-gray-500">Import, export, or reset your local data.</p>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                          <button 
                              onClick={handleExport}
                              className="flex items-center justify-between p-5 bg-white rounded-[24px] shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)] hover:scale-[1.01] transition-all group"
                          >
                              <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                                      <Download size={20} />
                                  </div>
                                  <div className="text-left">
                                      <p className="text-sm font-bold text-gray-900">Export Backup</p>
                                      <p className="text-xs text-gray-500">Save your settings & prompts as JSON</p>
                                  </div>
                              </div>
                              <span className="text-xs font-bold bg-gray-100 px-3 py-1 rounded-full text-gray-600">JSON</span>
                          </button>

                          <div className="relative">
                              <input type="file" accept=".json" onChange={handleImport} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                              <button className="w-full flex items-center justify-between p-5 bg-white rounded-[24px] shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)] hover:scale-[1.01] transition-all group">
                                  <div className="flex items-center gap-4">
                                      <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                          <Upload size={20} />
                                      </div>
                                      <div className="text-left">
                                          <p className="text-sm font-bold text-gray-900">Import Backup</p>
                                          <p className="text-xs text-gray-500">Restore from a previous backup file</p>
                                      </div>
                                  </div>
                              </button>
                          </div>

                          <button 
                              onClick={handleClearData}
                              className="flex items-center justify-between p-5 bg-red-50/50 rounded-[24px] border border-red-100 hover:bg-red-50 hover:border-red-200 transition-all group mt-4"
                          >
                              <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                                      <Trash2 size={20} />
                                  </div>
                                  <div className="text-left">
                                      <p className="text-sm font-bold text-red-900">Factory Reset</p>
                                      <p className="text-xs text-red-500">Clear all local storage data</p>
                                  </div>
                              </div>
                          </button>
                      </div>
                  </div>
              )}

          </div>

          {/* Floating Save Button */}
          <div className="fixed bottom-8 right-8 z-20">
              <button 
                  onClick={handleSave}
                  className={`flex items-center gap-2 px-8 py-4 rounded-full font-bold shadow-2xl transition-all active:scale-95 ${
                      saveStatus === 'saved' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
              >
                  {saveStatus === 'saved' ? <CheckCircle2 size={20} /> : <Save size={20} />}
                  <span>{saveStatus === 'saved' ? 'Changes Saved' : 'Save Changes'}</span>
              </button>
          </div>

      </div>
    </div>
  );
};
