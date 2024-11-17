import React from "react";

export const Input = ({ label, error, ...props }) => (
  <div className="flex flex-col gap-1">
    {label && <label className="text-sm font-medium">{label}</label>}
    <input
      className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    />
    {error && <span className="text-red-500 text-sm">{error}</span>}
  </div>
);
