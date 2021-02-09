import { Product } from './Product.types';

export interface User {
  id?: string;
  name?: string;
  gender?: 'male' | 'female' | 'other';
  birthdate?: string;
  avatar?: string;
  username?: string;
  email?: string;
  emailConfirmed?: boolean;
  dateCreated?: Date;
  wishlists?: Product[];
  cart?: CartItemType[];
  notifications?: Notification[];
}

export interface Notification {
  id: string;
  message: string;
  seen: boolean;
  dateCreated: Date;
}

export interface CartItemType {
  id: string;
  product: Product;
  quantity: number;
  isIncluded: boolean;
}

export interface OrderType {
  id: string;
  items: OrderItemType[];
  totalPrice: number;
  status: 'CONFIRMED' | 'PROCESSING' | 'COMPLETED';
  date: Date;
  isReviewed: boolean;
}

export interface OrderItemType {
  id: string;
  product: Product;
  quantity: number;
}
