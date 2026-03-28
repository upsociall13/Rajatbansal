import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Users, Globe, Shield } from 'lucide-react';

const Authority = () => {
  const stats = [
    { label: "Years Experience", value: "15+", icon: Calendar },
    { label: "Consultations Delivered", value: "8,000+", icon: Users },
    { label: "Countries Reached", value: "20+", icon: Globe },
    { label: "Specialist Expertise", value: "Vedic", icon: Shield },
  ];

  return (
    <section className="py-24 border-y border-white/5 bg-cosmic-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <stat.icon className="w-6 h-6 text-gold-400 mx-auto mb-4 opacity-50" />
              <div className="text-4xl md:text-5xl font-serif mb-2">{stat.value}</div>
              <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Authority;
