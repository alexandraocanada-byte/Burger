/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MapPin, Phone, Clock, Search, Navigation, CheckCircle } from 'lucide-react';
import { STORE_LOCATIONS } from '../data';
import { motion, AnimatePresence } from 'motion/react';

export default function StoreLocator() {
  const [addressInput, setAddressInput] = useState('');
  const [checking, setChecking] = useState(false);
  const [calculatedDistance, setCalculatedDistance] = useState<{
    nearestStore: string;
    distance: number;
    deliveryTime: number;
    fee: number;
  } | null>(null);

  const handleCheckDistance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressInput.trim()) return;

    setChecking(true);
    setCalculatedDistance(null);

    // Simulate standard coordinate search
    setTimeout(() => {
      const isBrooklynKeyword = addressInput.toLowerCase().includes('brooklyn') || addressInput.toLowerCase().includes('pier') || addressInput.toLowerCase().includes('heights');
      const nearest = isBrooklynKeyword ? STORE_LOCATIONS[1] : STORE_LOCATIONS[0];
      
      // Seed values based on input length to make it semi-deterministic but random
      const distance = parseFloat((1.2 + (addressInput.length % 5) * 0.8).toFixed(1));
      const deliveryTime = 12 + Math.floor(distance * 4);
      const fee = distance > 3 ? 3.99 : 1.99;

      setCalculatedDistance({
        nearestStore: nearest.name,
        distance,
        deliveryTime,
        fee,
      });
      setChecking(false);
    }, 1200);
  };

  return (
    <section id="locations" className="py-20 bg-stone-50 border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 font-sans">
            Our Neighborhood Hubs
          </h2>
          <div className="h-1.5 w-16 bg-amber-500 mx-auto mt-3 rounded-full" />
          <p className="text-stone-600 mt-4 text-sm sm:text-base font-sans">
            Come grab a seat, soak up the cozy ambiance, and watch our masters smash burgers live in our open kitchens.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Store Cards Grid */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {STORE_LOCATIONS.map((store) => (
                <div
                  key={store.id}
                  className="bg-white rounded-2xl border border-stone-150 p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Store Title */}
                    <div className="flex items-start gap-2.5">
                      <span className="p-2 bg-stone-900 text-amber-500 rounded-lg">
                        <MapPin className="w-4.5 h-4.5" />
                      </span>
                      <div>
                        <h3 className="font-extrabold text-base text-stone-900 font-sans tracking-tight">
                          {store.name}
                        </h3>
                        <p className="text-xs text-stone-400 font-mono mt-0.5">EST. 2018</p>
                      </div>
                    </div>

                    {/* Store Details Block */}
                    <div className="space-y-3 text-xs sm:text-sm text-stone-600">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                        <span>{store.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-stone-400 shrink-0" />
                        <a href={`tel:${store.phone}`} className="hover:text-amber-600 underline">
                          {store.phone}
                        </a>
                      </div>
                      <div className="flex items-start gap-2">
                        <Clock className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                        <span>{store.hours}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-100 flex justify-between items-center text-xs">
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold uppercase tracking-wider rounded-md">
                      Open Kitchen
                    </span>
                    <a 
                      href={`https://maps.google.com/?q=${encodeURIComponent(store.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone-900 hover:text-amber-600 font-bold flex items-center gap-1.5"
                    >
                      Get Directions ➔
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Distance Calculator & Express Zone Widget */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-stone-200 p-8 shadow-sm">
            <h3 className="text-lg font-extrabold text-stone-900 font-sans tracking-tight mb-2 flex items-center gap-2">
              <Navigation className="w-5 h-5 text-amber-500 fill-current" />
              Express Delivery Check
            </h3>
            <p className="text-stone-500 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
              Type your shipping or current street address below to find your nearest kitchen, calculate estimated delivery fee, and see estimated transit times.
            </p>

            <form onSubmit={handleCheckDistance} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={addressInput}
                  onChange={(e) => setAddressInput(e.target.value)}
                  placeholder="e.g. 500 Broadway, New York, NY"
                  className="w-full bg-stone-50 border border-stone-200 pl-11 pr-4 py-3 rounded-xl text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all font-medium"
                />
                <Search className="w-5 h-5 text-stone-400 absolute left-4 top-3.5" />
              </div>

              <button
                type="submit"
                disabled={checking || !addressInput.trim()}
                className="w-full py-3 bg-stone-900 hover:bg-amber-500 disabled:bg-stone-300 text-white font-bold text-xs sm:text-sm rounded-xl transition-all duration-200 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
              >
                {checking ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Mapping coordinates...
                  </>
                ) : (
                  'Calculate Distance & Speed'
                )}
              </button>
            </form>

            {/* Results Animation Area */}
            <AnimatePresence mode="wait">
              {calculatedDistance && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 pt-6 border-t border-stone-150 space-y-4 overflow-hidden"
                >
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                    <CheckCircle className="w-5 h-5 fill-emerald-100" />
                    Excellent! You are in the Express Delivery Zone.
                  </div>

                  {/* Core Metrics Grid */}
                  <div className="grid grid-cols-2 gap-3 bg-stone-50 p-4 rounded-xl border border-stone-100">
                    <div>
                      <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest font-mono">Nearest Grill</span>
                      <p className="text-xs font-bold text-stone-800 truncate">{calculatedDistance.nearestStore.split(' ')[0]} Kitchen</p>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest font-mono">Distance</span>
                      <p className="text-xs font-bold text-stone-800">{calculatedDistance.distance} miles away</p>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest font-mono">Speed Rating</span>
                      <p className="text-xs font-bold text-stone-800 text-amber-600">~{calculatedDistance.deliveryTime} mins express</p>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest font-mono">Delivery Fee</span>
                      <p className="text-xs font-bold text-stone-800">${calculatedDistance.fee.toFixed(2)}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
