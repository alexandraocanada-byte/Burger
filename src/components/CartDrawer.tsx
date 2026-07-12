/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, FileText, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onUpdateNotes: (id: string, notes: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onUpdateNotes,
  onCheckout,
}: CartDrawerProps) {
  const [activeNoteInputId, setActiveNoteInputId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.08875; // NYC standard 8.875% sales tax
  const deliveryFee = subtotal > 0 ? (subtotal > 30 ? 0 : 2.99) : 0;
  const total = subtotal + tax + deliveryFee;

  const handleToggleNoteInput = (itemId: string, currentNotes: string) => {
    if (activeNoteInputId === itemId) {
      setActiveNoteInputId(null);
    } else {
      setActiveNoteInputId(itemId);
      setNoteText(currentNotes);
    }
  };

  const handleSaveNote = (itemId: string) => {
    onUpdateNotes(itemId, noteText);
    setActiveNoteInputId(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-stone-900 cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: 'easeInOut' }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white border-l border-stone-200 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-stone-50">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5.5 h-5.5 text-stone-800" />
                <h2 className="text-lg font-extrabold text-stone-900 font-sans tracking-tight">Your Custom Bag</h2>
                <span className="px-2.5 py-0.5 bg-stone-900 text-white text-[10px] font-bold font-mono uppercase rounded-full">
                  {cartItems.reduce((acc, i) => acc + i.quantity, 0)} Items
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-stone-200 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
              >
                <X className="w-5.5 h-5.5" />
              </button>
            </div>

            {/* Cart Items Area */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="p-4 bg-stone-50 rounded-full text-stone-400">
                    <ShoppingBag className="w-12 h-12" />
                  </div>
                  <h3 className="font-bold text-stone-800 text-sm sm:text-base">Your Bag is Empty</h3>
                  <p className="text-xs text-stone-400 max-w-xs mx-auto">
                    Browse our gourmet burgers, or customize your own stacked burger in the Burger Workshop to start ordering!
                  </p>
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 bg-stone-900 hover:bg-amber-500 text-white font-bold text-xs rounded-xl transition-all duration-200 cursor-pointer"
                  >
                    Start Browsing
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-3 pb-6 border-b border-stone-100 last:border-none last:pb-0"
                  >
                    {/* Item row */}
                    <div className="flex gap-4 items-start">
                      {/* Product Thumbnail */}
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone-50 shrink-0 border border-stone-150">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover object-center"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-full h-full bg-amber-500/10 text-amber-600 font-black text-xl flex items-center justify-center font-mono">
                            🍔
                          </div>
                        )}
                      </div>

                      {/* Detail Column */}
                      <div className="flex-grow min-w-0">
                        <div className="flex justify-between items-start gap-1">
                          <h4 className="font-extrabold text-xs sm:text-sm text-stone-900 font-sans tracking-tight truncate">
                            {item.name}
                          </h4>
                          <span className="text-xs sm:text-sm font-bold text-stone-800 shrink-0">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>

                        {/* If customized, print out ingredients chips */}
                        {item.isCustom && item.customIngredients && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {item.customIngredients
                              .filter((ing) => ing.category !== 'bun-bottom')
                              .map((ing, i) => (
                                <span
                                  key={`${ing.id}-${i}`}
                                  className="text-[9px] bg-stone-50 text-stone-500 border border-stone-200 px-1.5 py-0.5 rounded-md font-mono"
                                >
                                  {ing.emoji} {ing.name.split(' ')[0]}
                                </span>
                              ))}
                          </div>
                        )}

                        {/* Special preparation note preview */}
                        {item.notes && (
                          <p className="text-[10px] text-amber-600 bg-amber-50/70 border border-amber-100 px-2 py-1 rounded-md mt-1.5 italic font-sans flex items-start gap-1">
                            <FileText className="w-3 h-3 shrink-0 mt-0.5" />
                            <span>Note: "{item.notes}"</span>
                          </p>
                        )}

                        {/* Action controllers */}
                        <div className="flex items-center justify-between mt-3 gap-2">
                          {/* Note & Delete toggle buttons */}
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleToggleNoteInput(item.id, item.notes || '')}
                              className="text-[10px] font-bold text-stone-500 hover:text-stone-900 flex items-center gap-1 px-2 py-1 bg-stone-50 border border-stone-200/80 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                            >
                              <FileText className="w-3.2 h-3.2" />
                              {item.notes ? 'Edit Note' : 'Add Note'}
                            </button>
                            <button
                              onClick={() => onRemoveItem(item.id)}
                              className="p-1 text-stone-400 hover:text-red-500 rounded-lg hover:bg-stone-50 transition-all cursor-pointer"
                              title="Delete Item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Quantity selector */}
                          <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-stone-50">
                            <button
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="p-1 hover:bg-stone-200/80 text-stone-600 transition-colors cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-2.5 font-bold text-xs text-stone-800 font-mono select-none">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="p-1 hover:bg-stone-200/80 text-stone-600 transition-colors cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Expandable inline notes textarea */}
                        <AnimatePresence>
                          {activeNoteInputId === item.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-3 overflow-hidden space-y-1.5"
                            >
                              <textarea
                                value={noteText}
                                onChange={(e) => setNoteText(e.target.value)}
                                placeholder="e.g. Well-done, extra sauce, allergy info..."
                                className="w-full bg-stone-50 border border-stone-200 text-xs px-3 py-2 rounded-xl text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all resize-none font-medium"
                                rows={2}
                              />
                              <div className="flex justify-end gap-1.5">
                                <button
                                  onClick={() => handleToggleNoteInput(item.id, '')}
                                  className="px-2.5 py-1 text-[10px] font-bold text-stone-500 hover:text-stone-900 cursor-pointer"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => handleSaveNote(item.id)}
                                  className="px-2.5 py-1 text-[10px] font-bold bg-stone-900 text-white rounded-lg hover:bg-amber-500 cursor-pointer"
                                >
                                  Save Note
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout buttons */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-stone-100 bg-stone-50/50 space-y-4 shrink-0">
                <div className="space-y-1.5 text-xs sm:text-sm text-stone-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-stone-900 font-mono">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Sales Tax</span>
                    <span className="font-bold text-stone-900 font-mono">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Express Delivery Fee</span>
                    <span className="font-bold text-stone-900 font-mono">
                      {deliveryFee === 0 ? <span className="text-emerald-600 uppercase font-bold text-[10px] tracking-wide">FREE</span> : `$${deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                  {deliveryFee > 0 && (
                    <p className="text-[10px] text-stone-400 font-sans italic">
                      Add ${(30 - subtotal).toFixed(2)} more to qualify for Free Shipping!
                    </p>
                  )}
                  <div className="flex justify-between border-t border-stone-150 pt-2 text-base font-extrabold text-stone-950">
                    <span>Total Cost</span>
                    <span className="text-lg text-amber-600 font-mono font-black">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={onCheckout}
                  className="w-full py-4 bg-stone-900 hover:bg-amber-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-stone-900/10 hover:shadow-amber-500/10 transition-all duration-300 cursor-pointer text-sm"
                >
                  Proceed to Secure Checkout
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
