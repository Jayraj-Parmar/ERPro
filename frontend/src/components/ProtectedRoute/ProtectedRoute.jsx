import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../common/Loading";

const ProtectedRoute = () => {
  const { isLoggedin, isChecked } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.loading);

  if (isLoading || !isChecked) {
    return <Loading />;
  }

  if (!isLoggedin) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
