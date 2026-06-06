/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Eye, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { GalleryItem } from '../types';

interface GalleryPreviewProps {
  onViewFullGallery: () => void;
}

export default function GalleryPreview({ onViewFullGallery }: GalleryPreviewProps) {
  const previewItems: GalleryItem[] = [
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
    }
  ];

  return (
    <section id="gallery-preview" className="py-20 bg-light-gray relative border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-extrabold tracking-[0.25em] text-brand-gold uppercase block">
            PORTFOLIO HIGHLIGHTS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 uppercase tracking-tight">
            Visual Gallery Preview
          </h2>
          <div className="h-[2px] w-16 bg-brand-gold mx-auto my-4" />
          <p className="text-sm sm:text-base text-gray-655 max-w-xl mx-auto font-sans leading-relaxed">
            Take a glance at our curated select layouts, secure peg marks, and premier architectural blueprints. 
          </p>
        </div>

        {/* 3-Image Highlight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {previewItems.map((item, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              key={item.id}
              className="group relative overflow-hidden shadow-md bg-white border border-gray-200 cursor-pointer"
              onClick={onViewFullGallery}
            >
              <div className={`overflow-hidden relative ${item.aspectRatio}`}>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-brand-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-350 flex items-center justify-center">
                  <div className="h-10 w-10 bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200">
                    <Eye className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Title strip */}
              <div className="p-4 border-t border-gray-150 flex items-center justify-between bg-white">
                <div>
                  <span className="text-[9px] font-extrabold uppercase text-brand-gold tracking-wider block">
                    {item.category}
                  </span>
                  <h4 className="font-sans font-bold text-sm text-brand-primary tracking-tight mt-0.5 uppercase">
                    {item.title}
                  </h4>
                </div>
                <ImageIcon className="h-4.5 w-4.5 text-brand-primary/35 shrink-0" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Full Gallery Action */}
        <div className="mt-12 text-center">
          <button
            onClick={onViewFullGallery}
            className="inline-flex items-center space-x-2 px-8 py-4 bg-brand-primary text-white text-xs font-bold tracking-widest uppercase hover:bg-brand-secondary transition-colors shadow-lg hover:cursor-pointer"
          >
            <span>Explore Separate Full Gallery Page</span>
            <ArrowRight className="h-4 w-4 text-brand-gold" />
          </button>
        </div>

      </div>
    </section>
  );
}
