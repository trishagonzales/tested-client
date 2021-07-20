import React from 'react';
import { RouteProps, Route, Switch } from 'react-router-dom';
import ErrorBoundary from '../components/common/ErrorBoundary';
import { lazy } from '../utils/dynamicImports.util';

//  Global routes
const HomePage = lazy(() => import('./HomePage'));
const LoginSignupPage = lazy(() => import('./LoginSignupPage'));
const ProductListPage = lazy(() => import('./product/ProductListPage'));
const ProductPage = lazy(() => import('./product/ProductPage'));

//  Logout routes
const ForgotPasswordPage = lazy(() => import('./user/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('./user/ResetPasswordPage'));
const ResetPasswordCompletePage = lazy(() => import('./user/ResetPasswordComplete'));

//  User routes
const BuyPage = lazy(() => import('./product/BuyPage'));
const WishlistPage = lazy(() => import('./product/WishlistPage'));
const AccountPage = lazy(() => import('./user/AccountPage'));
const LeaveReviewPage = lazy(() => import('./user/LeaveReviewPage'));
const OrdersPage = lazy(() => import('./user/OrdersPage'));
const ConfirmEmailPage = lazy(() => import('./user/ConfirmEmailPage'));

//  Admin routes
const AdminPage = lazy(() => import('./AdminPage'));
const AddProduct = lazy(() => import('../components/admin/AddProduct'));
const EditProduct = lazy(() => import('../components/admin/EditProduct'));

export interface RoutesProps {
  routes: RouteProps[];
  renderIf: boolean;
}

export const Routes: React.FC<RoutesProps> = ({ renderIf, routes }) => {
  return (
    <ErrorBoundary>
      <Switch>{routes.map((route, i) => (renderIf ? <Route key={i} {...route} /> : null))}</Switch>
    </ErrorBoundary>
  );
};

export const globalRoutes = [
  { path: '/product/:id', component: ProductPage },
  { path: '/products', component: ProductListPage },
  { path: '/login', component: LoginSignupPage },
  { path: '/signup', component: LoginSignupPage },
  { exact: true, path: '/', component: HomePage },
];

export const userRoutes = [
  { path: '/email/confirm/:token', component: ConfirmEmailPage },
  { path: '/review/write/:orderID', component: LeaveReviewPage },
  { path: '/orders', component: OrdersPage },
  { path: '/order-completed', component: BuyPage },
  { path: '/cart', component: BuyPage },
  { path: '/wishlists', component: WishlistPage },
  { path: '/profile', component: AccountPage },
  { path: '/account-settings', component: AccountPage },
];

export const adminRoutes = [
  { path: '/admin/product/add', component: AddProduct },
  { path: '/admin/product/edit/:id', component: EditProduct },
  { exact: true, path: '/admin', component: AdminPage },
];

export const logoutRoutes = [
  { path: '/password/reset/complete', component: ResetPasswordCompletePage },
  { path: '/password/reset/:token', component: ResetPasswordPage },
  { path: '/password/forgot', component: ForgotPasswordPage },
];

export const checkoutRoutes = [{ path: '/checkout', component: BuyPage }];
