import React from "react";

interface CustomInputProps {
  placeholder: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const CustomInput = ({
  placeholder,
  value,
  onChange,
  type,
}: CustomInputProps) => {
  return (
    <input
      className="bg-[#9CB2BA] w-full p-4 rounded-md text-[#000000] text-base "
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      type={type}
    />
  );
};

export default CustomInput;
