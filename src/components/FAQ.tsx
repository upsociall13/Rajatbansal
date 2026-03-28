import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: "Is astrology really accurate for business?", a: "Astrology identifies cosmic cycles and timing. Just as tides follow the moon, human affairs follow planetary patterns. For business, it's about identifying the 'season' you are in—harvest, planting, or rest." },
    { q: "What details are required for a session?", a: "You will need to provide your exact date of birth, time of birth (as precise as possible), and location of birth. This allows for the calculation of your unique Vedic birth chart." },
    { q: "Are consultations confidential?", a: "Absolutely. Confidentiality is a cornerstone of my practice. I work with high-profile individuals where discretion is paramount. All sessions and data are strictly private." },
    { q: "Can sessions be done online?", a: "Yes, all consultations are conducted via high-definition Zoom sessions, allowing for global accessibility. You will receive a recording of the session for your reference." },
  ];

  return (
    <section id="faq" className="py-32 bg-cosmic-900/30">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-serif mb-16 text-center">Frequently Asked</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-white/10">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full py-8 flex items-center justify-between text-left group"
              >
                <span className="text-xl font-serif group-hover:text-gold-400 transition-colors">{faq.q}</span>
                <ChevronRight className={`w-5 h-5 transition-transform ${openIndex === i ? 'rotate-90 text-gold-500' : 'opacity-30'}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-8 text-white/50 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
