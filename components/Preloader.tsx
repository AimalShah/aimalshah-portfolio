import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const textLines = [
    "> INITIALIZING_KERNEL...",
    "> LOADING_MODULES...",
    "> MOUNTING_VIRTUAL_DOM...",
    "> BYPASSING_SECURITY...",
    "> SYSTEM_READY."
  ];

  useEffect(() => {
    let currentLine = 0;
    
    // Text sequence
    const textInterval = setInterval(() => {
      setLines(prev => [...prev, textLines[currentLine]]);
      currentLine++;
      if (currentLine >= textLines.length) clearInterval(textInterval);
    }, 400);

    // Progress bar
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 150);

    // Completion trigger
    const completeTimeout = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-black z-[9999] flex flex-col justify-end p-10 md:p-20 font-mono overflow-hidden"
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      {/* Matrix-like noise overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <div className="max-w-xl w-full mx-auto md:mx-0">
        <div className="mb-8 space-y-2 text-sm md:text-base h-40">
          {lines.map((line, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`${i === lines.length - 1 ? 'text-neonGreen' : 'text-subtext'}`}
            >
              {line}
            </motion.div>
          ))}
        </div>

        <div className="relative w-full h-1 bg-surface2 overflow-hidden mb-2">
          <motion.div 
            className="absolute left-0 top-0 bottom-0 bg-neonCyan"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-subtext uppercase tracking-widest">
            <span>Memory: 64KB OK</span>
            <span>{Math.min(100, progress)}%</span>
        </div>
      </div>
      
      <div className="absolute top-10 right-10 md:top-20 md:right-20 text-right">
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-2">AIMAL</h1>
        <p className="text-neonPink text-xs md:text-sm tracking-[0.5em]">PORTFOLIO_V1.0</p>
      </div>
    </motion.div>
  );
};