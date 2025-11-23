import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Beaker,
  Terminal,
  ArrowRight,
  FileCode,
  Cpu,
  Layers,
} from "lucide-react";

const experiments = [
  {
    id: "EXP-01",
    title: "Deploying Human Dection AI MODEL on Raspberry PI.",
    category: "DEPLOYMENT",
    objective:
      "To understand raspberry PI.",
    status: "PROTOTYPING",
  },
];

export const Lab: React.FC = () => {
  return (
    <section id="lab" className="py-24 px-6 bg-bg border-b border-surface2">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 text-neonGreen mb-2">
              <Beaker size={18} />
              <span className="font-mono text-xs tracking-widest">
                ACTIVE_RESEARCH_PROTOCOLS
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-sans text-white">
              THE_<span className="text-subtext">LAB</span>
            </h2>
          </div>
          <p className="text-subtext font-mono text-sm max-w-md text-right md:text-left">
            A collection of ongoing technical explorations. <br />
            Testing hypotheses and breaking things in a controlled environment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {experiments.map((exp, index) => (
            <ResearchCard key={exp.id} data={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ResearchCard: React.FC<{
  data: (typeof experiments)[0];
  index: number;
}> = ({ data, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-surface/20 border border-surface2 hover:border-neonCyan transition-all duration-300 flex flex-col h-full overflow-hidden"
    >
      {/* Header / ID */}
      <div className="p-6 border-b border-surface2 flex justify-between items-center bg-surface/30">
        <span className="font-mono text-xs text-neonPink border border-neonPink/30 px-2 py-1 rounded-sm">
          {data.id}
        </span>
        <span className="font-mono text-[10px] text-subtext uppercase tracking-widest">
          {data.status}
        </span>
      </div>

      {/* Content Body */}
      <div className="p-6 flex-grow flex flex-col">
        <div className="mb-4">
          <span className="text-[10px] font-mono text-neonCyan mb-1 block">
            {data.category}
          </span>
          <h3 className="text-xl font-bold font-sans text-white group-hover:text-neonCyan transition-colors">
            {data.title}
          </h3>
        </div>

        <div className="mb-6 flex-grow">
          <p className="text-[10px] font-mono text-subtext uppercase mb-1">
            Objective:
          </p>
          <p className="text-sm text-gray-300 leading-relaxed">
            {data.objective}
          </p>
        </div>

        {/* Code Snippet Reveal */}
       
      </div>

      {/* Corner Decor */}
      <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-2 h-2 bg-neonCyan"></div>
      </div>
      <div className="absolute bottom-0 left-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-2 h-2 bg-neonPink"></div>
      </div>
    </motion.div>
  );
};
