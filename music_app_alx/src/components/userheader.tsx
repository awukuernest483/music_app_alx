import React from "react";
import authimage from "../assets/images/authimage.png";

interface UserheaderProps {
  name?: string;
  imageUrl?: string;
}

const Userheader = ({ name, imageUrl }: UserheaderProps) => {
  return (
    <div className="flex gap-5 items-center mb-10">
      <img
        src={imageUrl ?? authimage}
        alt={name}
        className="w-12 h-12 border-2 rounded-xl border-white"
      />

      <p className="text-white">{name ?? "Username"}</p>
    </div>
  );
};

export default Userheader;
