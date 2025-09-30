import React, { useContext, useEffect, useState } from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import { login } from "../../api/authApi";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContent } from "../../context/AppContext";
function Login() {
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { getUserData } = useContext(AppContent);

  useEffect(() => {
    setError(location.state?.message);
  }, [location]);

  const onSubmit = async (data) => {
    setError("");
    setFieldErrors({});
    try {
      const res = await login(data);
      if (res.status === 200) {
        try {
          await getUserData();
          navigate("/", {
            state: {
              message: res.message,
            },
          });
        } catch (error) {
          setError(error.message);
          return;
        }
      }
      if (res.status === 202) {
        navigate("/verify-email", {
          state: { message: res.message, email: data?.email },
        });
      }
    } catch (error) {
      if (error.status === 422) {
        const fieldError = {};
        error.errors.map((err) => {
          fieldError[err.path] = err.msg;
        });
        setFieldErrors(fieldError);
      }
      if ([401, 404].includes(error.status)) {
        setError(error.message);
      }
    }
  };
  return (
    <>
      <AuthForm
        type="login"
        onSubmit={onSubmit}
        fieldErrors={fieldErrors}
        error={error}
      />
    </>
  );
}

export default Login;
