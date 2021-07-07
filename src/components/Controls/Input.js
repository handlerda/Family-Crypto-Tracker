import React from "react";

function Input({ label, type, value, required = true, handleChange, css }) {
  return (
    <div>
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <div>
        <input
          type={type}
          value={value}
          onChange={handleChange}
          required={required}
          className={css}
        />
      </div>
    </div>
  );
}

export default Input;
