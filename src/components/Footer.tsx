import { useEffect, useState } from 'react';

const Footer = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer id="contact" className="bg-dark-800 border-t border-text-muted/10 py-16 relative z-10 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-brand-maroon/20 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-16">
          <div className="text-left">
            <h2 className="text-4xl md:text-6xl font-black text-text-light mb-6 tracking-tighter">
              LET'S <span className="text-brand-light">CONNECT</span>
            </h2>
            <div className="flex items-center gap-4 text-text-muted mb-2">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </div>
              <span className="text-sm font-medium uppercase tracking-widest">Active Now</span>
            </div>
            <p className="text-xl text-text-muted max-w-md">
              Currently available for new opportunities and collaborations.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2">
            <span className="text-text-muted uppercase tracking-[0.2em] text-xs font-bold">Local Time</span>
            <div className="text-4xl md:text-5xl font-mono text-text-light font-bold">
              {time.toLocaleTimeString('en-GB', { hour12: false })}
            </div>
            <span className="text-brand-light font-medium">GMT+7 (Indonesia)</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-text-muted/10">
          <div>
            <h4 className="text-text-light font-bold mb-4 uppercase text-sm tracking-wider">Social</h4>
            <div className="flex flex-col gap-2">
              {['LinkedIn', 'GitHub', 'Twitter', 'Instagram'].map(item => (
                <a key={item} href="#" className="text-text-muted hover:text-brand-light transition-colors w-fit">{item}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-text-light font-bold mb-4 uppercase text-sm tracking-wider">Contact</h4>
            <div className="flex flex-col gap-2">
              <a href="mailto:hello@pongo.dev" className="text-text-muted hover:text-brand-light transition-colors">hello@pongo.dev</a>
              <a href="#" className="text-text-muted hover:text-brand-light transition-colors">+62 812 3456 789</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-text-muted/10 gap-4">
          <p className="text-text-muted text-sm">
            © {new Date().getFullYear()} Pongo. Built with Passion.
          </p>
          <div className="flex gap-8 text-xs text-text-muted uppercase tracking-widest font-bold">
            <a href="#" className="hover:text-text-light transition-colors">Privacy</a>
            <a href="#" className="hover:text-text-light transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
