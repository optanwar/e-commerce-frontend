import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import AnnouncementBar from "../layout/AnnouncementBar";
import 'primereact/resources/themes/saga-blue/theme.css'; // or any other theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
const MainLayout = () => {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
