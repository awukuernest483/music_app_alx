import { ChevronRight } from "lucide-react";
import React from "react";
import authimage from "../assets/images/authimage.png";

const Settings = () => {
  const settingsOptions = [
    { id: 1, title: "Account" },
    { id: 2, title: "Languages" },
    { id: 3, title: "Devices" },
    { id: 4, title: "Audio Quality" },
    { id: 5, title: "Storage" },
    { id: 6, title: "Notifications" },
    { id: 7, title: "About" },
  ];

  return (
    <div className="h-full  flex flex-col w-full p-10 gap-10">
      <div className="text-white font-bold text-lg mb-5">Settings</div>
      <div className="flex">
        <img
          src={authimage}
          alt="Auth"
          className="w-12 h-12 rounded-full mr-4"
        />
        <div className="flex flex-col">
          <p className="text-white">Username</p>
          <p className="text-white">Email</p>
        </div>
      </div>
      <div className="flex flex-col">
        {settingsOptions.map((option) => (
          <button
            key={option.id}
            className="w-full flex flex-row cursor-pointer hover:bg-amber-50 hover:text-black text-white px-2 py-2 mb-2 justify-between rounded-md"
          >
            {option.title}
            <ChevronRight />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Settings;
