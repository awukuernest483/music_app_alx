import React from "react";

interface InputProps {
  placeholder: string;

  type?: string;
}

const Input = ({ placeholder, type }: InputProps) => {
  return (
    <input
      className="bg-[#9CB2BA] w-full p-4 rounded-md text-[#000000] text-base "
      placeholder={placeholder}
      type={type}
    />
  );
};

export default Input;
