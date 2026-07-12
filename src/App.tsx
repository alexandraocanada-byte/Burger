/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import BurgerBuilder from './components/BurgerBuilder';
import StoreLocator from './components/StoreLocator';
import ReviewsSection from './components/ReviewsSection';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderTracker from './components/OrderTracker';
import { MenuItem, CustomBurger, CartItem, OrderDetails, OrderStatus } from './types';
import { ShoppingBag, ChevronRight, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Navigation & Scroll Tracking
  const [activeSection, setActiveSection] = useState('hero');

  // Interactive Cart States
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [presetIdToLoad, setPresetIdToLoad] = useState<string | null>(null);

  // Checkout & Tracker States
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState<OrderDetails | null>(null);
  const [showFloatingTrackerButton, setShowFloatingTrackerButton] = useState(false);

  // Load cart from local storage if available
  useEffect(() => {
    const savedCart = localStorage.getItem('burger_bistro_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (err) {}
    }
  }, []);

  // Update localStorage when cart changes
  const updateCartState = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('burger_bistro_cart', JSON.stringify(newCart));
  };

  // Scroll spy effect to highlight navbar tabs based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['menu', 'builder', 'locations', 'reviews'];
      const scrollPosition = window.scrollY + 250;

      if (window.scrollY < 100) {
        setActiveSection('hero');
        return;
      }

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Add standard menu item to bag
  const handleAddToCart = (item: MenuItem, quantity = 1) => {
    const existing = cart.find((cartItem) => cartItem.id === item.id);
    if (existing) {
      const updated = cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + quantity }
          : cartItem
      );
      updateCartState(updated);
    } else {
      const newCartItem: CartItem = {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity,
        image: item.image,
      };
      updateCartState([...cart, newCartItem]);
    }
  };

  // Add custom styled burger from Workshop to bag
  const handleAddCustomBurger = (custom: CustomBurger) => {
    const uniqueId = `custom-${Date.now()}`;
    const newCartItem: CartItem = {
      id: uniqueId,
      name: custom.name,
      price: custom.price,
      quantity: 1,
      isCustom: true,
      customIngredients: custom.ingredients,
    };
    updateCartState([...cart, newCartItem]);
  };

  // Modify quantities inside the slide drawer
  const handleUpdateQuantity = (id: string, delta: number) => {
    const updated = cart
      .map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: newQty };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);
    updateCartState(updated);
  };

  // Remove individual item from cart
  const handleRemoveItem = (id: string) => {
    const updated = cart.filter((item) => item.id !== id);
    updateCartState(updated);
  };

  // Update kitchen request notes for items
  const handleUpdateNotes = (id: string, notes: string) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, notes } : item
    );
    updateCartState(updated);
  };

  // Preset customization loader shortcut
  const handleCustomizePreset = (presetId: string) => {
    setPresetIdToLoad(presetId);
    setActiveSection('builder');
  };

  // Order placements
  const handleOrderSubmit = (orderDetails: OrderDetails) => {
    setActiveOrder(orderDetails);
    updateCartState([]); // clear shopping bag
    setIsCartOpen(false);
    setShowFloatingTrackerButton(true);

    // Scroll automatically to active order panel
    setTimeout(() => {
      const trackerSection = document.getElementById('active-tracker-view');
      if (trackerSection) {
        trackerSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  // Update status en route
  const handleUpdateStatus = (status: OrderStatus) => {
    if (activeOrder) {
      setActiveOrder({
        ...activeOrder,
        status,
      });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans flex flex-col antialiased">
      
      {/* Navigation Bar */}
      <Navbar
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        onCartToggle={() => setIsCartOpen(true)}
        activeSection={activeSection}
        onNavigate={setActiveSection}
      />

      {/* Primary Layout Stages */}
      <main className="flex-grow">
        
        {/* Active Order Tracking Dashboard Section (Reveals upon successful submission) */}
        {activeOrder && (
          <div id="active-tracker-view" className="bg-stone-900 py-12 px-4 sm:px-6 lg:px-8 text-white relative border-b border-stone-850">
            {/* Accent background mesh */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-stone-950/20 to-transparent pointer-events-none" />
            
            <div className="max-w-7xl mx-auto space-y-6 relative z-10">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-2.5 w-2.5 bg-amber-500 rounded-full animate-ping shrink-0" />
                  <span className="font-mono text-xs text-amber-500 uppercase tracking-widest font-black">Active order tracker dashboard</span>
                </div>
                {activeOrder.status === 'delivered' && (
                  <button
                    onClick={() => {
                      setActiveOrder(null);
                      setShowFloatingTrackerButton(false);
                    }}
                    className="text-xs text-stone-400 hover:text-white underline cursor-pointer"
                  >
                    Dismiss Order Log
                  </button>
                )}
              </div>

              {/* Order Tracker block */}
              <OrderTracker
                order={activeOrder}
                onClose={() => {
                  const heroEl = document.getElementById('hero');
                  if (heroEl) heroEl.scrollIntoView({ behavior: 'smooth' });
                }}
                onUpdateStatus={handleUpdateStatus}
              />
            </div>
          </div>
        )}

        {/* Hero Banner Section */}
        <Hero onNavigate={setActiveSection} />

        {/* Menu Showcase Section */}
        <MenuSection
          onAddToCart={handleAddToCart}
          onCustomizePreset={handleCustomizePreset}
        />

        {/* Interactive Custom Burger Builder Workshop */}
        <BurgerBuilder
          onAddCustomBurger={handleAddCustomBurger}
          presetBurgerId={presetIdToLoad}
          onClearPresetId={() => setPresetIdToLoad(null)}
        />

        {/* Store Locations Hub */}
        <StoreLocator />

        {/* Reviews and feedback submissions */}
        <ReviewsSection />

      </main>

      {/* Footer Block */}
      <footer className="bg-stone-950 text-stone-400 py-12 border-t border-stone-900 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center sm:text-left">
          
          {/* Logo & Slogan */}
          <div className="space-y-4">
            <span className="text-lg font-extrabold text-white tracking-tight">
              BURGER<span className="text-amber-500 font-mono">BISTRO</span>
            </span>
            <p className="text-xs leading-relaxed text-stone-500 max-w-xs mx-auto sm:mx-0">
              Freshly seared smash patties, local melted cheeses, daily-baked brioche, and premium house ingredients compiled to perfection. Since 2018.
            </p>
          </div>

          {/* Quick Shortcuts */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase font-mono tracking-widest">Section Links</h4>
            <div className="flex flex-col gap-1.5 text-xs">
              <a href="#menu" className="hover:text-amber-500 transition-colors">Our Gourmet Menu</a>
              <a href="#builder" className="hover:text-amber-500 transition-colors">Custom Burger Builder</a>
              <a href="#locations" className="hover:text-amber-500 transition-colors">Find a Location</a>
              <a href="#reviews" className="hover:text-amber-500 transition-colors">Read Customer Reviews</a>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase font-mono tracking-widest">Inquiries</h4>
            <p className="text-xs text-stone-500">
              Email: support@burgerbistro.com <br />
              Ph: (212) 555-0199 <br />
              New York, NY 10001
            </p>
          </div>

        </div>

        {/* Credit details */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-stone-900 mt-10 pt-6 text-center text-xs text-stone-600 font-mono">
          © {new Date().getFullYear()} Burger Bistro Corp. All rights reserved. Made fresh daily.
        </div>
      </footer>

      {/* Slide-out Shopping Bag Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onUpdateNotes={handleUpdateNotes}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Multi-Step Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        onOrderSubmit={handleOrderSubmit}
      />

      {/* Floating active order tracking indicator button (reveals if they scroll away from tracking dashboard) */}
      {showFloatingTrackerButton && activeOrder && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={() => {
            const el = document.getElementById('active-tracker-view');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }}
          className="fixed bottom-6 right-6 z-30 bg-amber-500 hover:bg-stone-900 text-white font-bold text-xs p-4 rounded-full flex items-center gap-2 shadow-xl border border-amber-600 transition-all cursor-pointer group"
          title="See live status of your order"
        >
          <div className="h-2 w-2 bg-white rounded-full animate-ping shrink-0" />
          <span>Active Tracking: {activeOrder.status.replace('_', ' ')}</span>
        </motion.button>
      )}

    </div>
  );
}
