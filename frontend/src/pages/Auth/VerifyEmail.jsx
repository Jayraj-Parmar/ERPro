import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resendEmail, sendOtp } from "../../api/authApi";
import { useForm } from "react-hook-form";
import Button from "../../components/common/Button";
import Error from "../../components/common/Error";

function VerifyEmail() {
  const [error, setError] = useState({});
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const inputRefs = useRef([]);
  const email = location.state?.email;

  useEffect(() => {
    setError({
      message: location.state?.message,
      success: location.state?.success,
    });
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
    setError({});
    try {
      const otp = data.otp.join("");
      const res = await resendEmail({ email, otp });
      if (res.status === 200) {
        navigate("/login", {
          state: {
            message: res.message,
            success: res?.success,
          },
        });
      }
    } catch (error) {
      if ([400, 403, 404].includes(error.status)) {
        setError({ message: error.message, success: error?.success });
      }
    }
  };

  const handleResend = async () => {
    setError({});
    try {
      const res = await sendOtp({ email });
      if (res.status === 200) {
        setError({ message: error.message, success: error?.success });
      }
    } catch (error) {
      if ([404, 429].includes(error.status)) {
        setError({ message: error.message, success: error?.success });
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-full">
        <div className="bg-white sm:p-10 p-6 rounded-2xl border border-gray-300">
          <h1 className="text-center font-bold text-2xl">Verify Email</h1>
          {error.message && <Error error={error} />}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-center py-6">
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    className="outline-1 w-8 text-center mx-1 rounded-sm py-1"
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
              className="w-full bg-blue-600 text-white rounded-lg mt-5"
            >
              Verify
            </Button>
          </form>
          <div className="text-center">
            <Button
              className="w-fit bg-gray-900 rounded-full text-white mt-5"
              onClick={handleResend}
            >
              Resend OTP
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default VerifyEmail;
