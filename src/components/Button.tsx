import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-500 text-white px-4 py-2 rounded ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
