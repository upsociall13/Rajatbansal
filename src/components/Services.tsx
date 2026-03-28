import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

const Services = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const services = [
    {
      name: "Personal Life Blueprint",
      price: "₹11,000",
      duration: "60 Minutes",
      features: ["Birth chart analysis", "Life direction guidance", "Core strength identification", "1-on-1 Zoom session"],
      color: "bg-white/5"
    },
    {
      name: "Business & Wealth Timing",
      price: "₹21,000",
      duration: "90 Minutes",
      features: ["Career strategy roadmap", "Investment timing insights", "Partnership compatibility", "Quarterly outlook report"],
      color: "bg-gold-500/10 border-gold-500/30",
      popular: true
    },
    {
      name: "Elite Destiny Strategy",
      price: "₹51,000",
      duration: "120 Minutes",
      features: ["Deep multi-chart analysis", "Comprehensive written report", "30-day follow-up support", "Priority scheduling"],
      color: "bg-white/5"
    }
  ];

  return (
    <section id="services" className="py-32 bg-cosmic-900/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-serif mb-6">Signature Consultations</h2>
          <p className="text-white/50 max-w-2xl mx-auto">Select the level of strategic insight required for your current life stage.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-10 rounded-3xl border border-white/10 flex flex-col ${s.color} relative overflow-hidden group`}
            >
              {s.popular && (
                <div className="absolute top-0 right-0 bg-gold-500 text-cosmic-950 text-[10px] font-bold uppercase tracking-widest px-6 py-2 rounded-bl-2xl">
                  Most Requested
                </div>
              )}
              <h3 className="text-2xl font-serif mb-2">{s.name}</h3>
              <div className="text-4xl font-serif text-gold-400 mb-2">{s.price}</div>
              <div className="text-xs uppercase tracking-widest text-white/40 mb-8">{s.duration}</div>
              
              <ul className="space-y-4 mb-12 flex-grow">
                {s.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-white/70">
                    <CheckCircle2 className="w-4 h-4 text-gold-500" />
                    {f}
                  </li>
                ))}
              </ul>

              <button 
                onClick={onOpenModal}
                className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest transition-all ${s.popular ? 'bg-gold-500 text-cosmic-950 hover:bg-gold-400' : 'bg-white/10 hover:bg-white/20'}`}
              >
                Book a Call
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
