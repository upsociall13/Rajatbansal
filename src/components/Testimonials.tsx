import React from 'react';
import { motion } from 'motion/react';
import { Star, Linkedin, Twitter, Facebook } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Vikram Malhotra",
      role: "Tech Founder",
      content: "Rajat's timing for my Series B launch was spot on. He identified a 3-day window that felt 'right' astrologically, and the results exceeded all projections. He is a strategic asset.",
      avatar: "https://i.pravatar.cc/150?u=vikram"
    },
    {
      name: "Sarah D'Souza",
      role: "Investment Banker",
      content: "I was skeptical at first, but the depth of his chart analysis is incredible. He predicted a major career shift 6 months before it happened, giving me the time to prepare perfectly.",
      avatar: "https://i.pravatar.cc/150?u=sarah"
    },
    {
      name: "Ananya Kapoor",
      role: "Luxury Brand Consultant",
      content: "The Personal Life Blueprint changed how I view my strengths. It's not just astrology; it's deep psychological and strategic coaching rooted in cosmic truth.",
      avatar: "https://i.pravatar.cc/150?u=ananya"
    }
  ];

  const handleShare = (platform: string, content: string, name: string) => {
    const text = `"${content}" - ${name} on Rajat Bansal's Strategic Astrology`;
    const url = window.location.href;
    let shareUrl = '';

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <section id="testimonials" className="py-32 bg-cosmic-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-serif mb-6">Client Reflections</h2>
          <p className="text-white/50 max-w-2xl mx-auto">Voices from those who have navigated their paths with Rajat's guidance.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 glass-card flex flex-col group relative"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 text-gold-500 fill-gold-500" />)}
                </div>
                <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleShare('linkedin', t.content, t.name)}
                    className="text-white/40 hover:text-gold-400 transition-colors"
                    title="Share on LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleShare('twitter', t.content, t.name)}
                    className="text-white/40 hover:text-gold-400 transition-colors"
                    title="Share on Twitter"
                  >
                    <Twitter className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleShare('facebook', t.content, t.name)}
                    className="text-white/40 hover:text-gold-400 transition-colors"
                    title="Share on Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-lg italic text-white/80 mb-8 flex-grow">"{t.content}"</p>
              <div className="flex items-center gap-4">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full grayscale" />
                <div>
                  <div className="font-bold">{t.name}</div>
                  <div className="text-xs opacity-50 uppercase tracking-widest">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
