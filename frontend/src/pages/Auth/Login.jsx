import { useCallback, useEffect, useState } from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import { login } from "../../api/authApi";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../app/slices/authSlice";
import { startLoading, stopLoading } from "../../app/slices/loadingSlice";

function Login() {
  const dispatch = useDispatch();

  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState({});

  const { isLoading } = useSelector((state) => state.loading);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setError({
      message: location.state?.message,
      success: location.state?.success,
    });
  }, [location]);

  const onSubmit = useCallback(
    async (data) => {
      setError({});
      setFieldErrors({});
      dispatch(startLoading());
      try {
        const res = await login(data);
        if (res.status === 200) {
          try {
            await dispatch(fetchUser()).unwrap();
            navigate("/", {
              state: {
                message: res.message,
              },
            });
          } catch (error) {
            setError({ message: error.message, success: error?.success });
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
          setError({ message: error.message, success: error?.success });
        }
      } finally {
        dispatch(stopLoading());
      }
    },
    [navigate, dispatch]
  );
  return (
    <>
      <AuthForm
        type="login"
        onSubmit={onSubmit}
        fieldErrors={fieldErrors}
        error={error}
        loading={isLoading}
      />
    </>
  );
}

export default Login;
