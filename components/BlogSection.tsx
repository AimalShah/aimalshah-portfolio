
import React from 'react';
import { motion } from 'framer-motion';
import { BlogPost } from '../types';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPosts';

interface BlogSectionProps {
  onReadPost: (post: BlogPost) => void;
  onViewAll?: () => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onReadPost, onViewAll }) => {
  // Take only the first 3 posts for the homepage
  const recentPosts = BLOG_POSTS.slice(0, 3);

  return (
    <section id="blog" className="py-24 bg-bg relative border-b border-surface2">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="mb-16 flex items-end justify-between">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold font-sans mb-4">
              <span className="text-neonCyan">./</span>dev_logs
            </h2>
            <p className="text-subtext font-mono max-w-xl">
              Thoughts on software architecture, Linux ricing, and pixel art.
            </p>
          </div>
          
          <button 
             onClick={onViewAll}
             className="hidden md:flex items-center gap-2 font-mono text-sm text-subtext hover:text-white transition-colors border-b border-transparent hover:border-white pb-1"
          >
             VIEW_ARCHIVES <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {recentPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-surface/30 border border-surface2 hover:border-neonPink/50 transition-colors p-6 flex flex-col h-full relative overflow-hidden cursor-pointer"
              onClick={() => onReadPost(post)}
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-neonPink/10 to-transparent -mr-8 -mt-8 rounded-full blur-xl group-hover:from-neonPink/30 transition-all"></div>

              <div className="flex gap-3 mb-4 text-xs font-mono text-subtext">
                 <span className="flex items-center gap-1"><Calendar size={12}/> {post.date}</span>
                 <span className="flex items-center gap-1"><Clock size={12}/> {post.readTime}</span>
              </div>

              <h3 className="text-xl font-bold font-sans text-white mb-3 group-hover:text-neonCyan transition-colors">
                {post.title}
              </h3>
              
              <p className="text-subtext text-sm leading-relaxed mb-6 flex-grow">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-mono px-2 py-1 bg-surface2/50 text-subtext rounded-sm">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 text-sm font-bold font-mono text-neonPink group-hover:translate-x-2 transition-transform">
                READ_FILE <ArrowRight size={16} />
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="md:hidden text-center">
             <button 
                onClick={onViewAll}
                className="px-6 py-3 border border-surface2 text-subtext font-mono text-sm hover:text-white hover:border-white transition-colors"
            >
                VIEW_ALL_LOGS()
            </button>
        </div>

      </div>
    </section>
  );
};