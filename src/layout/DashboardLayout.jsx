import React from "react";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import DashboardFooter from "../components/dashboard/DashboardFooter";
import { PrimeReactProvider } from 'primereact/api';

const DashboardLayout = () => {
  return (
      <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
        <PrimeReactProvider>
      <main className="p-4">
        <Outlet />
      </main>
    </PrimeReactProvider>
      <DashboardFooter />
    </div>
  );
};

export default DashboardLayout;
