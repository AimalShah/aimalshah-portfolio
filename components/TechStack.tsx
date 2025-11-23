import React from 'react';
import { motion } from 'framer-motion';

const categories = [
  {
    title: "LANGUAGES",
    items: ["TypeScript", "Golang", "Python", "SQL (Postgres)", "HTML/CSS"],
    color: "text-neonCyan",
    border: "border-neonCyan"
  },
  {
    title: "FRAMEWORKS",
    items: ["Next.js", "React", "Tailwind v4", "Framer Motion", "Drizzle ORM"],
    color: "text-neonPink",
    border: "border-neonPink"
  },
  {
    title: "THE_ARSENAL",
    items: ["Linux (Arch)", "Docker", "Git/GitHub", "Neovim", "Figma"],
    color: "text-neonGreen",
    border: "border-neonGreen"
  }
];

export const TechStack: React.FC = () => {
  return (
    <section className="py-24 bg-bg border-y border-surface2 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
            <div className="h-[1px] flex-grow bg-surface2"></div>
            <h2 className="text-2xl font-mono text-subtext tracking-widest">SYSTEM_MODULES</h2>
            <div className="h-[1px] flex-grow bg-surface2"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className={`flex items-center justify-between mb-4 border-b ${cat.border} pb-2`}>
                <h3 className={`font-bold font-sans ${cat.color}`}>{cat.title}</h3>
                <span className="text-xs font-mono text-subtext animate-pulse">OK</span>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                {cat.items.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center justify-between p-3 bg-surface hover:bg-surface2 transition-all cursor-default group/item border-l-2 border-transparent hover:border-l-white"
                  >
                    <span className="font-mono text-sm text-subtext group-hover/item:text-white transition-colors">
                      {item}
                    </span>
                    {/* Hover Effect: Binary code or simple block */}
                    <span className="text-[10px] text-surface2 group-hover/item:text-neonCyan font-mono opacity-0 group-hover/item:opacity-100 transition-opacity">
                      0x{idx + 1}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};