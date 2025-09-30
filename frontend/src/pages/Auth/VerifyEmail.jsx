import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resendEmail, sendOtp } from "../../api/authApi";
import { useForm } from "react-hook-form";
import Button from "../../components/common/Button";

function VerifyEmail() {
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const inputRefs = useRef([]);
  const email = location.state?.email;

  useEffect(() => {
    setError(location.state?.message || "");
  }, [location]);

  const handleInput = (e, index) => {
    if (e.target.value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const str = e.clipboardData.getData("text");
    const digits = str.split("");
    digits.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
        inputRefs.current[index].focus();
      }
    });
  };

  const onSubmit = async (data) => {
    try {
      setError("");
      const otp = data.otp.join("");
      const res = await resendEmail({ email, otp });
      if (res.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      if ([400, 403, 404].includes(error.status)) {
        setError(error.message);
      }
    }
  };

  const handleResend = async () => {
    try {
      const res = await sendOtp({ email });
      if (res.status === 200) {
        setError(res.message);
      }
    } catch (error) {
      if ([404, 429].includes(error.status)) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="flex justify-center">
      {error && <p className="text-red-500">{error}</p>}
      <div className="w-2xl flex justify-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center mb-8">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  className="outline-1 w-12 text-center mx-1"
                  {...register(`otp.${index}`, { required: true })}
                  ref={(e) => {
                    register(`otp.${index}`).ref(e);
                    inputRefs.current[index] = e;
                  }}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={(e) => handlePaste(e)}
                />
              ))}
          </div>
          <Button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Verify
          </Button>
        </form>
        <div>
          <Button
            onClick={handleResend}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Resend OTP
          </Button>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
