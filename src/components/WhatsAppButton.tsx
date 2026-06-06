/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const phoneNumber = "2348124305552";
  const defaultMessage = "Hello, I am interested in El Mirage Estate.";
  
  // Format the complete link
  const whatsAppUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Radiant pulsing background ring */}
      <span className="absolute inset-0 bg-emerald-500/25 animate-ping" />

      <motion.a
        href={whatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex h-14 w-14 items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white shadow-2xl transition-all border border-emerald-400"
        id="btn-whatsapp-floating"
      >
        <MessageCircle className="h-7 w-7 text-white fill-white" />
      </motion.a>
    </div>
  );
}
