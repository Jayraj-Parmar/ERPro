import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import {
  TbLayoutSidebarLeftExpandFilled,
  TbLayoutSidebarLeftCollapseFilled,
} from "react-icons/tb";
import logo from "../assets/logo.png";

function DashboardLayout() {
  const [toggle, setToggle] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="grid min-h-screen bg-gray-100 md:grid-cols-[auto_1fr]">
      {/*Desktop Sidebar*/}
      <div
        className={`hidden z-50 md:flex flex-col bg-gray-900 text-white transition-all duration-300 
        ${toggle ? "w-20 overflow-x-hidden" : "w-64"} h-screen sticky top-0`}
      >
        <div
          className={`flex-shrink-0 sticky top-0 z-10 bg-gray-900 flex items-center px-4 py-3.5 border-b border-gray-800 ${
            toggle ? "justify-center" : "justify-start"
          }`}
        >
          <i className={`${toggle ? "" : "me-4"} text-blue-500`}>
            <img
              src={logo}
              width="35"
              loading="lazy"
              alt="logo"
              title="ERPro"
            />
          </i>
          {!toggle && <span className="font-bold text-3xl">ERPro</span>}
        </div>

        {/*Scrollable menu*/}
        <div className="flex-1 overflow-y-auto">
          <Sidebar collapse={toggle} />
        </div>
      </div>

      {/* --- Mobile Overlay --- */}
      <div
        className={`md:hidden fixed inset-0 bg-black z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-20 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* --- Mobile Sidebar --- */}
      <div
        className={`md:hidden flex flex-col fixed top-0 left-0 h-full w-64 bg-gray-900 text-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-800">
          <div className="flex items-center">
            <i className="me-4 text-blue-500">
              <img
                src={logo}
                width="35"
                loading="lazy"
                alt="logo"
                title="ERPro"
              />
            </i>
            <span className="font-bold text-3xl">ERPro</span>
          </div>
          <button
            className="bg-white p-1.5 rounded-md md:hidden block"
            onClick={() => setIsOpen(false)}
          >
            <TbLayoutSidebarLeftCollapseFilled
              size={25}
              className="text-gray-900"
            />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <Sidebar setIsOpen={setIsOpen} />
        </div>
      </div>

      {/* --- Main Section --- */}
      <div className="flex flex-col h-screen min-h-0 min-w-0 transition-all duration-300">
        {/* Navbar */}
        <header className="sticky top-0 z-30 border-b border-gray-200 px-4 py-2 shadow bg-white">
          {/* Toggle for desktop */}
          <div className="flex items-center justify-between">
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

            {/* Toggle for mobile */}
            <button
              className="bg-gray-900 p-2 rounded-md text-3xl text-white md:hidden block"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <TbLayoutSidebarLeftExpandFilled />
            </button>

            <Navbar collapse={toggle} setIsOpen={setIsOpen} />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 overflow-auto min-h-0 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
