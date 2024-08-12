import React from "react";

const Sidebar = ({ isOpen, toggleSidebar }) => {

  return (
    <div>
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:static top-0 left-0 w-[250px] bg-customBlack h-full flex flex-col justify-between text-white transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-6">
          <img src="/Logo.png" alt="Logo" className="h-8 lg:h-auto" />
          <nav className="mt-10">
            <p className="py-2.5 px-4 text-sm">Menu</p>
            <a
              href="#"
              className="flex gap-3 font-semibold items-center py-2.5 px-4 rounded transition duration-200 hover:bg-red-700"
            >
              <img src="Home.png" alt="" />
              Home
            </a>
            <a
              href="#"
              className="flex gap-3 font-semibold items-center py-2.5 px-4 rounded transition duration-200 hover:bg-red-700"
            >
              <img src="Trending.png" alt="" />
              Trends
            </a>
            <a
              href="#"
              className="flex gap-3 font-semibold items-center py-2.5 px-4 rounded transition duration-200 hover:bg-red-700"
            >
              <img src="Music.png" alt="" />
              Library
            </a>
            <a
              href="#"
              className="flex gap-3 font-semibold items-center py-2.5 px-4 rounded transition duration-200 hover:bg-red-700"
            >
              <img src="Discover.png" alt="" />
              Discover
            </a>
          </nav>
        </div>
        <div className="p-6">
          <a
            href="#"
            className="flex gap-3 font-semibold items-center py-2.5 px-4 rounded transition duration-200 hover:bg-red-700"
          >
            <img src="Settings.png" alt="" />
            Settings
          </a>
          <a
            href="#"
            className="flex gap-3 font-semibold items-center py-2.5 px-4 rounded transition duration-200 hover:bg-red-700"
          >
            <img src="LogOut.png" alt="" />
            Log Out
          </a>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
        />
      )}
    </div>
  );
};

export default Sidebar;