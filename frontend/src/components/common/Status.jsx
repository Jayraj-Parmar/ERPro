import React from "react";
import { Controller } from "react-hook-form";

function Status({ watch, control }) {
  return (
    <>
      {/* Status */}
      <div className="mt-4 flex items-center gap-3">
        <label>Status</label>
        <Controller
          control={control}
          name="status"
          render={({ field: { value, onChange } }) => (
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={value === "active"}
                onChange={(e) =>
                  onChange(e.target.checked ? "active" : "inactive")
                }
              />
              <div
                className={`w-11 h-6 rounded-full transition-colors ${
                  value === "active" ? "bg-green-500" : "bg-gray-400"
                }`}
              ></div>
              <span
                className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ${
                  value === "active" ? "translate-x-5" : ""
                }`}
              ></span>
            </label>
          )}
        />

        <span
          className={`text-sm font-semibold ${
            watch("status") === "active" ? "text-green-600" : "text-gray-500"
          }`}
        >
          {watch("status")}
        </span>
      </div>
    </>
  );
}

export default Status;
