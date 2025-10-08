import React, { useCallback, useState } from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import { signup } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "../../app/slices/loadingSlice";

function Signup() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.loading);

  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (data) => {
      setFieldErrors({});
      setError({});
      dispatch(startLoading());
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
      } finally {
        dispatch(stopLoading());
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
        loading={isLoading}
      />
    </>
  );
}

export default Signup;
