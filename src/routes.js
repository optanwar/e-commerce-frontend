import React from "react";


const Home = React.lazy(() => import("./components/home/Home.jsx"));
const About = React.lazy(() => import("./components/about/About.jsx"));
const Blog = React.lazy(() => import("./components/blog/Blog.jsx"));
const Contact = React.lazy(() => import("./components/contact/Contact.jsx"));
const Products = React.lazy(() => import("./components/products/Products.jsx"));
const ProductsDetails = React.lazy(() => import("./components/products/ProductDetail.jsx"));
const Cart = React.lazy(() => import("./components/cart/Cart.jsx"));
const Checkout = React.lazy(() => import("./components/checkout/Checkout.jsx"));
const ConfirmOrder = React.lazy(() => import("./components/checkout/ConfirmOrder.jsx"));
const Payment = React.lazy(() => import("./components/checkout/Payment.jsx"));
const AuthPage = React.lazy(() => import("./components/auth/AuthPage.jsx"));




// Dashboard layout + pages
const DashboardLayout = React.lazy(() => import('./components/dashboard/DashboardLayout.jsx'));
const DashboardHome = React.lazy(() => import('./components/dashboard/DashboardHome.jsx'));
const DashboardOrders = React.lazy(() => import('./components/dashboard/DashboardOrders.jsx'));
const DashboardProducts = React.lazy(() => import('./components/dashboard/DashboardProducts.jsx'));
const DashboardUsers = React.lazy(() => import('./components/dashboard/DashboardUser.jsx'));
const CreateProduct = React.lazy(() => import('./components/dashboard/CreateProducts.jsx'));



export const route = [
  {
    id: 1,
    name: "Home",
    path: "/",
    component: Home 
  },
  {
    id: 2,
    name: "About",
    path: "/about",
    component: About 
  },
  {
    id: 3,
    name: "Contact",
    path: "/contact-us",
    component: Contact 
  },
  
  {
    id: 4,
    name: "Blog",
    path: "/blogs",
    component: Blog 
  },
  {
    id: 5,
    name: "Products",
    path: "/products",
    component: Products 
  },
  {
    id: 6,
    name: "Products Details",
    path: "/products/:id",
    component: ProductsDetails 
  },
  {
    id: 7,
    name: "Cart",
    path: "/my-cart",
    component: Cart 
  },
  {
    id: 8,
    name: "Checkout",
    path: "/checkout",
    component: Checkout 
  },
  
  {
    id: 9,
    name: "Confirm Order",
    path: "/confirm-order",
    component: ConfirmOrder 
  },
  
  {
    id: 10,
    name: "Payment",
    path: "/payment",
    component: Payment 
  },
  {
    id: 11,
    name: "AuthPage",
    path: "/login",
    component: AuthPage
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
    ],
  },
  
 
];