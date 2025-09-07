import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Dashboard() {
  const location = useLocation();
  const [message, setMessage] = useState();
  useEffect(() => {
    setMessage(location.state?.message);
  }, [location.state]);
  return <>{message && <p>{message}</p>}</>;
}

export default Dashboard;
