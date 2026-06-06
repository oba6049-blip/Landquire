/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MapPin, Coins, Sparkles, FileCheck2 } from 'lucide-react';

export default function WhyInvest() {
  const cards = [
    {
      icon: MapPin,
      title: "Strategic Location",
      desc: "Close to major residential developments, the manufacturing/logistics hub of Agbara, and Modina Trailer Park corridor, providing massive traffic appreciation curves."
    },
    {
      icon: Coins,
      title: "Affordable Pricing",
      desc: "Enjoy entry-level rates for premium land titles. Acquire plots on launch prices—₦2.7 Million for 300 SQM and ₦4.0 Million for 500 SQM, unmatched value in standard Lagos land holdings."
    },
    {
      icon: Sparkles,
      title: "High Appreciation Potential",
      desc: "Lagos expands outwards. The Agbara sector experiences a rapid surge in secondary housing demand and private corporate investments, driving multi-fold value gains."
    },
    {
      icon: FileCheck2,
      title: "Secure Documentation",
      desc: "Sleep with absolute confidence. Registered Survey title means no overlapping ownerships, complete transparency at the surveyor bureau, and easy conveyancing."
    }
  ];

  return (
    <section id="why-invest" className="py-20 bg-white relative overflow-hidden border-b border-gray-200">
      {/* Decorative Geometric Patterns */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-brand-gold/5 border-l border-b border-brand-gold/10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-primary/5 border-r border-t border-brand-primary/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-extrabold tracking-[0.25em] text-brand-gold uppercase block">
            INVESTMENT INSIGHT
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 uppercase tracking-tight">
            Why Invest in El Mirage Estate?
          </h2>
          <div className="h-[2px] w-16 bg-brand-gold mx-auto my-4" />
          <p className="text-sm sm:text-base text-gray-650 max-w-xl mx-auto font-sans leading-relaxed">
            Agbara represents a high-density corporate and industrial corridor, resulting in premium market demand for securely deeded plots.
          </p>
        </div>

        {/* 4-Card Grid - Geometric Stat Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {cards.map((card, i) => {
            const IconComp = card.icon;
            return (
              <div 
                key={i} 
                className="group flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 p-8 bg-light-gray border-l-4 border-l-brand-gold border-y border-r border-gray-200 shadow-sm hover:bg-white hover:shadow-md transition-all duration-200"
              >
                {/* Left side Icon Frame - Flat Geometric */}
                <div className="h-12 w-12 bg-brand-primary flex items-center justify-center shrink-0 border border-brand-gold/25 group-hover:bg-brand-gold transition-colors duration-200">
                  <IconComp className="h-5 w-5 text-white group-hover:text-brand-primary transition-colors" />
                </div>

                {/* Right side copy content */}
                <div className="space-y-2">
                  <h3 className="font-bold text-brand-primary uppercase text-md tracking-wider">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed font-sans">
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
