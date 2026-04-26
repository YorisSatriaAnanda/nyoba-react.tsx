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
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as any, delay: 0.2 }
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
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as any, delay: 0.2 }
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as any }
    }
  };

  const textVariants: Variants = {
    initial: {
      opacity: 0,
    },
    enter: {
      opacity: 0,
      top: "40%",
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] as any }
    },
    exit: {
      opacity: 1,
      top: "50%",
      transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] as any, delay: 0.3 }
    }
  };

  return (
    <motion.div
      variants={curveVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      className="fixed left-0 w-full h-[calc(100vh+300px)] pointer-events-none z-[30000] bg-dark-900 flex items-center justify-center"
      style={{ top: 0 }}
    >
      <motion.p 
        variants={textVariants}
        className="text-text-light text-5xl md:text-8xl font-black uppercase tracking-tighter absolute z-10"
      >
        {text}
      </motion.p>
      
      <svg className="absolute top-[-300px] w-full h-[300px] fill-dark-900">
        <motion.path variants={pathVariants} />
      </svg>
    </motion.div>
  );
};

export default CurveTransition;
