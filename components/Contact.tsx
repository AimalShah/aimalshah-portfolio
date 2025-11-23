
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, Copy, Check, Wifi, ExternalLink } from 'lucide-react';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  
  // Mouse position for 3D Tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('aimalshah62@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-32 px-6 bg-bg relative overflow-hidden border-t border-surface2">
      {/* Radar Scan Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-surface2 rounded-full"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-surface2 rounded-full"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-surface2 rounded-full"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-transparent via-neonCyan/5 to-transparent animate-spin [animation-duration:10s]"></div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left: Text & Network Status */}
        <div>
           <div className="mb-10">
              <h2 className="text-4xl md:text-6xl font-bold font-sans mb-4 text-white">
                SECURE_<span className="text-neonPink">UPLINK</span>
              </h2>
              <p className="text-subtext font-mono max-w-md">
                Initiate a handshake protocol. Available for freelance contracts and collaborative research.
              </p>
           </div>

           <div className="space-y-4 font-mono text-sm">
              <h3 className="text-neonCyan text-xs tracking-widest mb-4">NETWORK_STATUS</h3>
              
              <NetworkRow label="GITHUB_UPLINK" ping="14ms" url="https://github.com/aimalshah" icon={<Github size={14}/>} />
              <NetworkRow label="LINKEDIN_RELAY" ping="28ms" url="https://www.linkedin.com/in/aimal-shah-8625b0249" icon={<Linkedin size={14}/>} />
              <NetworkRow label="X_FEED" ping="42ms" url="https://x.com/aimalshah62" icon={<Twitter size={14}/>} />
              <div className="p-4 border border-surface2 bg-surface/30 flex justify-between items-center group hover:border-neonPink transition-colors">
                  <div className="flex items-center gap-3 text-subtext group-hover:text-white">
                      <Mail size={16} />
                      <span>MAIL_SERVER</span>
                  </div>
                  <button 
                    onClick={copyEmail}
                    className="flex items-center gap-2 text-xs text-neonPink hover:text-white transition-colors"
                  >
                     {copied ? <Check size={14} /> : <Copy size={14} />}
                     {copied ? "COPIED" : "COPY_ADDR"}
                  </button>
              </div>
           </div>
        </div>

        {/* Right: Holographic ID Card */}
        <div className="perspective-1000 flex justify-center">
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="w-full max-w-md aspect-[1.6/1] bg-surface/40 backdrop-blur-xl border border-white/10 rounded-xl p-8 relative shadow-2xl overflow-hidden group"
            >
                {/* Holographic Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 pointer-events-none"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
                
                {/* Content Layer */}
                <div className="relative z-10 flex flex-col justify-between h-full" style={{ transform: "translateZ(20px)" }}>
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                             <div className="w-12 h-12 bg-neonCyan/20 rounded-full flex items-center justify-center border border-neonCyan">
                                 <Wifi size={20} className="text-neonCyan animate-pulse" />
                             </div>
                             <div>
                                 <h3 className="text-white font-bold font-sans text-xl tracking-widest">AIMAL</h3>
                                 <p className="text-xs font-mono text-neonPink">FULLSTACK_DEV</p>
                             </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-mono text-subtext">ID: 8439-X</p>
                            <p className="text-[10px] font-mono text-neonGreen">ACCESS: GRANTED</p>
                        </div>
                    </div>

                    <div className="font-mono text-xs text-subtext space-y-1">
                        <p>{"> SPECIALIZATION: BACKEND_INFRA"}</p>
                        <p>{"> CURRENT_LOC: EARTH_616"}</p>
                        <p>{"> ENCRYPTION: SHA-256"}</p>
                    </div>

                    <div className="h-1 w-full bg-surface2 overflow-hidden rounded-full">
                         <div className="h-full bg-gradient-to-r from-neonCyan to-neonPink w-2/3 animate-[shimmer_2s_infinite]"></div>
                    </div>
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>
            </motion.div>
        </div>

      </div>
    </section>
  );
};

const NetworkRow: React.FC<{ label: string; ping: string; url: string; icon: React.ReactNode }> = ({ label, ping, url, icon }) => (
    <a href={url} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 border-b border-surface2 hover:bg-surface/20 hover:pl-4 transition-all group cursor-pointer">
        <div className="flex items-center gap-3 text-subtext group-hover:text-neonCyan transition-colors">
            {icon}
            <span>{label}</span>
        </div>
        <div className="flex items-center gap-3">
            <span className="text-xs text-neonGreen opacity-50 group-hover:opacity-100">{ping}</span>
            <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
    </a>
);
