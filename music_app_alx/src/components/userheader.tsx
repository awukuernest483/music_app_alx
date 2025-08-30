import React from "react";
import authimage from "../assets/images/authimage.png";
import { useSpotifyStore } from "../assets/store/store";

interface UserheaderProps {
  name?: string;
  imageUrl?: string;
}

const Userheader = ({ name, imageUrl }: UserheaderProps) => {
  const { profile, accessToken, logout } = useSpotifyStore();
  return (
    <div className="flex gap-5 items-center mb-10">
      <img
        src={profile?.images![0].url ?? authimage}
        alt={name}
        className="w-12 h-12 border-2 rounded-xl border-white"
      />

      <p className="text-white">{name ?? "Username"}</p>
    </div>
  );
};

export default Userheader;
