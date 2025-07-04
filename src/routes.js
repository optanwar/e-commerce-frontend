import React from 'react';

const Home = React.lazy(() => import('./page/home/Home.jsx'));
const About = React.lazy(() => import('./page/About.jsx'));
const Blog = React.lazy(() => import('./page/blog/Blog.jsx'));
const Contact = React.lazy(() => import('./page/Contact.jsx'));
const Products = React.lazy(() => import('./page/products/Products.jsx'));
const ProductsDetails = React.lazy(() => import('./page/products/ProductDetail.jsx'));
const Cart = React.lazy(() => import('./features/cart/Cart.jsx'));
const Checkout = React.lazy(() => import('./features/checkout/Checkout.jsx'));
const ConfirmOrder = React.lazy(() => import('./features/checkout/ConfirmOrder.jsx'));
const Payment = React.lazy(() => import('./features/checkout/Payment.jsx'));
const AuthPage = React.lazy(() => import('./features/auth/AuthPage.jsx'));
const ResetPassword = React.lazy(()=> import('./features/auth/ResetPassword.jsx'))
const SubmitReview = React.lazy(() => import('./page/home/SubmitReviews.jsx'));
const FAQ = React.lazy(() => import('./page/FAQ.jsx'));
const UserProfile = React.lazy(() => import('./components/Profile.jsx'));
const MyOrders = React.lazy(() => import('./components/MyOrders.jsx'));
const Wishlist = React.lazy(() => import('./components/Wishlist.jsx'));
const StripeWrapper = React.lazy(()=> import('./features/checkout/StripeWrapper.jsx'))
const OrderSuccess = React.lazy(()=>import('./features/checkout/OrderSuccess.jsx'))
const PageNotFound = React.lazy(() => import('./page/NotFound.jsx'));

// Dashboard layout + pages
const DashboardLayout = React.lazy(() => import('./admin/dashboard/DashboardLayout.jsx'));
const DashboardHome = React.lazy(() => import('./admin/dashboard/DashboardHome.jsx'));
const DashboardOrders = React.lazy(() => import('./admin/dashboard/DashboardOrders.jsx'));
const DashboardProducts = React.lazy(() => import('./admin/dashboard/DashboardProducts.jsx'));
const DashboardUsers = React.lazy(() => import('./admin/dashboard/DashboardUser.jsx'));
const CreateProduct = React.lazy(() => import('./admin/dashboard/CreateProducts.jsx'));
const ProductReviews = React.lazy(() => import('./admin/dashboard/ProductsReavie.jsx'));
const Category = React.lazy(() => import('./admin/dashboard/Category.jsx'));
const Coupons = React.lazy(() => import('./admin/dashboard/Coupons.jsx'));
const UserDetailsAdmin = React.lazy(() => import('./admin/dashboard/userDetails.jsx'));
const OrderDetailsAdmin = React.lazy(() => import('./admin/dashboard/orderDetails.jsx'));

export const route = [
  {
    id: 1,
    name: 'Home',
    path: '/',
    component: Home,
  },
  {
    id: 2,
    name: 'About',
    path: '/about',
    component: About,
  },
  {
    id: 3,
    name: 'Contact',
    path: '/contact-us',
    component: Contact,
  },

  {
    id: 4,
    name: 'Blog',
    path: '/blogs',
    component: Blog,
  },
  {
    id: 5,
    name: 'Products',
    path: '/products',
    component: Products,
  },
  {
    id: 6,
    name: 'Products Details',
    path: '/products/:id',
    component: ProductsDetails,
  },
  {
    id: 7,
    name: 'Cart',
    path: '/my-cart',
    component: Cart,
  },
  {
    id: 8,
    name: 'Checkout',
    path: '/checkout',
    component: Checkout,
  },

  {
    id: 9,
    name: 'Confirm Order',
    path: '/confirm-order',
    component: ConfirmOrder,
  },

  {
    id: 10,
    name: 'Payment',
    path: '/payment',
    component: StripeWrapper,
    stripeProtected: true,
  },
  {
    id: 11,
    name: 'AuthPage',
    path: '/login',
    component: AuthPage,
  },
  {
    id: 12,
    name: 'Submit Review',
    path: '/submit-review',
    component: SubmitReview,
  },
  {
    id: 13,
    name: 'FAQ',
    path: '/faq',
    component: FAQ,
  },
  {
    id: 14,
    name: 'User Profile',
    path: '/user-profile',
    component: UserProfile,
  },
  {
    id: 15,
    name: 'My Orders',
    path: '/my-orders',
    component: MyOrders,
  },
  {
    id: 16,
    name: 'Wishlist',
    path: '/wishlist',
    component: Wishlist,
  },
  {
    id: 17,
    name: 'Order Success',
    path: '/order-success',
    component: OrderSuccess,
  },
  {
    id: 18,
    name: 'Reset Password',
    path: '/password/reset/:token',
    component: ResetPassword,
  },
  {
    id: 20,
    name: 'Page Not Found',
    path: '*',
    component: PageNotFound,
  },

  // Dashboard wrapper
  {
    id: 100,
    path: '/dashboard',
    component: DashboardLayout,
    children: [
      { id: 101, path: '', component: DashboardHome },
      { id: 102, path: 'orders', component: DashboardOrders },
      { id: 103, path: 'products', component: DashboardProducts },
      { id: 104, path: 'users', component: DashboardUsers },
      { id: 105, path: 'create-product', component: CreateProduct },
      { id: 106, path: 'reviews', component: ProductReviews },
      { id: 107, path: 'categories', component: Category },
      { id: 108, path: 'coupons', component: Coupons },
      { id: 109, path: '/dashboard/users/:id', component: UserDetailsAdmin },
      { id: 110, path: '/dashboard/order/:id', component: OrderDetailsAdmin },
    ],
  },
];
