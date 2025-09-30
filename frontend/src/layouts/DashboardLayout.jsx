import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import {
  TbLayoutSidebarLeftExpandFilled,
  TbLayoutSidebarLeftCollapseFilled,
} from "react-icons/tb";

function DashboardLayout() {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-gray-900 text-white transition-all duration-300
        ${toggle ? "w-0 overflow-hidden" : "w-64"}`}
      >
        <Sidebar />
      </div>

      {/* Main section */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="border-b-1 border-gray-200 flex items-center justify-between shadow-lg px-4 py-2">
          <button
            className="bg-gray-900 p-2 rounded-md text-3xl text-white"
            onClick={() => setToggle((prev) => !prev)}
          >
            {toggle ? (
              <TbLayoutSidebarLeftExpandFilled />
            ) : (
              <TbLayoutSidebarLeftCollapseFilled />
            )}
          </button>
          <Navbar />
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 overflow-y-auto bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
