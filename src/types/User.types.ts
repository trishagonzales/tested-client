import { Product } from './Product.types';

export interface User {
  id?: string;
  name?: string;
  gender?: Gender;
  birthdate?: string;
  avatar?: string;
  username?: string;
  email?: string;
  isEmailConfirmed?: boolean;
  dateCreated?: Date;
  wishlists?: Product[];
  cart?: CartItemType[];
  notifications?: Notification[];
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
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
