import React, { useState } from "react";
import InputField from "../common/InputField";
import Button from "../common/Button";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import {
  TbUser,
  TbLockPassword,
  TbMail,
  TbEye,
  TbEyeOff,
} from "react-icons/tb";
import Error from "../common/Error";
function AuthForm({ type = "login", onSubmit, fieldErrors, error }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showHidePassword, setShowHidePassword] = useState(false);
  return (
    <>
      <div className="flex justify-center h-full items-center">
        <div className="w-lg border bg-white border-gray-300 backdrop-blur-2xl sm:p-10 p-6 rounded-2xl">
          <h1 className="text-3xl font-bold text-center mb-6">
            {type === "signup" ? "Sign up" : "Login"}
          </h1>
          {error.message && <Error error={error} />}
          <form onSubmit={handleSubmit(onSubmit)}>
            {type === "signup" && (
              <div className="my-3">
                <InputField
                  type="text"
                  placeholder="Enter your Name"
                  iconStart={<TbUser />}
                  error={errors?.name?.message || fieldErrors.name}
                  {...register("name", { required: "Name is require." })}
                />
              </div>
            )}
            <div className="my-3">
              <InputField
                type="email"
                placeholder="Enter your email"
                iconStart={<TbMail />}
                error={errors?.email?.message || fieldErrors.email}
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: "/^[^s@]+@[^s@]+.[^s@]+$/",
                    message: "Please enter a valid email address",
                  },
                })}
              />
            </div>
            <div className="my-3">
              <InputField
                type={showHidePassword ? "text" : "password"}
                placeholder="Enter your Password"
                iconStart={<TbLockPassword />}
                iconEnd={
                  showHidePassword ? (
                    <TbEye
                      className="cursor-pointer"
                      onClick={() => setShowHidePassword(!showHidePassword)}
                    />
                  ) : (
                    <TbEyeOff
                      className="cursor-pointer"
                      onClick={() => setShowHidePassword(!showHidePassword)}
                    />
                  )
                }
                error={errors?.password?.message || fieldErrors.password}
                {...register("password", {
                  required: "Password is required.",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters.",
                  },
                  validate: (value) => {
                    if (!/[A-Z]/.test(value))
                      return "Password must contain at least one uppercase letter.";
                    if (!/[a-z]/.test(value)) return;
                    if (!/[0-9]/.test(value))
                      return "Password must contain at least one number.";
                    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
                      return "Password must contain at least one special character.";
                  },
                })}
              />
            </div>
            <Button
              type="submit"
              className="font-bold w-full bg-blue-600 text-white rounded-lg"
            >
              {type === "signup" ? "Sign up" : "Login"}
            </Button>
          </form>
          <p className="mt-5 text-center">
            {type === "signup"
              ? "Already have an account?"
              : "Don't have an account?"}
            <NavLink
              to={type === "signup" ? "/login" : "/signup"}
              className="text-blue-600 ml-2"
            >
              {type === "signup" ? "Login" : "Sign up"}
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
}

export default React.memo(AuthForm);
