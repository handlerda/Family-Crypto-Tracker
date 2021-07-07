import React from "react";

function Header({ title, details }) {
  return (
    <div className="pb-5 border-b border-gray-200">
      <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
      {details && (
        <p className="mt-2 max-w-4xl text-sm text-gray-500">{details}</p>
      )}
    </div>
  );
}

export default Header;
