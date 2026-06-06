/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { MapPin, CheckCircle, Award, Hourglass, Landmark, TrendingUp } from 'lucide-react';
import { PlotSize } from '../types';

interface FeaturedPropertyProps {
  onOpenInquiry: (initialPlot?: PlotSize) => void;
}

export default function FeaturedProperty({ onOpenInquiry }: FeaturedPropertyProps) {
  const benefits = [
    { icon: Award, label: "Fast Developing Environment", desc: "Agbara is undergoing heavy residential and industrial urbanization." },
    { icon: Compass, label: "Good Road Network", desc: "Positioned with convenient thoroughfares off the critical Lagos-Badagry highroad." },
    { icon: Hourglass, label: "Suitable for Instant Residential Build", desc: "Firm dry soil structures ready for immediate architectural foundation work." },
    { icon: TrendingUp, label: "High Return on Investment", desc: "Expected capital multiples within 24 months due to corporate infrastructure influx." },
    { icon: Landmark, label: "Registered Survey Certificate", desc: "Secured documentation files mapped perfectly to master administrative records." },
    { icon: CheckCircle, label: "Secure Disputes-Free Ownership", desc: "Strictly isolated from ancestral complaints, families, or hidden attachments." }
  ];

  const pricingPlans = [
    {
      size: PlotSize.SIZE_300,
      price: "₦2,700,000",
      priceLabel: "₦2.7 Million",
      type: "Standard Plot",
      desc: "Perfect for single-family residential dwellings or semi-detached units.",
      features: [
        "Dimensions: 15m x 20m equivalent",
        "Registered Survey Document",
        "Immediate Allocation Map",
        "Residential Use Authorization",
        "Perimeter Fencing Access"
      ],
      badge: "Best Value Entry"
    },
    {
      size: PlotSize.SIZE_500,
      price: "₦4,000,000",
      priceLabel: "₦4.0 Million",
      type: "Executive Plot",
      desc: "Optimal for larger luxury modern estates or multi-tenant commercial residential plans.",
      features: [
        "Dimensions: 15m x 33m equivalent",
        "Registered Survey Document",
        "Premium Spot Priority Selection",
        "Residential & Light Commercial Use",
        "Instant Building Clearing Free"
      ],
      badge: "Most Popular Purchase",
      featured: true
    }
  ];

  return (
    <section id="property" className="py-20 bg-[#F5F7FA] relative border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-extrabold tracking-[0.25em] text-brand-gold uppercase block">
            PREVIEW PROJECT
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 uppercase tracking-tight">
            El Mirage Estate
          </h2>
          <div className="h-[2px] w-16 bg-brand-gold mx-auto my-4" />
          <div className="flex items-center justify-center space-x-2 text-gray-600 font-bold uppercase tracking-wider text-xs">
            <MapPin className="h-4.5 w-4.5 text-brand-primary shrink-0" />
            <span>Agbara, Lagos (Along Opic Estate, Modina Trailer Park)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-start">
          
          {/* Left Column: Visual Property Details & Benefits */}
          <div className="lg:col-span-6 space-y-8">
            <div className="overflow-hidden shadow-2xl aspect-[16/10] bg-slate-200 border border-gray-200 group relative">
              <img
                src="https://imgur.com/6wtcMHi.png"
                alt="El Mirage Development Site"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-primary/5 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-xl text-brand-primary uppercase tracking-wide">
                Guaranteed Estate Benefits
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
                El Mirage Estate represents an elite investment canvas designed carefully for high yields and secured physical holdings. Strategically located inside the Lagos industrial boundary, you obtain a robust legal safety framework coupled with remarkable development momentum.
              </p>
              
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.08 }
                  }
                }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4"
              >
                {benefits.map((benefit, i) => {
                  const BenefitIcon = benefit.icon;
                  return (
                    <motion.div 
                      key={i} 
                      variants={{
                        hidden: { opacity: 0, y: 15 },
                        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } }
                      }}
                      whileHover={{ y: -3, borderColor: "rgba(184, 140, 43, 0.4)", boxShadow: "0 4px 12px rgba(16,42,114,0.05)" }}
                      className="flex items-start space-x-3 bg-white p-4 border-l-4 border-l-brand-gold border-y border-r border-gray-205 shadow-sm transition-all duration-200"
                    >
                      <div className="h-8 w-8 bg-brand-primary/10 flex items-center justify-center shrink-0">
                        <BenefitIcon className="h-4 w-4 text-brand-primary" />
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold uppercase text-gray-950 tracking-wide">{benefit.label}</h4>
                        <p className="text-[10px] text-gray-500 line-clamp-2 mt-0.5 leading-relaxed">{benefit.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>

          {/* Right Column: Interactive Pricing Cards */}
          <div className="lg:col-span-6 space-y-8">
            <h3 className="font-bold text-xl text-brand-primary uppercase tracking-wide text-center lg:text-left">
              Choose Your Investment Plot Sizes
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {pricingPlans.map((plan) => (
                <motion.div
                  key={plan.size}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`p-6 relative flex flex-col justify-between border ${
                    plan.featured
                      ? 'bg-brand-primary text-white border-2 border-brand-gold shadow-xl'
                      : 'bg-white text-gray-900 border-gray-200 shadow-md hover:border-brand-primary/40'
                  }`}
                >
                  {/* Badge */}
                  <span className={`absolute -top-3 left-6 px-3 py-1 text-[9px] font-extrabold uppercase tracking-widest ${
                    plan.featured
                      ? 'bg-brand-gold text-white'
                      : 'bg-gray-100 text-[#102A72] border'
                  }`}>
                    {plan.badge}
                  </span>

                  <div className="pt-2">
                    <p className={`text-[10px] tracking-wider uppercase font-extrabold ${plan.featured ? 'text-brand-gold' : 'text-gray-500'}`}>
                      {plan.type}
                    </p>
                    <h4 className="text-3xl font-extrabold tracking-tight mt-1">
                      {plan.size}
                    </h4>
                    <p className={`text-xs mt-2 line-clamp-3 leading-relaxed ${plan.featured ? 'text-white/80' : 'text-gray-600'}`}>
                      {plan.desc}
                    </p>

                    {/* Price Tag */}
                    <div className="my-6 border-t border-b py-4 border-current/10">
                      <p className={`text-[10px] uppercase tracking-widest ${plan.featured ? 'text-brand-gold' : 'text-gray-500'}`}>Investment Value</p>
                      <p className="text-2xl font-bold tracking-tight mt-1">{plan.price}</p>
                    </div>

                    {/* Features checklist */}
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-wider">
                          <CheckCircle className={`h-4 w-4 shrink-0 ${plan.featured ? 'text-brand-gold' : 'text-brand-primary'}`} />
                          <span className={plan.featured ? 'text-white/80' : 'text-gray-700'}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => onOpenInquiry(plan.size)}
                    className={`w-full py-3 text-center text-xs font-bold uppercase tracking-widest transition-colors hover:cursor-pointer ${
                      plan.featured
                        ? 'bg-brand-gold text-white hover:bg-[#b88c2b]'
                        : 'bg-brand-primary text-white hover:bg-brand-secondary'
                    }`}
                  >
                    Inquire Plot Size
                  </button>
                </motion.div>
              ))}
            </div>

            {/* General Legal Footer */}
            <div className="bg-white border-l-4 border-l-brand-gold border-y border-r border-gray-200 p-5 text-center">
              <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-brand-primary block">
                Guaranteed Survey Registry Checked
              </span>
              <p className="text-[10px] text-gray-500 mt-1 leading-relaxed uppercase tracking-wider font-mono">
                Registered surveys represent the absolute standard in Nigerian land banking. Submissions are documented at the administrative lands registry inside Lagos State.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Auxiliary imported icon to avoid undefined imports
import { Compass } from 'lucide-react';
