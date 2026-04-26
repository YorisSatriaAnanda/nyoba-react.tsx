import { motion, type Variants } from 'framer-motion';
import { useEffect, useState } from 'react';

const CurveTransition = ({ text }: { text: string }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function resize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // Snellenberg-style liquid paths
  const initialPath = `
    M0 300 
    Q${dimensions.width / 2} 0 ${dimensions.width} 300 
    L${dimensions.width} ${dimensions.height + 300} 
    L0 ${dimensions.height + 300} 
    Z
  `;

  const targetPath = `
    M0 300 
    Q${dimensions.width / 2} 300 ${dimensions.width} 300 
    L${dimensions.width} ${dimensions.height + 300} 
    L0 ${dimensions.height + 300} 
    Z
  `;

  const curveVariants: Variants = {
    initial: {
      top: "0",
    },
    enter: {
      top: "-150vh", 
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] as any, delay: 0.3 },
      transitionEnd: { top: "-200vh" } // Extra safety jump after animation
    },
    exit: {
      top: "0",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as any }
    }
  };

  const pathVariants: Variants = {
    initial: {
      d: initialPath
    },
    enter: {
      d: targetPath,
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] as any, delay: 0.3 }
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as any }
    }
  };

  const textContainerVariants: Variants = {
    initial: { opacity: 0 },
    enter: { 
      opacity: 0,
      transition: { duration: 0.1 }
    },
    exit: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.03,
        delayChildren: 0.1
      }
    }
  };

  const charVariants: Variants = {
    initial: { y: "150%", opacity: 0 },
    exit: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.7, ease: [0.33, 1, 0.68, 1] as any }
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[30000]">
      {/* Background Curtain */}
      <motion.div
        variants={curveVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        className="absolute left-0 w-full h-[calc(100vh+300px)] bg-dark-900"
      >
        <svg className="absolute top-[-300px] w-full h-[300px] fill-dark-900">
          <motion.path variants={pathVariants} />
        </svg>
      </motion.div>

      {/* Centered Text Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.div 
          variants={textContainerVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          className="flex flex-wrap justify-center px-10"
        >
          {text.split('').map((char, i) => (
            <div key={i} className="overflow-hidden flex items-center h-fit">
              <motion.span
                variants={charVariants}
                className="text-text-light text-6xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter leading-none"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CurveTransition;
