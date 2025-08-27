import React from "react";

interface ButtonProps {
  onClick: () => void;
  text: string;
}

const Button = ({ onClick, text }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-[#0DBDF2] text-[#000000] p-4 rounded-md cursor-pointer hover:opacity-90 transition"
    >
      {text}
    </button>
  );
};

export default Button;
