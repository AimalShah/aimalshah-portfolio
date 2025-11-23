

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link: string;
  image: string; // Placeholder URL
  year: string;
  featured?: boolean;
}

export interface GuestbookEntry {
  id: number;
  name: string;
  message: string;
  created_at: string;
  signature: string; // A playful 'pixel' signature or hex code
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string; // Markdown-like string
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export type ViewState = 'HOME' | 'BLOG_POST' | 'ALL_PROJECTS' | 'ALL_BLOGS';
