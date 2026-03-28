import React from 'react';
import { Star, Instagram, Linkedin, Youtube } from 'lucide-react';
import ContactForm from './ContactForm';

const Footer = () => {
  return (
    <footer className="py-20 bg-cosmic-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-gold-500 flex items-center justify-center">
                <Star className="text-cosmic-950 w-4 h-4 fill-cosmic-950" />
              </div>
              <span className="font-serif text-xl tracking-tight font-semibold">RAJAT BANSAL</span>
            </div>
            <p className="text-white/40 max-w-sm mb-8">
              Strategic astrology for the modern visionary. Helping leaders align their destiny with the cosmic clock.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-white/40 hover:text-gold-400 transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-white/40 hover:text-gold-400 transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="text-white/40 hover:text-gold-400 transition-colors"><Youtube className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <h5 className="text-xs font-bold uppercase tracking-widest mb-6">Navigation</h5>
            <ul className="space-y-4 text-sm text-white/40">
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Rajat</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div className="lg:col-span-2">
            <h5 className="text-xs font-bold uppercase tracking-widest mb-6">Legal</h5>
            <ul className="space-y-4 text-sm text-white/40">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">WhatsApp Support</a></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <ContactForm />
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-white/20 font-bold">
          <div>© 2024 Rajat Bansal. All Rights Reserved.</div>
          <div>Designed for the 1%</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
