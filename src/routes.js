import React from "react";


const Home = React.lazy(() => import("./components/home/Home.jsx"));
const About = React.lazy(() => import("./components/about/About.jsx"));







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
  
 
];