import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Certificates from './components/Certificates';
import Projects from './components/Projects';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import ContactForm from './components/ContactForm';
import ScrollToTop from './components/ScrollToTop';

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = ({ onContactClick }: { onContactClick: () => void }) => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition>
            <Hero onContactClick={onContactClick} />
            <About />
            <Skills />
          </PageTransition>
        } />
        <Route path="/projects" element={
          <PageTransition>
            <div className="pt-20"><Projects /></div>
          </PageTransition>
        } />
        <Route path="/certificates" element={
          <PageTransition>
            <div className="pt-20"><Certificates /></div>
          </PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    if (isLoading) {
      lenis.stop();
    } else {
      lenis.start();
    }

    return () => {
      lenis.destroy();
    };
  }, [isLoading]);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-dark-900 text-text-main selection:bg-brand-maroon selection:text-text-light font-sans relative">
        <AnimatePresence>
          {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
        </AnimatePresence>

        <div className="grain-overlay" />
        <CustomCursor />
        
        <Navbar onContactClick={() => setIsContactOpen(true)} />
        
        <main>
          <AnimatedRoutes onContactClick={() => setIsContactOpen(true)} />
        </main>

        <Footer />
        
        <ContactForm isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      </div>
    </Router>
  );
}

export default App;
