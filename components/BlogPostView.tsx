
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BlogPost } from '../types';
import { ArrowLeft, Calendar, Clock, Tag, Share2, Check } from 'lucide-react';

interface BlogPostViewProps {
  post: BlogPost | null;
  onBack: () => void;
}

export const BlogPostView: React.FC<BlogPostViewProps> = ({ post, onBack }) => {
  const [copied, setCopied] = useState(false);

  if (!post) return null;

  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: post.excerpt,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.debug('Share cancelled');
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy link');
      }
    }
  };

  // Simple Markdown-like parser for the content
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let codeBlock = false;
    let codeContent: string[] = [];
    let key = 0;

    lines.forEach((line) => {
      // Toggle Code Block
      if (line.trim().startsWith('```')) {
        if (codeBlock) {
          // Render collected code
          elements.push(
            <pre key={`code-${key++}`} className="bg-surface2/30 p-6 rounded-md overflow-x-auto border border-surface2 my-8 shadow-inner">
              <code className="font-mono text-sm text-neonGreen block">
                {codeContent.join('\n')}
              </code>
            </pre>
          );
          codeContent = [];
          codeBlock = false;
        } else {
          codeBlock = true;
        }
        return;
      }

      if (codeBlock) {
        codeContent.push(line);
        return;
      }

      // Headers
      if (line.startsWith('# ')) {
        elements.push(<h2 key={`h1-${key++}`} className="text-2xl md:text-3xl font-bold text-white mt-12 mb-6 border-l-4 border-neonCyan pl-4">{line.replace('# ', '')}</h2>);
        return;
      }
      if (line.startsWith('## ')) {
        elements.push(<h3 key={`h2-${key++}`} className="text-xl md:text-2xl font-bold text-white mt-10 mb-4">{line.replace('## ', '')}</h3>);
        return;
      }
      if (line.startsWith('### ')) {
        elements.push(<h4 key={`h3-${key++}`} className="text-lg md:text-xl font-bold text-white mt-8 mb-3">{line.replace('### ', '')}</h4>);
        return;
      }

      // Skip empty lines if they aren't part of code
      if (line.trim() === '') return;

      // Regular Paragraphs
      elements.push(<p key={`p-${key++}`} className="text-gray-300 leading-relaxed mb-4 text-lg font-light">{line}</p>);
    });

    return elements;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto"
    >
      <button 
        onClick={onBack}
        className="group flex items-center gap-2 text-subtext font-mono mb-12 hover:text-neonCyan transition-colors"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        cd ..
      </button>

      <motion.article 
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="prose prose-invert prose-lg max-w-none"
      >
        <div className="border-b border-surface2 pb-8 mb-12">
            <div className="flex flex-wrap gap-4 text-xs font-mono text-neonPink mb-6">
                {post.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 border border-neonPink/30 rounded-sm">
                        {tag}
                    </span>
                ))}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold font-sans text-white mb-6 leading-tight">
                {post.title}
            </h1>

            <div className="flex items-center gap-6 text-sm text-subtext font-mono relative">
                <span className="flex items-center gap-2"><Calendar size={14}/> {post.date}</span>
                <span className="flex items-center gap-2"><Clock size={14}/> {post.readTime}</span>
                
                <div className="ml-auto relative">
                  <button 
                    onClick={handleShare}
                    className="hover:text-white transition-colors flex items-center gap-2 group"
                    aria-label="Share post"
                  >
                    {copied ? <Check size={16} className="text-neonGreen" /> : <Share2 size={16} className="group-hover:text-neonCyan transition-colors"/>}
                  </button>

                  <AnimatePresence>
                    {copied && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: 10, x: '-50%' }}
                        className="absolute left-1/2 top-full mt-2 bg-surface border border-surface2 px-3 py-1 rounded text-xs text-neonGreen font-mono whitespace-nowrap shadow-xl z-10"
                      >
                        Link Copied!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
            </div>
        </div>

        {/* Dynamic Content */}
        <div className="font-sans">
            {/* Excerpt / Lead */}
            <p className="text-xl md:text-2xl font-light text-subtext leading-relaxed mb-12 border-l-2 border-surface2 pl-6 italic">
                {post.excerpt}
            </p>
            
            {/* Rendered Body */}
            <div className="space-y-6">
              {renderContent(post.content)}
            </div>
        </div>

        <div className="mt-20 pt-10 border-t border-surface2 flex justify-between items-center">
             <div className="text-subtext font-mono text-sm">
                 EOF
             </div>
             <button 
                onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                className="text-neonCyan font-bold font-mono hover:underline"
            >
                TOP_OF_FILE
             </button>
        </div>
      </motion.article>
    </motion.div>
  );
};
