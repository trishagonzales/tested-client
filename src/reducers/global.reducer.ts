import { User, CartItemType, OrderType } from '../types/User.types';
import { Product } from '../types/Product.types';

export interface GlobalState {
  user: User | null;
  isAdmin: boolean;
  wishlist: Product[];
  cart: CartItemType[];
  orders: OrderType[];
}

export interface GlobalAction {
  type: 'LOGIN' | 'LOGOUT' | 'IS_ADMIN' | 'UPDATE_WISHLIST' | 'UPDATE_CART' | 'UPDATE_ORDERS';
  user?: User;
  isAdmin?: boolean;
  wishlist?: Product[];
  cart?: CartItemType[];
  orders?: OrderType[];
}

export function globalReducer(state: GlobalState, action: GlobalAction) {
  const { type, user, isAdmin, wishlist, cart, orders } = action;

  switch (type) {
    case 'LOGIN':
      return { ...state, user: user ?? null };

    case 'LOGOUT':
      return { ...state, user: null };

    case 'IS_ADMIN':
      return { ...state, isAdmin: isAdmin ?? false };

    case 'UPDATE_WISHLIST':
      return { ...state, wishlist: wishlist ?? [] };

    case 'UPDATE_CART':
      return { ...state, cart: cart ?? [] };

    case 'UPDATE_ORDERS':
      return { ...state, orders: orders ?? [] };

    default:
      return state;
  }
}
