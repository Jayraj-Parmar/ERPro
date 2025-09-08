import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { verifyEmail } from "../../api/authApi";
function VerifyEmail() {
  const [message, setMessage] = useState();
  const navigate = useNavigate();
  const { verificationToken } = useParams();
  useEffect(() => {
    if (verificationToken) {
      verifyEmail(verificationToken)
        .then((res) => {
          if (res?.status === 200) {
            navigate(res?.data?.redirectTo, {
              state: { message: res?.message, email: res?.data?.email },
            });
          }
        })
        .catch((error) => {
          if (error.status === 400 || error.status === 409) {
            setMessage(error?.message);
          }
          console.log(error);
        });
    }
  }, [verificationToken, navigate]);

  return <>{message && <p>{message}</p>}</>;
}

export default VerifyEmail;
