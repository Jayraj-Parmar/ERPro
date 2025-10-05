import React, { useState } from "react";
import { TbAlertCircle, TbX } from "react-icons/tb";

function Error({ error }) {
  const [dismiss, setDismiss] = useState(false);
  return (
    <div
      className={`my-7 p-2 ${
        error.success === true
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-500"
      }  rounded-lg  flex justify-between ${dismiss ? "hidden" : ""}`}
    >
      <div className="flex">
        <TbAlertCircle size={25} className="mr-2 shrink-0" />
        <p className="ps-2 pe-4">{error.message}</p>
      </div>
      <button className="h-fit" onClick={() => setDismiss(true)}>
        <TbX size={25} className="shrink-0" />
      </button>
    </div>
  );
}

export default Error;
