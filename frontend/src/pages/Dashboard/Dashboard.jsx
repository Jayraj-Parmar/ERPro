import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../app/slices/authSlice";

function Dashboard() {
  const location = useLocation();
  const [message, setMessage] = useState();

  const dispatch = useDispatch();
  const { userData, isLoggedin } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedin) {
      setMessage(location.state?.message);
    }
  }, [location.state]);

  return (
    <>
      {message && <p>{message}</p>}
      {userData && <p>Welcome, {userData.name}</p>}
    </>
  );
}

export default Dashboard;
