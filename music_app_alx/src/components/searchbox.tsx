import { Search } from "lucide-react";
import React from "react";

interface SearchboxProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Searchbox = ({ value, onChange }: SearchboxProps) => {
  return (
    <div className=" max-w-sm w-sm text-center items-center bg-[#2A2D30] border border-[#3A3D40] rounded-md p-3 text-white flex gap-3">
      <Search className=" text-white" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="bg-transparent outline-none w-full"
        placeholder="Search..."
      />
    </div>
  );
};

export default Searchbox;
