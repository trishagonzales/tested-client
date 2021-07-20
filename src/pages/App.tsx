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

import ErrorBoundary from '../components/common/ErrorBoundary';
import { Navbar, NavbarMobile } from '../components/global/Navbar/Navbar';
import { Footer } from '../components/global/Footer';
import { Guarantees } from '../components/global/Guarantees';

export function App() {
  const { user, isAdmin, isAdminAPI, getUserData } = useUser();
  const { getCartItems, items: cartItems } = useCart();
  const { getWishlistItems } = useWishlist();
  const { getOrderItems } = useOrder();

  useEffect(() => {
    if (!user) getUserData();
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
      <ErrorBoundary>
        <Navbar />
        <NavbarMobile />
      </ErrorBoundary>

      <div id='content'>
        <Routes renderIf={!user} routes={logoutRoutes} />
        <Routes renderIf={isAdmin} routes={adminRoutes} />
        <Routes renderIf={cartItems && cartItems.length !== 0} routes={checkoutRoutes} />
        <Routes renderIf={!!user} routes={userRoutes} />
        <Routes renderIf={true} routes={globalRoutes} />
      </div>

      <ErrorBoundary>
        <Guarantees />
        <Footer />
      </ErrorBoundary>
    </>
  );
}
