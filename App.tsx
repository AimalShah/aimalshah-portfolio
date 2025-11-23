
import React, { useEffect, useState } from 'react';
import { Hero } from './components/Hero';
import { ProjectGallery } from './components/ProjectGallery';
import { Guestbook } from './components/Guestbook';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { About } from './components/About';
import { Story } from './components/Story';
import { Lab } from './components/Lab';
import { TechStack } from './components/TechStack';
import { BlogSection } from './components/BlogSection';
import { BlogPostView } from './components/BlogPostView';
import { AllProjectsView } from './components/AllProjectsView';
import { AllBlogsView } from './components/AllBlogsView';
import { Contact } from './components/Contact';
import { Experience } from './components/Experience';
import { Preloader } from './components/Preloader';
import { CommandPalette } from './components/CommandPalette';
import { AnimatePresence } from 'framer-motion';
import { BlogPost, ViewState } from './types';

const App: React.FC = () => {
  // Loading State
  const [isLoading, setIsLoading] = useState(true);

  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    // Console easter egg
    console.log(
      "%c SYSTEM BOOT... \n%c Welcome to Aimal's Portfolio v1.0 \n%c > run dev_mode",
      "color: #b8bb26; font-family: monospace; font-size: 14px;",
      "color: #ebdbb2; font-family: monospace; font-size: 12px;",
      "color: #00ffff; font-family: monospace; font-size: 12px;"
    );
  }, []);

  const handleOpenPost = (post: BlogPost) => {
    setSelectedPost(post);
    setCurrentView('BLOG_POST');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setCurrentView('HOME');
    setSelectedPost(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewAllProjects = () => {
    setCurrentView('ALL_PROJECTS');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleViewAllBlogs = () => {
    setCurrentView('ALL_BLOGS');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper for Command Palette to switch views generically
  const changeView = (view: ViewState) => {
      setCurrentView(view);
      if (view === 'HOME') setSelectedPost(null);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div className="bg-bg min-h-screen text-text selection:bg-neonPink selection:text-white relative overflow-x-hidden">
        {!isLoading && (
          <>
            <Navigation onViewChange={handleGoHome} currentView={currentView} />
            <CommandPalette changeView={changeView} />
            
            <main className="flex flex-col w-full min-h-screen">
              {currentView === 'HOME' ? (
                <>
                  <Hero />
                  <About />
                  <Story />
                  <Experience />
                  <TechStack />
                  <ProjectGallery onViewAll={handleViewAllProjects} />
                  <Lab />
                  <BlogSection onReadPost={handleOpenPost} onViewAll={handleViewAllBlogs} />
                  <Guestbook />
                  <Contact />
                </>
              ) : currentView === 'BLOG_POST' ? (
                <BlogPostView post={selectedPost} onBack={handleGoHome} />
              ) : currentView === 'ALL_PROJECTS' ? (
                <AllProjectsView onBack={handleGoHome} />
              ) : (
                <AllBlogsView onBack={handleGoHome} onReadPost={handleOpenPost} />
              )}
            </main>

            <Footer />
            
            {/* Background Noise - Reduced opacity for performance */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-50 mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default App;
