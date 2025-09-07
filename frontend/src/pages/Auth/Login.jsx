import { useLocation } from "react-router-dom";
import AuthForm from "../../components/AuthForm/AuthForm";
import React, { useEffect, useState } from "react";

function Login() {
  const [error, setErrors] = useState();
  const location = useLocation();
  const email = location.state?.email;
  console.log(email);

  useEffect(() => {
    if (location.state?.message) {
      setErrors(location.state?.message);
    }
  }, [location.state]);
  const loginSubmit = () => {};
  return (
    <>
      {error && <p>{error}</p>}
      <AuthForm type="login" onSubmit={loginSubmit} defaultValue={email} />
    </>
  );
}

export default Login;
