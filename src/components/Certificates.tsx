import { motion } from 'framer-motion';
import { Award, CheckCircle } from 'lucide-react';

const certificates = [
  {
    title: "Frontend Developer Professional",
    issuer: "Google Developers",
    date: "2023",
    icon: <Award className="w-8 h-8 text-brand-light" />
  },
  {
    title: "React Specialist",
    issuer: "Meta (Coursera)",
    date: "2023",
    icon: <CheckCircle className="w-8 h-8 text-brand-light" />
  },
  {
    title: "UI/UX Design Certification",
    issuer: "Interaction Design Foundation",
    date: "2022",
    icon: <Award className="w-8 h-8 text-brand-light" />
  }
];

const Certificates = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="certificates" className="py-24 bg-dark-900 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-text-light mb-4 tracking-tighter">
            MY <span className="text-brand-light">CERTIFICATES</span>
          </h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto">
            Verified credentials and professional recognitions from industry leaders.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {certificates.map((cert, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="bg-dark-800 rounded-3xl border border-text-muted/10 p-10 group hover:border-brand-light/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(168,50,50,0.1)] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-maroon/5 rounded-full -mr-16 -mt-16 group-hover:bg-brand-maroon/10 transition-colors"></div>
              
              <div className="mb-8 p-4 bg-dark-900 w-fit rounded-2xl border border-text-muted/10 group-hover:scale-110 transition-transform duration-500">
                {cert.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-text-light mb-4 leading-tight group-hover:text-brand-light transition-colors">
                {cert.title}
              </h3>
              
              <div className="flex flex-col gap-1">
                <span className="text-text-muted font-medium">{cert.issuer}</span>
                <span className="text-brand-light/60 font-bold text-sm tracking-widest">{cert.date}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;
