import React from "react";
import spotifylogo from "../assets/spotifylogo.svg";

interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
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
      md:p-4 p-2 rounded-lg cursor-pointer gap-4 text-center md:text-xl text-sm justify-center md:w-1/2 w-full items-center hover:opacity-90 transition flex`}
    >
      {imgpath && <img src={spotifylogo} className="w-10 md:h-10 h-8" />}
      {text}
    </button>
  );
};

export default Button;
