// src/components/ui/button.js
import React from 'react';

const Button = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={`py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
