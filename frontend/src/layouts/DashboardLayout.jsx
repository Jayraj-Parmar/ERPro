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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div
          className={`bg-gray-900 hidden md:block text-white transition-all duration-300
        ${toggle ? "w-20 overflow-hidden" : "w-64"}`}
        >
          <Sidebar collapse={toggle} />
        </div>

        {/* Main section */}
        <div className="flex-1 flex flex-col">
          {/* Navbar */}
          <header className="border-b-1 border-gray-200 flex items-center justify-between shadow-lg px-4 py-2">
            <button
              className="bg-gray-900 p-2 rounded-md text-3xl text-white md:block hidden"
              onClick={() => setToggle((prev) => !prev)}
            >
              {toggle ? (
                <TbLayoutSidebarLeftExpandFilled />
              ) : (
                <TbLayoutSidebarLeftCollapseFilled />
              )}
            </button>

            <button
              className="bg-gray-900 p-2 rounded-md text-3xl text-white md:hidden block"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <TbLayoutSidebarLeftExpandFilled />
            </button>
            <Navbar />
          </header>

          {/* Main content */}
          <main className="flex-1 p-4 overflow-y-auto bg-gray-100">
            <Outlet />
          </main>
        </div>
      </div>
      <div>
        {/* Overlay */}
        <div
          className={`md:hidden block fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
            isOpen ? "opacity-20 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setIsOpen(false)}
        ></div>

        {/* Offcanvas Sidebar */}
        <div
          className={`md:hidden block fixed top-0 left-0 h-full w-64 bg-gray-900 text-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <Sidebar setIsOpen={setIsOpen} />
        </div>
      </div>
    </>
  );
}

export default DashboardLayout;
