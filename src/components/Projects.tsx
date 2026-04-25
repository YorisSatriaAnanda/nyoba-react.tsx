import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code, X } from 'lucide-react';
import { useState } from 'react';

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800&auto=format&fit=crop",
    tags: ["React", "Node.js", "Tailwind"],
    description: "A full-featured e-commerce solution with real-time inventory management and secure payment integration."
  },
  {
    id: 2,
    title: "Banking Dashboard",
    category: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=800&auto=format&fit=crop",
    tags: ["Next.js", "Framer Motion", "D3.js"],
    description: "An interactive dashboard for tracking finances with beautiful data visualizations and seamless transitions."
  },
  {
    id: 3,
    title: "SaaS Landing Page",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    tags: ["TypeScript", "Vite", "GSAP"],
    description: "High-performance landing page focused on conversion and smooth user onboarding experience."
  }
];

const Projects = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedProject = projects.find(p => p.id === selectedId);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="projects" className="py-24 bg-dark-900 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16 md:flex justify-between items-end">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-text-light mb-4 tracking-tighter">
              FEATURED <span className="text-brand-light">PROJECTS</span>
            </h2>
            <p className="text-text-muted text-lg max-w-xl">
              Exploring the boundaries of digital design and functional development.
            </p>
          </div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div 
              key={project.id}
              variants={itemVariants}
              onClick={() => setSelectedId(project.id)}
              className="group relative bg-dark-800 rounded-3xl overflow-hidden border border-text-muted/10 cursor-pointer hover:border-brand-light/30 transition-all duration-500"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-brand-maroon/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="bg-text-light text-dark-900 px-6 py-2 rounded-full font-bold text-sm tracking-wider">
                    VIEW DETAILS
                  </span>
                </div>
              </div>
              <div className="p-8">
                <span className="text-brand-light text-xs font-bold uppercase tracking-widest mb-3 block">{project.category}</span>
                <h3 className="text-2xl font-bold text-text-light mb-4 group-hover:text-brand-light transition-colors">{project.title}</h3>
                <div className="flex gap-2 flex-wrap">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase font-bold border border-text-muted/30 text-text-muted px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedId && selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[21000] flex items-center justify-center px-6 py-12"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-dark-900/90 backdrop-blur-xl"
            />
            
            <motion.div 
              initial={{ y: 100, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 100, opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-4xl bg-dark-800 rounded-[2.5rem] overflow-hidden border border-text-muted/20 shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-6 right-6 z-10 bg-dark-900/50 p-3 rounded-full text-text-light hover:bg-brand-light transition-colors"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col md:flex-row h-full">
                <div className="w-full md:w-1/2">
                  <img src={selectedProject.image} className="w-full h-full object-cover min-h-[300px]" alt="" />
                </div>
                <div className="w-full md:w-1/2 p-10 md:p-12">
                  <span className="text-brand-light font-bold uppercase tracking-[0.2em] text-xs mb-4 block">Project Detail</span>
                  <h2 className="text-4xl font-black text-text-light mb-6 tracking-tighter">{selectedProject.title}</h2>
                  <p className="text-text-muted text-lg mb-8 leading-relaxed">
                    {selectedProject.description}
                  </p>
                  
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-text-light font-bold uppercase text-xs tracking-widest mb-4">Technologies</h4>
                      <div className="flex gap-3 flex-wrap">
                        {selectedProject.tags.map(tag => (
                          <span key={tag} className="bg-dark-900 px-4 py-2 rounded-xl text-sm font-medium text-text-main border border-text-muted/10">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <a href="#" className="flex-1 flex items-center justify-center gap-3 bg-brand-light text-text-light py-4 rounded-2xl font-bold hover:bg-brand-maroon transition-colors">
                        Live Demo <ExternalLink size={18} />
                      </a>
                      <a href="#" className="w-16 flex items-center justify-center border border-text-muted/30 text-text-light rounded-2xl hover:border-brand-light transition-colors">
                        <Code size={24} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
