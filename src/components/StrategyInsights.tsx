import React from 'react';

const StrategyInsights = () => {
  return (
    <section className="py-32 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px flex-grow bg-white/10" />
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/30">Brand Strategy Blueprint</span>
          <div className="h-px flex-grow bg-white/10" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h4 className="text-gold-400 font-serif text-xl mb-4">Social Strategy</h4>
            <ul className="space-y-3 text-xs text-white/40 leading-relaxed">
              <li><strong className="text-white/60">LinkedIn:</strong> Positioning as a "Strategic Advisor" for CEOs. Content focused on market timing and leadership cycles.</li>
              <li><strong className="text-white/60">Instagram:</strong> High-end aesthetic. "Cosmic Minutes" - short, punchy insights for the busy professional.</li>
              <li><strong className="text-white/60">YouTube:</strong> Deep-dive "Macro-Cosmic Reports" on global trends and wealth cycles.</li>
            </ul>
          </div>
          <div>
            <h4 className="text-gold-400 font-serif text-xl mb-4">Lead Generation</h4>
            <ul className="space-y-3 text-xs text-white/40 leading-relaxed">
              <li><strong className="text-white/60">Lead Magnet:</strong> "The 2024 Wealth Timing Guide" - a premium PDF for high-net-worth subscribers.</li>
              <li><strong className="text-white/60">Funnel:</strong> Social Content → Premium Guide → Email Nurture → High-Ticket Consultation.</li>
            </ul>
          </div>
          <div>
            <h4 className="text-gold-400 font-serif text-xl mb-4">Authority Building</h4>
            <ul className="space-y-3 text-xs text-white/40 leading-relaxed">
              <li>Focus on "Ancient Intelligence" vs "Fortune Telling".</li>
              <li>Case studies of business turnarounds based on timing.</li>
              <li>Collaborations with elite business coaches and wealth managers.</li>
            </ul>
          </div>
          <div>
            <h4 className="text-gold-400 font-serif text-xl mb-4">Visual Identity</h4>
            <ul className="space-y-3 text-xs text-white/40 leading-relaxed">
              <li><strong className="text-white/60">Palette:</strong> Cosmic Black, Deep Indigo, Burnished Gold.</li>
              <li><strong className="text-white/60">Typography:</strong> Cormorant Garamond (Elegance) + Inter (Precision).</li>
              <li><strong className="text-white/60">Imagery:</strong> Minimalist cosmic patterns, high-end portraiture.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StrategyInsights;
