import React from "react";


const Home = React.lazy(() => import("./components/home/Home.jsx"));
const About = React.lazy(() => import("./components/about/About.jsx"));
const Blog = React.lazy(() => import("./components/blog/Blog.jsx"));
const Contact = React.lazy(() => import("./components/contact/Contact.jsx"));
const Products = React.lazy(() => import("./components/products/Products.jsx"));
const ProductsDetails = React.lazy(() => import("./components/products/ProductDetail.jsx"));







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
  
 
];