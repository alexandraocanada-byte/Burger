/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShoppingBag, Flame, MapPin, Star, Hammer, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  cartCount: number;
  onCartToggle: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
}

export default function Navbar({ cartCount, onCartToggle, activeSection, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { id: 'menu', label: 'Our Menu', icon: Flame },
    { id: 'builder', label: 'Burger Workshop', icon: Hammer },
    { id: 'locations', label: 'Locations', icon: MapPin },
    { id: 'reviews', label: 'Reviews', icon: Star },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header id="nav_header" className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-stone-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div 
            onClick={() => handleNavClick('hero')} 
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="p-2 bg-stone-900 rounded-lg text-white group-hover:bg-amber-500 transition-colors duration-300">
              <Flame className="w-5 h-5 fill-current" />
            </div>
            <span className="text-xl font-bold tracking-tight text-stone-900 font-sans">
              BURGER<span className="text-amber-500 font-mono">BISTRO</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive 
                      ? 'bg-stone-900 text-white shadow-sm' 
                      : 'text-stone-600 hover:text-stone-950 hover:bg-stone-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-stone-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Actions (Cart & Mobile Menu Button) */}
          <div className="flex items-center gap-4">
            <button
              onClick={onCartToggle}
              className="relative p-2.5 rounded-xl border border-stone-100 hover:border-stone-200 hover:bg-stone-50 text-stone-700 hover:text-stone-950 transition-all duration-200 cursor-pointer"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5.5 h-5.5" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white shadow-md ring-2 ring-white"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-xl text-stone-600 hover:text-stone-950 hover:bg-stone-50 border border-transparent hover:border-stone-100 transition-all cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-stone-100 bg-white"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left text-base font-medium transition-all ${
                      isActive 
                        ? 'bg-stone-900 text-white' 
                        : 'text-stone-600 hover:text-stone-950 hover:bg-stone-50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-amber-400' : 'text-stone-400'}`} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
