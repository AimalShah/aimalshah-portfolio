
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, Command, Hash, Code, Mail, Terminal, Beaker, BookOpen } from 'lucide-react';
import { ViewState } from '../types';

interface CommandPaletteProps {
  changeView: (view: ViewState) => void;
}

interface CommandOption {
  id: string;
  label: string;
  subLabel?: string;
  icon: React.ReactNode;
  action: () => void;
  category: 'NAVIGATION' | 'SOCIAL' | 'SYSTEM';
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ changeView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Toggle with Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setQuery('');
        setSelectedIndex(0);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Define Commands
  const commands: CommandOption[] = useMemo(() => [
    {
      id: 'home', label: 'Go Home', subLabel: '~/root', icon: <Terminal size={14} />, category: 'NAVIGATION',
      action: () => { changeView('HOME'); setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100); }
    },
    {
        id: 'story', label: 'My Story', subLabel: 'Origin Logs', icon: <BookOpen size={14} />, category: 'NAVIGATION',
        action: () => { 
            changeView('HOME'); 
            setTimeout(() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' }), 100); 
        }
    },
    {
      id: 'projects', label: 'View Projects', subLabel: './projects', icon: <Code size={14} />, category: 'NAVIGATION',
      action: () => { 
        changeView('HOME'); 
        setTimeout(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }), 100); 
      }
    },
    {
        id: 'lab', label: 'R&D Lab', subLabel: 'Current Experiments', icon: <Beaker size={14} />, category: 'NAVIGATION',
        action: () => { 
            changeView('HOME'); 
            setTimeout(() => document.getElementById('lab')?.scrollIntoView({ behavior: 'smooth' }), 100); 
        }
    },
    {
      id: 'archive', label: 'Project Archive', subLabel: 'View all projects', icon: <Hash size={14} />, category: 'NAVIGATION',
      action: () => changeView('ALL_PROJECTS')
    },
    {
      id: 'blog', label: 'Read Blog', subLabel: './dev_logs', icon: <Hash size={14} />, category: 'NAVIGATION',
      action: () => { 
          changeView('HOME'); 
          setTimeout(() => document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' }), 100); 
      }
    },
    {
        id: 'blog_archive', label: 'Blog Archive', subLabel: 'View all posts', icon: <Hash size={14} />, category: 'NAVIGATION',
        action: () => changeView('ALL_BLOGS')
      },
    {
      id: 'contact', label: 'Contact Me', subLabel: 'Send email', icon: <Mail size={14} />, category: 'SOCIAL',
      action: () => { 
          changeView('HOME');
          setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100); 
      }
    },
    {
      id: 'gh', label: 'GitHub', subLabel: 'Open profile', icon: <ArrowRight size={14} />, category: 'SOCIAL',
      action: () => window.open('https://github.com', '_blank')
    },
    {
      id: 'copy_email', label: 'Copy Email', subLabel: 'aimal@example.com', icon: <Command size={14} />, category: 'SYSTEM',
      action: () => { navigator.clipboard.writeText('aimal@example.com'); alert('Email copied to clipboard'); }
    }
  ], [changeView]);

  // Filter commands
  const filteredCommands = useMemo(() => {
    if (!query) return commands;
    return commands.filter(cmd => 
      cmd.label.toLowerCase().includes(query.toLowerCase()) || 
      cmd.subLabel?.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, commands]);

  // Handle Arrow Navigation
  useEffect(() => {
    const handleNavigation = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
          setIsOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleNavigation);
    return () => window.removeEventListener('keydown', handleNavigation);
  }, [isOpen, selectedIndex, filteredCommands]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[20vh] px-4">
            {/* Backdrop */}
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                onClick={() => setIsOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                className="relative w-full max-w-xl bg-bg border border-surface2 shadow-2xl overflow-hidden rounded-md flex flex-col max-h-[60vh]"
            >
                {/* Input */}
                <div className="flex items-center gap-3 px-4 py-4 border-b border-surface2">
                    <Search size={20} className="text-subtext" />
                    <input 
                        autoFocus
                        value={query}
                        onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
                        placeholder="Type a command or search..."
                        className="flex-1 bg-transparent text-white font-mono placeholder:text-surface2 focus:outline-none"
                    />
                    <div className="text-[10px] font-mono text-surface2 bg-surface px-2 py-1 rounded border border-surface2">
                        ESC
                    </div>
                </div>

                {/* List */}
                <div className="overflow-y-auto py-2">
                    {filteredCommands.length === 0 ? (
                        <div className="px-4 py-8 text-center text-subtext font-mono text-sm">
                           {"> No matching commands found."}
                        </div>
                    ) : (
                        <div className="space-y-1">
                             {filteredCommands.map((cmd, index) => (
                                 <button
                                    key={cmd.id}
                                    onClick={() => { cmd.action(); setIsOpen(false); }}
                                    onMouseEnter={() => setSelectedIndex(index)}
                                    className={`w-full text-left px-4 py-3 flex items-center justify-between transition-colors ${
                                        index === selectedIndex ? 'bg-surface/50 border-l-2 border-neonCyan' : 'border-l-2 border-transparent'
                                    }`}
                                 >
                                     <div className="flex items-center gap-3">
                                         <span className={`${index === selectedIndex ? 'text-neonCyan' : 'text-subtext'}`}>
                                             {cmd.icon}
                                         </span>
                                         <div>
                                             <div className={`font-sans font-bold text-sm ${index === selectedIndex ? 'text-white' : 'text-subtext'}`}>
                                                 {cmd.label}
                                             </div>
                                             {cmd.subLabel && (
                                                 <div className="text-xs font-mono text-subtext/50">
                                                     {cmd.subLabel}
                                                 </div>
                                             )}
                                         </div>
                                     </div>
                                     {index === selectedIndex && (
                                         <ArrowRight size={14} className="text-neonCyan" />
                                     )}
                                 </button>
                             ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="bg-surface/30 px-4 py-2 border-t border-surface2 flex justify-between items-center text-[10px] font-mono text-subtext">
                    <div className="flex gap-4">
                        <span>↑↓ to navigate</span>
                        <span>↵ to select</span>
                    </div>
                    <span>System Ready</span>
                </div>
            </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
