import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

const FinalCTA = ({ onOpenModal }: { onOpenModal: () => void }) => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gold-500/5" />
      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-8xl font-serif mb-8">The Right Timing <span className="italic text-gold-400">Changes Everything.</span></h2>
          <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
            Stop guessing. Start aligning. Rajat Bansal accepts only 10 private consultations per week to ensure the highest level of depth for every client.
          </p>
          <div className="flex flex-col items-center gap-6">
            <button 
              onClick={onOpenModal}
              className="px-12 py-6 bg-gold-500 text-cosmic-950 font-bold uppercase tracking-widest rounded-full hover:bg-gold-400 transition-all shadow-2xl shadow-gold-500/30"
            >
              Book a Call
            </button>
            <div className="flex items-center gap-2 text-gold-400/60 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              Only 3 slots remaining for this week
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
