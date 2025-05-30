// layout/DashboardLayout.jsx
import React from "react";
import DashboardNavbar from "./DashboardNavbar.jsx";
import DashboardFooter from "./DashboardFooter";

const DashboardLayout = ({ children }) => {
  return (
    <>
      <DashboardNavbar />
      <main className="min-h-screen bg-gray-50 px-4 py-6">{children}</main>
      <DashboardFooter />
    </>
  );
};

export default DashboardLayout;
