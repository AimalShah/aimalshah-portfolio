import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Server, Cpu, Layers } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-32 px-6 bg-bg relative border-b border-surface2">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex items-end gap-4 mb-16">
           <h2 className="text-4xl md:text-5xl font-bold font-sans text-white">
             SYSTEM_<span className="text-subtext">DIAGNOSTICS</span>
           </h2>
           <div className="h-[2px] flex-grow bg-surface2 mb-2 relative overflow-hidden">
             <div className="absolute inset-0 bg-neonCyan/50 w-full -translate-x-full animate-[shimmer_2s_infinite]"></div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Column 1: The "Log" (Bio) */}
            <div className="space-y-8">
                <div className="bg-surface/30 border border-surface2 p-6 md:p-10 relative overflow-hidden group hover:border-neonCyan/30 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                        <Terminal size={32} className="text-neonCyan" />
                    </div>
                    
                    <h3 className="text-xl font-mono text-neonCyan mb-6"> {"> cat profile.txt"}</h3>
                    
                    <div className="font-mono text-sm md:text-base text-subtext space-y-4 leading-relaxed">
                        <p>
                            <span className="text-neonPink">root@aimal:~$</span> I am a Computer Science student obsessed with the "why" and "how" of software systems. 
                        </p>
                        <p>
                            My workflow is keyboard-centric. I live in <strong className="text-white">Neovim</strong> and deploy on <strong className="text-white">Linux</strong>. 
                            I believe good software should be performant by default and aesthetic by design.
                        </p>
                        <p>
                            Currently specializing in <strong className="text-white">Backend Infrastructure</strong> and 
                            <strong className="text-white"> Interactive Frontends (React/Next.js)</strong>.
                        </p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <StatusBadge label="STATUS" value="AVAILABLE" color="text-neonGreen" />
                    <StatusBadge label="LOCATION" value="REMOTE" color="text-neonCyan" />
                    <StatusBadge label="UPTIME" value="99.9%" color="text-neonPink" />
                </div>
            </div>

            {/* Column 2: System Metrics (Skills) */}
            <div className="flex flex-col gap-6">
                <SkillBar label="BACKEND_ARCHITECTURE" level={90} icon={<Server size={16}/>} />
                <SkillBar label="FRONTEND_INTERACTION" level={85} icon={<Layers size={16}/>} />
                <SkillBar label="LINUX_ADMINISTRATION" level={80} icon={<Terminal size={16}/>} />
                <SkillBar label="ALGORITHMS_&_DATA" level={75} icon={<Cpu size={16}/>} />

                <div className="mt-8 p-6 border border-dashed border-surface2 bg-bg relative">
                    <h4 className="text-xs font-mono text-subtext mb-4 uppercase tracking-widest">Education_Buffer</h4>
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <span className="block text-white font-bold font-sans">BS Computer Science</span>
                            <span className="text-xs font-mono text-subtext">UET, PESHAWAR</span>
                        </div>
                        <span className="text-xs font-mono text-neonPink">2024 - PRESENT</span>
                    </div>
                    <p className="text-xs text-subtext mt-2">Focus: Distributed Systems, Web Engineering.</p>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};

const SkillBar: React.FC<{ label: string; level: number; icon: React.ReactNode }> = ({ label, level, icon }) => (
    <div className="group">
        <div className="flex justify-between items-center mb-2 font-mono text-xs text-subtext">
            <span className="flex items-center gap-2 group-hover:text-white transition-colors">
                {icon} {label}
            </span>
            <span>{level}%</span>
        </div>
        <div className="h-2 w-full bg-surface2 relative overflow-hidden">
            <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${level}%` }}
                transition={{ duration: 1.5, ease: "circOut" }}
                className="h-full bg-white relative"
            >
                 <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-neonPink shadow-[0_0_10px_#ff00ff]"></div>
            </motion.div>
        </div>
    </div>
);

const StatusBadge: React.FC<{ label: string; value: string; color: string }> = ({ label, value, color }) => (
    <div className="border border-surface2 px-4 py-2 bg-surface/20 flex-1">
        <span className="block text-[10px] font-mono text-subtext mb-1">{label}</span>
        <span className={`block text-sm font-bold font-sans ${color}`}>{value}</span>
    </div>
);