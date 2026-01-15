
export interface ComponentItem {
  id: string;
  title: string;
  description: string;
  views: number;
  copies: number;
  category: 'Style' | 'Animation' | 'UI Component' | 'Design System' | 'File' | 'Folder';
  thumbnailClass: string; // CSS class for the mock thumbnail
  systemPrompt: string;
  readme?: string; // Optional field for generated README.md
  code?: string; // Optional field for generated HTML code
  createdAt?: number; // Timestamp for recent items
  type?: 'prompt' | 'prototype' | 'image' | 'folder' | 'file'; // Type of creation
  parentId?: string | null; // For folder structure
  content?: string; // For file content
  tokens?: any; // For design systems
}

export interface User {
  name: string;
  email: string;
  picture: string;
}

export interface SidebarProps {
  items: ComponentItem[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export interface PreviewAreaProps {
  item: ComponentItem;
}
