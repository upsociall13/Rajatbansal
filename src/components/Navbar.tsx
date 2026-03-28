import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Menu, X } from 'lucide-react';

const Navbar = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-cosmic-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center">
            <Star className="text-cosmic-950 w-6 h-6 fill-cosmic-950" />
          </div>
          <span className="font-serif text-2xl tracking-tight font-semibold">RAJAT BANSAL</span>
        </div>
        
        <div className="hidden md:flex items-center gap-10 text-sm font-medium tracking-widest uppercase opacity-70">
          <a href="#services" className="hover:text-gold-400 transition-colors">Services</a>
          <a href="#about" className="hover:text-gold-400 transition-colors">About</a>
          <a href="#testimonials" className="hover:text-gold-400 transition-colors">Testimonials</a>
          <a href="#faq" className="hover:text-gold-400 transition-colors">FAQ</a>
        </div>

        <div className="hidden md:block">
          <button 
            onClick={onOpenModal}
            className="px-6 py-3 bg-gold-500 text-cosmic-950 text-xs font-bold uppercase tracking-widest rounded-full hover:bg-gold-400 transition-all transform hover:scale-105"
          >
            Book a Call
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-0 w-full bg-cosmic-900 border-b border-white/10 p-6 flex flex-col gap-6"
          >
            <a href="#services" onClick={() => setIsOpen(false)} className="text-lg font-serif">Services</a>
            <a href="#about" onClick={() => setIsOpen(false)} className="text-lg font-serif">About</a>
            <a href="#testimonials" onClick={() => setIsOpen(false)} className="text-lg font-serif">Testimonials</a>
            <a href="#faq" onClick={() => setIsOpen(false)} className="text-lg font-serif">FAQ</a>
            <button 
              onClick={() => {
                setIsOpen(false);
                onOpenModal();
              }}
              className="w-full py-4 bg-gold-500 text-cosmic-950 font-bold uppercase tracking-widest rounded-xl"
            >
              Book a Call
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
