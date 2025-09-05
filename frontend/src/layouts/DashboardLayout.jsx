import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
function DashboardLayout() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}

export default DashboardLayout;



