import React from "react";

interface GenrecardProps {
  title?: string;
}

const Genrecard = ({ title }: GenrecardProps) => {
  return (
    <div className="text-white rounded-md p-2 bg-[#293638] text-center w-fit">
      {title}
    </div>
  );
};

export default Genrecard;
