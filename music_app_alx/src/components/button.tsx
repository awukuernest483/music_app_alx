import React from "react";
import spotifylogo from "../assets/spotifylogo.svg";

interface ButtonProps {
  onClick: () => void;
  text: string;
  type?: "button" | "submit" | "reset";
  color?: string;
  textcolor?: string;
  imgpath?: string;
}

const Button = ({
  onClick,
  text,
  type = "button",
  color,
  textcolor,
  imgpath,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${color ?? "bg-[#0DBDF2]"} ${textcolor ?? "text-[#000000]"}
      p-4 rounded-lg cursor-pointer gap-4 text-center text-xl justify-center w-1/2 items-center hover:opacity-90 transition flex`}
    >
      {imgpath && <img src={spotifylogo} className="w-10 h-10" />}
      {text}
    </button>
  );
};

export default Button;
