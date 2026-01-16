
import React from 'react';
import { 
  Bold, Italic, Underline, Strikethrough, 
  AlignLeft, AlignCenter, AlignRight, 
  List, ListOrdered, 
  Undo, Redo, 
  Type, Heading1, Heading2, Quote, 
  Minus, Download, Share, Code
} from 'lucide-react';

interface EditorToolbarProps {
  onCommand: (command: string, value?: string) => void;
  activeFormats?: string[];
  type?: 'studio' | 'dynamic';
  onExport?: () => void;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({ onCommand, activeFormats = [], type = 'studio', onExport }) => {
  
  const ToolbarButton = ({ 
    cmd, 
    arg, 
    icon: Icon, 
    label, 
    active = false 
  }: { 
    cmd: string; 
    arg?: string; 
    icon: any; 
    label?: string; 
    active?: boolean 
  }) => (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onCommand(cmd, arg);
      }}
      className={`p-1.5 rounded-md transition-all flex items-center gap-1.5 ${
        active 
          ? 'bg-black text-white shadow-sm' 
          : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
      }`}
      title={label}
    >
      <Icon size={16} strokeWidth={active ? 2.5 : 2} />
      {label && <span className="text-xs font-bold pr-1">{label}</span>}
    </button>
  );

  const Divider = () => <div className="w-px h-4 bg-gray-200 mx-1"></div>;

  return (
    <div className="flex items-center gap-1 p-1.5 bg-white rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-200/60 backdrop-blur-xl animate-fade-in-up">
      
      {/* Typography Group */}
      <div className="flex items-center px-1">
        <div className="relative group">
            <button className="p-1.5 text-gray-500 hover:text-black flex items-center gap-1">
                <Type size={16} />
            </button>
            {/* Dropdown for Headings */}
            <div className="absolute bottom-full left-0 mb-2 hidden group-hover:flex flex-col bg-white border border-gray-100 shadow-xl rounded-lg overflow-hidden p-1 min-w-[120px]">
                <button onClick={() => onCommand('formatBlock', 'P')} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 text-sm text-left rounded-md"><Type size={14}/> Paragraph</button>
                <button onClick={() => onCommand('formatBlock', 'H1')} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 text-sm text-left rounded-md font-bold"><Heading1 size={14}/> Heading 1</button>
                <button onClick={() => onCommand('formatBlock', 'H2')} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 text-sm text-left rounded-md font-semibold"><Heading2 size={14}/> Heading 2</button>
                <button onClick={() => onCommand('formatBlock', 'BLOCKQUOTE')} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 text-sm text-left rounded-md italic"><Quote size={14}/> Quote</button>
            </div>
        </div>
      </div>

      <Divider />

      {/* Basic Formatting */}
      <ToolbarButton cmd="bold" icon={Bold} label="" active={activeFormats.includes('bold')} />
      <ToolbarButton cmd="italic" icon={Italic} label="" active={activeFormats.includes('italic')} />
      <ToolbarButton cmd="underline" icon={Underline} label="" active={activeFormats.includes('underline')} />
      
      <Divider />

      {/* Alignment */}
      <div className="hidden md:flex items-center gap-0.5">
        <ToolbarButton cmd="justifyLeft" icon={AlignLeft} />
        <ToolbarButton cmd="justifyCenter" icon={AlignCenter} />
        <ToolbarButton cmd="justifyRight" icon={AlignRight} />
      </div>

      <Divider />

      {/* Lists */}
      <ToolbarButton cmd="insertUnorderedList" icon={List} />
      <ToolbarButton cmd="insertOrderedList" icon={ListOrdered} />

      <Divider />

      {/* History */}
      <div className="flex items-center gap-0.5">
        <ToolbarButton cmd="undo" icon={Undo} />
        <ToolbarButton cmd="redo" icon={Redo} />
      </div>

      {onExport && (
        <>
            <Divider />
            <button 
                onClick={onExport}
                className="ml-1 px-3 py-1.5 bg-black text-white rounded-full text-xs font-bold hover:bg-gray-800 transition-all flex items-center gap-1.5"
            >
                {type === 'dynamic' ? <Code size={12} /> : <Download size={12} />}
                <span>{type === 'dynamic' ? 'Export' : 'Save'}</span>
            </button>
        </>
      )}

    </div>
  );
};
