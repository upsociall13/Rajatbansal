import React from 'react';
import { Search, BookOpen, MessageCircle, Target } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    { title: "Submit Birth Details", desc: "Provide precise time, date, and location for an accurate chart.", icon: Search },
    { title: "Deep Chart Analysis", desc: "Rajat spends 48 hours analyzing your planetary alignments.", icon: BookOpen },
    { title: "Live Strategic Session", desc: "A private 1-on-1 consultation to discuss findings and strategy.", icon: MessageCircle },
    { title: "Strategic Guidance", desc: "Receive a roadmap for your next moves and timing.", icon: Target },
  ];

  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-serif mb-6">The Path to Clarity</h2>
          <p className="text-white/50 max-w-2xl mx-auto">A structured process designed for precision and depth.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-12 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent z-0" />
          
          {steps.map((step, i) => (
            <div key={i} className="text-center relative z-10">
              <div className="w-24 h-24 rounded-full bg-cosmic-900 border border-gold-500/30 flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(197,130,54,0.1)]">
                <step.icon className="w-10 h-10 text-gold-400" />
              </div>
              <h3 className="text-xl font-serif mb-4">{step.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
