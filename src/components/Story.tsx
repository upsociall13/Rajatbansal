import React from 'react';

const Story = () => {
  return (
    <section id="about" className="py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-20 items-center">
          <div className="md:w-1/2 relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-gold-500/10 blur-3xl rounded-full" />
            <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 aspect-[4/5]">
              <img 
                src="rajat2.jpg" 
                alt="Rajat Bansal" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 p-8 glass-card">
              <div className="text-3xl font-serif text-gold-400">Rajat Bansal</div>
              <div className="text-[10px] uppercase tracking-widest opacity-50 font-bold">Strategic Astrologer</div>
            </div>
          </div>
          <div className="md:w-1/2">
            <span className="text-gold-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-6 block">The Architect of Destiny</span>
            <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">Ancient Wisdom for the <span className="italic">Modern Visionary</span></h2>
            <div className="space-y-6 text-white/60 leading-relaxed">
              <p>
                My journey into the cosmic sciences began not as a search for magic, but as a quest for patterns. With over 15 years of dedicated research into Vedic Astrology, I discovered that the universe speaks in a language of timing and cycles.
              </p>
              <p>
                I don't believe in "fortune telling." I believe in strategic navigation. My work is to translate complex planetary alignments into actionable intelligence for those who carry the weight of big decisions.
              </p>
              <p>
                From startup founders seeking the perfect launch window to high-net-worth individuals managing legacy transitions, my consultations provide the "unfair advantage" that comes from being in sync with the cosmic clock.
              </p>
            </div>
            <div className="mt-12 flex items-center gap-8">
              <div className="flex -space-x-4">
                {[1,2,3,4].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-12 h-12 rounded-full border-2 border-cosmic-950" alt="Client" />
                ))}
              </div>
              <div className="text-sm">
                <div className="font-bold">Trusted by 8,000+</div>
                <div className="opacity-50">Global Leaders & Visionaries</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
