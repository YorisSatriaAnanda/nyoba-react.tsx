import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import { AnimatePresence } from 'framer-motion';
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

const Home = ({ onContactClick }: { onContactClick: () => void }) => (
  <>
    <Hero onContactClick={onContactClick} />
    <About />
    <Skills />
  </>
);

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
          <Routes>
            <Route path="/" element={<Home onContactClick={() => setIsContactOpen(true)} />} />
            <Route path="/projects" element={<div className="pt-20"><Projects /></div>} />
            <Route path="/certificates" element={<div className="pt-20"><Certificates /></div>} />
          </Routes>
        </main>

        <Footer />
        
        <ContactForm isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      </div>
    </Router>
  );
}

export default App;
