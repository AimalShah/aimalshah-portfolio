
import React from 'react';
import { motion } from 'framer-motion';
import { GitCommit, GitBranch, GitPullRequest } from 'lucide-react';

interface ExperienceItem {
    id: string;
    role: string;
    company: string;
    date: string;
    description: string;
    type: 'commit' | 'merge';
}

const history: ExperienceItem[] = [
    {
        id: 'c8f2a1',
        role: 'Full Stack Developer',
        company: '404-STUDIO',
        date: '2025 - Present',
        description: 'Working as Fullstack developer for a Freelance Agnecy 404-Studio.',
        type: 'merge'
    },
    {
        id: 'b7d3e9',
        role: 'Frontend Developer',
        company: 'TetraStudio',
        date: '2022 - 2024',
        description: 'Implemented pixel-perfect designs using React and Framer Motion. Collaborated with designers to create high-fidelity prototypes.',
        type: 'commit'
    },
];

export const Experience: React.FC = () => {
    return (
        <section id="experience" className="py-32 px-6 bg-bg border-b border-surface2">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-16">
                    <GitBranch className="text-neonPink" size={24} />
                    <h2 className="text-3xl md:text-4xl font-sans font-bold text-white">
                        SYSTEM_<span className="text-subtext">CHANGELOG</span>
                    </h2>
                </div>

                <div className="relative border-l-2 border-surface2 ml-3 md:ml-6 space-y-12 pb-12">
                    {history.map((item, index) => (
                        <motion.div 
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative pl-8 md:pl-12"
                        >
                            {/* Timeline Node */}
                            <div className={`absolute -left-[9px] md:-left-[9px] top-1 w-4 h-4 rounded-full border-2 border-bg ${item.type === 'merge' ? 'bg-neonPink' : 'bg-surface2'} z-10`}></div>
                            
                            <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 mb-2">
                                <span className="font-mono text-xs text-neonCyan bg-surface/50 px-2 py-1 rounded">
                                    {item.id}
                                </span>
                                <h3 className="text-xl font-bold font-sans text-white">
                                    {item.role} <span className="text-subtext font-normal">@ {item.company}</span>
                                </h3>
                            </div>

                            <div className="mb-4 flex items-center gap-2 text-xs font-mono text-subtext">
                                <GitCommit size={12} />
                                <span>{item.date}</span>
                            </div>

                            <p className="text-gray-400 font-mono text-sm leading-relaxed max-w-xl border-l-2 border-surface2 pl-4 hover:border-neonGreen transition-colors">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}

                    {/* Start Node */}
                    <div className="absolute bottom-0 -left-[5px] w-3 h-3 bg-neonGreen rounded-full animate-pulse"></div>
                    <div className="absolute bottom-0 left-8 text-xs font-mono text-neonGreen">
                        Initial Commit
                    </div>
                </div>
            </div>
        </section>
    );
};
