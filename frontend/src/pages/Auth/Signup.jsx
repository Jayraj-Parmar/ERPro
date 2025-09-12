import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/AuthForm/AuthForm";
import { signupUser } from "../../api/authApi";
function Signup() {
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState();
  const navigate = useNavigate();

  const signupSubmit = async (data) => {
    setErrors({});
    try {
      const res = await signupUser(data);
      if (res?.status === 201) {
        navigate("", {
          state: { message: res?.message },
        });
      }
      if (res?.status === 201) {
        navigate(res?.data?.redirectTo, {
          state: { message: res?.message, email: res?.data?.email },
        });
      }
    } catch (error) {
      if (error.status === 409) {
        navigate(error.data?.redirectTo, {
          state: { email: error?.data?.email, message: error?.message },
        });
      }
      if (error.status === 422) {
        const fieldError = {};
        error.errors.map((err) => {
          fieldError[err.path] = err.msg;
        });
        setErrors(fieldError);
      }
      if (error.status === 429) {
        navigate("/resend-email", {
          state: {
            message: error.message,
          },
        });
      }
      if (error.status === 500) {
        setGlobalError(error?.message);
      }
    }
  };
  return (
    <>
      {globalError && <p>{globalError}</p>}
      <AuthForm type="signup" onSubmit={signupSubmit} serverErrors={errors} />
    </>
  );
}

export default Signup;
