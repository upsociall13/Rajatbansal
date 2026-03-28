import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  User 
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  getDocFromServer 
} from 'firebase/firestore';
import { LayoutDashboard, LogIn, LogOut } from 'lucide-react';

import { db, auth } from './firebase';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Authority from './components/Authority';
import Problems from './components/Problems';
import Services from './components/Services';
import Story from './components/Story';
import Testimonials from './components/Testimonials';
import HowItWorks from './components/HowItWorks';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import StrategyInsights from './components/StrategyInsights';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const ADMIN_EMAIL = 'upsociall.hub@gmail.com';

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setIsAuthLoading(true);
      if (user) {
        // Check if user is admin via email or role in Firestore
        if (user.email === ADMIN_EMAIL) {
          setIsAdmin(true);
        } else {
          try {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists() && userDoc.data().role === 'admin') {
              setIsAdmin(true);
            } else {
              setIsAdmin(false);
            }
          } catch (err) {
            setIsAdmin(false);
          }
        }
      } else {
        setIsAdmin(false);
      }
      setIsAuthLoading(false);
    });
    return unsub;
  }, []);

  const handleAdminLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAdminPanelOpen(false);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // --- Connection Test ---
  useEffect(() => {
    const testConnection = async () => {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if (error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration. ");
        }
      }
    };
    testConnection();
  }, []);

  return (
    <ErrorBoundary>
      <div className="cosmic-gradient min-h-screen">
        <Navbar onOpenModal={openModal} />
        <Hero onOpenModal={openModal} />
        <Authority />
        <Problems />
        <Services onOpenModal={openModal} />
        <Story />
        <Testimonials />
        <HowItWorks />
        <FAQ />
        <FinalCTA onOpenModal={openModal} />
        <StrategyInsights />
        <Footer />
        
        <BookingModal isOpen={isModalOpen} onClose={closeModal} />

        {/* Admin Access Button (Floating or in Footer) */}
        {!isAdminPanelOpen && (
          <div className="fixed bottom-6 right-6 z-50">
            {isAdmin ? (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsAdminPanelOpen(true)}
                  className="p-4 bg-gold-500 text-cosmic-950 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center gap-2 group"
                >
                  <LayoutDashboard className="w-6 h-6" />
                  <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-bold uppercase tracking-widest text-[10px]">Dashboard</span>
                </button>
                <button 
                  onClick={handleLogout}
                  className="p-4 bg-cosmic-900 text-white/60 border border-white/10 rounded-full shadow-2xl hover:bg-red-500/10 hover:text-red-400 transition-all"
                  title="Logout"
                >
                  <LogOut className="w-6 h-6" />
                </button>
              </div>
            ) : (
              <button 
                onClick={handleAdminLogin}
                className="p-4 bg-cosmic-900/50 backdrop-blur-md text-white/20 border border-white/5 rounded-full hover:text-gold-400 hover:border-gold-500/30 transition-all"
                title="Admin Access"
              >
                <LogIn className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        <AnimatePresence>
          {isAdminPanelOpen && isAdmin && (
            <AdminPanel onClose={() => setIsAdminPanelOpen(false)} />
          )}
        </AnimatePresence>
      </div>
    </ErrorBoundary>
  );
}
