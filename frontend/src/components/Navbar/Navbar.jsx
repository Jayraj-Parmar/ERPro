import React, { useContext } from "react";
import { Dropdown, Menu } from "antd";
import { AppContent } from "../../context/AppContext";
import { useNavigate, NavLink } from "react-router-dom";
import { TbLogout, TbLogin, TbUser, TbUserPlus } from "react-icons/tb";
import { logout } from "../../api/authApi";

function Navbar() {
  const { userData, setUserData, setIsLoggedin } = useContext(AppContent);
  const navigate = useNavigate();
  const firstLetter =
    typeof userData?.name === "string"
      ? userData.name.charAt(0).toUpperCase()
      : null;

  const handleLogout = async () => {
    try {
      await logout();
      setUserData(null);
      setIsLoggedin(false);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const items = [];

  if (userData) {
    items.push(
      {
        key: "1",
        icon: <TbUser size={16} />,
        label: <span>MyProfile</span>,
      },
      {
        type: "divider",
      },
      {
        key: "2",
        icon: <TbLogout size={16} />,
        label: <span onClick={handleLogout}>Logout</span>,
      }
    );
  } else {
    items.push(
      {
        key: "3",
        icon: <TbLogin size={16} />,
        label: <NavLink to="/login">Login</NavLink>,
      },
      {
        key: "4",
        icon: <TbUserPlus size={16} />,
        label: <NavLink to="/signup">Signup</NavLink>,
      }
    );
  }

  return (
    <nav>
      <ul className="flex items-center gap-4">
        <li>
          <Dropdown
            menu={{ items }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <a onClick={(e) => e.preventDefault()}>
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white text-lg cursor-pointer">
                {firstLetter ? firstLetter : <TbUser size={22} />}
              </span>
            </a>
          </Dropdown>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
