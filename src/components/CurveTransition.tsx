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
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as any, delay: 0.3 },
      transitionEnd: { top: "-200vh" }
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
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as any, delay: 0.3 }
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as any }
    }
  };

  const textVariants: Variants = {
    initial: { 
      opacity: 1,
      y: 0
    },
    enter: { 
      opacity: 0,
      y: -150,
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] as any, delay: 0.3 }
    },
    exit: { 
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] as any, delay: 0.35 }
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[30000]">
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

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.div 
          variants={textVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          className="flex flex-wrap justify-center px-10"
        >
          <span className="text-text-light text-6xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter leading-none">
            {text}
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default CurveTransition;
