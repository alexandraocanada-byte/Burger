/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { OrderDetails, OrderStatus } from '../types';
import { Clock, Flame, ShieldAlert, Check, ChevronRight, Truck, MapPin, Smile } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface OrderTrackerProps {
  order: OrderDetails;
  onClose: () => void;
  onUpdateStatus: (status: OrderStatus) => void;
}

export default function OrderTracker({ order, onClose, onUpdateStatus }: OrderTrackerProps) {
  const [secondsRemaining, setSecondsRemaining] = useState(15 * 60); // 15 mins countdown simulation

  const steps: { id: OrderStatus; label: string; desc: string; emoji: string }[] = [
    { id: 'received', label: 'Order Confirmed', desc: 'Sizzle queue allocated', emoji: '✅' },
    { id: 'grilling', label: 'On the Cast Iron', desc: 'Smash patties searing', emoji: '🔥' },
    { id: 'wrapping', label: 'Quality Checked', desc: 'Craft-wrapped & bagged', emoji: '🎁' },
    { id: 'en_route', label: 'En Route', desc: 'Driver en route', emoji: '🛵' },
    { id: 'delivered', label: 'Arrived! Enjoy', desc: 'Delivered to your door', emoji: '😋' },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === order.status);

  // Countdown timer simulation for Delivery En Route stage
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (order.status !== 'delivered') {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [order.status]);

  // Automated progression simulation to let the app feel alive!
  useEffect(() => {
    let progressTimer: NodeJS.Timeout;
    
    if (order.status === 'received') {
      progressTimer = setTimeout(() => onUpdateStatus('grilling'), 8000);
    } else if (order.status === 'grilling') {
      progressTimer = setTimeout(() => onUpdateStatus('wrapping'), 15000);
    } else if (order.status === 'wrapping') {
      progressTimer = setTimeout(() => onUpdateStatus('en_route'), 15000);
    } else if (order.status === 'en_route') {
      // let driver run for a bit, or let user skip
    }

    return () => clearTimeout(progressTimer);
  }, [order.status, onUpdateStatus]);

  const handleNextStatus = () => {
    const nextStatuses: Record<OrderStatus, OrderStatus> = {
      received: 'grilling',
      grilling: 'wrapping',
      wrapping: 'en_route',
      en_route: 'delivered',
      delivered: 'received',
    };
    onUpdateStatus(nextStatuses[order.status]);
  };

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="max-w-4xl mx-auto bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-md">
      
      {/* Header Info Block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-150 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100 font-mono">LIVE TRACKING</span>
            <span className="text-xs text-stone-400 font-bold font-mono">ID: {order.id}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-sans tracking-tight mt-1">
            Track Your Juicy Sears
          </h2>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          {/* Skip buttons for ease of review */}
          <button
            onClick={handleNextStatus}
            className="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-900 rounded-xl font-bold text-[11px] font-mono tracking-wider uppercase transition-colors cursor-pointer flex items-center gap-1"
            title="Saves waiting for progression"
          >
            Fast Forward Status ➔
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-bold text-xs cursor-pointer"
          >
            Back to Home
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Status Steps Timeline (Column 7/12) */}
        <div className="md:col-span-7 space-y-6">
          <div className="relative pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-stone-100">
            {steps.map((step, idx) => {
              const isCompleted = idx < currentStepIndex;
              const isActive = idx === currentStepIndex;
              
              return (
                <div key={step.id} className="relative flex gap-4 text-left">
                  {/* Circle indicator overlay */}
                  <span
                    className={`absolute -left-8 top-1.5 flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-black z-10 border transition-all ${
                      isCompleted
                        ? 'bg-emerald-500 border-emerald-600 text-white'
                        : isActive
                        ? 'bg-amber-500 border-amber-600 text-white ring-4 ring-amber-100 animate-pulse'
                        : 'bg-white border-stone-200 text-stone-400'
                    }`}
                  >
                    {isCompleted ? <Check className="w-3 h-3" /> : idx + 1}
                  </span>

                  <div className="min-w-0">
                    <h3
                      className={`font-extrabold text-sm sm:text-base font-sans tracking-tight ${
                        isActive ? 'text-amber-500' : isCompleted ? 'text-stone-700' : 'text-stone-400'
                      }`}
                    >
                      {step.label} <span className="ml-1 text-sm">{step.emoji}</span>
                    </h3>
                    <p className={`text-xs ${isActive ? 'text-stone-600 font-medium' : 'text-stone-400 font-sans'}`}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Live Map / Transit Estimation Widget (Column 5/12) */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-stone-50 border border-stone-150 p-6 rounded-2xl flex flex-col items-center text-center space-y-4">
            
            <AnimatePresence mode="wait">
              {order.status !== 'delivered' ? (
                /* Still grilling or in route */
                <motion.div
                  key="transit"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="space-y-4 w-full"
                >
                  <div className="p-4 bg-amber-500/10 text-amber-600 rounded-full w-14 h-14 mx-auto flex items-center justify-center">
                    {order.status === 'en_route' ? (
                      <Truck className="w-7 h-7 animate-bounce" />
                    ) : (
                      <Flame className="w-7 h-7 animate-pulse text-amber-500 fill-current" />
                    )}
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest font-mono">ESTIMATED TRANSIT TIME</span>
                    <p className="text-3xl font-black text-stone-900 font-mono tracking-tight mt-0.5">
                      {formatTime(secondsRemaining)}
                    </p>
                    <p className="text-xs text-stone-500 mt-1 font-sans">
                      {order.status === 'received' && 'Grill queue opening shortly...'}
                      {order.status === 'grilling' && 'Browning buns & searing patties...'}
                      {order.status === 'wrapping' && 'Wrapping inside thermal bag...'}
                      {order.status === 'en_route' && 'Driver is navigating New York traffic!'}
                    </p>
                  </div>
                </motion.div>
              ) : (
                /* Delivered */
                <motion.div
                  key="delivered"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="space-y-4"
                >
                  <div className="p-4 bg-emerald-500/10 text-emerald-600 rounded-full w-14 h-14 mx-auto flex items-center justify-center">
                    <Smile className="w-7 h-7" />
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest font-mono">ORDER ARRIVED</span>
                    <p className="text-2xl font-black text-stone-900 font-sans tracking-tight mt-0.5">
                      Sizzles Served!
                    </p>
                    <p className="text-xs text-stone-500 mt-1.5 leading-relaxed font-sans max-w-xs">
                      Courier has dropped off your custom bag at the recipient's doorstep. Bon appétit!
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Map Pin Mock Panel */}
            <div className="w-full border-t border-stone-150 pt-4 text-left space-y-2.5 text-xs">
              <div className="flex items-start gap-2 text-stone-600">
                <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-800">Delivering To:</span>
                  <p className="text-stone-500 text-[11px] truncate max-w-[200px]">{order.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-stone-600">
                <Clock className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-800">Placed At:</span>
                  <p className="text-stone-500 text-[11px] font-mono">{order.timestamp}</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
