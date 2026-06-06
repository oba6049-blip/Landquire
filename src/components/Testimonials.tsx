/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Star, Quote, ShieldAlert } from 'lucide-react';
import { Testimonial } from '../types';

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Dr. Chuka Onyema',
      role: 'Diaspora Real Estate Investor (Houston, TX)',
      quote: "Investing in El Mirage Estate from overseas was surprisingly seamless. Landiquire Associates provided verified Registered Surveys and did not charge hidden development levies. Highly recommended for diaspora transparency.",
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      rating: 5
    },
    {
      id: '2',
      name: 'Mrs. Funmi Alao',
      role: 'Residential Developer',
      quote: "As a local builder, I need firm dry soil that minimizes structural pilling costs. The Agbara plots from Landiquire are highly solid and positioned right next to expanding commercial estates. We've already booked two more plots.",
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
      rating: 5
    },
    {
      id: '3',
      name: 'Engr. Ibrahim Datti',
      role: 'Private Investor',
      quote: "Acquiring secure land with legal titles in Lagos is usually difficult. Landiquire Associates completely removed that stress with their verified surveyor documents. The capital appreciation on my plots in Opic-Agbara corridor has already hit 30% in 12 months.",
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-white relative overflow-hidden border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-extrabold tracking-[0.25em] text-brand-gold uppercase block">
            CLIENT ENDORSEMENTS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 uppercase tracking-tight">
            What Our Investors Say
          </h2>
          <div className="h-[2px] w-16 bg-brand-gold mx-auto my-4" />
          <p className="text-sm sm:text-base text-gray-655 max-w-xl mx-auto font-sans leading-relaxed">
            Review the real legal security stories experienced by developers, residential homebuilders, and verified individual land bankers.
          </p>
        </div>

        {/* 3-Testimonial Grid - Sharp geometric boxes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((test, idx) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="flex flex-col justify-between p-8 bg-[#F5F7FA] border-l-4 border-l-brand-gold border-y border-r border-gray-200 transition-all duration-300 relative"
            >
              {/* Decorative Absolute Quote Icon */}
              <Quote className="absolute top-6 right-6 h-10 w-10 text-brand-primary/5 pointer-events-none" />

              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex space-x-1">
                  {Array.from({ length: test.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-brand-gold text-brand-gold" />
                  ))}
                </div>

                <p className="text-sm sm:text-[14px] text-gray-750 leading-relaxed font-sans uppercase tracking-wide">
                  "{test.quote}"
                </p>
              </div>

              {/* User Bio Footer - Sharp borders */}
              <div className="flex items-center space-x-4 pt-6 mt-6 border-t border-gray-200">
                <div className="h-12 w-12 overflow-hidden shrink-0 border-2 border-brand-primary bg-neutral-200">
                  <img
                    src={test.avatarUrl}
                    alt={test.name}
                    className="h-full w-full object-cover grayscale brightness-95"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="font-sans font-extrabold text-brand-primary text-sm uppercase leading-tight">
                    {test.name}
                  </h4>
                  <p className="text-[10px] text-gray-500 font-mono tracking-widest mt-0.5 uppercase leading-normal">
                    {test.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
