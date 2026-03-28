import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  X, LayoutDashboard, Filter, CalendarDays, 
  Mail, Phone, Calendar, Clock, MapPin, 
  Check, CheckCircle2, MessageCircle, Trash2, Loader2 
} from 'lucide-react';
import { 
  collection, query, orderBy, onSnapshot, 
  updateDoc, doc, deleteDoc 
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';

const AdminPanel = ({ onClose }: { onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState<'bookings' | 'contacts'>('bookings');
  const [bookings, setBookings] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    setLoading(true);
    const bookingsQuery = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
    const contactsQuery = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'));

    const unsubBookings = onSnapshot(bookingsQuery, (snapshot) => {
      setBookings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'bookings'));

    const unsubContacts = onSnapshot(contactsQuery, (snapshot) => {
      setContacts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'contacts'));

    return () => {
      unsubBookings();
      unsubContacts();
    };
  }, []);

  const updateBookingStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, 'bookings', id), { status });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `bookings/${id}`);
    }
  };

  const deleteContact = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this contact message?")) return;
    try {
      await deleteDoc(doc(db, 'contacts', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `contacts/${id}`);
    }
  };

  const filteredBookings = bookings.filter(b => filterStatus === 'all' || b.status === filterStatus);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-cosmic-950 flex flex-col"
    >
      {/* Header */}
      <div className="border-b border-white/10 bg-cosmic-900/50 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gold-500 flex items-center justify-center">
            <LayoutDashboard className="text-cosmic-950 w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-serif">Admin Dashboard</h2>
            <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Rajat Bansal Strategic Astrology</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-white/5 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-white/60" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex px-6 border-b border-white/5 bg-cosmic-900/20">
        <button 
          onClick={() => setActiveTab('bookings')}
          className={`px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all border-b-2 ${activeTab === 'bookings' ? 'border-gold-500 text-gold-400' : 'border-transparent text-white/40 hover:text-white'}`}
        >
          Bookings ({bookings.length})
        </button>
        <button 
          onClick={() => setActiveTab('contacts')}
          className={`px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all border-b-2 ${activeTab === 'contacts' ? 'border-gold-500 text-gold-400' : 'border-transparent text-white/40 hover:text-white'}`}
        >
          Contacts ({contacts.length})
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-gold-500 animate-spin" />
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            {activeTab === 'bookings' ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-serif">Consultation Requests</h3>
                  <div className="flex items-center gap-4">
                    <Filter className="w-4 h-4 text-white/40" />
                    <select 
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="bg-cosmic-900 border border-white/10 rounded-lg px-4 py-2 text-xs focus:outline-none focus:border-gold-500/50"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-4">
                  {filteredBookings.length === 0 ? (
                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                      <CalendarDays className="w-12 h-12 text-white/10 mx-auto mb-4" />
                      <p className="text-white/40">No bookings found matching your criteria.</p>
                    </div>
                  ) : (
                    filteredBookings.map((booking) => (
                      <motion.div 
                        layout
                        key={booking.id}
                        className="bg-cosmic-900/50 border border-white/10 rounded-2xl p-6 hover:border-gold-500/30 transition-all"
                      >
                        <div className="flex flex-col lg:flex-row gap-6 justify-between">
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-2 h-2 rounded-full ${
                                booking.status === 'pending' ? 'bg-yellow-500' : 
                                booking.status === 'confirmed' ? 'bg-green-500' : 
                                booking.status === 'completed' ? 'bg-blue-500' : 'bg-red-500'
                              }`} />
                              <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">{booking.status}</span>
                              <span className="text-[10px] text-white/20">•</span>
                              <span className="text-[10px] text-white/40">{booking.createdAt?.toDate().toLocaleString()}</span>
                            </div>
                            <h4 className="text-xl font-serif">{booking.name}</h4>
                            <div className="grid sm:grid-cols-2 gap-4 text-sm text-white/60">
                              <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-gold-500/50" /> {booking.email}</div>
                              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-gold-500/50" /> {booking.phone}</div>
                              <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-gold-500/50" /> {booking.birthDate}</div>
                              <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-gold-500/50" /> {booking.birthTime}</div>
                              <div className="flex items-center gap-2 sm:col-span-2"><MapPin className="w-4 h-4 text-gold-500/50" /> {booking.birthLocation}</div>
                            </div>
                            {booking.message && (
                              <div className="p-4 bg-white/5 rounded-xl text-sm text-white/50 italic">
                                "{booking.message}"
                              </div>
                            )}
                          </div>
                          <div className="flex lg:flex-col gap-2 justify-end">
                            {booking.status === 'pending' && (
                              <button 
                                onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                                className="px-4 py-2 bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-green-500/20 transition-all flex items-center gap-2"
                              >
                                <Check className="w-3 h-3" /> Confirm
                              </button>
                            )}
                            {booking.status === 'confirmed' && (
                              <button 
                                onClick={() => updateBookingStatus(booking.id, 'completed')}
                                className="px-4 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-blue-500/20 transition-all flex items-center gap-2"
                              >
                                <CheckCircle2 className="w-3 h-3" /> Complete
                              </button>
                            )}
                            <button 
                              onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                              className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-red-500/20 transition-all flex items-center gap-2"
                            >
                              <X className="w-3 h-3" /> Cancel
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <h3 className="text-2xl font-serif mb-8">Contact Submissions</h3>
                <div className="grid gap-4">
                  {contacts.length === 0 ? (
                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                      <MessageCircle className="w-12 h-12 text-white/10 mx-auto mb-4" />
                      <p className="text-white/40">No contact messages received yet.</p>
                    </div>
                  ) : (
                    contacts.map((contact) => (
                      <motion.div 
                        layout
                        key={contact.id}
                        className="bg-cosmic-900/50 border border-white/10 rounded-2xl p-6 hover:border-gold-500/30 transition-all"
                      >
                        <div className="flex justify-between items-start gap-6">
                          <div className="space-y-4 flex-1">
                            <div className="flex items-center gap-3">
                              <span className="text-[10px] text-white/40">{contact.createdAt?.toDate().toLocaleString()}</span>
                            </div>
                            <div>
                              <h4 className="text-xl font-serif">{contact.name}</h4>
                              <p className="text-sm text-gold-400/70">{contact.email}</p>
                            </div>
                            <p className="text-white/60 leading-relaxed">
                              {contact.message}
                            </p>
                          </div>
                          <button 
                            onClick={() => deleteContact(contact.id)}
                            className="p-3 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl hover:bg-red-500/20 transition-all"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AdminPanel;
