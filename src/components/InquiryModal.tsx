/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, Database } from 'lucide-react';
import { PlotSize } from '../types';
import { submitLead } from '../lib/firebase';
import { sendLeadEmail } from '../lib/email';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPlotSize?: PlotSize | null;
}

export default function InquiryModal({ isOpen, onClose, defaultPlotSize }: InquiryModalProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [plotSize, setPlotSize] = useState<PlotSize>(defaultPlotSize || PlotSize.SIZE_300);
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; isFallback?: boolean } | null>(null);

  // Synchronize plot selection changes
  if (defaultPlotSize && defaultPlotSize !== plotSize && isOpen && !result) {
    setPlotSize(defaultPlotSize);
  }

  const handleInquiryAction = async (e: FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !email) {
      alert("Please provide name, phone and email.");
      return;
    }

    setIsSubmitting(true);
    setResult(null);

    const leadParams = {
      fullName,
      phone,
      email,
      plotSize,
      message,
    };

    try {
      // 1. Write to database
      const dbResult = await submitLead(leadParams);

      // 2. Deliver email notification
      await sendLeadEmail(leadParams);

      // 3. Complete
      setResult(dbResult);
      
      // Clear
      setFullName('');
      setPhone('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error("[InquiryModal] Error logging submission:", err);
      setResult({ success: false });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-x-0 inset-y-0 bg-[#102A72]/85 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Card content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white shadow-2xl border-2 border-brand-primary max-w-lg w-full overflow-hidden z-10"
            id="inquiry-dialog"
          >
            {/* Header branding band */}
            <div className="bg-brand-primary p-5 text-white flex justify-between items-center border-b border-brand-gold/30">
              <div>
                <h3 className="font-sans text-brand-gold text-lg font-extrabold uppercase tracking-tight">Book Inspection</h3>
                <p className="text-[10px] text-white/70 uppercase tracking-widest font-mono mt-0.5">El Mirage Estate, Agbara</p>
              </div>
              <button 
                onClick={onClose}
                className="text-white/80 hover:text-brand-gold transition-all p-1.5 hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[75vh]">
              {result?.success ? (
                /* Success notification state */
                <div className="text-center py-6 space-y-4">
                  <div className="h-14 w-14 bg-green-50 flex items-center justify-center mx-auto border-2 border-green-500">
                    <CheckCircle className="h-7 w-7 text-green-600" />
                  </div>
                  <h4 className="font-sans text-xl font-bold text-gray-900 uppercase">Booking Form Logged!</h4>
                  <p className="text-xs text-gray-600 max-w-sm mx-auto leading-relaxed">
                    Thank you for your interest. A dedicated Landiquire advisor will call your mobile line soon to confirm inspection details.
                  </p>

                  {result.isFallback && (
                    <div className="inline-flex items-center space-x-1 border border-amber-200 bg-amber-50 px-2.5 py-1 text-[9px] text-amber-800 font-mono uppercase tracking-wider font-bold">
                      <Database className="h-3.5 w-3.5 shrink-0" />
                      <span>Stored locally (Simulation)</span>
                    </div>
                  )}

                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setResult(null);
                        onClose();
                      }}
                      className="px-5 py-3 bg-brand-primary text-white text-xs font-bold uppercase tracking-widest hover:bg-brand-secondary transition-colors hover:cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                /* Custom quick capture form */
                <form onSubmit={handleInquiryAction} className="space-y-4">
                  
                  {/* Name */}
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="modal-name" className="text-[10px] font-extrabold uppercase text-brand-primary tracking-wider">
                      Your Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      id="modal-name"
                      placeholder="e.g. Kolawole Adebayo"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 focus:outline-none focus:border-brand-primary text-xs sm:text-sm font-bold uppercase tracking-wider bg-light-gray"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="modal-phone" className="text-[10px] font-extrabold uppercase text-brand-primary tracking-wider">
                      Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      id="modal-phone"
                      placeholder="e.g. 08124305552"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 focus:outline-none focus:border-brand-primary text-xs sm:text-sm font-bold uppercase tracking-wider bg-light-gray"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="modal-email" className="text-[10px] font-extrabold uppercase text-brand-primary tracking-wider">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      id="modal-email"
                      placeholder="e.g. landiquireassociates@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 focus:outline-none focus:border-brand-primary text-xs sm:text-sm font-bold uppercase tracking-wider bg-light-gray"
                    />
                  </div>

                  {/* Plot size selection */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[10px] font-extrabold uppercase text-brand-primary tracking-wider">
                      Interested In Size *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPlotSize(PlotSize.SIZE_300)}
                        className={`py-2 text-xs font-bold uppercase border transition-colors ${
                          plotSize === PlotSize.SIZE_300
                            ? 'border-brand-gold bg-brand-gold/10 text-brand-primary font-extrabold'
                            : 'border-gray-200 text-gray-500 hover:bg-neutral-50'
                        }`}
                      >
                        300 SQM (₦2.7M)
                      </button>
                      <button
                        type="button"
                        onClick={() => setPlotSize(PlotSize.SIZE_500)}
                        className={`py-2 text-xs font-bold uppercase border transition-colors ${
                          plotSize === PlotSize.SIZE_500
                            ? 'border-brand-gold bg-brand-gold/10 text-brand-primary font-extrabold'
                            : 'border-gray-200 text-gray-500 hover:bg-neutral-50'
                        }`}
                      >
                        500 SQM (₦4.0M)
                      </button>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="modal-message" className="text-[10px] font-extrabold uppercase text-brand-primary tracking-wider">
                      Comments / Custom Request
                    </label>
                    <textarea
                      id="modal-message"
                      rows={3}
                      placeholder="e.g. I would like to book a physical inspection for next Saturday..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-brand-primary text-xs sm:text-sm font-bold uppercase tracking-wider bg-light-gray"
                    />
                  </div>

                  {/* Action */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 mt-2 bg-brand-primary text-white text-xs font-bold uppercase tracking-widest hover:bg-brand-secondary transition-colors shadow-md flex items-center justify-center space-x-2 disabled:opacity-50 hover:cursor-pointer"
                  >
                    <span>{isSubmitting ? "Processing Reservation..." : "Submit Inquiry Request"}</span>
                  </button>

                </form>
              )}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
