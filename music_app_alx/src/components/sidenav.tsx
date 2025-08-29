"use client";

import { Library, LucideLogOut, Search, Settings, XIcon } from "lucide-react";
import Userheader from "./userheader";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../script";

interface SidenavProps {
  onClose?: () => void;
  isOpen?: boolean;
}

export const Sidenav = ({ onClose, isOpen = true }: SidenavProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navlinks = [
    {
      icon: <Search className="w-4 h-4 text-white" />,
      label: "Search",
      path: "/search",
      isActive: location.pathname === "/search",
    },
    {
      icon: <Library className="w-4 h-4 text-white" />,
      label: "Library",
      path: "/library",
      isActive: location.pathname === "/library",
    },
    {
      icon: <Settings className="w-4 h-4 text-white" />,
      label: "Settings",
      path: "/settings",
      isActive: location.pathname === "/settings",
    },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    // Close mobile menu after navigation
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Backdrop - only show on mobile when open */}
      {isOpen && onClose && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidenav */}
      <nav
        className={`
          fixed top-0 left-0 z-50 lg:relative lg:z-auto
          w-64 h-screen bg-[#1C2426] 
          transform transition-transform duration-300 ease-in-out lg:transform-none
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
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

          <div className="flex-1 pt-4 lg:pt-3 px-6 sm:px-8 lg:px-6 overflow-y-auto">
            <div className="flex flex-col h-full gap-6 lg:gap-5">
              {/* Links */}
              <section className="flex flex-col h-full gap-3 lg:gap-2.5">
                <div className="flex flex-col  h-full">
                  <Userheader name="Ernest Junior" />
                  {navlinks.map((item, index) => (
                    <div
                      onClick={() => handleNavClick(item.path)}
                      key={index}
                      className={`w-full flex-row flex justify-start gap-2 px-2.5 py-3 rounded-md hover:bg-[#9CB2BA] cursor-pointer transition-colors ${
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
                  <div className="h-full">
                    <div
                      className="flex h-full gap-1 items-end justify-center pb-10"
                      onClick={() => {
                        logout();
                      }}
                    >
                      <div
                        className="flex h-fit gap-1 items-center justify-center  rounded-full px-3 py-2 bg-black/50 cursor-pointer"
                        onClick={() => {
                          logout();
                        }}
                      >
                        <LucideLogOut className="text-white h-4" />
                        <p className="text-base text-white">Logout</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidenav;
