import React from 'react';
import { RouteProps, Route, Switch } from 'react-router-dom';
import { lazy } from '../utils/dynamicImports.util';
import OrdersPage from './OrdersPage';

const HomePage = lazy(() => import('./HomePage'));
const LoginSignupPage = lazy(() => import('./LoginSignupPage'));
const ProductListPage = lazy(() => import('./ProductListPage'));
const ProductPage = lazy(() => import('./ProductPage'));
const AccountPage = lazy(() => import('./AccountPage'));
const BuyPage = lazy(() => import('./BuyPage'));
const WishlistPage = lazy(() => import('./WishlistPage'));
const LeaveReviewPage = lazy(() => import('./LeaveReviewPage'));
const AdminPage = lazy(() => import('./AdminPage'));
const AddProduct = lazy(() => import('../components/admin/AddProduct'));
const EditProduct = lazy(() => import('../components/admin/EditProduct'));

export interface RoutesProps {
  routes: RouteProps[];
  visible: boolean;
}

export const Routes: React.FC<RoutesProps> = ({ visible, routes }) => {
  return <Switch>{visible ? routes.map((route, i) => <Route key={i} {...route} />) : null}</Switch>;
};

export const globalRoutes = [
  { path: '/product/:id', component: ProductPage },
  { path: '/products', component: ProductListPage },
  { path: '/login', component: LoginSignupPage },
  { path: '/signup', component: LoginSignupPage },
  { exact: true, path: '/', component: HomePage },
];

export const userRoutes = [
  { path: '/leave-review/:id', component: LeaveReviewPage },
  { path: '/orders', component: OrdersPage },
  { path: '/order-completed', component: BuyPage },
  { path: '/cart', component: BuyPage },
  { path: '/wishlists', component: WishlistPage },
  { path: '/profile', component: AccountPage },
  { path: '/account-settings', component: AccountPage },
];

export const adminRoutes = [
  { path: '/admin/add-product', component: AddProduct },
  { path: '/admin/edit-product/:id', component: EditProduct },
  { path: '/admin/settings', component: AddProduct },
  { exact: true, path: '/admin', component: AdminPage },
];

export const checkoutRoutes = [{ path: '/checkout', component: BuyPage }];
