import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';
import { db, auth, handleFirestoreError, OperationType } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const BookingModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    birthTime: '',
    birthLocation: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    const path = 'bookings';
    try {
      await addDoc(collection(db, path), {
        ...formData,
        status: 'pending',
        createdAt: serverTimestamp(),
        uid: auth.currentUser?.uid || null
      });
      
      setIsSubmitting(false);
      setStep('success');
    } catch (err) {
      setIsSubmitting(false);
      try {
        handleFirestoreError(err, OperationType.WRITE, path);
      } catch (handledErr: any) {
        try {
          const parsed = JSON.parse(handledErr.message);
          setError(parsed.error || "Failed to submit booking request.");
        } catch (e) {
          setError("Failed to submit booking request.");
        }
      }
    }
  };

  const handleClose = () => {
    onClose();
    // Reset after animation
    setTimeout(() => {
      setStep('form');
      setFormData({
        name: '',
        email: '',
        phone: '',
        birthDate: '',
        birthTime: '',
        birthLocation: '',
        message: ''
      });
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-cosmic-950/90 backdrop-blur-xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-cosmic-900 border border-gold-500/20 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent z-10" />
            
            <button 
              onClick={handleClose}
              className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors z-20"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="overflow-y-auto p-8 md:p-12">
              <AnimatePresence mode="wait">
                {step === 'form' ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <div className="mb-8">
                      <h3 className="text-3xl font-serif mb-2">Reserve Your Session</h3>
                      <p className="text-white/50 text-sm">Please provide your details for a precise astronomical alignment.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex gap-3 items-center text-red-400 text-sm">
                          <AlertCircle className="w-5 h-5 shrink-0" />
                          {error}
                        </div>
                      )}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gold-400/70">Full Name</label>
                          <input 
                            required
                            type="text"
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                            placeholder="John Doe"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold-500/50 transition-colors"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gold-400/70">Email Address</label>
                          <input 
                            required
                            type="email"
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                            placeholder="john@example.com"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold-500/50 transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gold-400/70">Phone Number</label>
                          <input 
                            required
                            type="tel"
                            value={formData.phone}
                            onChange={e => setFormData({...formData, phone: e.target.value})}
                            placeholder="+91 98765 43210"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold-500/50 transition-colors"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gold-400/70">Birth Date</label>
                          <input 
                            required
                            type="date"
                            value={formData.birthDate}
                            onChange={e => setFormData({...formData, birthDate: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold-500/50 transition-colors [color-scheme:dark]"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gold-400/70">Birth Time</label>
                          <input 
                            required
                            type="time"
                            value={formData.birthTime}
                            onChange={e => setFormData({...formData, birthTime: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold-500/50 transition-colors [color-scheme:dark]"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gold-400/70">Birth Location</label>
                          <input 
                            required
                            type="text"
                            value={formData.birthLocation}
                            onChange={e => setFormData({...formData, birthLocation: e.target.value})}
                            placeholder="City, Country"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold-500/50 transition-colors"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gold-400/70">Message (Optional)</label>
                        <textarea 
                          rows={3}
                          value={formData.message}
                          onChange={e => setFormData({...formData, message: e.target.value})}
                          placeholder="Tell us about your current life stage or specific questions..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold-500/50 transition-colors resize-none"
                        />
                      </div>

                      <button 
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full py-4 bg-gold-500 text-cosmic-950 font-bold uppercase tracking-widest rounded-xl hover:bg-gold-400 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          'Confirm Booking Request'
                        )}
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 rounded-full bg-gold-500/10 flex items-center justify-center mx-auto mb-8">
                      <CheckCircle2 className="w-10 h-10 text-gold-500" />
                    </div>
                    
                    <h3 className="text-3xl font-serif mb-4">Request Received</h3>
                    <p className="text-white/60 mb-8 leading-relaxed">
                      Your interest in a strategic consultation has been noted. Due to high demand, Rajat's team will review your profile and reach out within 24 hours to confirm your slot.
                    </p>

                    <div className="space-y-4 text-left bg-white/5 p-6 rounded-2xl border border-white/5 mb-8">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400">Next Steps</h4>
                      <ul className="space-y-3">
                        <li className="flex gap-3 text-sm text-white/70">
                          <div className="w-5 h-5 rounded-full bg-gold-500/20 flex items-center justify-center text-[10px] font-bold text-gold-400 shrink-0">1</div>
                          Check your email for a brief questionnaire.
                        </li>
                        <li className="flex gap-3 text-sm text-white/70">
                          <div className="w-5 h-5 rounded-full bg-gold-500/20 flex items-center justify-center text-[10px] font-bold text-gold-400 shrink-0">2</div>
                          Submit your birth details for preliminary analysis.
                        </li>
                        <li className="flex gap-3 text-sm text-white/70">
                          <div className="w-5 h-5 rounded-full bg-gold-500/20 flex items-center justify-center text-[10px] font-bold text-gold-400 shrink-0">3</div>
                          Finalize the session timing with our coordinator.
                        </li>
                      </ul>
                    </div>

                    <button 
                      onClick={handleClose}
                      className="w-full py-4 bg-gold-500 text-cosmic-950 font-bold uppercase tracking-widest rounded-xl hover:bg-gold-400 transition-all"
                    >
                      Return to Site
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
