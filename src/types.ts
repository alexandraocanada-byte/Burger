/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'burgers' | 'sides' | 'drinks' | 'shakes';
  image: string;
  tags?: string[];
  customizable?: boolean;
}

export type IngredientCategory = 'bun-top' | 'topping' | 'cheese' | 'patty' | 'sauce' | 'bun-bottom';

export interface Ingredient {
  id: string;
  name: string;
  category: IngredientCategory;
  price: number;
  color: string; // for rendering stack block if image not available
  borderColor?: string;
  emoji: string;
}

export interface CustomBurger {
  name: string;
  ingredients: Ingredient[];
  price: number;
}

export interface CartItem {
  id: string; // unique ID for this specific cart configuration
  name: string;
  price: number;
  quantity: number;
  image?: string;
  isCustom?: boolean;
  customIngredients?: Ingredient[];
  selectedOptions?: {
    pattyTemp?: string;
    noOnions?: boolean;
    extraSauce?: boolean;
  };
  notes?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  tags?: string[];
}

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  hours: string;
  phone: string;
  lat: number;
  lng: number;
}

export type OrderStatus = 'received' | 'grilling' | 'wrapping' | 'en_route' | 'delivered';

export interface OrderDetails {
  id: string;
  items: CartItem[];
  customerName: string;
  address: string;
  phone: string;
  total: number;
  status: OrderStatus;
  timestamp: string;
}
