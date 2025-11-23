
import React, { useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Project } from '../types';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
const towerImage = "/assets/images/tower.png";


const featuredProjects: Project[] = [
  {
    id: '1',
    title: 'Tower of Mordoria',
    description: 'A 2D Tower Defense Game.',
    tech: ['Java', 'libGDX', 'Titled'],
    link: 'https://github.com/AimalShah/tower-of-mordoria',
    image: "https://ncby2gymh9.ufs.sh/f/s5ruswA3u7Nl2D53mcEstrOzvcP30SsmUn4kNGI2jF8i1bpR",
    year: '2025',
    featured: true
  },
  {
    id: '2',
    title: 'Techno-CMS',
    description: 'Campus Management System for TechnoSphereX.',
    tech: ['Nextjs', 'PostgreSQL', 'Neon', 'DrizzleORM'],
    link: 'https://github.com/AimalShah/techno-cms',
    image: 'https://ncby2gymh9.ufs.sh/f/s5ruswA3u7NlQdScym2MzUcGg5Vu4R0xpvaj16l3HkDim7tL',
    year: '2025',
    featured: true
  },
  {
    id: '3',
    title: '404-Studio Landing Page',
    description: 'My personal Arch/Hyprland configuration',
    tech: ['NextJs', 'Tailwind', 'Framer Motion'],
    link: 'https://ncby2gymh9.ufs.sh/f/s5ruswA3u7NlQIMH6X2MzUcGg5Vu4R0xpvaj16l3HkDim7tL',
    image: '/assets/images/404-studio.png',
    year: '2025',
    featured: true
  },
  {
    id: '4',
    title: 'Khalid Zarar Portfolio',
    description: 'A portfolio project of video editor.',
    tech: ['React', 'Framer Motion'],
    link: 'https://github.com/AimalShah/portfolio-project',
    image: 'https://ncby2gymh9.ufs.sh/f/s5ruswA3u7NlwVIBgHRUYmjaSlH8UEDT3v4iAbcVtJOIz5xq',
    year: '2024',
    featured: true
  }
];

interface ProjectGalleryProps {
    onViewAll: () => void;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({ onViewAll }) => {
    // Global mouse tracking for fixed image
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    
    // Smooth spring animation
    const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const [activeImg, setActiveImg] = useState<string | null>(null);
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        // We use clientX/Y so the image is fixed to viewport, preventing scroll lag
        x.set(e.clientX);
        y.set(e.clientY);
    };

    return (
        <section 
            id="projects" 
            className="bg-bg py-32 px-6 relative border-b border-surface2 overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { setActiveImg(null); setHoveredProject(null); }}
        >
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-6">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-bold font-sans mb-4">
                            SELECTED_<span className="text-neonCyan">WORKS</span>
                        </h2>
                        <p className="text-subtext font-mono max-w-md">
                            A curation of experiments and production systems.
                            <br/><span className="text-xs opacity-50">Hover to preview.</span>
                        </p>
                    </div>
                    <button 
                        onClick={onViewAll}
                        className="group font-mono text-sm text-subtext hover:text-white transition-colors flex items-center gap-2 border-b border-transparent hover:border-white pb-1"
                    >
                        [ ARCHIVE ] <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Typography List */}
                <div className="w-full">
                    {/* Header Row */}
                    <div className="hidden md:flex text-xs font-mono text-subtext/50 uppercase tracking-widest border-b border-surface2 pb-4 mb-4">
                        <span className="w-20">No.</span>
                        <span className="flex-1">Project Name</span>
                        <span className="w-40 text-right">Tech Stack</span>
                        <span className="w-24 text-right">Year</span>
                    </div>

                    {featuredProjects.map((project, index) => (
                        <ProjectListRow 
                            key={project.id} 
                            project={project} 
                            index={index}
                            setHovered={(id) => {
                                setHoveredProject(id);
                                if (id) setActiveImg(project.image);
                                else setActiveImg(null);
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Fixed Floating Image Reveal */}
            <motion.div 
                style={{ 
                    left: springX, 
                    top: springY,
                    translateX: "-50%",
                    translateY: "-50%"
                }}
                className="pointer-events-none fixed z-50 hidden md:block w-[480px] h-[320px] rounded-sm overflow-hidden border border-neonCyan bg-bg shadow-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                    opacity: activeImg ? 1 : 0, 
                    scale: activeImg ? 1 : 0.8,
                }}
                transition={{ duration: 0.2 }}
            >
                {activeImg && (
                    <>
                        <img 
                            src={activeImg} 
                            alt="Preview" 
                            className="w-full h-full object-cover contrast-125"
                        />
                        <div className="absolute inset-0 bg-neonCyan/10 mix-blend-overlay"></div>
                        <div className="absolute bottom-4 left-4 bg-bg/90 border border-surface2 px-2 py-1 text-[10px] font-mono text-neonCyan">
                            {hoveredProject && featuredProjects.find(p => p.id === hoveredProject)?.title}
                        </div>
                    </>
                )}
            </motion.div>
        </section>
    );
};

const ProjectListRow: React.FC<{ 
    project: Project; 
    index: number;
    setHovered: (id: string | null) => void;
}> = ({ project, index, setHovered }) => {
    return (
        <a 
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="group relative flex flex-col md:flex-row md:items-center py-10 md:py-8 border-b border-surface2 transition-all hover:bg-surface/10 cursor-none"
            onMouseEnter={() => setHovered(project.id)}
            onMouseLeave={() => setHovered(null)}
        >
            {/* Index */}
            <span className="font-mono text-xs text-subtext/50 w-20 mb-2 md:mb-0">
                0{index + 1}
            </span>

            {/* Title */}
            <div className="flex-1 flex items-baseline gap-4">
                <h3 className="text-3xl md:text-5xl font-bold font-sans text-white group-hover:text-transparent group-hover:text-stroke-white transition-all duration-300">
                    <span className="inline-block opacity-0 w-0 group-hover:w-auto group-hover:opacity-100 transition-all text-neonPink mr-2">/</span>
                    {project.title}
                </h3>
            </div>

            {/* Description (Mobile only) */}
            <p className="text-sm text-subtext mt-2 md:hidden">
                {project.description}
            </p>

            {/* Tech Stack */}
            <div className="w-40 text-right hidden md:block font-mono text-xs text-subtext group-hover:text-neonCyan transition-colors">
                {project.tech[0]} / {project.tech[1]}
            </div>

            {/* Year */}
            <div className="w-24 text-right hidden md:flex justify-end font-mono text-xs text-subtext">
                <span className="group-hover:-translate-x-2 transition-transform">{project.year}</span>
                <ArrowUpRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all absolute right-0" />
            </div>
        </a>
    );
};
