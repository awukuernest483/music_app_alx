import React from "react";
import authimage from "../assets/images/authimage.png";

interface MusiccardsmallProps {
  title?: string;
  imageUrl?: string;
  iscategory?: boolean;
  onClick?: () => void;
}

const Musiccardsmall = ({
  title,
  imageUrl,
  iscategory,
  onClick,
}: MusiccardsmallProps) => {
  return (
    <div
      onClick={onClick}
      className={`${
        iscategory == true ? "w-fit" : "w-full"
      } h-20  bg-[#1C2426] border border-[#3B4F54] rounded-md cursor-pointer`}
    >
      <div className="flex gap-4 p-0 justify-center items-center h-full">
        <img
          src={imageUrl ?? authimage}
          alt="Music"
          className={`${
            iscategory == true ? "h-20 w-20" : "h-10 w-10 ml-5"
          }  object-cover rounded-md`}
        />

        <h2 className="text-lg font-semibold text-white w-full pr-10">
          {title}
        </h2>
      </div>
    </div>
  );
};

export default Musiccardsmall;
