import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2 } from 'lucide-react';
import GlowButton from './GlowButton';

const ContactForm = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      onClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[25000] overflow-hidden">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-dark-900/60 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="absolute top-0 right-0 h-full w-full max-w-xl bg-dark-800 border-l border-text-muted/10 shadow-2xl p-10 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-4xl font-black text-text-light tracking-tighter">GET IN <span className="text-brand-light">TOUCH</span></h2>
              <button onClick={onClose} className="p-3 hover:bg-dark-900 rounded-full transition-colors text-text-light">
                <X size={32} />
              </button>
            </div>

            <div className="flex-1 relative">
              <AnimatePresence mode="wait">
                {!isSent ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-8 h-full flex flex-col" 
                    onSubmit={handleSubmit}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="space-y-2">
                      <label className="text-xs uppercase font-bold tracking-[0.2em] text-text-muted">Full Name</label>
                      <input 
                        required
                        type="text" 
                        className="w-full bg-dark-900 border border-text-muted/10 rounded-2xl p-5 text-text-light focus:outline-none focus:border-brand-light transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs uppercase font-bold tracking-[0.2em] text-text-muted">Email Address</label>
                      <input 
                        required
                        type="email" 
                        className="w-full bg-dark-900 border border-text-muted/10 rounded-2xl p-5 text-text-light focus:outline-none focus:border-brand-light transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase font-bold tracking-[0.2em] text-text-muted">Message</label>
                      <textarea 
                        required
                        rows={6}
                        className="w-full bg-dark-900 border border-text-muted/10 rounded-2xl p-5 text-text-light focus:outline-none focus:border-brand-light transition-colors resize-none"
                        placeholder="Tell me about your project..."
                      />
                    </div>

                    <GlowButton 
                      type="submit"
                      className="w-full bg-brand-light hover:bg-brand-maroon text-text-light py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-brand-light/10 mt-auto"
                    >
                      SEND MESSAGE <Send size={24} />
                    </GlowButton>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
                      className="w-24 h-24 bg-brand-light/10 text-brand-light rounded-full flex items-center justify-center mb-8"
                    >
                      <CheckCircle2 size={64} />
                    </motion.div>
                    <h3 className="text-3xl font-black text-text-light mb-4">Message Sent!</h3>
                    <p className="text-text-muted text-lg">
                      Thank you for reaching out. I'll get back to you as soon as possible.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-12 pt-12 border-t border-text-muted/10 flex flex-col gap-4 text-center">
              <p className="text-text-muted text-sm">Or reach out directly at</p>
              <a href="mailto:hello@yoris.dev" className="text-2xl font-bold text-text-light hover:text-brand-light transition-colors">hello@yoris.dev</a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactForm;
