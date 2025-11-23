import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

// Simple text scrambler hook
const useScramble = (text: string) => {
    const [display, setDisplay] = useState(text);
    const chars = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';
    
    const scramble = () => {
        let iterations = 0;
        const interval = setInterval(() => {
            setDisplay(
                text.split("").map((letter, index) => {
                    if(index < iterations) {
                        return text[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join("")
            );
            if(iterations >= text.length) clearInterval(interval);
            iterations += 1/3; 
        }, 30);
    };
    return { display, scramble };
};

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  
  // Parallax effects
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 300]);

  const { display: titleDisplay, scramble: scrambleTitle } = useScramble("FULLSTACK");

  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-bg">
      
      {/* Optimized CSS Grid Background with Parallax */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(60, 56, 54, 0.5) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(60, 56, 54, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)'
          }}
        />
        {/* Floating "pixels" via CSS gradients for decoration */}
        <div className="absolute top-1/4 left-1/4 w-10 h-10 bg-surface2/30"></div>
        <div className="absolute bottom-1/3 right-1/4 w-10 h-10 bg-neonCyan/10"></div>
        <div className="absolute top-1/3 right-1/3 w-10 h-10 bg-neonPink/10"></div>
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ y, opacity } as any}
        className="relative z-10 max-w-4xl px-6 text-center md:text-left"
      >
        <div className="mb-8 inline-flex items-center gap-3 px-4 py-2 border border-surface2 bg-bg/50 backdrop-blur-sm rounded-full mx-auto md:mx-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neonGreen opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-neonGreen"></span>
          </span>
          <span className="text-subtext font-mono text-xs tracking-widest">SYSTEM ONLINE</span>
        </div>

        <h1 className="text-6xl md:text-9xl font-bold font-sans tracking-tighter mb-8 leading-[0.9]">
          <span className="block text-white">AIMAL</span>
          <span 
            className="block text-transparent bg-clip-text bg-gradient-to-r from-neonCyan to-neonPink cursor-pointer hover:opacity-80 transition-opacity"
            onMouseEnter={scrambleTitle}
          >
            {titleDisplay}
          </span>
        </h1>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <p className="text-subtext font-mono max-w-md text-sm md:text-base leading-relaxed border-l-2 border-neonCyan pl-4 text-left">
                Creative Developer & Linux Enthusiast.<br/>
                Crafting robust backends and immersive interfaces without the bloat.
            </p>

            <div className="flex gap-4">
                <button 
                    onClick={() => document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'})} 
                    className="px-8 py-4 bg-white text-bg font-bold font-mono hover:bg-neonCyan hover:-translate-y-1 transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]"
                >
                    VIEW_WORK
                </button>
                <button 
                    onClick={() => document.getElementById('about')?.scrollIntoView({behavior: 'smooth'})} 
                    className="px-8 py-4 border border-surface2 text-white font-mono hover:border-neonPink hover:text-neonPink hover:-translate-y-1 transition-all duration-300"
                >
                    ABOUT_ME
                </button>
            </div>
        </div>
      </motion.div>
      
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-subtext z-10 opacity-50"
      >
        <ArrowDown size={20} />
      </motion.div>
    </section>
  );
};