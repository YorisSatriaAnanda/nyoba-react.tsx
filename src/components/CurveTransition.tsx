import { motion, type Variants } from 'framer-motion';
import { useEffect, useState } from 'react';

const CurveTransition = () => {
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

  // Path saat tirai menutupi layar penuh (datar di bawah)
  const targetPath = `
    M0 0 
    L${dimensions.width} 0 
    L${dimensions.width} ${dimensions.height} 
    Q${dimensions.width / 2} ${dimensions.height} 0 ${dimensions.height} 
    L0 0 
    Z
  `;

  // Path saat tirai melengkung (seperti ditarik ke atas)
  const initialPath = `
    M0 0 
    L${dimensions.width} 0 
    L${dimensions.width} ${dimensions.height} 
    Q${dimensions.width / 2} ${dimensions.height + 300} 0 ${dimensions.height} 
    L0 0 
    Z
  `;

  const curveVariants: Variants = {
    initial: {
      top: 0,
    },
    enter: {
      top: "-100vh",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as any, delay: 0.2 },
      transitionEnd: { top: "-130vh" } // Pastikan benar-benar hilang setelah animasi
    },
    exit: {
      top: 0,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    }
  };

  const pathVariants: Variants = {
    initial: {
      d: initialPath
    },
    enter: {
      d: targetPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    }
  };

  return (
    <motion.div
      variants={curveVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      className="fixed left-0 w-full h-[calc(100vh+300px)] pointer-events-none z-[30000] bg-dark-900"
    >
      <svg className="absolute bottom-[-300px] w-full h-[300px] fill-dark-900">
        <motion.path variants={pathVariants} />
      </svg>
    </motion.div>
  );
};

export default CurveTransition;
