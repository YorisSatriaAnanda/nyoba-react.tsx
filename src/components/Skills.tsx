import { motion } from 'framer-motion';

const skillsRow1 = [
  "React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Redux", "React Query"
];

const skillsRow2 = [
  "Node.js", "Express", "PostgreSQL", "MongoDB", "Figma", "Git", "GitHub", "Vercel"
];

const SkillCard = ({ name }: { name: string }) => (
  <div className="flex-shrink-0 px-8 py-4 mx-4 bg-dark-900 rounded-2xl border border-text-muted/20 hover:border-brand-light transition-all duration-300 group hover:shadow-[0_0_20px_rgba(168,50,50,0.3)]">
    <span className="text-text-light font-bold text-lg md:text-xl tracking-tight group-hover:text-brand-light transition-colors">
      {name}
    </span>
  </div>
);

const InfiniteMarquee = ({ items, direction = "left" }: { items: string[], direction?: "left" | "right" }) => {
  return (
    <div className="flex overflow-hidden py-4 select-none">
      <motion.div
        animate={{
          x: direction === "left" ? [0, -1000] : [-1000, 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 25,
            ease: "linear",
          },
        }}
        className="flex flex-nowrap"
      >
        {/* Duplicate items for seamless loop */}
        {[...items, ...items, ...items, ...items].map((skill, index) => (
          <SkillCard key={`${skill}-${index}`} name={skill} />
        ))}
      </motion.div>
    </div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-32 bg-brand-maroon relative z-10 overflow-hidden">
      {/* Decorative gradient overlay for the edges */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-brand-maroon to-transparent z-20 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-brand-maroon to-transparent z-20 pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-text-light mb-6 tracking-tighter"
          >
            TECHNICAL <span className="text-dark-900 drop-shadow-sm">ARSENAL</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-text-main max-w-2xl mx-auto text-lg opacity-90"
          >
            Membangun solusi digital masa depan dengan teknologi terdepan dan desain yang presisi.
          </motion.p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <InfiniteMarquee items={skillsRow1} direction="left" />
        <InfiniteMarquee items={skillsRow2} direction="right" />
      </div>

      {/* Background patterns */}
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-dark-900/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-light/20 rounded-full blur-3xl -z-10"></div>
    </section>
  );
};

export default Skills;
