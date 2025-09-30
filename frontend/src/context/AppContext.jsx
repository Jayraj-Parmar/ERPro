import { createContext, useState, useEffect } from "react";
import { getUser } from "../api/authApi";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContent = createContext();

export const AppContextProvider = (props) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState();
  const getUserData = async () => {
    try {
      const res = await getUser();
      setIsLoggedin(true);
      setUserData(res.data.user);
    } catch (err) {
      setIsLoggedin(false);
      setUserData(null);
      const error = {
        status: err.status,
        message: err.message,
      };
      throw error;
    }
  };

  useEffect(() => {
    getUserData(); // fetch user data automatically
  }, []);

  const value = {
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
  };
  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};
