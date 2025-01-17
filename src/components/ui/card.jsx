// src/components/ui/card.js
import React from 'react';

export const Card = ({ children, className, ...props }) => {
  return (
    <div className={`bg-white shadow-lg rounded-lg overflow-hidden ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className }) => {
  return (
    <div className={`p-4 border-b ${className}`}>
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className }) => {
  return (
    <h2 className={`text-xl font-semibold ${className}`}>
      {children}
    </h2>
  );
};

export const CardContent = ({ children, className }) => {
  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  );
};

export const CardFooter = ({ children, className }) => {
  return (
    <div className={`p-4 border-t ${className}`}>
      {children}
    </div>
  );
};
