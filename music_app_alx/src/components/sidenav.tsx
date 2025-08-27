"use client";

import { Library, Search, Settings, XIcon } from "lucide-react";
import React, { useState } from "react";
import Userheader from "./userheader";

interface SidenavProps {
  onClose?: () => void;
}

export const Sidenav = ({ onClose }: SidenavProps) => {
  const [isSelected, setIsSelected] = useState(false);

  const navlinks = [
    {
      icon: <Search className="w-4 h-4 text-white" />,
      label: "Search",
      isActive: isSelected,
    },
    {
      icon: <Library className="w-4 h-4 text-white" />,
      label: "Library",
      isActive: isSelected,
    },
    {
      icon: <Settings className="w-4 h-4 text-white" />,
      label: "Settings",
      isActive: isSelected,
    },
  ];

  return (
    <nav className="min-w-xs h-full bg-[#1C2426] relative">
      <div className="flex flex-col h-full">
        <header className="py-6 px-6 relative">
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 lg:hidden p-1 rounded-md hover:bg-white/10 transition-colors"
              aria-label="Close menu"
            >
              <XIcon className="w-5 h-5 text-white" />
            </button>
          )}
        </header>

        <div className="flex-1 pt-4 lg:pt-3 px-6 sm:px-8 lg:px-lg overflow-y-auto">
          <div className="flex flex-col gap-6 lg:gap-5">
            {/* Links */}
            <section className="flex flex-col gap-3 lg:gap-2.5">
              <div className="flex flex-col">
                <Userheader name="Ernest Junior" />
                {navlinks.map((item, index) => (
                  <div
                    onClick={() => setIsSelected(true)}
                    key={index}
                    className={`w-full flex-row flex justify-start gap-2 px-2.5 py-3 rounded-md hover:bg-[#9CB2BA] cursor-pointer ${
                      item.isActive ? "bg-[#9CB2BA]" : "bg-transparent"
                    }`}
                  >
                    {item.icon}
                    <span
                      className={`font-medium truncate ${
                        item.isActive
                          ? "text-white text-sm"
                          : "text-white text-sm"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidenav;
