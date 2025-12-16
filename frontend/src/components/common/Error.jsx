import React, { useEffect, useState } from "react";
import { TbAlertCircle, TbX } from "react-icons/tb";

function Error({ error }) {
  const [dismiss, setDismiss] = useState(false);
  useEffect(() => {
    setDismiss(false);
  }, [error]);
  if (!error || dismiss) return null;
  return (
    <div className="top-0 sticky z-40">
      <div
        className={`mb-4 p-2 ${
          error.success === true
            ? "bg-green-100 text-green-800 border border-green-700"
            : "bg-red-100 text-red-500 border border-red-400"
        }  rounded-lg  flex justify-between ${dismiss ? "hidden" : ""}`}
      >
        <div className="flex">
          <TbAlertCircle size={25} className="mr-2 shrink-0" />
          <p className="ps-2 pe-4">{error.message}</p>
        </div>
        <button
          className="h-fit"
          onClick={(e) => {
            e.preventDefault();
            setDismiss(true);
          }}
        >
          <TbX size={25} className="shrink-0" />
        </button>
      </div>
    </div>
  );
}

export default Error;
