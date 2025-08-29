import React from "react";

interface CustomInputProps {
  placeholder: string;

  type?: string;
}

const CustomInput = ({ placeholder, type }: CustomInputProps) => {
  return (
    <input
      className="bg-[#9CB2BA] w-full p-4 rounded-md text-[#000000] text-base "
      placeholder={placeholder}
      type={type}
    />
  );
};

export default CustomInput;
