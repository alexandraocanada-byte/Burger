/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MenuItem, Ingredient, StoreLocation, Review } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'b1',
    name: 'The Ultimate Double Smash',
    description: 'Two signature smash beef patties, double melted cheddar, crisp lettuce, fresh tomato, red onion, and our secret burger sauce on a toasted brioche bun.',
    price: 13.99,
    category: 'burgers',
    image: '/src/assets/images/gourmet_hero_burger_1783846788592.jpg',
    tags: ['Best Seller', 'Double Meat'],
    customizable: true,
  },
  {
    id: 'b2',
    name: 'Buttermilk Crispy Chicken',
    description: 'Crispy golden buttermilk fried chicken breast, creamy Southern coleslaw, tangy pickles, and sweet & spicy house sauce on a toasted sesame bun.',
    price: 11.99,
    category: 'burgers',
    image: '/src/assets/images/crispy_chicken_burger_1783846807856.jpg',
    tags: ['Crispy', 'Spicy Opt.'],
    customizable: true,
  },
  {
    id: 'b3',
    name: 'Truffle Mushroom Swiss',
    description: 'Flame-grilled Angus beef patty, sautéed wild forest mushrooms, melted Swiss cheese, and luxurious white truffle garlic aioli on a soft brioche bun.',
    price: 14.50,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    tags: ['Gourmet', 'Truffle'],
    customizable: true,
  },
  {
    id: 'b4',
    name: 'Avocado Garden Patty',
    description: 'House-made organic plant patty, sliced fresh avocado, alfalfa sprouts, vine-ripened tomatoes, and herb vegan mayo in a crisp lettuce wrap.',
    price: 12.50,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80',
    tags: ['Vegan', 'Healthy'],
    customizable: true,
  },
  {
    id: 's1',
    name: 'Parmesan Truffle Fries',
    description: 'Thick-cut golden crispy fries tossed in white truffle oil, grated aged parmesan, and fresh herbs, served with garlic aioli.',
    price: 6.99,
    category: 'sides',
    image: '/src/assets/images/parmesan_truffle_fries_1783846820872.jpg',
    tags: ['Must Try', 'Shareable'],
  },
  {
    id: 's2',
    name: 'Crispy Onion Rings',
    description: 'Hand-battered, jumbo sweet onion rings fried to golden perfection, served with smoky campfire BBQ dipping sauce.',
    price: 5.50,
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1639024471283-2bc7b3c6a267?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 's3',
    name: 'Sweet Potato Wedges',
    description: 'Lightly seasoned crispy sweet potato wedges with a hint of cinnamon, served with maple honey mustard.',
    price: 5.99,
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'd1',
    name: 'Craft Cola',
    description: 'Artisanal organic cola brewed with cane sugar, real kola nut extracts, and a secret blend of citrus spices.',
    price: 2.99,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
    tags: ['Organic'],
  },
  {
    id: 'd2',
    name: 'Fresh Hibiscus Lemonade',
    description: 'Freshly squeezed tart lemons sweetened with organic agave, infused with cold-brewed crimson hibiscus tea.',
    price: 3.50,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    tags: ['Refreshing'],
  },
  {
    id: 'sk1',
    name: 'Decadent Fudge Shake',
    description: 'Creamy double-churned chocolate ice cream blended with dark chocolate fudge, topped with fresh whipped cream and chocolate curls.',
    price: 6.50,
    category: 'shakes',
    image: '/src/assets/images/gourmet_milkshake_1783846833086.jpg',
    tags: ['Customer Favorite', 'Decadent'],
  },
  {
    id: 'sk2',
    name: 'Salted Caramel Pretzel',
    description: 'Premium vanilla bean custard blended with rich sea-salt caramel syrup and crushed salty pretzels for the ultimate sweet-salty crunch.',
    price: 6.99,
    category: 'shakes',
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&q=80',
  },
];

