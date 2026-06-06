/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Facebook, Instagram, Linkedin, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate?: (id: string) => void;
}

export default function Footer({ onNavigate }: FooterProps = {}) {
  const scrollToHeading = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
      return;
    }
    const element = document.getElementById(id);
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

  const currentYear = 2026; // Static or dynamic, user prompt specifies 2026.

  return (
    <footer className="bg-brand-primary text-white/80 border-t border-brand-gold/20 pt-16 pb-8 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-white/5">
        
        {/* Column 1: Brand Info */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center space-x-2">
            <img
              src="https://imgur.com/WNdqBl3.png"
              alt="Landiquire Logo"
              className="h-10 w-10 object-contain bg-white/5 p-1 border border-brand-gold/30 shadow-md transition-transform hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div>
              <span className="font-sans text-base font-extrabold tracking-wider text-white block uppercase">
                Landiquire
              </span>
              <span className="text-[9px] tracking-[0.2em] text-brand-gold uppercase block font-bold leading-none">
                Associates
              </span>
            </div>
          </div>
          <p className="text-xs text-white/70 leading-relaxed max-w-sm pt-2">
            A premium property investment partner focused strictly on transparency, secure surveys, and high-yield real estate projects across metropolitan Nigeria.
          </p>
          {/* Socials icons */}
          <div className="flex space-x-2 pt-2">
            {[
              { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
              { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
              { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
              { icon: MessageCircle, href: 'https://wa.me/2348124305552', label: 'WhatsApp' }
            ].map((social) => {
              const SocialIcon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 bg-white/5 flex items-center justify-center text-white/80 hover:bg-brand-gold hover:text-brand-primary border border-white/5 hover:border-brand-gold transition-all"
                  aria-label={social.label}
                >
                  <SocialIcon className="h-4.5 w-4.5" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="lg:col-span-3 space-y-4">
          <h3 className="font-sans text-brand-gold text-xs font-extrabold tracking-widest uppercase">
            Quick Links
          </h3>
          <ul className="space-y-2.5 pt-2">
            {[
              { name: 'Home Portal', id: 'hero' },
              { name: 'About Partners', id: 'about' },
              { name: 'El Mirage Estate', id: 'property' },
              { name: 'Why Invest Here', id: 'why-invest' },
              { name: 'Photo Gallery', id: 'gallery' },
              { name: 'FAQs', id: 'faq' },
              { name: 'Inquiry Form', id: 'contact' }
            ].map((link) => (
              <li key={link.name}>
                <button
                  onClick={() => scrollToHeading(link.id)}
                  className="text-white/70 hover:text-brand-gold hover:underline transition-all text-left hover:cursor-pointer font-sans text-xs uppercase font-semibold tracking-wider"
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Contact Details */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="font-sans text-brand-gold text-xs font-extrabold tracking-widest uppercase">
            Official Offices
          </h3>
          <ul className="space-y-4 pt-2">
            
            {/* Address */}
            <li className="flex items-start space-x-3.5">
              <MapPin className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] uppercase font-bold text-white/50 block tracking-tight">Development Venue</span>
                <p className="text-white/85 text-xs sm:text-sm mt-0.5 font-sans leading-relaxed">
                  Agbara, Lagos, Nigeria (Along Opic Estate, Modina Trailer Park)
                </p>
              </div>
            </li>

            {/* Telephone */}
            <li className="flex items-start space-x-3.5">
              <Phone className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] uppercase font-bold text-white/50 block tracking-tight">Direct Sales Hotline</span>
                <a href="tel:08124305552" className="text-brand-gold text-xs sm:text-sm font-bold font-mono hover:underline-offset-4 mt-0.5 block">
                  08124305552
                </a>
              </div>
            </li>

            {/* Email */}
            <li className="flex items-start space-x-3.5">
              <Mail className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] uppercase font-bold text-white/50 block tracking-tight">Support Email Direct</span>
                <a href="mailto:landiquireassociates@gmail.com" className="text-white/85 text-xs sm:text-sm font-mono mt-0.5 block hover:underline">
                  landiquireassociates@gmail.com
                </a>
              </div>
            </li>

          </ul>
        </div>

      </div>

      {/* Copyright branding footer line */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-white/40 tracking-widest uppercase font-mono">
        <div>
          © {currentYear} Landiquire Associates. All Rights Reserved.
        </div>
        <div className="mt-2 md:mt-0">
          Designed with Premium Real Estate Architecture
        </div>
      </div>
    </footer>
  );
}
