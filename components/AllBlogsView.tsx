import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Calendar, Hash, ArrowUpRight } from 'lucide-react';
import { BlogPost } from '../types';
import { BLOG_POSTS } from '../data/blogPosts';

interface AllBlogsViewProps {
    onBack: () => void;
    onReadPost: (post: BlogPost) => void;
}

export const AllBlogsView: React.FC<AllBlogsViewProps> = ({ onBack, onReadPost }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPosts = BLOG_POSTS.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen pt-32 pb-20 px-6 bg-bg"
        >
            <div className="max-w-4xl mx-auto">
                <button 
                    onClick={onBack}
                    className="group flex items-center gap-2 text-subtext font-mono mb-12 hover:text-neonCyan transition-colors"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    cd ..
                </button>

                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-bold font-sans mb-4">
                            <span className="text-neonPink">./</span>logs_archive
                        </h1>
                        <p className="text-subtext font-mono max-w-xl">
                            A repository of technical deep dives, rants, and discoveries.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-subtext" size={16} />
                        <input 
                            type="text" 
                            placeholder="grep search_query" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-surface border border-surface2 rounded-full py-2 pl-10 pr-4 font-mono text-sm text-white focus:outline-none focus:border-neonCyan transition-colors placeholder:text-surface2"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post, index) => (
                            <motion.div 
                                key={post.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => onReadPost(post)}
                                className="group flex flex-col md:flex-row md:items-center justify-between p-6 border border-surface2 bg-surface/20 hover:bg-surface/40 hover:border-neonPink/50 transition-all cursor-pointer rounded-sm"
                            >
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 text-xs font-mono text-subtext mb-1">
                                        <span className="flex items-center gap-1 text-neonCyan"><Calendar size={12}/> {post.date}</span>
                                        <span className="w-1 h-1 bg-surface2 rounded-full"></span>
                                        <span>{post.readTime}</span>
                                    </div>
                                    <h3 className="text-xl font-bold font-sans text-white group-hover:text-neonPink transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-subtext max-w-xl line-clamp-1 group-hover:text-gray-300 transition-colors">
                                        {post.excerpt}
                                    </p>
                                </div>
                                
                                <div className="mt-4 md:mt-0 flex items-center gap-4 md:gap-8">
                                     <div className="flex gap-2">
                                        {post.tags.map(tag => (
                                            <span key={tag} className="text-[10px] font-mono px-2 py-1 bg-surface2/30 text-subtext rounded-full border border-surface2/50">
                                                #{tag}
                                            </span>
                                        ))}
                                     </div>
                                     <ArrowUpRight size={20} className="text-subtext group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="text-center py-20 border border-dashed border-surface2 text-subtext font-mono">
                           {"> Error: No logs found matching query."}
                        </div>
                    )}
                </div>

            </div>
        </motion.div>
    );
};