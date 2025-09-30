import React, { useState } from "react";
import InputField from "../common/InputField";
import Button from "../common/Button";
import { useForm } from "react-hook-form";
import {
  TbUser,
  TbLockPassword,
  TbMail,
  TbEye,
  TbEyeOff,
} from "react-icons/tb";
function AuthForm({ type = "login", onSubmit, fieldErrors, error }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showHidePassword, setShowHidePassword] = useState(false);
  return (
    <>
      {error && <p>{error}</p>}
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
              pettern: {
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
                <TbEye onClick={() => setShowHidePassword(!showHidePassword)} />
              ) : (
                <TbEyeOff
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
          className="py-2 px-4 bg-blue-600 text-white rounded-lg mt-5 disabled:opacity-50"
        >
          {type}
        </Button>
      </form>
    </>
  );
}

export default AuthForm;
