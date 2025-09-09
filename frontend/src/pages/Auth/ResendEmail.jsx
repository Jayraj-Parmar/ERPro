import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../../components/common/Button";
import { useEffect } from "react";
import { resendEmail } from "../../api/authApi";

function ResendEmail() {
  const [message, setMessage] = useState("");
  const location = useLocation();
  const email = location.state?.email;
  useEffect(() => {
    setMessage(location.state?.message);
  }, [location.state]);
  const handleResend = async () => {
    setMessage("");
    try {
      const res = await resendEmail({ email });
      if (res.status === 200) setMessage(res.message);
    } catch (error) {
      if (error.status === 404) setMessage(error.message);
      if (error.status === 429) setMessage(error.message);
      if (error.status === 500) setMessage(error.message);
    }
  };
  return (
    <>
      {message && <p>{message}</p>}
      <Button
        onClick={handleResend}
        type="submit"
        className="py-2 px-4 bg-blue-600 text-white rounded-lg mt-5 disabled:opacity-50"
      >
        Resend Email
      </Button>
    </>
  );
}

export default ResendEmail;
