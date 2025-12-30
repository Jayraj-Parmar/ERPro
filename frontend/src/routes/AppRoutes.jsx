import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Signup from "../pages/Auth/Signup";
import Login from "../pages/Auth/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import VerifyEmail from "../pages/Auth/VerifyEmail";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import ProductPage from "../pages/Product/ProductPage";
import CustomerPage from "../pages/Customer/CustomerPage";
import CustomerForm from "../components/Forms/CustomerForm";
import SupplierPage from "../pages/Supplier/SupplierPage";
import SupplierForm from "../components/Forms/SupplierForm";

function AppRoutes() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="verify-email" element={<VerifyEmail />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="product" element={<ProductPage />} />
            <Route path="customer" element={<CustomerPage />} />
            <Route path="supplier" element={<SupplierPage />} />
            <Route path="customer/addcustomer" element={<CustomerForm />} />
            <Route path="supplier/addsupplier" element={<SupplierForm />} />
          </Route>
        </Route>
      </>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default AppRoutes;
