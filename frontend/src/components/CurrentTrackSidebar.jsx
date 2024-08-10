import React from 'react';
import { FaPlay, FaPause, FaForward, FaBackward } from 'react-icons/fa';

const CurrentTrackSidebar = ({ currentTrack }) => {
  return (
    <div className="w-[400px] flex justify-center items-end bg-[rgba(44,0,0,1)] text-white h-full">
      {currentTrack && (
        <div className="bg-custom-red shadow-custom-shadow w-[15vw] h-[20vw] m-4 rounded-3xl">
          <div className="flex items-center justify-center pt-4 px-4 font-bold text-xl">Now Playing</div>
          <img src="/currentimg.png" alt="Michael Jackson" className=" object-cover px-4  pt-2  rounded-3xl" />
          <div className="p-3">
            <div className="text-center ">
              <h3 className="text-md font-semibold truncate">{currentTrack.title}</h3>
              <p className="text-gray-300 text-sm">{currentTrack.artist}</p>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value="50" 
              className=" p-2 w-[12vw] bg-gray-600 rounded"
              onChange={() => {}}
            />
            <div className="flex justify-between items-center mt-1">
              <button aria-label="Previous">
                <FaBackward className="text-white text-2xl" />
              </button>
              <button aria-label="Play/Pause">
                <FaPlay className="text-white text-2xl" />
              </button>
              <button aria-label="Pause">
                <FaPause className="text-white text-2xl" />
              </button>
              <button aria-label="Next">
                <FaForward className="text-white text-2xl" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentTrackSidebar;

