import React, { useState } from "react";
import InputField from "../../components/common/InputField";
import Button from "../../components/common/Button";
import { LuUser } from "react-icons/lu";
import { HiOutlineMail } from "react-icons/hi";
import { TbLockPassword } from "react-icons/tb";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { signupUser } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
function Signup() {
  const [formData, setFormDate] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setshowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  // const [message, setMessage] = useState("");
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required..";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required..";
    } else if (formData.email.match(/\S+@\S+\.\S+/)) {
      newErrors.email = "Valid email required..";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required..";
    } else if (formData.password.trim().length < 8) {
      newErrors.password = "Password must be at least 8 characters long..";
    } else if (
      !formData.password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
    ) {
      newErrors.password =
        "Password must include uppercase, lowercase, number, and special character..";
    }

    return newErrors;
  };
  const handleChange = (e) => {
    setFormDate({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    try {
      const res = await signupUser(formData);
      if (res.status === 200) {
        navigate(res.data?.redirectTo, {
          state: { email: res.data?.email, message: res.message },
        });
      }
    } catch (error) {
      if (error.status === 422 && error.errors.length > 0) {
        const fiedErrors = {};
        error.errors.forEach((err) => {
          fiedErrors[err.path] = err.msg;
        });
        setErrors(fiedErrors);
      }
      if (error.status === 409) {
        navigate(error.data?.redirectTo, {
          state: { message: error?.message, email: error.data?.email },
        });
      }
    }
  };
  const togglePassword = () => {
    setshowPassword((prev) => !prev);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <InputField
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your Name"
            iconStart={<LuUser />}
            error={errors.name}
          />
        </div>
        <div className="my-3">
          <InputField
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            iconStart={<HiOutlineMail />}
            error={errors.email}
          />
        </div>
        <div className="mt-3">
          <InputField
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            iconStart={<TbLockPassword />}
            iconEnd={
              showPassword ? (
                <FaRegEye className="cursor-pointer" onClick={togglePassword} />
              ) : (
                <FaRegEyeSlash
                  className="cursor-pointer"
                  onClick={togglePassword}
                />
              )
            }
            error={errors.password}
          />
        </div>
        <Button
          type="submit"
          className="py-2 px-4 bg-blue-600 text-white rounded-lg mt-5 disabled:opacity-50"
          disabled={
            !formData.name.trim() ||
            !formData.email.trim() ||
            !formData.password.trim()
          }
        >
          Submit
        </Button>
      </form>
    </>
  );
}

export default Signup;
