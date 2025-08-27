import React from "react";
import authimage from "../assets/images/authimage.png";

interface MusiccardsmallProps {
  title?: string;
  imageUrl?: string;
}

const Musiccardsmall = ({ title, imageUrl }: MusiccardsmallProps) => {
  return (
    <div className="w-full h-20  bg-[#1C2426] border border-[#3B4F54] rounded-md">
      <div className="flex gap-4 p-4 justify-center items-center h-full">
        <img
          src={imageUrl ?? authimage}
          alt="Music"
          className="w-10 h-10 object-cover rounded-md"
        />

        <h2 className="text-lg font-semibold text-white w-full">{title}</h2>
      </div>
    </div>
  );
};

export default Musiccardsmall;
