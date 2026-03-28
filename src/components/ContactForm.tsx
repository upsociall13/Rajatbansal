import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../firebase';

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const path = 'contacts';
    try {
      await addDoc(collection(db, path), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setIsSubmitting(false);
      try {
        handleFirestoreError(err, OperationType.WRITE, path);
      } catch (handledErr: any) {
        const parsed = JSON.parse(handledErr.message);
        setError(parsed.error || "Failed to send message.");
      }
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
      <h5 className="text-xs font-bold uppercase tracking-widest mb-6 text-gold-400">Direct Inquiry</h5>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="text-red-400 text-[10px] font-bold uppercase tracking-widest">{error}</div>}
        {isSuccess && <div className="text-gold-400 text-[10px] font-bold uppercase tracking-widest">Message sent successfully.</div>}
        
        <div className="space-y-1">
          <input 
            required
            type="text"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            placeholder="Your Name"
            className="w-full bg-cosmic-950/50 border border-white/10 rounded-lg px-4 py-2 text-xs focus:outline-none focus:border-gold-500/50 transition-colors"
          />
        </div>
        <div className="space-y-1">
          <input 
            required
            type="email"
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
            placeholder="Email Address"
            className="w-full bg-cosmic-950/50 border border-white/10 rounded-lg px-4 py-2 text-xs focus:outline-none focus:border-gold-500/50 transition-colors"
          />
        </div>
        <div className="space-y-1">
          <textarea 
            required
            rows={3}
            value={formData.message}
            onChange={e => setFormData({...formData, message: e.target.value})}
            placeholder="How can Rajat assist you?"
            className="w-full bg-cosmic-950/50 border border-white/10 rounded-lg px-4 py-2 text-xs focus:outline-none focus:border-gold-500/50 transition-colors resize-none"
          />
        </div>
        <button 
          disabled={isSubmitting}
          type="submit"
          className="w-full py-3 bg-gold-500 text-cosmic-950 text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-gold-400 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
