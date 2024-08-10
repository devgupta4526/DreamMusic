import React from "react";

const Sidebar = () => {
  return (
    <div className="w-[400px] bg-customBlack h-screen flex flex-col justify-between text-white">
      <div className="p-6">
      <img src="/Logo.png" alt="" />
        {/* <div className="text-2xl font-bold">
          
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5353] via-[#FF5353] to-[#E91E1E]">
            Dream
          </span>
          Music
        </div> */}
      
        <nav className="mt-10">
          <p className="py-2.5 px-4 text-sm">Menu</p>
          <a href="#" className="flex gap-3 font-semibold items-center py-2.5 px-4 rounded transition duration-200 hover:bg-red-700">
            <img src="Home.png" alt="" />
            Home
          </a>
          <a href="#" className="flex gap-3 font-semibold items-center py-2.5 px-4 rounded transition duration-200 hover:bg-red-700">
          <img src="Trending.png" alt="" />
            Trends
          </a>
          <a href="#" className="flex gap-3 font-semibold items-center py-2.5 px-4 rounded transition duration-200 hover:bg-red-700">
          <img src="Music.png" alt="" />
            Library
          </a>
          <a href="#" className="flex gap-3 font-semibold items-center py-2.5 px-4 rounded transition duration-200 hover:bg-red-700">
          <img src="Discover.png" alt="" />
            Discover
          </a>
        </nav>
      </div>
      <div className="p-6">
        <a href="#" className="flex gap-3 font-semibold items-center py-2.5 px-4 rounded transition duration-200 hover:bg-red-700">
        <img src="Settings.png" alt="" />
          Settings
        </a>
        <a href="#" className="flex gap-3 font-semibold items-center py-2.5 px-4 rounded transition duration-200 hover:bg-red-700">
        <img src="LogOut.png" alt="" />
          Log Out
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
