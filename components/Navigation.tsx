
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Code, Book, Mail, PenTool, GitBranch, Command } from 'lucide-react';
import { ViewState } from '../types';

interface NavigationProps {
  onViewChange: () => void;
  currentView: ViewState;
}

export const Navigation: React.FC<NavigationProps> = ({ onViewChange, currentView }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    if (currentView !== 'HOME') {
      onViewChange();
      // Wait for route change before scrolling
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenCommandPalette = () => {
      // Simulate the key press to open the palette
      const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true });
      window.dispatchEvent(event);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-[60] flex justify-center p-4 transition-all duration-300 ${isScrolled ? 'pt-4' : 'pt-8'}`}
    >
      <div className={`backdrop-blur-md border border-surface2/50 rounded-full px-6 py-3 flex items-center gap-6 shadow-2xl transition-all duration-300 ${isScrolled ? 'bg-bg/80' : 'bg-surface/40'}`}>
        
        <NavButton icon={<Terminal size={18} />} label="~/root" onClick={() => scrollTo('hero')} />
        <NavButton icon={<GitBranch size={18} />} label="./exp" onClick={() => scrollTo('experience')} />
        <NavButton icon={<Code size={18} />} label="./projects" onClick={() => scrollTo('projects')} />
        <NavButton icon={<PenTool size={18} />} label="./blog" onClick={() => scrollTo('blog')} />
        <NavButton icon={<Book size={18} />} label="./guestbook" onClick={() => scrollTo('guestbook')} />
        <NavButton icon={<Mail size={18} />} label="./contact" onClick={() => scrollTo('contact')} />
        
        <div className="h-4 w-[1px] bg-surface2 mx-2 hidden md:block"></div>
        
        {/* Command Palette Trigger */}
        <button 
            onClick={handleOpenCommandPalette}
            className="hidden md:flex items-center gap-2 text-xs font-mono text-subtext bg-surface/50 px-2 py-1 rounded border border-surface2 hover:border-neonCyan hover:text-white transition-all"
        >
            <Command size={12} /> K
        </button>
      </div>
    </motion.nav>
  );
};

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ icon, label, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group flex items-center gap-2 text-sm font-mono text-subtext hover:text-text transition-colors"
    >
      <span className="group-hover:text-neonPink transition-colors">{icon}</span>
      <span className="hidden lg:inline-block">{label}</span>
      
      {/* Pixelated Underline */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            layoutId="nav-underline"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: '100%' }}
            exit={{ opacity: 0, width: 0 }}
            className="absolute -bottom-1 left-0 h-[2px] bg-neonCyan"
            style={{ imageRendering: 'pixelated' } as React.CSSProperties}
          />
        )}
      </AnimatePresence>
    </button>
  );
};
