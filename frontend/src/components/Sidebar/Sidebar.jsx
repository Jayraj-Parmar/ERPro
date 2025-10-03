import React from "react";
import { NavLink } from "react-router-dom";
import {
  TbTrolley,
  TbLayoutDashboard,
  TbUsers,
  TbUserDollar,
  TbCube,
  TbShoppingBag,
  TbTruckLoading,
  TbWallet,
  TbCurrencyRupee,
  TbLayoutSidebarLeftCollapseFilled,
} from "react-icons/tb";

function Sidebar({ collapse, setIsOpen }) {
  const pagesList = [
    {
      key: 1,
      label: "Dashboard",
      icon: <TbLayoutDashboard size={20} />,
      path: "/",
    },
    {
      key: 2,
      label: "Customer",
      icon: <TbUsers size={20} />,
      path: "/customer",
    },
    {
      key: 3,
      label: "Supplier",
      icon: <TbUserDollar size={20} />,
      path: "/supplier",
    },
    {
      key: 4,
      label: "Products",
      icon: <TbCube size={20} />,
      path: "/products",
    },
    {
      key: 5,
      label: "Purchase",
      icon: <TbShoppingBag size={20} />,
      path: "/purchase",
    },
    {
      key: 6,
      label: "Sales",
      icon: <TbTruckLoading size={20} />,
      path: "/sales",
    },
    {
      key: 7,
      label: "Expenses",
      icon: <TbWallet size={20} />,
      path: "/expenses",
    },
    {
      key: 8,
      label: "Income",
      icon: <TbCurrencyRupee size={20} />,
      path: "/income",
    },
  ];

  return (
    <>
      <div>
        <div
          className={`flex justify-between items-center px-4 py-5 ${
            collapse ? "justify-center" : ""
          }`}
        >
          <div className="flex">
            <i className={`${collapse ? "" : "me-4"} text-blue-500`}>
              <TbTrolley size={35} />
            </i>
            {!collapse && <span className="font-bold text-3xl">ERPro</span>}
          </div>

          <button
            className="bg-white p-1.5 rounded-md md:hidden block"
            onClick={() => setIsOpen && setIsOpen(false)}
          >
            <i className={`text-gray-900`}>
              <TbLayoutSidebarLeftCollapseFilled size={25} />
            </i>
          </button>
        </div>
        <ul className="px-4">
          {pagesList.map((pageLink) => (
            <li className="py-1" key={pageLink.key}>
              <NavLink
                to={pageLink.path}
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg hover:bg-gray-800 ${
                    isActive ? "bg-gray-800 text-blue-500" : ""
                  } ${collapse ? "justify-center" : ""}`
                }
              >
                <i className={`${collapse ? "" : "me-3"}`}>{pageLink.icon}</i>
                {!collapse && pageLink.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
