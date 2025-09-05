import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import InputField from "../../components/common/InputField";
import Button from "../../components/common/Button";
import { HiOutlineMail } from "react-icons/hi";
import { TbLockPassword } from "react-icons/tb";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      // console.log(location.state);
    } else if (location.state?.email) {
      setFormData((prev) => ({ ...prev, email: location.state.email }));
    }
  }, [location.state]);
  // const [errors, setErrors] = useState();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleSubmit = () => {};
  return (
    <>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <InputField
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            iconStart={<HiOutlineMail />}
            //   error={errors.email}
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
            //   error={errors.password}
          />
        </div>
        <Button
          type="submit"
          className="py-2 px-4 bg-blue-600 text-white rounded-lg mt-5"
        >
          Submit
        </Button>
      </form>
    </>
  );
}

export default Login;
