import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { AppContent } from "../../context/AppContext";

function Dashboard() {
  const location = useLocation();
  const [message, setMessage] = useState();
  const { userData, isLoggedin } = useContext(AppContent);

  useEffect(() => {
    if (isLoggedin) {
      setMessage(location.state?.message);
    }
  }, [location.state]);

  return (
    <>
      {message && <p>{message}</p>}
      {userData && <p>{userData.name}</p>}
    </>
  );
}

export default Dashboard;
