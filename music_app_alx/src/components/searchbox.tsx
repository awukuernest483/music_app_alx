import { Search } from "lucide-react";
import React from "react";

interface SearchboxProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Searchbox = ({ onSearch }: { onSearch: (q: string) => void }) => {
  return (
    <div className=" md:max-w-sm w-full text-center items-center bg-[#2A2D30] border border-[#3A3D40] rounded-md p-3 text-white flex gap-3">
      <Search className=" text-white" />
      <input
        type="text"
        onChange={(e) => onSearch(e.target.value)}
        className="bg-transparent outline-none w-full"
        placeholder="Search..."
      />
    </div>
  );
};

export default Searchbox;
