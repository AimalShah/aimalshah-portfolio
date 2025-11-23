import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-8 border-t border-surface2 mt-20 bg-bg text-center">
      <p className="text-subtext font-mono text-xs">
        Built with React, Tailwind & Framer Motion.<br/>
        &copy; {new Date().getFullYear()} Aimal. System Status: Normal.
      </p>
    </footer>
  );
};