import { useLocation, useNavigate } from "react-router-dom";
import AuthForm from "../../components/AuthForm/AuthForm";
import React, { useEffect, useState } from "react";
import { loginUser } from "../../api/authApi";

function Login() {
  const [error, setErrors] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  useEffect(() => {
    if (location.state?.message) {
      setErrors(location.state?.message);
    }
  }, [location.state]);
  const loginSubmit = async (data) => {
    try {
      const res = await loginUser(data);
      if (res.status === 200) {
        navigate(res?.data?.redirectTo, {
          state: { message: res?.message, email: res.data?.email },
        });
      }
    } catch (error) {
      if (error.status === 404) {
        setErrors(error?.message);
      }
    }
  };

  return (
    <>
      {error && <p>{error}</p>}
      <AuthForm type="login" onSubmit={loginSubmit} defaultValue={email} />
    </>
  );
}

export default Login;
