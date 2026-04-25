import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section id="about" className="py-24 bg-dark-800 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/2 relative perspective-1000"
            style={{ perspective: 1000 }}
          >
            <motion.div 
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="aspect-square max-w-md mx-auto relative cursor-pointer"
            >
              <div 
                className="absolute inset-0 bg-brand-maroon/30 rounded-2xl transform"
                style={{ transform: "translateZ(-50px) translateX(1rem) translateY(1rem)" }}
              ></div>
              <img 
                src="https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=800&auto=format&fit=crop" 
                alt="About Me" 
                className="w-full h-full object-cover rounded-2xl relative z-10 border border-text-muted/20 grayscale hover:grayscale-0 transition-all duration-500 shadow-2xl"
                style={{ transform: "translateZ(50px)" }}
              />
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full md:w-1/2"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl font-black text-text-light mb-6"
            >
              About <span className="text-brand-light">Me</span>
            </motion.h2>
            <div className="space-y-4 text-text-muted text-lg">
              <p>
                Hello! I am a passionate developer who loves crafting digital experiences. 
                My journey into tech started with a curiosity to understand how things work on the internet, 
                and it has evolved into a career focused on building high-performance, user-centric applications.
              </p>
              <p>
                I specialize in frontend technologies, particularly the React ecosystem. 
                I believe in writing clean, maintainable code and always strive to stay updated 
                with the latest industry trends and best practices.
              </p>
              <p>
                When I'm not coding, you can find me exploring new design trends, 
                contributing to open-source, or simply enjoying a good cup of coffee while reading a book.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-brand-light font-black text-4xl mb-2">3+</h4>
                <p className="text-text-main font-medium">Years Experience</p>
              </div>
              <div>
                <h4 className="text-brand-light font-black text-4xl mb-2">20+</h4>
                <p className="text-text-main font-medium">Projects Completed</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
