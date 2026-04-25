import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { ArrowRight, Code, Terminal, User } from 'lucide-react';

const Hero = ({ onContactClick }: { onContactClick: () => void }) => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.8]);

  const titleText = "Crafting Digital";
  const accentText = "Experiences";

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section id="home" className="sticky top-0 h-screen w-full overflow-hidden bg-dark-900 flex items-center justify-center z-0">
      <div className="w-full h-full absolute inset-0 flex items-center justify-center">
        <motion.div style={{ opacity, scale }} className="w-full h-full absolute inset-0 flex flex-col items-center justify-center pt-20">
          {/* Background decoration */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-maroon/30 rounded-full blur-[120px] -z-10"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-light/10 rounded-full blur-[120px] -z-10"></div>

          <div className="container mx-auto px-6 md:px-12 flex flex-col items-center text-center">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="px-4 py-1.5 rounded-full border border-text-muted/30 text-text-main text-sm font-semibold tracking-wide mb-6 uppercase"
            >
              Available for new projects
            </motion.span>

            <motion.h1 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-5xl md:text-7xl lg:text-8xl font-black text-text-light leading-tight mb-6 tracking-tighter"
            >
              <div className="overflow-hidden">
                {titleText.split(" ").map((word, i) => (
                  <motion.span key={i} variants={wordVariants} className="inline-block mr-4">
                    {word}
                  </motion.span>
                ))}
              </div>
              <div className="overflow-hidden">
                <motion.span 
                  variants={wordVariants}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-brand-maroon"
                >
                  {accentText}
                </motion.span>
              </div>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-lg md:text-xl text-text-muted max-w-2xl mb-10"
            >
              I am a Frontend Developer specializing in building exceptional, high-quality websites and applications with modern technologies.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 items-center"
            >
              <a href="#projects" className="group flex items-center gap-2 bg-text-light text-dark-900 px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105">
                View My Work
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <button 
                onClick={onContactClick}
                className="flex items-center gap-2 border border-text-muted hover:border-brand-light text-text-light px-8 py-4 rounded-full font-bold text-lg transition-all hover:bg-brand-light/10"
              >
                Contact Me
              </button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="flex gap-6 mt-16 text-text-muted"
            >
              <a href="#" className="hover:text-text-light transition-colors"><Code size={24} /></a>
              <a href="#" className="hover:text-text-light transition-colors"><User size={24} /></a>
              <a href="#" className="hover:text-text-light transition-colors"><Terminal size={24} /></a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
