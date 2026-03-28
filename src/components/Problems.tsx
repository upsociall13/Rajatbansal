import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, TrendingUp, Heart, Coins } from 'lucide-react';

const Problems = () => {
  const items = [
    { title: "Business Timing", desc: "When is the right time to launch, pivot, or invest?", icon: Briefcase },
    { title: "Career Trajectory", desc: "Should you stay the course or embrace a radical shift?", icon: TrendingUp },
    { title: "Relationship Clarity", desc: "Deep compatibility analysis for marriage and partnerships.", icon: Heart },
    { title: "Wealth Preservation", desc: "Timing financial decisions based on planetary cycles.", icon: Coins },
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
              Clarity for the <span className="italic text-gold-400">High-Stakes</span> Moments of Life
            </h2>
            <p className="text-lg text-white/60 mb-12 leading-relaxed">
              Success is not just about hard work; it's about alignment. Rajat Bansal helps you identify the windows of opportunity and the periods of caution that define your destiny.
            </p>
            <div className="space-y-6">
              {items.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{ y: -5 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 p-6 glass-card hover:bg-white/10 transition-all cursor-default group"
                >
                  <motion.div 
                    whileHover={{ 
                      scale: [1, 1.1, 1],
                      boxShadow: [
                        "0 0 0px rgba(197,130,54,0)",
                        "0 0 20px rgba(197,130,54,0.4)",
                        "0 0 0px rgba(197,130,54,0)"
                      ]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center group-hover:bg-gold-500 transition-all shrink-0"
                  >
                    <item.icon className="text-gold-400 group-hover:text-cosmic-950 transition-all" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-serif mb-1">{item.title}</h3>
                    <p className="text-sm text-white/40">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src="/rajat2.jpg" 
                alt="Rajat Bansal - Strategic Astrology" 
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cosmic-950 via-transparent to-transparent" />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold-500/10 blur-3xl rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 blur-3xl rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problems;
