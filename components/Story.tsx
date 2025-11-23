
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, ChevronUp, Terminal } from 'lucide-react';

const chapters = [
    { 
        year: "2018", 
        title: "INIT_KERNEL", 
        content: "It started with an old laptop and a flash drive. I installed Linux for the first time and broke everything immediately. The terminal screen wasn't scary; it was a puzzle waiting to be solved. That black screen with a blinking cursor became my home." 
    },
    { 
        year: "2020", 
        title: "HELLO_WORLD", 
        content: "Wrote my first Python script to automate file organization. Realized that code wasn't just math—it was magic. I could create tools that didn't exist, solve problems that annoyed me, and build worlds from nothing." 
    },
    { 
        year: "2022", 
        title: "FULL_STACK_INTEGRATION", 
        content: "Moved beyond scripts to systems. React for the interface, Node for the logic. I spent nights fighting CSS and days debugging API routes. The chaos of the web became my playground." 
    },
    { 
        year: "PRESENT", 
        title: "SYSTEM_OPTIMIZATION", 
        content: "Now, I'm obsessed with the 'how'. How to make it faster (Go), how to make it reliable (Docker), and how to make it feel alive (Motion). I don't just write code; I engineer experiences." 
    }
];

export const Story: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <section id="story" className="py-24 px-6 bg-bg border-b border-surface2">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-16">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold font-sans text-white mb-4 text-center md:text-left">
                            ORIGIN_<span className="text-neonCyan">LOGS</span>
                        </h2>
                        <p className="text-subtext font-mono flex items-center gap-2">
                            <Terminal size={14} />
                            <span>cat /var/log/syslog | grep "life_story"</span>
                        </p>
                    </div>

                    {!isExpanded && (
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsExpanded(true)}
                            className="mt-6 md:mt-0 px-6 py-3 border border-neonCyan text-neonCyan font-mono hover:bg-neonCyan hover:text-bg transition-all flex items-center gap-3 shadow-[0_0_15px_rgba(0,255,255,0.3)]"
                        >
                            <Lock size={16} /> DECRYPT_HISTORY
                        </motion.button>
                    )}
                </div>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="relative overflow-hidden"
                        >
                            <div className="pt-8 relative">
                                {/* Vertical connecting line */}
                                <div className="absolute left-4 top-8 bottom-0 w-[2px] bg-surface2">
                                    <motion.div 
                                        initial={{ height: 0 }}
                                        whileInView={{ height: '100%' }}
                                        transition={{ duration: 2, ease: "linear" }}
                                        className="w-full bg-neonCyan/50"
                                    />
                                </div>

                                <div className="space-y-16 pb-8">
                                    {chapters.map((chapter, index) => (
                                        <motion.div 
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.2 }}
                                            className="relative pl-12 md:pl-20 group"
                                        >
                                            {/* Node Dot */}
                                            <div className="absolute left-[11px] top-2 w-4 h-4 rounded-full bg-bg border-2 border-neonCyan group-hover:bg-neonCyan transition-colors z-10"></div>
                                            
                                            {/* Horizontal trace line */}
                                            <div className="absolute left-4 top-4 w-6 md:w-14 h-[2px] bg-surface2 group-hover:bg-neonCyan/50 transition-colors"></div>

                                            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-2">
                                                <span className="font-mono text-neonPink text-sm tracking-widest">{chapter.year}</span>
                                                <h3 className="text-2xl font-bold font-sans text-white group-hover:text-neonCyan transition-colors">
                                                    {chapter.title}
                                                </h3>
                                            </div>
                                            
                                            <p className="text-subtext font-mono leading-relaxed text-sm md:text-base max-w-2xl bg-surface/20 p-4 border-l-2 border-transparent group-hover:border-neonPink transition-colors rounded-r-sm">
                                                {chapter.content}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="flex justify-center mt-8 pb-4">
                                    <button 
                                        onClick={() => setIsExpanded(false)}
                                        className="text-subtext hover:text-white font-mono text-xs flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity"
                                    >
                                        <ChevronUp size={14} /> ENCRYPT_LOGS (COLLAPSE)
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};
