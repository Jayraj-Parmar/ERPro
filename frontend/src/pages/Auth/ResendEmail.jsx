import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../../components/common/Button";
import { useEffect } from "react";

function ResendEmail() {
  const [message, setMessage] = useState("");
  const location = useLocation();
  useEffect(() => setMessage(location.state?.message), [location.state]);
  return (
    <>
      {message && <p>{message}</p>}
      <Button type="submit" className="text-white bg-blue-600 rounded-lg p-2">
        Resend Mail
      </Button>
    </>
  );
}

export default ResendEmail;
