import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <ul>
        <NavLink to="/signup">
          <li>Signup</li>
        </NavLink>
        <NavLink to="/login">
          <li>login</li>
        </NavLink>
        <NavLink to="/resend-email">
          <li>resend-email</li>
        </NavLink>
      </ul>
    </>
  );
}

export default Sidebar;
