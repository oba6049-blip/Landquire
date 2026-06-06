/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Send, CheckCircle, Database, Calendar, Car } from 'lucide-react';
import { PlotSize } from '../types';
import { submitLead } from '../lib/firebase';
import { sendLeadEmail } from '../lib/email';

interface ContactFormProps {
  initialPlot?: PlotSize | null;
  onClearInitialPlot?: () => void;
}

export default function ContactForm({ initialPlot, onClearInitialPlot }: ContactFormProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [plotSize, setPlotSize] = useState<PlotSize>(initialPlot || PlotSize.SIZE_300);
  const [message, setMessage] = useState('');
  
  // Custom interactive tab parameters for Book Inspection inline
  const [activeTab, setActiveTab] = useState<'inspection' | 'allocation'>('inspection');
  const [inspectionDate, setInspectionDate] = useState('');
  const [pickupPoint, setPickupPoint] = useState('Central Agbara Terminal');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    isFallback?: boolean;
  } | null>(null);

  // Sync initial plot size changes
  if (initialPlot && initialPlot !== plotSize) {
    setPlotSize(initialPlot);
    if (onClearInitialPlot) onClearInitialPlot();
  }

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !email) {
      alert("Please fill in first name, phone and email.");
      return;
    }

    setIsSubmitting(true);
    setSubmitResult(null);

    const leadParams = {
      fullName,
      phone,
      email,
      plotSize,
      message,
      leadType: activeTab,
      ...(activeTab === 'inspection' ? {
        inspectionDate,
        pickupPoint,
      } : {})
    };

    try {
      // 1. Submit lead to database
      const dbResult = await submitLead(leadParams);

      // 2. Deliver email notification
      await sendLeadEmail(leadParams);

      // 3. Complete submission
      setSubmitResult(dbResult);

      // Clear inputs
      setFullName('');
      setPhone('');
      setEmail('');
      setMessage('');
      setInspectionDate('');
    } catch (err) {
      console.error("Submitting contact lead error:", err);
      setSubmitResult({ success: false });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-light-gray relative border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-extrabold tracking-[0.25em] text-brand-gold uppercase block">
            GET IN TOUCH
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 uppercase tracking-tight">
            Secure Your Property Booking
          </h2>
          <div className="h-[2px] w-16 bg-brand-gold mx-auto my-4" />
          <p className="text-sm text-gray-650 max-w-xl mx-auto font-sans leading-relaxed">
            Ready to secure your piece of the future at El Mirage Estate? Submit your contact coordinates, and our specialized investment partner team will lock in your allocation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-start" id="booking-grid">
          
          {/* Left Column: Premium Brand Contact Information Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-brand-primary text-white p-8 shadow-xl relative overflow-hidden border border-brand-gold/30">
              <h2 className="text-brand-gold text-2xl font-bold tracking-tight mb-2 uppercase">
                Landiquire Associates
              </h2>
              <span className="text-xs text-white/60 tracking-widest font-mono font-bold uppercase block pb-5 border-b border-white/10">
                PROMOTING EL MIRAGE ESTATE
              </span>

              {/* Contacts info list */}
              <div className="space-y-6 pt-6">
                
                {/* Location */}
                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 bg-white/10 flex items-center justify-center shrink-0 border border-brand-gold/20">
                    <MapPin className="h-5 w-5 text-brand-gold" />
                  </div>
                  <div>
                    <h4 className="text-xs text-brand-gold tracking-widest uppercase font-bold font-mono">Property Location</h4>
                    <p className="text-xs sm:text-sm text-white/95 mt-1 leading-relaxed font-sans">
                      Agbara, Lagos State, Nigeria <br />
                      (Along Opic Estate, Modina Trailer Park)
                    </p>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 bg-white/10 flex items-center justify-center shrink-0 border border-brand-gold/20">
                    <Phone className="h-5 w-5 text-brand-gold" />
                  </div>
                  <div>
                    <h4 className="text-xs text-brand-gold tracking-widest uppercase font-bold font-mono">Inquiry Hotlines</h4>
                    <a href="tel:08124305552" className="text-xs sm:text-sm text-white/95 mt-1 block hover:text-brand-gold transition-colors leading-relaxed font-bold font-mono">
                      08124305552
                    </a>
                  </div>
                </div>

                {/* Emails */}
                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 bg-white/10 flex items-center justify-center shrink-0 border border-brand-gold/20">
                    <Mail className="h-5 w-5 text-brand-gold" />
                  </div>
                  <div>
                    <h4 className="text-xs text-brand-gold tracking-widest uppercase font-bold font-mono">Email Accounts</h4>
                    <a href="mailto:landiquireassociates@gmail.com" className="text-xs sm:text-sm text-white/95 mt-1 block hover:text-brand-gold transition-colors leading-relaxed font-mono">
                      landiquireassociates@gmail.com
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* Micro FAQ Trust callout */}
            <div className="p-6 bg-white border-l-4 border-l-brand-gold border-y border-r border-gray-200 shadow-sm space-y-3">
              <span className="text-[10px] uppercase tracking-widest font-bold text-brand-primary block">
                Official Compliance Note
              </span>
              <p className="text-[11px] text-gray-500 leading-relaxed font-mono uppercase tracking-wider">
                All lead data submitted undergoes strict private encryption. Property viewings can be scheduled daily, starting from the central terminal.
              </p>
            </div>
          </div>

          {/* Right Column: Lead Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 shadow-xl border border-gray-200" id="form-card">
              
              {submitResult?.success ? (
                /* Success Message State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10 space-y-4"
                >
                  <div className="h-16 w-16 bg-green-50 flex items-center justify-center mx-auto border-2 border-green-500">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-tight">
                    Submission Successful!
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-650 max-w-md mx-auto leading-relaxed font-sans">
                    Thank you for your interest. Our team will contact you shortly to coordinate your land package and inspection details.
                  </p>

                  {/* Graceful Simulator Mode Flag/Badge */}
                  {submitResult.isFallback && (
                    <div className="inline-flex items-center space-x-1.5 bg-amber-50 border border-amber-200 px-3 py-1.5 text-[10px] text-amber-800 font-bold uppercase tracking-wider">
                      <Database className="h-3.5 w-3.5" />
                      <span>Local system simulation storage active</span>
                    </div>
                  )}

                  <button
                    onClick={() => setSubmitResult(null)}
                    className="mt-6 px-6 py-3 bg-brand-primary text-white text-xs font-bold tracking-widest uppercase hover:bg-brand-secondary transition-colors hover:cursor-pointer"
                  >
                    Submit New Query
                  </button>
                </motion.div>
              ) : (
                /* Interactive Form State */
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {submitResult?.success === false && (
                    <div className="p-4 bg-red-50 text-red-800 border-l-4 border-red-500 text-xs uppercase font-mono tracking-wider">
                      There was a synchronization issue. Please check network status and try again.
                    </div>
                  )}

                  {/* Custom Interactive Tab Selector */}
                  <div className="grid grid-cols-2 gap-2 mb-6 border-b border-gray-100 pb-4" id="form-tab-selector">
                    <button
                      type="button"
                      onClick={() => setActiveTab('inspection')}
                      className={`py-3 px-4 text-xs font-bold uppercase tracking-wider text-center border transition-all hover:cursor-pointer flex items-center justify-center space-x-2 ${
                        activeTab === 'inspection'
                          ? 'bg-brand-primary text-white border-brand-primary shadow-sm'
                          : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
                      }`}
                      id="tab-book-inspection"
                    >
                      <Calendar className="h-4 w-4 shrink-0 text-brand-gold" />
                      <span>Book Inspection</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('allocation')}
                      className={`py-3 px-4 text-xs font-bold uppercase tracking-wider text-center border transition-all hover:cursor-pointer flex items-center justify-center space-x-2 ${
                        activeTab === 'allocation'
                          ? 'bg-brand-primary text-white border-brand-primary shadow-sm'
                          : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
                      }`}
                      id="tab-inquire-allocation"
                    >
                      <Database className="h-4 w-4 shrink-0 text-brand-gold" />
                      <span>Inquire Allocation</span>
                    </button>
                  </div>

                  {/* Row 1: Full Name */}
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="fullName" className="text-xs font-extrabold text-brand-primary uppercase tracking-wider">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Kolawole Adebayo"
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-brand-primary text-xs sm:text-sm text-gray-850 font-bold uppercase tracking-wider bg-light-gray"
                    />
                  </div>

                  {/* Row 2: Phone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="phone" className="text-xs font-extrabold text-brand-primary uppercase tracking-wider">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +234 800 000 0000"
                        className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-brand-primary text-xs sm:text-sm text-gray-850 font-bold uppercase tracking-wider bg-light-gray"
                      />
                    </div>

                    <div className="flex flex-col space-y-2">
                      <label htmlFor="email" className="text-xs font-extrabold text-brand-primary uppercase tracking-wider">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. kolawole@gmail.com"
                        className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-brand-primary text-xs sm:text-sm text-gray-855 font-bold uppercase tracking-wider bg-light-gray"
                      />
                    </div>
                  </div>

                  {/* Inspection Specific Fields Rows */}
                  {activeTab === 'inspection' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in">
                      <div className="flex flex-col space-y-2">
                        <label htmlFor="inspectionDate" className="text-xs font-extrabold text-brand-primary uppercase tracking-wider flex items-center space-x-1.5">
                          <Calendar className="h-4 w-4 text-brand-gold shrink-0" />
                          <span>Preferred Date *</span>
                        </label>
                        <input
                          type="date"
                          id="inspectionDate"
                          required={activeTab === 'inspection'}
                          value={inspectionDate}
                          onChange={(e) => setInspectionDate(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-brand-primary text-xs sm:text-sm text-gray-850 font-bold uppercase tracking-wider bg-light-gray focus:ring-0"
                        />
                      </div>

                      <div className="flex flex-col space-y-2">
                        <label htmlFor="pickupPoint" className="text-xs font-extrabold text-brand-primary uppercase tracking-wider flex items-center space-x-1.5">
                          <Car className="h-4 w-4 text-brand-gold shrink-0" />
                          <span>Pickup Point *</span>
                        </label>
                        <select
                          id="pickupPoint"
                          required={activeTab === 'inspection'}
                          value={pickupPoint}
                          onChange={(e) => setPickupPoint(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-brand-primary text-xs sm:text-sm text-gray-850 font-bold uppercase tracking-wider bg-light-gray focus:ring-0 cursor-pointer"
                        >
                          <option value="Central Agbara Terminal">Central Agbara Terminal (Weekly Shuttle)</option>
                          <option value="OPIC Estate Gate">OPIC Estate Gate, Agbara</option>
                          <option value="Agbara Junction Bus Stop">Agbara Junction Bus Stop</option>
                          <option value="Lagos International Airport Hub">Lagos International Airport Hub</option>
                          <option value="Direct self-drive meeting">Direct self-drive (Meet at Site)</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Row 3: Plot Size Select */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-xs font-extrabold text-brand-primary uppercase tracking-wider">
                      Plot Size Interested In *
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {/* Option 300 SQM */}
                      <div
                        onClick={() => setPlotSize(PlotSize.SIZE_300)}
                        className={`p-4 border-2 text-center cursor-pointer transition-colors ${
                          plotSize === PlotSize.SIZE_300
                            ? 'border-brand-gold bg-brand-gold/5 text-brand-primary font-bold'
                            : 'border-gray-200 text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <p className="text-xs uppercase font-extrabold tracking-wider">300 SQM Plot</p>
                        <p className="text-xs tracking-widest font-mono text-gray-500 mt-1 uppercase">₦2.7 Million</p>
                      </div>

                      {/* Option 500 SQM */}
                      <div
                        onClick={() => setPlotSize(PlotSize.SIZE_500)}
                        className={`p-4 border-2 text-center cursor-pointer transition-colors ${
                          plotSize === PlotSize.SIZE_500
                            ? 'border-brand-gold bg-brand-gold/5 text-brand-primary font-bold'
                            : 'border-gray-200 text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <p className="text-xs uppercase font-extrabold tracking-wider">500 SQM Plot</p>
                        <p className="text-xs tracking-widest font-mono text-gray-500 mt-1 uppercase">₦4.0 Million</p>
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Custom Message */}
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="message" className="text-xs font-extrabold text-brand-primary uppercase tracking-wider">
                      Message / Remarks
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={activeTab === 'inspection' ? "Share your specific physical inspection desires, number of attendees, or scheduling notes here..." : "Share your pricing query details or documentation questions here..."}
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-brand-primary text-xs sm:text-sm text-gray-850 font-bold uppercase tracking-wider bg-light-gray"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full py-4 bg-brand-primary text-white text-xs font-bold uppercase tracking-widest hover:bg-brand-secondary transition-colors text-center flex items-center justify-center space-x-2 hover:cursor-pointer disabled:opacity-50"
                  >
                    <span>
                      {isSubmitting 
                        ? "Processing Request..." 
                        : activeTab === 'inspection' 
                          ? "Submit Physical Inspection Booking" 
                          : "Submit Real Estate Inquiry"
                      }
                    </span>
                    {!isSubmitting && <Send className="h-4.5 w-4.5" />}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
