import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GuestbookEntry, LoadingState } from '../types';
import { fetchEntries, addEntry } from '../services/guestbookService';
import { Loader2, Send, Database } from 'lucide-react';

export const Guestbook: React.FC = () => {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(LoadingState.IDLE);
  const [formState, setFormState] = useState({ name: '', message: '' });
  const [status, setStatus] = useState(LoadingState.IDLE);

  useEffect(() => {
    setLoading(LoadingState.LOADING);
    fetchEntries().then(data => {
      setEntries(data);
      setLoading(LoadingState.SUCCESS);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.message) return;

    setStatus(LoadingState.LOADING);
    
    // Simulate server action
    await addEntry(formState.name, formState.message);
    
    // Optimistic update (or re-fetch)
    const newEntry: GuestbookEntry = {
        id: Date.now(),
        name: formState.name,
        message: formState.message,
        created_at: new Date().toISOString(),
        signature: '#ffffff'
    };
    
    setEntries([newEntry, ...entries]);
    setFormState({ name: '', message: '' });
    setStatus(LoadingState.SUCCESS);
    
    // Reset status after delay
    setTimeout(() => setStatus(LoadingState.IDLE), 2000);
  };

  return (
    <section id="guestbook" className="min-h-screen py-20 px-6 max-w-5xl mx-auto flex flex-col md:flex-row gap-16">
      
      {/* Form Section */}
      <div className="flex-1">
        <div className="sticky top-24">
          <h2 className="text-4xl font-bold font-sans mb-6">
            <span className="text-neonPink">./</span>guestbook
          </h2>
          <p className="text-subtext font-mono mb-8">
            Leave a mark on the digital log. <br/>
            <span className="text-xs text-gray-600 flex items-center gap-2 mt-2">
              <Database size={12} /> Powered by Drizzle ORM (Simulated)
            </span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-neonCyan mb-1 uppercase">usr_name</label>
              <input 
                type="text" 
                value={formState.name}
                onChange={e => setFormState({...formState, name: e.target.value})}
                className="w-full bg-surface border border-surface2 p-3 font-mono text-white focus:outline-none focus:border-neonPink transition-colors placeholder:text-surface2"
                placeholder="Enter your alias..."
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-neonCyan mb-1 uppercase">msg_content</label>
              <textarea 
                value={formState.message}
                onChange={e => setFormState({...formState, message: e.target.value})}
                rows={4}
                className="w-full bg-surface border border-surface2 p-3 font-mono text-white focus:outline-none focus:border-neonPink transition-colors placeholder:text-surface2"
                placeholder="Write something nice..."
              />
            </div>

            <button 
              type="submit" 
              disabled={status === LoadingState.LOADING}
              className="w-full bg-white text-bg font-bold py-3 hover:bg-neonCyan hover:shadow-[4px_4px_0px_0px_rgba(255,0,255,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === LoadingState.LOADING ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <Send size={16} /> EXECUTE_SIGN()
                </>
              )}
            </button>
            
            {status === LoadingState.SUCCESS && (
               <p className="text-neonGreen font-mono text-xs text-center mt-2">{"> Entry committed to database successfully."}</p>
            )}
          </form>
        </div>
      </div>

      {/* List Section */}
      <div className="flex-1">
        <div className="border-l border-surface2 pl-8 min-h-[500px]">
          <h3 className="text-subtext font-mono text-sm mb-6 uppercase">Recent Entries</h3>
          
          {loading === LoadingState.LOADING ? (
             <div className="flex flex-col gap-4">
                {[1,2,3].map(i => (
                    <div key={i} className="h-24 w-full bg-surface animate-pulse rounded-sm"></div>
                ))}
             </div>
          ) : (
             <div className="space-y-8">
               <AnimatePresence>
                 {entries.map((entry, index) => (
                   <motion.div 
                     key={entry.id}
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: index * 0.1 }}
                     className="relative group"
                   >
                     {/* Decorative connector */}
                     <div className="absolute -left-[37px] top-4 w-2 h-2 bg-surface2 rounded-full group-hover:bg-neonPink transition-colors"></div>
                     
                     <div className="bg-surface/50 p-6 border border-surface2 hover:border-neonCyan transition-colors">
                       <p className="font-mono text-sm text-subtext mb-2 flex justify-between">
                          <span className="text-neonPink">@{entry.name}</span>
                          <span className="text-xs opacity-50">{new Date(entry.created_at).toLocaleDateString()}</span>
                       </p>
                       <p className="text-white font-sans text-lg">{entry.message}</p>
                       
                       {/* Pixel signature */}
                       <div className="mt-4 flex gap-1">
                          <div className="w-2 h-2" style={{backgroundColor: entry.signature}}></div>
                          <div className="w-2 h-2 opacity-50" style={{backgroundColor: entry.signature}}></div>
                          <div className="w-2 h-2 opacity-25" style={{backgroundColor: entry.signature}}></div>
                       </div>
                     </div>
                   </motion.div>
                 ))}
               </AnimatePresence>
             </div>
          )}
        </div>
      </div>
    </section>
  );
};