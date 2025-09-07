import React, { useState } from "react";
import InputField from "../common/InputField";
import Button from "../common/Button";
import { useForm } from "react-hook-form";
import { LuUser } from "react-icons/lu";
import { HiOutlineMail } from "react-icons/hi";
import { TbLockPassword } from "react-icons/tb";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
function AuthForm({ type = "login", onSubmit, serverErrors, defaultValue }) {
  // console.log(defaultValue);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange", defaultValue });
  const [showHidePassword, setShowHidePassword] = useState(false);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {type === "signup" && (
          <div className="my-3">
            <InputField
              type="text"
              id="name"
              placeholder="Enter your Name"
              iconStart={<LuUser />}
              error={errors.name?.message || serverErrors?.name}
              {...register("name", { required: "Name is require" })}
            />
          </div>
        )}
        <div className="my-3">
          <InputField
            type="email"
            id="email"
            placeholder="Enter your email"
            iconStart={<HiOutlineMail />}
            error={errors.email?.message || serverErrors?.email}
            {...register("email", { required: "Email is required" })}
          />
        </div>
        <div className="my-3">
          <InputField
            type={showHidePassword ? "text" : "password"}
            id="password"
            placeholder="Enter your Password"
            iconStart={<TbLockPassword />}
            iconEnd={
              showHidePassword ? (
                <FaRegEye
                  onClick={() => setShowHidePassword(!showHidePassword)}
                />
              ) : (
                <FaRegEyeSlash
                  onClick={() => setShowHidePassword(!showHidePassword)}
                />
              )
            }
            error={errors.password?.message || serverErrors?.password}
            {...register("password", { required: "Password is required" })}
          />
        </div>
        <Button
          type="submit"
          className="py-2 px-4 bg-blue-600 text-white rounded-lg mt-5 disabled:opacity-50"
        >
          Submit
        </Button>
      </form>
    </>
  );
}

export default AuthForm;
