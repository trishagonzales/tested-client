import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
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
    if (Cookies.get('cid')) getUserData();
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
        <Routes condition={cartItems && cartItems.length !== 0} routes={checkoutRoutes} />
        <Routes condition={isAdmin} routes={adminRoutes} />
        <Routes condition={!!user} routes={userRoutes} />
        <Routes condition={!!!user} routes={logoutRoutes} />
        <Routes condition={true} routes={globalRoutes} />
      </div>

      <ErrorBoundary>
        <Guarantees />
        <Footer />
      </ErrorBoundary>
    </>
  );
}