export const INGREDIENTS: Ingredient[] = [
  // BUNS
  { id: 'bun_brioche', name: 'Toasted Brioche Bun', category: 'bun-top', price: 1.50, color: 'bg-amber-500', borderColor: 'border-amber-600', emoji: '🍞' },
  { id: 'bun_sesame', name: 'Seeded Sesame Bun', category: 'bun-top', price: 1.50, color: 'bg-yellow-600', borderColor: 'border-yellow-700', emoji: '🍔' },
  { id: 'bun_lettuce', name: 'Fresh Lettuce Wrap', category: 'bun-top', price: 1.00, color: 'bg-green-500', borderColor: 'border-green-600', emoji: '🥬' },

  // PATTIES
  { id: 'patty_smash', name: 'Signature Smash Beef Patty', category: 'patty', price: 3.00, color: 'bg-amber-900', borderColor: 'border-black', emoji: '🥩' },
  { id: 'patty_chicken', name: 'Buttermilk Crispy Chicken', category: 'patty', price: 3.50, color: 'bg-orange-800', borderColor: 'border-orange-950', emoji: '🍗' },
  { id: 'patty_vegan', name: 'Plant-Based Garden Patty', category: 'patty', price: 3.25, color: 'bg-emerald-800', borderColor: 'border-emerald-950', emoji: '🌱' },

  // CHEESES
  { id: 'cheese_cheddar', name: 'Sharp Cheddar Cheese', category: 'cheese', price: 1.00, color: 'bg-yellow-400', borderColor: 'border-yellow-500', emoji: '🧀' },
  { id: 'cheese_swiss', name: 'Melted Swiss Cheese', category: 'cheese', price: 1.25, color: 'bg-amber-100', borderColor: 'border-amber-200', emoji: '🧀' },
  { id: 'cheese_jack', name: 'Spicy Pepper Jack', category: 'cheese', price: 1.25, color: 'bg-yellow-200', borderColor: 'border-yellow-300', emoji: '🧀' },

  // TOPPINGS
  { id: 'top_bacon', name: 'Crispy Applewood Bacon', category: 'topping', price: 1.75, color: 'bg-red-800', borderColor: 'border-red-900', emoji: '🥓' },
  { id: 'top_lettuce', name: 'Crisp Butter Lettuce', category: 'topping', price: 0.25, color: 'bg-green-400', borderColor: 'border-green-500', emoji: '🥬' },
  { id: 'top_tomato', name: 'Vine-Ripe Tomato Slices', category: 'topping', price: 0.30, color: 'bg-red-500', borderColor: 'border-red-600', emoji: '🍅' },
  { id: 'top_pickles', name: 'Dill Pickle Chips', category: 'topping', price: 0.25, color: 'bg-emerald-600', borderColor: 'border-emerald-700', emoji: '🥒' },
  { id: 'top_red_onion', name: 'Sliced Red Onion', category: 'topping', price: 0.25, color: 'bg-purple-400', borderColor: 'border-purple-500', emoji: '🧅' },
  { id: 'top_caramel_onion', name: 'Caramelized Sweet Onions', category: 'topping', price: 0.75, color: 'bg-amber-700', borderColor: 'border-amber-800', emoji: '🧅' },
  { id: 'top_mushrooms', name: 'Sautéed Garlic Mushrooms', category: 'topping', price: 1.25, color: 'bg-stone-600', borderColor: 'border-stone-700', emoji: '🍄' },
  { id: 'top_egg', name: 'Organic Sunnyside Egg', category: 'topping', price: 1.50, color: 'bg-white', borderColor: 'border-yellow-500', emoji: '🍳' },

  // SAUCES
  { id: 'sauce_secret', name: 'Secret Bistro Sauce', category: 'sauce', price: 0.50, color: 'bg-rose-300', borderColor: 'border-rose-400', emoji: '🍯' },
  { id: 'sauce_truffle', name: 'Garlic Truffle Aioli', category: 'sauce', price: 0.75, color: 'bg-stone-200', borderColor: 'border-stone-300', emoji: '🥣' },
  { id: 'sauce_bbq', name: 'Smoky Honey BBQ', category: 'sauce', price: 0.50, color: 'bg-red-950', borderColor: 'border-black', emoji: '🏺' },
  { id: 'sauce_spicy', name: 'Spicy Chipotle Mayo', category: 'sauce', price: 0.50, color: 'bg-orange-400', borderColor: 'border-orange-500', emoji: '🌶️' },
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'Marcus Vance',
    rating: 5,
    comment: 'The Smash beef has the most incredible lacy crust. The Truffle Fries are to die for! Easily the best burger in the city.',
    date: 'July 8, 2026',
    tags: ['Double Smash', 'Truffle Fries'],
  },
  {
    id: 'r2',
    author: 'Elena Rostova',
    rating: 5,
    comment: 'I customized my burger with brioche, double beef patties, caramelized onions, sautéed mushrooms, and garlic aioli. The interactive burger builder makes it so easy and fun. Tasted exactly like I wanted!',
    date: 'July 5, 2026',
    tags: ['Custom Burger', 'Mushroom swiss'],
  },
  {
    id: 'r3',
    author: 'Jordan K.',
    rating: 4,
    comment: 'Great crispy chicken burger, holds up perfectly and isn\'t greasy. The salted caramel pretel shake is phenomenal.',
    date: 'June 29, 2026',
    tags: ['Chicken Burger', 'Shakes'],
  },
];

export const STORE_LOCATIONS: StoreLocation[] = [
  {
    id: 'l1',
    name: 'Downtown Bistro Hub',
    address: '742 Grillmaster Avenue, Suite 101, New York, NY 10001',
    hours: 'Sun - Thu: 11:00 AM - 10:00 PM | Fri - Sat: 11:00 AM - Midnight',
    phone: '(212) 555-0199',
    lat: 40.758896,
    lng: -73.985130,
  },
  {
    id: 'l2',
    name: 'Brooklyn Waterfront Grill',
    address: '89 Promenade Pier Walk, Brooklyn, NY 11201',
    hours: 'Daily: 11:00 AM - 11:00 PM',
    phone: '(718) 555-0245',
    lat: 40.706085,
    lng: -73.996864,
  },
];
