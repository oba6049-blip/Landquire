/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { FAQItem } from '../types';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>('1');

  const faqs: FAQItem[] = [
    {
      id: '1',
      question: "Where exactly is El Mirage Estate located?",
      answer: "El Mirage Estate is located in Agbara, Lagos, strategically situated along Opic Estate, close to the Modina Trailer Park corridor. It is an extremely high-growth residential and light commercial zone."
    },
    {
      id: '2',
      question: "What are the available land sizes and their prices?",
      answer: "We offer two standard investment plots: a 300 SQM plot at ₦2.7 Million, and an executive 500 SQM plot at ₦4 Million. These sizes accommodate diverse design blueprints."
    },
    {
      id: '3',
      question: "What is the legal land title of El Mirage Estate?",
      answer: "The estate holds a Registered Survey title. Documents are fully processed and legal queries can be searched at the surveyor bureau and state land archives."
    },
    {
      id: '4',
      question: "Is there instant allocation and when can I start building?",
      answer: "Yes. Once your plot transaction is finalized and documented, allocation maps are marked and you are assigned physical beacons immediately. The land is dry and firm, allowing building plans and construction to start instantly."
    },
    {
      id: '5',
      question: "What other developments are close to this location?",
      answer: "El Mirage sits adjacent to Opic Estate. Agbara hosts the primary manufacturing and logistics facilities of major multinational corporations, guaranteeing high permanent utility and exceptional capital demand."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-white relative border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <span className="text-xs font-extrabold tracking-[0.25em] text-brand-gold uppercase block">
            KNOWLEDGE BASE
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 uppercase tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="h-[2px] w-16 bg-brand-gold mx-auto my-4" />
          <p className="text-sm text-gray-655 max-w-xl mx-auto font-sans leading-relaxed">
            Review detailed answers to standard logistical, legal, and operational inquiries about investing in Agbara acreage with Landiquire.
          </p>
        </div>

        {/* Accordion FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div 
                key={faq.id} 
                className={`border-l-4 ${isOpen ? 'border-l-brand-gold bg-white' : 'border-l-brand-primary bg-light-gray'} border-y border-r border-gray-200 overflow-hidden transition-all duration-250`}
                id={`faq-item-${faq.id}`}
              >
                {/* Trigger Button */}
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-neutral-100/50 transition-colors hover:cursor-pointer"
                >
                  <span className="font-sans font-bold text-sm sm:text-base text-brand-primary uppercase tracking-wide">
                    {faq.question}
                  </span>
                  <div className="h-6 w-6 bg-brand-primary/10 flex items-center justify-center shrink-0 ml-4 border border-brand-primary/25">
                    {isOpen ? <Minus className="h-3.5 w-3.5 text-brand-primary" /> : <Plus className="h-3.5 w-3.5 text-brand-primary" />}
                  </div>
                </button>

                {/* Collapsible Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 text-sm text-gray-655 font-sans leading-relaxed border-t border-gray-200/50 pt-4 bg-white">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
