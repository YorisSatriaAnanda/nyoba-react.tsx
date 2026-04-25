import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = ({ onContactClick }: { onContactClick: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Certificates', id: 'certificates' },
    { name: 'Projects', id: 'projects' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Scroll Spy Logic
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        if (!section) return;
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onContactClick();
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-300 ${scrolled ? 'bg-dark-900/90 backdrop-blur-md py-4 shadow-lg shadow-dark-800' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#" className="text-2xl font-black tracking-tighter text-text-light">
          PORT<span className="text-brand-light">FOLIO</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => (
            <a 
              key={item.id} 
              href={`#${item.id}`} 
              className={`transition-all duration-300 text-sm font-medium relative group ${activeSection === item.id ? 'text-brand-light' : 'text-text-muted hover:text-text-light'}`}
            >
              {item.name}
              {activeSection === item.id && (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-brand-light"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
          <button 
            onClick={onContactClick}
            className="text-text-muted hover:text-text-light transition-colors text-sm font-medium"
          >
            Contact
          </button>
          <button 
            onClick={onContactClick}
            className="bg-brand-light hover:bg-white hover:text-brand-maroon text-text-light px-6 py-2.5 rounded-full font-bold transition-all shadow-lg hover:shadow-brand-light/30 active:scale-95"
          >
            Hire Me
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-text-muted p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 w-full bg-dark-800 border-t border-text-muted/20 shadow-xl py-8 flex flex-col items-center gap-6"
        >
          {navItems.map((item) => (
            <a 
              key={item.id} 
              href={`#${item.id}`} 
              onClick={() => setIsOpen(false)} 
              className={`text-lg font-medium transition-colors ${activeSection === item.id ? 'text-brand-light' : 'text-text-main'}`}
            >
              {item.name}
            </a>
          ))}
          <button onClick={handleContactClick} className="text-lg font-medium text-brand-light">
            Contact
          </button>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
