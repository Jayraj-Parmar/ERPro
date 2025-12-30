import { Dropdown } from "antd";
import { useNavigate, NavLink } from "react-router-dom";
import { TbLogout, TbLogin, TbUser, TbUserPlus } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../app/slices/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const firstLetter =
    typeof userData?.name === "string"
      ? userData.name.charAt(0).toUpperCase()
      : null;

  const handleLogout = async () => {
    try {
      dispatch(logoutUser());
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
        label: <span>My Profile</span>,
      },
      { type: "divider" },
      {
        key: "2",
        icon: <TbLogout size={16} className="text-red-500" />,
        label: (
          <span className="text-red-500" onClick={handleLogout}>
            Logout
          </span>
        ),
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
        label: <NavLink to="/signup">Sign up</NavLink>,
      }
    );
  }

  return (
    <nav>
      <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
        <a onClick={(e) => e.preventDefault()}>
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white text-lg cursor-pointer">
            {firstLetter ? firstLetter : <TbUser size={22} />}
          </span>
        </a>
      </Dropdown>
    </nav>
  );
}

export default Navbar;
