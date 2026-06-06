/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ShieldCheck, UserCheck, CreditCard, Compass } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Verified Property Documentation",
      desc: "Sleep peacefully with properties backed by genuine Registered Survey documentation, pre-vetted by elite legal experts."
    },
    {
      icon: UserCheck,
      title: "Secure Land Ownership",
      desc: "Guaranteed 100% free from government acquisitions, third-party land grabbers, or ancestral ownership disputes."
    },
    {
      icon: CreditCard,
      title: "Affordable Payment Plans",
      desc: "Invest in high-value locations with comfortable structural payment pathways structured around your business cash flow."
    },
    {
      icon: Compass,
      title: "Strategic Investment Locations",
      desc: "Properties purchased inside expanding commercial growth corridors, positioning your capital for exponential appreciation."
    }
  ];

  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      {/* Decorative geometric boxes */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-brand-gold/5 border-r border-b border-brand-gold/10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-brand-primary/5 border-l border-t border-brand-primary/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Side: Premium Real Estate Image Frame */}
        <div className="lg:col-span-5 relative">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Visual backward decorative card - custom geometric offset */}
            <div className="absolute -inset-4 border-2 border-brand-gold/30 transform translate-x-4 translate-y-4 pointer-events-none z-0" />
            
            {/* Actual Image */}
            <div className="overflow-hidden shadow-2xl relative z-10 aspect-[4/5] bg-slate-100 border border-gray-200">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800"
                alt="Trusted Real Estate Partner"
                className="w-full h-full object-cover transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-primary/10 pointer-events-none" />
            </div>

            {/* Overlaid Badges - Sharp Geometric Style */}
            <div className="absolute -bottom-6 -right-6 bg-brand-primary border border-brand-gold/40 text-white p-5 shadow-xl z-20 max-w-[200px]">
              <p className="font-sans text-3xl font-black text-brand-gold leading-none">100%</p>
              <p className="text-[10px] tracking-widest uppercase font-bold text-white/80 mt-1.5 leading-tight">
                Secure &amp; Verified Transactions
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Copywriting & Pillars */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-extrabold tracking-[0.25em] text-brand-gold uppercase block">
              OUR PROFILE
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight leading-none uppercase">
              Trusted Real Estate <br />
              <span className="text-brand-primary">Investment Partner</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-sans">
            Landiquire Associates helps individuals, families, and investors acquire genuine landed properties in strategic locations across Nigeria. We focus on transparency, affordability, and long-term value appreciation.
          </p>

          {/* Pillars List - Custom geometric border left */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            {features.map((feat, index) => {
              const IconComp = feat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="flex flex-col space-y-2 p-5 bg-light-gray border-l-4 border-l-brand-gold border-y border-r border-gray-200 transition-all duration-300 hover:bg-white hover:shadow-md"
                >
                  <div className="h-9 w-9 bg-brand-primary/10 flex items-center justify-center shrink-0">
                    <IconComp className="h-4.5 w-4.5 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-primary text-sm uppercase tracking-wide">
                      {feat.title}
                    </h4>
                    <p className="text-xs text-gray-650 mt-1 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
