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
} from "react-icons/tb";

function Sidebar() {
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
      <div className="flex items-center px-4 py-5">
        <i className="me-4 text-blue-500">
          <TbTrolley size={35} />
        </i>
        <span className="font-bold text-3xl">ERPro</span>
      </div>
      <ul className="px-4">
        {pagesList.map((pageLink) => (
          <li className="py-1" key={pageLink.key}>
            <NavLink
              to={pageLink.path}
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg hover:bg-gray-800 ${
                  isActive ? "bg-gray-800 text-blue-500" : ""
                }`
              }
            >
              <i className="me-3">{pageLink.icon}</i>
              {pageLink.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Sidebar;
