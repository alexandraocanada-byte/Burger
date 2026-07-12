/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CartItem, OrderDetails } from '../types';
import { X, MapPin, CreditCard, ShoppingBag, ShieldCheck, CheckCircle2, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderSubmit: (orderDetails: OrderDetails) => void;
}

export default function CheckoutModal({ isOpen, onClose, cartItems, onOrderSubmit }: CheckoutModalProps) {
  const [step, setStep] = useState<1 | 2>(1);

  // Form Fields State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [apt, setApt] = useState('');
  const [zip, setZip] = useState('');

  // Payment State
  const [cardNo, setCardNo] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [processing, setProcessing] = useState(false);

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.08875;
  const deliveryFee = subtotal > 30 ? 0 : 2.99;
  const total = subtotal + tax + deliveryFee;

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim() || !zip.trim()) return;
    setStep(2);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNo.trim() || !cardExpiry.trim() || !cardCvv.trim()) return;

    setProcessing(true);

    // Simulate standard transaction processing delay
    setTimeout(() => {
      const order: OrderDetails = {
        id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
        items: cartItems,
        customerName: name,
        address: `${address}${apt ? `, Apt ${apt}` : ''}, New York, NY ${zip}`,
        phone,
        total,
        status: 'received',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      };

      onOrderSubmit(order);
      setProcessing(false);
      onClose(); // close the checkout screen to reveal order tracker
    }, 1800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-900"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-stone-200 flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Left: Summary Panel (Desktop Only) */}
            <div className="hidden md:flex md:w-5/12 bg-stone-50 border-r border-stone-100 p-6 flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 mb-6">
                  <ShoppingBag className="w-5 h-5 text-amber-500" />
                  <h3 className="font-extrabold text-sm text-stone-900 uppercase font-mono tracking-wider">Your Order</h3>
                </div>

                <div className="space-y-4 overflow-y-auto max-h-[250px] pr-1.5 custom-scrollbar">
                  {cartItems.map((item) => (
                    <div key={item.id} className="text-xs">
                      <div className="flex justify-between font-bold text-stone-800">
                        <span className="truncate max-w-[120px]">{item.name}</span>
                        <span>x{item.quantity}</span>
                      </div>
                      <p className="text-stone-500 font-mono mt-0.5">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total calculations block */}
              <div className="pt-6 border-t border-stone-150 space-y-2 text-xs">
                <div className="flex justify-between text-stone-500">
                  <span>Subtotal</span>
                  <span className="font-bold text-stone-800">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Sales Tax (8.875%)</span>
                  <span className="font-bold text-stone-800">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Express Delivery</span>
                  <span className="font-bold text-stone-800">
                    {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between border-t border-stone-200 pt-3 text-sm font-extrabold text-stone-950">
                  <span>Final Total</span>
                  <span className="text-base text-amber-600 font-mono font-black">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Right: Checkout Interactive Inputs Form */}
            <div className="flex-grow p-6 sm:p-8 flex flex-col max-h-[90vh] overflow-y-auto custom-scrollbar">
              
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-100">
                <div>
                  <h2 className="text-lg font-black text-stone-900 font-sans tracking-tight">Secure Checkout</h2>
                  <p className="text-[11px] text-stone-400 font-bold uppercase tracking-widest font-mono mt-0.5">
                    Step {step} of 2 • {step === 1 ? 'Delivery Info' : 'Card Payment'}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition-all cursor-pointer"
                >
                  <X className="w-5.5 h-5.5" />
                </button>
              </div>

              {step === 1 ? (
                /* STEP 1: DELIVERY FORM */
                <form onSubmit={handleNextStep} className="space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Customer Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-stone-600 uppercase font-mono tracking-wider">Recipient Full Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Eleanor Vance"
                        className="bg-stone-50 border border-stone-200 px-4 py-2.5 rounded-xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all font-medium"
                      />
                    </div>

                    {/* Customer Phone */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-stone-600 uppercase font-mono tracking-wider">Mobile Phone Contact</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. (555) 019-9011"
                        className="bg-stone-50 border border-stone-200 px-4 py-2.5 rounded-xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all font-medium"
                      />
                    </div>

                    {/* Address Fields */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-stone-600 uppercase font-mono tracking-wider">Street Address (NY Zone Only)</label>
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="e.g. 742 Grillmaster Avenue"
                        className="bg-stone-50 border border-stone-200 px-4 py-2.5 rounded-xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all font-medium"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-stone-600 uppercase font-mono tracking-wider">Apt / Suite</label>
                        <input
                          type="text"
                          value={apt}
                          onChange={(e) => setApt(e.target.value)}
                          placeholder="Apt 4B"
                          className="bg-stone-50 border border-stone-200 px-4 py-2.5 rounded-xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all font-medium"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-stone-600 uppercase font-mono tracking-wider">ZIP Code</label>
                        <input
                          type="text"
                          required
                          value={zip}
                          onChange={(e) => setZip(e.target.value)}
                          placeholder="e.g. 10001"
                          maxLength={5}
                          className="bg-stone-50 border border-stone-200 px-4 py-2.5 rounded-xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-6 border-t border-stone-100 flex justify-end gap-3 mt-6">
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-stone-900 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      Continue to Payment ➔
                    </button>
                  </div>
                </form>
              ) : (
                /* STEP 2: PAYMENT FORM */
                <form onSubmit={handleOrderSubmit} className="space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Simulated Card Info */}
                    <div className="bg-stone-50 border border-stone-150 p-4 rounded-xl text-xs text-stone-500 flex items-start gap-2 mb-2">
                      <ShieldCheck className="w-5.5 h-5.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>This is a simulated sandbox. No actual currency is processed. Simply type any fake details below to submit your order and track the driver!</span>
                    </div>

                    {/* Card Number */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-stone-600 uppercase font-mono tracking-wider">Credit Card Number</label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={cardNo}
                          onChange={(e) => setCardNo(e.target.value)}
                          placeholder="4111 •••• •••• ••••"
                          maxLength={19}
                          className="w-full bg-stone-50 border border-stone-200 pl-11 pr-4 py-2.5 rounded-xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all font-medium"
                        />
                        <CreditCard className="w-5 h-5 text-stone-400 absolute left-4 top-3" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {/* Expiry */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-stone-600 uppercase font-mono tracking-wider">Expiration Date</label>
                        <input
                          type="text"
                          required
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="bg-stone-50 border border-stone-200 px-4 py-2.5 rounded-xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all font-medium"
                        />
                      </div>

                      {/* CVV */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-stone-600 uppercase font-mono tracking-wider">CVV Code</label>
                        <input
                          type="password"
                          required
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="•••"
                          maxLength={3}
                          className="bg-stone-50 border border-stone-200 px-4 py-2.5 rounded-xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-6 border-t border-stone-100 flex items-center justify-between gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-3 bg-stone-50 hover:bg-stone-100 text-stone-700 hover:text-stone-950 border border-stone-200 rounded-xl font-bold text-xs cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={processing}
                      className="flex-grow py-3 px-6 bg-stone-900 hover:bg-emerald-500 disabled:bg-stone-300 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-all duration-300 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {processing ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Securing bank sears...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                          Place Secure Order (${total.toFixed(2)})
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
