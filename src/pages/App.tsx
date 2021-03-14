import React, { useEffect } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { useUser } from '../hooks/user/useUser';
import { useCart } from '../hooks/user/useCart';
import { useWishlist } from '../hooks/user/useWishlist';
import { useOrder } from '../hooks/product/useOrder';
import {
  Routes,
  globalRoutes,
  userRoutes,
  adminRoutes,
  checkoutRoutes,
  logoutRoutes,
} from './Routes';

import { Navbar, NavbarMobile } from '../components/global/Navbar/Navbar';
import { Footer } from '../components/global/Footer';

export function App() {
  const { user, isAdmin, isAdminAPI, getUserData } = useUser();
  const { getCartItems, items: cartItems } = useCart();
  const { getWishlistItems } = useWishlist();
  const { getOrderItems } = useOrder();

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (user) {
      getCartItems();
      getWishlistItems();
      getOrderItems();
      isAdminAPI();
    }
  }, [user]);

  return (
    <>
      <GlobalStyle />
      <Navbar />
      <NavbarMobile />

      <div id='content'>
        <Routes visible={cartItems && cartItems.length !== 0} routes={checkoutRoutes} />
        <Routes visible={isAdmin} routes={adminRoutes} />
        <Routes visible={!!user} routes={userRoutes} />
        <Routes visible={!!!user} routes={logoutRoutes} />
        <Routes visible={true} routes={globalRoutes} />
      </div>

      <Footer />
    </>
  );
}
