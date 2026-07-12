/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data';
import { Plus, Sliders, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem, quantity?: number) => void;
  onCustomizePreset: (presetId: string) => void;
}

export default function MenuSection({ onAddToCart, onCustomizePreset }: MenuSectionProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'burgers' | 'sides' | 'drinks' | 'shakes'>('all');
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'all', label: 'All Eats' },
    { id: 'burgers', label: 'Gourmet Burgers' },
    { id: 'sides', label: 'Premium Sides' },
    { id: 'drinks', label: 'Thirst Quenchers' },
    { id: 'shakes', label: 'Hand-Spun Shakes' },
  ] as const;

  const filteredItems = MENU_ITEMS.filter(
    (item) => activeTab === 'all' || item.category === activeTab
  );

  const handleAddToCartClick = (item: MenuItem) => {
    onAddToCart(item);
    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  return (
    <section id="menu" className="py-20 bg-stone-50 border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 font-sans">
            Our Flame-Seared Menu
          </h2>
          <div className="h-1.5 w-16 bg-amber-500 mx-auto mt-3 rounded-full" />
          <p className="text-stone-600 mt-4 text-sm sm:text-base font-sans">
            Every bite is tailored for ultimate flavor. Sizzling premium patties, crispy sides, and decadent milkshakes crafted fresh on order.
          </p>
        </div>

        {/* Tab Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-4xl mx-auto">
          {categories.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-stone-900 text-white shadow-md'
                  : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-100/80 border border-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-md hover:border-stone-200 transition-all duration-300 flex flex-col group"
              >
                {/* Product Thumbnail Container */}
                <div className="relative aspect-4/3 bg-stone-100 overflow-hidden border-b border-stone-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Floating Tags */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 bg-stone-900/90 text-white text-[10px] font-bold font-mono tracking-wider uppercase rounded-md shadow-sm border border-stone-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {/* Float Category label */}
                  <span className="absolute top-3 right-3 px-2 py-0.5 bg-white/90 text-stone-800 text-[9px] font-bold font-mono uppercase rounded-md shadow-sm border border-stone-100">
                    {item.category}
                  </span>
                </div>

                {/* Content Block */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="font-extrabold text-lg text-stone-900 font-sans tracking-tight leading-snug">
                      {item.name}
                    </h3>
                    <span className="text-xl font-black text-amber-600 shrink-0">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  <p className="text-stone-500 text-xs sm:text-sm font-sans mb-6 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Actions Row */}
                  <div className="mt-auto flex gap-2">
                    {/* Primary Buy / Cart Action */}
                    <button
                      onClick={() => handleAddToCartClick(item)}
                      className={`flex-grow py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${
                        addedItemIds[item.id]
                          ? 'bg-emerald-500 text-white'
                          : 'bg-stone-900 text-white hover:bg-amber-500'
                      }`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {addedItemIds[item.id] ? 'Added to Bag!' : 'Add to Bag'}
                    </button>

                    {/* Customizable Customizer Gateway */}
                    {item.customizable && (
                      <button
                        onClick={() => onCustomizePreset(item.id)}
                        className="p-3 bg-stone-50 hover:bg-stone-100 text-stone-700 hover:text-stone-950 border border-stone-200 hover:border-stone-300 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center"
                        title="Customize burger ingredients in the workshop"
                      >
                        <Sliders className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
