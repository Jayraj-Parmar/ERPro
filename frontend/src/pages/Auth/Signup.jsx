import React, { useCallback, useState } from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import { signup } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
function Signup() {
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (data) => {
      setFieldErrors({});
      setError({});
      try {
        const res = await signup(data);
        if ([201, 202].includes(res.status)) {
          navigate("/verify-email", {
            state: {
              message: res.message,
              email: data?.email,
              success: res?.success,
            },
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
        if (error.status === 409) {
          navigate("/login", {
            state: { message: error.message, success: error?.success },
          });
        }
        if (error.status === 500) {
          setError({ message: error.message, success: error?.success });
        }
      }
    },
    [navigate]
  );
  return (
    <>
      <AuthForm
        type="signup"
        onSubmit={onSubmit}
        fieldErrors={fieldErrors}
        error={error}
      />
    </>
  );
}

export default Signup;
