import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ImageLoader = ({ src, alt, className }: { src: string, alt: string, className?: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-dark-800 animate-pulse"
          />
        )}
      </AnimatePresence>
      <motion.img
        src={src}
        alt={alt}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 1.05 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover ${className}`}
      />
    </div>
  );
};

export default ImageLoader;
