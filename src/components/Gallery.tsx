/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, Image as ImageIcon, ArrowLeft } from 'lucide-react';
import { GalleryItem } from '../types';

interface GalleryProps {
  onBackToHome?: () => void;
}

export default function Gallery({ onBackToHome }: GalleryProps = {}) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [modalImage, setModalImage] = useState<string | null>(null);

  const categories = ['All', 'Estate Site', 'Development Concepts', 'Infrastructure'];

  const galleryItems: GalleryItem[] = [
    {
      id: '1',
      category: 'Estate Site',
      title: 'El Mirage Perimeter Frontage',
      imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800',
      aspectRatio: 'aspect-square'
    },
    {
      id: '2',
      category: 'Estate Site',
      title: 'Survey-Deeded Land Plots',
      imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800',
      aspectRatio: 'aspect-[4/3]'
    },
    {
      id: '3',
      category: 'Development Concepts',
      title: 'Luxury Villa Architectural Model',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
      aspectRatio: 'aspect-[16/10]'
    },
    {
      id: '4',
      category: 'Infrastructure',
      title: 'Approved Road Network Pathways',
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
      aspectRatio: 'aspect-[4/3]'
    },
    {
      id: '5',
      category: 'Development Concepts',
      title: 'Contemporary Duplex Concept',
      imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800',
      aspectRatio: 'aspect-square'
    },
    {
      id: '6',
      category: 'Infrastructure',
      title: 'Planned Drainage Channels',
      imageUrl: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&q=80&w=800',
      aspectRatio: 'aspect-[16/10]'
    }
  ];

  const filteredItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <section id="gallery" className="py-20 bg-[#F5F7FA] relative border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {onBackToHome && (
          <div className="mb-10 flex items-center justify-start">
            <button 
              onClick={onBackToHome}
              className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-brand-primary hover:text-[#D4A437] bg-white px-4 py-2.5 border border-gray-200 transition-all shadow-sm hover:cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back To Landing Portal</span>
            </button>
          </div>
        )}

        {/* Gallery Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-extrabold tracking-[0.25em] text-brand-gold uppercase block">
            VISUAL PORTFOLIO
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 uppercase tracking-tight">
            Property Gallery
          </h2>
          <div className="h-[2px] w-16 bg-brand-gold mx-auto my-4" />
          <p className="text-sm sm:text-base text-gray-650 max-w-xl mx-auto font-sans leading-relaxed">
            Browse our visual archive of property lines, entrance ways, and modern real estate architectural suggestions for Agbara buyers.
          </p>
        </div>

        {/* Filter categories tabs bar - sharp rectangular buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 overflow-x-auto scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 text-xs font-bold tracking-widest uppercase transition-all duration-200 hover:cursor-pointer ${
                activeCategory === cat
                  ? 'bg-brand-primary text-white shadow-md'
                  : 'bg-white text-brand-primary border border-gray-200 hover:bg-brand-primary hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Beautiful Bento-like Grid - No curves */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={item.id}
                className="group relative overflow-hidden shadow-md bg-white border border-gray-150 cursor-pointer"
                onClick={() => setModalImage(item.imageUrl)}
              >
                {/* Image */}
                <div className={`overflow-hidden relative ${item.aspectRatio}`}>
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Glass overlay */}
                  <div className="absolute inset-0 bg-brand-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-350 flex items-center justify-center">
                    <div className="h-10 w-10 bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200">
                      <Eye className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>

                {/* Info strip */}
                <div className="p-4 border-t border-gray-150 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-extrabold uppercase text-brand-gold tracking-wider block">
                      {item.category}
                    </span>
                    <h4 className="font-sans font-bold text-sm text-brand-primary tracking-tight group-hover:text-brand-secondary transition-colors mt-0.5 uppercase">
                      {item.title}
                    </h4>
                  </div>
                  <ImageIcon className="h-4.5 w-4.5 text-brand-primary/35 shrink-0" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Image Full-Screen Viewer Modal */}
        {modalImage && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 transition-all duration-300 backdrop-blur-sm"
            onClick={() => setModalImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-brand-gold text-2xl font-black font-mono transition-colors"
              onClick={() => setModalImage(null)}
            >
              ×
            </button>
            <div className="max-w-4xl max-h-[85vh] overflow-hidden bg-neutral-900 border border-white/10 relative shadow-2xl">
              <img 
                src={modalImage} 
                alt="Enlarged View" 
                className="w-full h-auto max-h-[80vh] object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
