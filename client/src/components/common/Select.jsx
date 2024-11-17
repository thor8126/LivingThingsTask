import React from "react";

export const Select = ({ options, label, ...props }) => (
  <div className="flex flex-col gap-1">
    {label && <label className="text-sm font-medium">{label}</label>}
    <select
      className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);
