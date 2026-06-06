/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import FeaturedProperty from './components/FeaturedProperty';
import WhyInvest from './components/WhyInvest';
import Gallery from './components/Gallery';
import GalleryPreview from './components/GalleryPreview';
import ContactForm from './components/ContactForm';
import FAQ from './components/FAQ';
import MapsSection from './components/MapsSection';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import BackToTop from './components/BackToTop';
import Loader from './components/Loader';
import InquiryModal from './components/InquiryModal';
import { PlotSize } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'gallery'>('home');
  const [isLoaderFinished, setIsLoaderFinished] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [selectedPlotSize, setSelectedPlotSize] = useState<PlotSize | null>(null);

  const handleOpenInquiryFromProperty = (plotSize?: PlotSize) => {
    if (plotSize) {
      setSelectedPlotSize(plotSize);
    } else {
      setSelectedPlotSize(null);
    }
    setIsInquiryModalOpen(true);
    
    // Smoothly scroll down to contact form section for reliable inline fallback engagement
    const element = document.getElementById('contact');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleOpenInquiryGeneric = () => {
    setSelectedPlotSize(null);
    setIsInquiryModalOpen(true);
    
    // Smoothly scroll down to contact form section for reliable inline fallback engagement
    const element = document.getElementById('contact');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'gallery') {
      setCurrentPage('gallery');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (currentPage !== 'home') {
        setCurrentPage('home');
        // Let the state change mount home page structures before scrolling
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 180);
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    }
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans" id="app-root">
      
      {/* 1. Loader screen and transitions */}
      {!isLoaderFinished && (
        <Loader onComplete={() => setIsLoaderFinished(true)} />
      )}

      {isLoaderFinished && (
        <div className="relative animate-fade-in">
          
          {/* 2. Glassmorphic sticky header & top contacts */}
          <Navbar 
            onOpenInquiry={handleOpenInquiryGeneric} 
            onNavigate={handleNavigate}
            currentPage={currentPage}
          />

          {/* Conditional rendering based on active page state */}
          {currentPage === 'home' ? (
            <>
              {/* 3. Hero introductory fold */}
              <Hero onOpenInquiry={handleOpenInquiryGeneric} />

              {/* 4. Authority figures and counters */}
              <Stats />

              {/* 5. Core Partners about summary block */}
              <About />

              {/* 6. El Mirage Property listings and specs */}
              <FeaturedProperty onOpenInquiry={handleOpenInquiryFromProperty} />

              {/* 7. Strategic value parameters */}
              <WhyInvest />

              {/* 8. Photo album compilation preview with quick teaser highlights */}
              <GalleryPreview onViewFullGallery={() => handleNavigate('gallery')} />

              {/* 9. Booking, Contacts, and lead reservation center */}
              <ContactForm 
                initialPlot={selectedPlotSize} 
                onClearInitialPlot={() => setSelectedPlotSize(null)} 
              />

              {/* 10. Geographic embedded maps sector */}
              <MapsSection />

              {/* 11. Client investor quotes testimonials */}
              <Testimonials />

              {/* 12. Accordion FAQ queries */}
              <FAQ />
            </>
          ) : (
            <div className="animate-fade-in">
              {/* Standalone separate Gallery Page View */}
              <Gallery onBackToHome={handleBackToHome} />
            </div>
          )}

          {/* 13. Footer navigation and credits */}
          <Footer onNavigate={handleNavigate} />

          {/* 14. Support integration floating links */}
          <WhatsAppButton />

          {/* 15. Scroll helper back to top trigger */}
          <BackToTop />

          {/* 16. Overlay dialogue forms */}
          <InquiryModal 
            isOpen={isInquiryModalOpen} 
            onClose={() => setIsInquiryModalOpen(false)} 
            defaultPlotSize={selectedPlotSize}
          />

        </div>
      )}

    </div>
  );
}
