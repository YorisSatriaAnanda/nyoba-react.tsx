import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ onContactClick }: { onContactClick: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const isHome = location.pathname === '/';

  const navItems = [
    { name: 'Home', id: 'home', path: '/' },
    { name: 'About', id: 'about', path: '/#about' },
    { name: 'Skills', id: 'skills', path: '/#skills' },
    { name: 'Certificates', id: 'certificates', path: '/certificates' },
    { name: 'Projects', id: 'projects', path: '/projects' },
  ];

  useEffect(() => {
    if (!isHome) {
      setActiveSection('');
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['home', 'about', 'skills'].map(id => document.getElementById(id));
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
  }, [isHome]);

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onContactClick();
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-300 ${scrolled || !isHome ? 'bg-dark-900/90 backdrop-blur-md py-4 shadow-lg shadow-dark-800' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link to="/" className="text-2xl font-black tracking-tighter text-text-light">
          PORT<span className="text-brand-light">FOLIO</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => (
            <Link 
              key={item.id} 
              to={item.path}
              className={`transition-all duration-300 text-sm font-medium relative group ${
                (isHome && activeSection === item.id) || location.pathname === item.path ? 'text-brand-light' : 'text-text-muted hover:text-text-light'
              }`}
            >
              {item.name}
              {((isHome && activeSection === item.id) || location.pathname === item.path) && (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-brand-light"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
          <button 
            onClick={onContactClick}
            className="text-text-muted hover:text-text-light transition-colors text-sm font-medium"
          >
            Contact
          </button>
          
          <div className="flex items-center gap-4 ml-4">
            <a 
              href="/resume.pdf" 
              download
              className="flex items-center gap-2 text-text-light border border-text-muted/30 hover:border-brand-light px-5 py-2 rounded-full font-bold text-xs transition-all"
            >
              <Download size={14} /> CV
            </a>
            <button 
              onClick={onContactClick}
              className="bg-brand-light hover:bg-white hover:text-brand-maroon text-text-light px-6 py-2.5 rounded-full font-bold transition-all shadow-lg hover:shadow-brand-light/30 active:scale-95 text-sm"
            >
              Hire Me
            </button>
          </div>
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
            <Link 
              key={item.id} 
              to={item.path}
              onClick={() => setIsOpen(false)} 
              className={`text-lg font-medium transition-colors ${
                (isHome && activeSection === item.id) || location.pathname === item.path ? 'text-brand-light' : 'text-text-main'
              }`}
            >
              {item.name}
            </Link>
          ))}
          <a href="/resume.pdf" download className="text-lg font-medium text-text-light flex items-center gap-2">
            <Download size={20} /> Download CV
          </a>
          <button onClick={handleContactClick} className="text-lg font-medium text-brand-light">
            Hire Me
          </button>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
