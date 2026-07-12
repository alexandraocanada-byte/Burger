/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Ingredient, IngredientCategory, CustomBurger } from '../types';
import { INGREDIENTS } from '../data';
import { Plus, Trash2, ShoppingBag, Wand2, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BurgerBuilderProps {
  onAddCustomBurger: (customBurger: CustomBurger) => void;
  presetBurgerId: string | null;
  onClearPresetId: () => void;
}

export default function BurgerBuilder({ onAddCustomBurger, presetBurgerId, onClearPresetId }: BurgerBuilderProps) {
  // Setup default states
  const [selectedBun, setSelectedBun] = useState<Ingredient>(
    INGREDIENTS.find((i) => i.id === 'bun_brioche') || INGREDIENTS[0]
  );
  
  const [layers, setLayers] = useState<Ingredient[]>([]);
  const [burgerName, setBurgerName] = useState<string>('My Epic Creation');
  const [successMsg, setSuccessMsg] = useState<boolean>(false);

  // Categorize standard ingredients for selectors
  const buns = INGREDIENTS.filter((i) => i.category === 'bun-top');
  const patties = INGREDIENTS.filter((i) => i.category === 'patty');
  const cheeses = INGREDIENTS.filter((i) => i.category === 'cheese');
  const toppings = INGREDIENTS.filter((i) => i.category === 'topping');
  const sauces = INGREDIENTS.filter((i) => i.category === 'sauce');

  // Handle preset load if requested from the menu
  useEffect(() => {
    if (presetBurgerId) {
      if (presetBurgerId === 'b1') {
        setSelectedBun(INGREDIENTS.find((i) => i.id === 'bun_brioche')!);
        setLayers([
          INGREDIENTS.find((i) => i.id === 'sauce_secret')!,
          INGREDIENTS.find((i) => i.id === 'patty_smash')!,
          INGREDIENTS.find((i) => i.id === 'cheese_cheddar')!,
          INGREDIENTS.find((i) => i.id === 'patty_smash')!,
          INGREDIENTS.find((i) => i.id === 'cheese_cheddar')!,
          INGREDIENTS.find((i) => i.id === 'top_lettuce')!,
          INGREDIENTS.find((i) => i.id === 'top_tomato')!,
          INGREDIENTS.find((i) => i.id === 'top_red_onion')!,
        ]);
        setBurgerName('Smash Presets (Customized)');
      } else if (presetBurgerId === 'b2') {
        setSelectedBun(INGREDIENTS.find((i) => i.id === 'bun_sesame')!);
        setLayers([
          INGREDIENTS.find((i) => i.id === 'sauce_spicy')!,
          INGREDIENTS.find((i) => i.id === 'patty_chicken')!,
          INGREDIENTS.find((i) => i.id === 'top_lettuce')!,
          INGREDIENTS.find((i) => i.id === 'top_pickles')!,
        ]);
        setBurgerName('Crispy Chicken (Customized)');
      } else if (presetBurgerId === 'b3') {
        setSelectedBun(INGREDIENTS.find((i) => i.id === 'bun_brioche')!);
        setLayers([
          INGREDIENTS.find((i) => i.id === 'sauce_truffle')!,
          INGREDIENTS.find((i) => i.id === 'patty_smash')!,
          INGREDIENTS.find((i) => i.id === 'cheese_swiss')!,
          INGREDIENTS.find((i) => i.id === 'top_mushrooms')!,
        ]);
        setBurgerName('Truffle Mushroom (Customized)');
      } else if (presetBurgerId === 'b4') {
        setSelectedBun(INGREDIENTS.find((i) => i.id === 'bun_lettuce')!);
        setLayers([
          INGREDIENTS.find((i) => i.id === 'sauce_secret')!,
          INGREDIENTS.find((i) => i.id === 'patty_vegan')!,
          INGREDIENTS.find((i) => i.id === 'top_tomato')!,
          INGREDIENTS.find((i) => i.id === 'top_red_onion')!,
        ]);
        setBurgerName('Organic Garden (Customized)');
      }
      onClearPresetId(); // Reset so it can be re-triggered

      // Scroll smoothly to builder
      const element = document.getElementById('builder');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [presetBurgerId, onClearPresetId]);

  // Calculations
  // Buns category stores top bun, we double bun price for both top and bottom
  const totalPrice = selectedBun.price + layers.reduce((acc, layer) => acc + layer.price, 0);

  const handleAddLayer = (ing: Ingredient) => {
    if (layers.length >= 10) return; // stack limit for aesthetic and stability reasons
    setLayers((prev) => [...prev, ing]);
  };

  const handleRemoveLayer = (index: number) => {
    setLayers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearLayers = () => {
    setLayers([]);
    setBurgerName('My Epic Creation');
  };

  const handleRandomize = () => {
    const randomBun = buns[Math.floor(Math.random() * buns.length)];
    const randomPatty = patties[Math.floor(Math.random() * patties.length)];
    const randomCheese = cheeses[Math.floor(Math.random() * cheeses.length)];
    const randomSauce = sauces[Math.floor(Math.random() * sauces.length)];
    
    // Pick 2-4 random toppings
    const randomToppings: Ingredient[] = [];
    const count = 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < count; i++) {
      const top = toppings[Math.floor(Math.random() * toppings.length)];
      if (!randomToppings.find((t) => t.id === top.id)) {
        randomToppings.push(top);
      }
    }

    const titles = ['The Ultimate', 'The Beastly', 'The Double', 'Cheesy', 'Smoky', 'Garden'];
    const middle = ['Glory', 'Titan', 'Slammer', 'Feast', 'Avalanche', 'Tower'];
    const randName = `${titles[Math.floor(Math.random() * titles.length)]} ${middle[Math.floor(Math.random() * middle.length)]}`;

    setSelectedBun(randomBun);
    setLayers([randomSauce, randomPatty, randomCheese, ...randomToppings]);
    setBurgerName(randName);
  };

  const handleAddToBag = () => {
    // Top Bun, layers, Bottom Bun are all bundled.
    // Bottom Bun shares selection from top bun structure but has category bottom
    const bottomBun: Ingredient = {
      ...selectedBun,
      id: selectedBun.id + '_bottom',
      name: selectedBun.name.replace('Top', 'Bottom').replace('Bun', 'Bun (Bottom)'),
      category: 'bun-bottom',
      price: 0, // already paid for via selectedBun
    };

    const finalIngredientsList = [selectedBun, ...layers, bottomBun];

    const customBurger: CustomBurger = {
      name: burgerName.trim() || 'My Epic Creation',
      ingredients: finalIngredientsList,
      price: totalPrice,
    };

    onAddCustomBurger(customBurger);
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
    }, 2500);
  };

  return (
    <section id="builder" className="py-20 bg-white border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 font-sans">
            The Burger Workshop
          </h2>
          <div className="h-1.5 w-16 bg-amber-500 mx-auto mt-3 rounded-full" />
          <p className="text-stone-600 mt-4 text-sm sm:text-base font-sans">
            Unleash your inner chef. Choose your buns, pile up premium seared beef or crispy chicken, layer melted cheeses, and drizzle with luxury house sauces.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Visual Canvas (Left Column) */}
          <div className="lg:col-span-5 bg-stone-50 rounded-3xl border border-stone-100 p-8 flex flex-col justify-between items-center h-[520px] relative shadow-inner overflow-hidden">
            {/* Ambient shadow gradient */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-stone-200/50 to-transparent pointer-events-none" />

            {/* Quick Helper Tools */}
            <div className="absolute top-4 right-4 flex gap-2 z-10">
              <button
                onClick={handleRandomize}
                className="p-2.5 bg-white border border-stone-200 hover:border-amber-300 text-stone-700 hover:text-amber-600 rounded-xl shadow-sm transition-all duration-200 cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
                title="Randomize Burger"
              >
                <Wand2 className="w-3.5 h-3.5" />
                Auto-Build
              </button>
              <button
                onClick={handleClearLayers}
                className="p-2.5 bg-white border border-stone-200 hover:border-red-300 text-stone-600 hover:text-red-600 rounded-xl shadow-sm transition-all duration-200 cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
                title="Clear Layers"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>

            {/* Canvas Base Table Plate */}
            <div className="absolute bottom-12 w-64 h-6 bg-stone-200 rounded-full shadow-lg border border-stone-300 pointer-events-none flex items-center justify-center">
              <div className="w-56 h-2 bg-stone-300 rounded-full opacity-60" />
            </div>

            {/* Interactive Stack Display */}
            <div className="flex flex-col-reverse justify-end items-center flex-grow w-full pt-16 pb-12 select-none">
              
              {/* Bottom Bun Layer */}
              <motion.div
                layout
                key={`${selectedBun.id}-bottom`}
                className={`w-44 h-11 ${selectedBun.color} ${selectedBun.borderColor || 'border-stone-400'} border-3 rounded-b-3xl rounded-t-lg shadow-md flex items-center justify-center text-white font-bold relative z-[5]`}
              >
                <span className="text-xl -mt-1">{selectedBun.emoji}</span>
                <span className="absolute -bottom-3 text-[9px] text-stone-500 font-mono uppercase bg-white/90 px-1.5 rounded-md border border-stone-200 shadow-xs">Bun (Base)</span>
              </motion.div>

              {/* Dynamic Added Layers */}
              <AnimatePresence mode="popLayout">
                {layers.map((layer, index) => {
                  let widthClass = 'w-40';
                  let heightClass = 'h-7';
                  let roundedClass = 'rounded-lg';
                  
                  // Specific styling presets based on ingredient type for visual fidelity
                  if (layer.category === 'patty') {
                    widthClass = 'w-42';
                    heightClass = 'h-9';
                    roundedClass = 'rounded-2xl border-stone-950 border-dashed';
                  } else if (layer.category === 'cheese') {
                    widthClass = 'w-41';
                    heightClass = 'h-3';
                    roundedClass = 'rounded-sm opacity-95';
                  } else if (layer.category === 'sauce') {
                    widthClass = 'w-36';
                    heightClass = 'h-4';
                    roundedClass = 'rounded-full blur-2xs';
                  } else if (layer.id === 'top_bacon') {
                    widthClass = 'w-44 rotate-2';
                    heightClass = 'h-5';
                  }

                  return (
                    <motion.div
                      layout
                      initial={{ y: -80, scale: 0.6, opacity: 0 }}
                      animate={{ y: 0, scale: 1, opacity: 1 }}
                      exit={{ y: 50, scale: 0.7, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 220, damping: 16 }}
                      key={`${layer.id}-${index}`}
                      className={`${widthClass} ${heightClass} ${roundedClass} ${layer.color} ${layer.borderColor || 'border-stone-400'} border-2 flex items-center justify-center text-white relative -my-1 shadow-sm hover:brightness-105 transition-all cursor-pointer`}
                      onClick={() => handleRemoveLayer(index)}
                      title="Click to remove layer"
                      style={{ zIndex: 10 + index }}
                    >
                      <span className="text-xs font-mono font-black drop-shadow-sm flex items-center gap-1">
                        <span>{layer.emoji}</span>
                        <span className="text-[10px] uppercase font-bold tracking-wider truncate max-w-[120px]">{layer.name}</span>
                      </span>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Top Bun Layer */}
              <motion.div
                layout
                key={`${selectedBun.id}-top`}
                style={{ zIndex: 50 }}
                className={`w-44 h-14 ${selectedBun.color} ${selectedBun.borderColor || 'border-stone-400'} border-3 rounded-t-full rounded-b-lg shadow-lg flex items-center justify-center text-white relative`}
              >
                <div className="absolute top-2 left-6 w-1.5 h-1.5 bg-yellow-100 rounded-full opacity-60" />
                <div className="absolute top-1 left-16 w-1 h-1 bg-yellow-100 rounded-full opacity-50" />
                <div className="absolute top-3 right-10 w-1.5 h-1.5 bg-yellow-100 rounded-full opacity-60" />
                <span className="text-2xl -mt-2">{selectedBun.emoji}</span>
                <span className="absolute -top-3 text-[9px] text-stone-500 font-mono uppercase bg-white/90 px-1.5 rounded-md border border-stone-200 shadow-xs">Bun (Crown)</span>
              </motion.div>

            </div>

            {/* Dynamic Running Specs */}
            <div className="w-full flex justify-between items-end border-t border-stone-200/60 pt-4 z-10 bg-stone-50">
              <div className="text-left">
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest font-mono block">Custom Stack Height</span>
                <span className="text-sm font-black text-stone-800">{layers.length + 2} Layers Total</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest font-mono block">Estimated Cost</span>
                <span className="text-2xl font-black text-amber-600">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

          </div>

          {/* Controls Panel (Right Column) */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            
            {/* Custom Burger Name Input */}
            <div className="bg-stone-50 border border-stone-100 p-4 rounded-2xl flex flex-col sm:flex-row gap-3 items-center">
              <span className="text-sm font-bold text-stone-700 shrink-0 uppercase tracking-wider font-mono">Masterpiece Name:</span>
              <input
                type="text"
                value={burgerName}
                onChange={(e) => setBurgerName(e.target.value)}
                placeholder="Name your custom creation..."
                className="w-full bg-white border border-stone-200 px-4 py-2.5 rounded-xl font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-sm"
              />
            </div>

            {/* Categorized Ingredient Selector Accordion */}
            <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar">
              
              {/* Category: Buns Selection */}
              <div className="border border-stone-100 rounded-2xl p-4 bg-stone-50/50">
                <h4 className="text-xs font-bold text-stone-500 uppercase tracking-widest font-mono mb-3">1. Select Bun Type</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {buns.map((bun) => (
                    <button
                      key={bun.id}
                      onClick={() => setSelectedBun(bun)}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center gap-1.5 transition-all duration-200 cursor-pointer ${
                        selectedBun.id === bun.id
                          ? 'bg-stone-900 border-stone-900 text-white shadow-sm ring-2 ring-amber-400'
                          : 'bg-white border-stone-200 text-stone-800 hover:bg-stone-100/50'
                      }`}
                    >
                      <span className="text-xl">{bun.emoji}</span>
                      <div className="flex flex-col">
                        <span className="text-[11px] font-bold leading-tight truncate max-w-[80px]">{bun.name.split(' ')[0]}</span>
                        <span className="text-[9px] opacity-80">${bun.price.toFixed(2)}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Category: Patties & Cheeses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Patties */}
                <div className="border border-stone-100 rounded-2xl p-4 bg-stone-50/50">
                  <h4 className="text-xs font-bold text-stone-500 uppercase tracking-widest font-mono mb-3">2. Add Patties</h4>
                  <div className="space-y-1.5">
                    {patties.map((pat) => (
                      <button
                        key={pat.id}
                        onClick={() => handleAddLayer(pat)}
                        className="w-full flex items-center justify-between p-2.5 bg-white hover:bg-stone-50 border border-stone-200 rounded-xl transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg p-1 bg-stone-100 rounded-lg">{pat.emoji}</span>
                          <span className="text-xs font-bold text-stone-800 text-left truncate max-w-[120px]">{pat.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold text-amber-600">${pat.price.toFixed(2)}</span>
                          <span className="p-1 bg-stone-900 text-white rounded-md group-hover:bg-amber-500 transition-colors">
                            <Plus className="w-3 h-3" />
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cheeses */}
                <div className="border border-stone-100 rounded-2xl p-4 bg-stone-50/50">
                  <h4 className="text-xs font-bold text-stone-500 uppercase tracking-widest font-mono mb-3">3. Melted Cheeses</h4>
                  <div className="space-y-1.5">
                    {cheeses.map((che) => (
                      <button
                        key={che.id}
                        onClick={() => handleAddLayer(che)}
                        className="w-full flex items-center justify-between p-2.5 bg-white hover:bg-stone-50 border border-stone-200 rounded-xl transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg p-1 bg-stone-100 rounded-lg">{che.emoji}</span>
                          <span className="text-xs font-bold text-stone-800 text-left truncate max-w-[120px]">{che.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold text-amber-600">${che.price.toFixed(2)}</span>
                          <span className="p-1 bg-stone-900 text-white rounded-md group-hover:bg-amber-500 transition-colors">
                            <Plus className="w-3 h-3" />
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Category: Premium Toppings */}
              <div className="border border-stone-100 rounded-2xl p-4 bg-stone-50/50">
                <h4 className="text-xs font-bold text-stone-500 uppercase tracking-widest font-mono mb-3">4. Choose Premium Toppings</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {toppings.map((top) => (
                    <button
                      key={top.id}
                      onClick={() => handleAddLayer(top)}
                      className="flex items-center justify-between p-2 bg-white hover:bg-stone-50 border border-stone-200 rounded-xl transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="text-base">{top.emoji}</span>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[10px] font-bold text-stone-800 truncate">{top.name}</span>
                          <span className="text-[9px] text-stone-500 font-mono">${top.price.toFixed(2)}</span>
                        </div>
                      </div>
                      <span className="p-0.5 bg-stone-950 text-white rounded group-hover:bg-amber-500 transition-all shrink-0">
                        <Plus className="w-2.5 h-2.5" />
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Category: House Sauces */}
              <div className="border border-stone-100 rounded-2xl p-4 bg-stone-50/50">
                <h4 className="text-xs font-bold text-stone-500 uppercase tracking-widest font-mono mb-3">5. Drizzle House Sauces</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {sauces.map((sau) => (
                    <button
                      key={sau.id}
                      onClick={() => handleAddLayer(sau)}
                      className="flex flex-col items-center p-2.5 bg-white hover:bg-stone-50 border border-stone-200 rounded-xl transition-all cursor-pointer group"
                    >
                      <span className="text-lg mb-1">{sau.emoji}</span>
                      <span className="text-[10px] font-bold text-stone-800 text-center truncate w-full">{sau.name.replace(' Sauces', '').replace('Sauce', '')}</span>
                      <span className="text-[8px] text-stone-500 font-mono">${sau.price.toFixed(2)}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Core Action Trigger bar */}
            <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToBag}
                disabled={layers.length === 0}
                className="flex-grow py-4 px-6 bg-stone-900 hover:bg-amber-500 disabled:bg-stone-300 text-white font-bold rounded-xl flex items-center justify-center gap-2.5 transition-all duration-300 disabled:cursor-not-allowed cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5" />
                Add Custom Burger to Bag (${totalPrice.toFixed(2)})
              </button>
            </div>

            {/* Notification trigger */}
            <AnimatePresence>
              {successMsg && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="p-3 bg-emerald-500 text-white rounded-xl text-center font-bold text-xs shadow-md border border-emerald-600 flex items-center justify-center gap-2"
                >
                  🍔 "{burgerName}" added successfully to your shopping bag!
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
