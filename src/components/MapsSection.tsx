/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MapPin, Compass, Navigation, Landmark } from 'lucide-react';
import { motion } from 'motion/react';

export default function MapsSection() {
  const coordinates = "6.4950° N, 3.1026° E";
  
  return (
    <section className="py-20 bg-white relative border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-3"
        >
          <span className="text-xs font-extrabold tracking-[0.25em] text-brand-gold uppercase block">
            LOCATION FINDER
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 uppercase tracking-tight">
            Find El Mirage Estate on Map
          </h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-[2px] bg-brand-gold mx-auto my-4" 
          />
          <p className="text-sm text-gray-655 max-w-xl mx-auto font-sans leading-relaxed">
            Review of our strategic geographical placement in the Agbara expansion zone along the Lagos boundary.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Map Frame Holder */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="lg:col-span-8 overflow-hidden shadow-2xl border border-gray-200 min-h-[380px] relative bg-slate-50"
          >
            <iframe
              src="https://maps.google.com/maps?q=Agbara,%20Lagos,%20Nigeria&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full min-h-[380px] border-0"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Agbara Lagos Nigeria Map Location"
            />
          </motion.div>

          {/* Location details card - Sharp Geometric Frame */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: 'spring', delay: 0.1 }}
            whileHover={{ 
              boxShadow: "0 20px 25px -5px rgba(184, 140, 43, 0.15), 0 10px 10px -5px rgba(184, 140, 43, 0.1)"
            }}
            className="lg:col-span-4 bg-brand-primary text-white p-8 shadow-xl flex flex-col justify-between relative overflow-hidden border border-brand-gold/30"
          >
            
            <div className="space-y-6">
              <span className="text-[10px] tracking-widest font-mono text-brand-gold uppercase font-bold block">
                Destination Coordinates
              </span>
              
              <h3 className="text-brand-gold text-2xl font-bold leading-tight uppercase">
                El Mirage Estate
              </h3>
              
              {/* Geographic stats lines */}
              <div className="space-y-4 pt-2">
                
                <div className="flex space-x-3 items-start">
                  <MapPin className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs text-white/50 font-bold uppercase tracking-wider">Exact Sector</h4>
                    <p className="text-xs text-white/90 leading-relaxed mt-0.5 font-sans">
                      Agbara, Lagos (Along Opic Estate, Modina Trailer Park)
                    </p>
                  </div>
                </div>

                <div className="flex space-x-3 items-start">
                  <Compass className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs text-white/50 font-bold uppercase tracking-wider">Logistics Index</h4>
                    <p className="text-xs text-white/90 leading-relaxed mt-0.5 font-sans">
                      Coordinates: {coordinates}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-3 items-start">
                  <Landmark className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs text-white/50 font-bold uppercase tracking-wider">Adjacencies</h4>
                    <p className="text-xs text-white/90 leading-relaxed mt-0.5 font-sans">
                      Direct border connection to Opic Estate residential corridors.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Travel note */}
            <div className="pt-6 border-t border-white/10 mt-6 flex items-center space-x-3 bg-white/5 p-4">
              <Navigation className="h-5 w-5 text-brand-gold shrink-0 animate-bounce" />
              <p className="text-[10px] text-white/80 leading-normal uppercase tracking-wider font-mono">
                Scheduled direct group shuttle inspections depart from the central terminal weekly. Please call to register.
              </p>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
