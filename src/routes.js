import React from "react";


const Home = React.lazy(() => import("./components/home/Home.jsx"));
const About = React.lazy(() => import("./components/about/About.jsx"));
const ProductsDetails = React.lazy(() => import("./components/products/ProductsDetails.jsx"));
const Products = React.lazy(() => import("./components/products/Products.jsx"));
const Contact = React.lazy(() => import("./components/contact/Contact.jsx"));
const LoginSingUp = React.lazy(()=> import("./components/auth/Auth.jsx"));
const Blog = React.lazy(()=> import("./components/blog/Blog.jsx"));


const Cart = React.lazy(()=> import("./components/cart/Cart.jsx"));
const CheckoutStepper = React.lazy(()=> import("./components/checkout/CheckoutStepper.jsx"));
const MyOrders = React.lazy(()=> import("./components/orders/MyOrder.jsx"));
const OrderDetails = React.lazy(()=> import("./components/orders/OrderDetails.jsx"));



export const route = [
  {
    id: 1,
    name: "Home",
    path: "/",
    component: Home // Do not wrap with <Home /> here
  },
  {
    id: 2,
    name: "About",
    path: "/about",
    component: About 
  },
  {
    id: 3,
    name: "Products Details",
    path: "/product/:id",
    component: ProductsDetails 
  },
  {
    id: 4,
    name: "Products",
    path: "/products",
    component: Products 
  },
  {
    id: 5,
    name: "Products",
    path: "/products/:query",
    component: Products 
  },
  {
    id: 6,
    name: "Login",
    path: "/login",
    component: LoginSingUp 
  },
  // {
  //   id: 7,
  //   name: "Account",
  //   path: "/account",
  //   component: Account  
  // },
  // {
  //   id: 8,
  //   name: "Change Password",
  //   path: "/change-password",
  //   component: ChangePassword  
  // },
  // {
  //   id: 9,
  //   name: "Update Profile",
  //   path: "/update-profile",
  //   component: UpdateProfile  
  // },
  {
    id: 10,
    name: "Cart",
    path: "/my-cart",
    component: Cart  
  },
  {
    id: 11,
    name: "Contact Us",
    path: "/contact-us",
    component: Contact 
  },
  {
    id: 12,
    name: " Checkout Stepper",
    path: "/shipping-details",
    component:  CheckoutStepper 
  },
  {
    id: 13,
    name: "My Orders",
    path: "/my-orders",
    component: MyOrders
  },
  {
    id: 14,
    name: "Blog",
    path: "/blog",
    component: Blog
  },
  {
    id: 15,
    name: "Order Details",
    path: "/order/:id",    
    component: OrderDetails
  }
 
];