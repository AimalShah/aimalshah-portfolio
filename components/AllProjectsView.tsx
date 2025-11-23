import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Project } from "../types";

// Expanded list of projects including smaller ones
const allProjects: Project[] = [
  {
    id: "1",
    title: "Tower of Mordoria",
    description: "A 2D Tower Defense Game.",
    tech: ["Java", "libGDX", "Titled"],
    link: "https://github.com/AimalShah/tower-of-mordoria",
    image: "/assets/images/tower.png",
    year: "2025",
    featured: true,
  },
  {
    id: "2",
    title: "Techno-CMS",
    description: "Campus Management System for TechnoSphereX.",
    tech: ["Nextjs", "PostgreSQL", "Neon", "DrizzleORM"],
    link: "https://github.com/AimalShah/techno-cms",
    image: "/assets/images/techno.jpeg",
    year: "2025",
    featured: true,
  },
  {
    id: "3",
    title: "404-Studio Landing Page",
    description: "My personal Arch/Hyprland configuration",
    tech: ["NextJs", "Tailwind", "Framer Motion"],
    link: "https://github.com/AimalShah/404-studios",
    image: "/assets/images/404-studio.png",
    year: "2025",
    featured: true,
  },
  {
    id: "4",
    title: "Khalid Zarar Portfolio",
    description: "A portfolio project of video editor.",
    tech: ["React", "Framer Motion"],
    link: "https://github.com/AimalShah/portfolio-project",
    image: "/assets/images/portfolio-project.png",
    year: "2024",
    featured: true,
  },
];

interface AllProjectsViewProps {
  onBack: () => void;
}

export const AllProjectsView: React.FC<AllProjectsViewProps> = ({ onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-20 px-6 bg-bg"
    >
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 text-subtext font-mono mb-12 hover:text-neonCyan transition-colors"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          cd ..
        </button>

        <h1 className="text-4xl md:text-6xl font-bold font-sans mb-6">
          <span className="text-neonPink">./</span>archive
        </h1>
        <p className="text-subtext font-mono mb-16 max-w-xl">
          A complete directory of experiments, tools, and applications I've
          built.
        </p>

        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-surface2 text-xs font-mono text-subtext uppercase tracking-widest">
          <div className="col-span-1">Year</div>
          <div className="col-span-4">Project</div>
          <div className="col-span-4">Built With</div>
          <div className="col-span-2">Link</div>
        </div>

        {/* Table Body */}
        <div className="space-y-0">
          {allProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group grid grid-cols-1 md:grid-cols-12 gap-4 py-6 border-b border-surface2 items-center hover:bg-surface/30 transition-colors"
            >
              <div className="col-span-1 font-mono text-neonCyan text-sm opacity-60 group-hover:opacity-100">
                {project.year}
              </div>

              <div className="col-span-4">
                <h3 className="text-lg font-bold text-white group-hover:text-neonPink transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-subtext md:hidden mt-1">
                  {project.description}
                </p>
              </div>

              <div className="col-span-4 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono px-2 py-1 bg-surface2/50 rounded-full text-subtext group-hover:text-white transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="col-span-2 flex items-center gap-4 text-subtext">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-neonCyan transition-colors"
                >
                  <Github size={18} />
                </a>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  <ExternalLink size={18} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
