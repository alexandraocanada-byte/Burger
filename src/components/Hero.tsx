/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Flame, Sparkles, ShieldCheck, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onNavigate: (section: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const handleCtaClick = (id: string) => {
    onNavigate(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-stone-50 to-white pt-12 pb-20 md:py-24 lg:py-32 border-b border-stone-100">
      {/* Abstract warm ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-50 rounded-full blur-3xl opacity-60 -z-10 translate-x-20 -translate-y-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-stone-100 rounded-full blur-3xl opacity-40 -z-10 -translate-x-20 translate-y-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Content column */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left space-y-6">
            
            {/* Tagline / Micro-badge */}
            <div className="inline-flex items-center justify-center lg:justify-start gap-1.5 self-center lg:self-start px-3 py-1 bg-amber-100/60 text-amber-900 rounded-full text-xs font-semibold uppercase tracking-wider font-mono">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-current" />
              Sizzling Perfection Since 2018
            </div>

            {/* Display Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-900 leading-[1.1]">
              Craft Burgers <br />
              <span className="text-amber-500 font-sans">Built For Real Taste.</span>
            </h1>

            {/* Supporting description */}
            <p className="max-w-2xl mx-auto lg:mx-0 text-base sm:text-lg text-stone-600 font-sans leading-relaxed">
              We smash our grass-fed beef to lock in maximum lace, sear on custom-machined cast iron, and stack with premium locally sourced cheeses inside daily-baked golden brioche buns. Done simple, done right.
            </p>

            {/* Call To Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => handleCtaClick('menu')}
                className="w-full sm:w-auto px-8 py-4 bg-stone-900 hover:bg-amber-500 text-white font-medium rounded-xl shadow-lg shadow-stone-900/10 hover:shadow-amber-500/15 transition-all duration-300 cursor-pointer text-base"
              >
                Order Fresh Menu
              </button>
              <button
                onClick={() => handleCtaClick('builder')}
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-stone-50 text-stone-900 border border-stone-200 font-medium rounded-xl shadow-sm transition-all duration-200 cursor-pointer text-base"
              >
                Custom Burger Builder
              </button>
            </div>

            {/* Highlight Core Values */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-stone-100 max-w-lg mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <span className="p-2 bg-stone-100 text-stone-800 rounded-lg mb-2">
                  <Flame className="w-5 h-5 text-amber-500" />
                </span>
                <span className="text-xs font-bold text-stone-900 uppercase tracking-wider font-mono">100% Grass-Fed</span>
                <span className="text-[11px] text-stone-500">Premium Beef</span>
              </div>
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <span className="p-2 bg-stone-100 text-stone-800 rounded-lg mb-2">
                  <ShieldCheck className="w-5 h-5 text-amber-500" />
                </span>
                <span className="text-xs font-bold text-stone-900 uppercase tracking-wider font-mono">Artisanal Bun</span>
                <span className="text-[11px] text-stone-500">Baked Daily</span>
              </div>
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <span className="p-2 bg-stone-100 text-stone-800 rounded-lg mb-2">
                  <Clock className="w-5 h-5 text-amber-500" />
                </span>
                <span className="text-xs font-bold text-stone-900 uppercase tracking-wider font-mono">Under 15 Mins</span>
                <span className="text-[11px] text-stone-500">Express Delivery</span>
              </div>
            </div>

          </div>

          {/* Visual Presentation column */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative group w-full max-w-md lg:max-w-none">
              
              {/* Back decoration card */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-200 to-amber-500 rounded-3xl rotate-3 scale-102 blur-xs opacity-80 group-hover:rotate-1 group-hover:scale-104 transition-all duration-500 -z-10 shadow-lg" />
              
              {/* Main Image Container */}
              <div className="relative bg-stone-950 rounded-3xl overflow-hidden aspect-video sm:aspect-square md:aspect-video lg:aspect-square shadow-xl ring-4 ring-white border border-stone-800">
                <img
                  src="/src/assets/images/gourmet_hero_burger_1783846788592.jpg"
                  alt="Umami Smash Premium Cheeseburger"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Float price label */}
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-stone-100 flex items-center gap-1.5">
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-widest font-mono">From</span>
                  <span className="text-lg font-black text-stone-950">$13.99</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
