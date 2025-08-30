import { ChevronRight, LucideLogOut } from "lucide-react";
import authimage from "../assets/images/authimage.png";
import { useSpotifyStore } from "../assets/store/store";

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

  const { profile, logout } = useSpotifyStore();

  return (
    <div className="h-full  flex flex-col w-full p-10 gap-10">
      <div className="text-white font-bold text-lg mb-5">Settings</div>
      <div className="flex">
        <img
          src={profile?.images![0].url ?? authimage}
          alt="Auth"
          className="w-12 h-12 rounded-full mr-4"
        />
        <div className="flex flex-col">
          <p className="text-white text-lg font-bold">
            {profile?.display_name}
          </p>
          <p className="text-white/50 text-sm">{profile?.email}</p>
        </div>
      </div>
      <div className="flex flex-col">
        {settingsOptions.map((option) => (
          <button
            key={option.id}
            className="w-full max-w-sm flex flex-row cursor-pointer hover:bg-[#9CB2BA] transition-colors hover:text-white text-white px-2 py-3 mb-2 justify-between rounded-md"
          >
            {option.title}
            <ChevronRight />
          </button>
        ))}
      </div>

      <div className="flex  gap-1 items-start justify-start pb-10">
        <div
          className="flex h-fit gap-1 items-center justify-center rounded-full px-3 py-2 hover:bg-[#9CB2BA] hover:text-black text-white bg-black/50 cursor-pointer"
          onClick={() => {
            window.location.href = "/auth";
            logout();
          }}
        >
          <LucideLogOut className=" h-4 " />
          <p className="text-base ">Logout</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
