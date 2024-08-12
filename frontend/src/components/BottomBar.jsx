import React from 'react';
import { FaPlay, FaPause, FaForward, FaBackward, FaStop } from 'react-icons/fa';

const BottomBar = ({ currentTrack, setCurrentSound, setCurrentTrack, currentSound }) => {
  const togglePlayPause = () => {
    if (currentSound) {
      if (currentSound.playing()) {
        currentSound.pause();
      } else {
        currentSound.play();
      }
    }
  };

  const stopMusic = () => {
    if (currentSound) {
      currentSound.stop();
      setCurrentTrack(null);
      setCurrentSound(null);
    }
  };

  return (
   <div className="fixed bottom-0 w-full  p-4 flex justify-between items-center text-white lg:hidden border-t border-custom-red z-40"> 
      {currentTrack ? (
        <>
          <div className="flex items-center">
            <img src="/currentimg.png" alt={currentTrack.title} className="w-16 h-16 object-cover rounded-xl mr-3 border-2 border-custom-red" />
            <div className="flex flex-col">
              <p className="text-sm font-semibold">{currentTrack.title}</p>
              <p className="text-xs text-gray-400">{currentTrack.artist}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              aria-label="Previous" 
              className="p-2 rounded-full hover:bg-gray-700"
              onClick={() => currentSound?.playPrevious()}
            >
              <FaBackward className="text-xl" />
            </button>
            <button 
              aria-label="Play/Pause" 
              className="p-2 rounded-full hover:bg-gray-700" 
              onClick={togglePlayPause}
            >
              {currentSound && currentSound.playing() ? (
                <FaPause className="text-xl" />
              ) : (
                <FaPlay className="text-xl" />
              )}
            </button>
            <button 
              aria-label="Stop" 
              className="p-2 rounded-full hover:bg-gray-700" 
              onClick={stopMusic}
            >
              <FaStop className="text-xl" />
            </button>
            <button 
              aria-label="Next" 
              className="p-2 rounded-full hover:bg-gray-700" 
              onClick={() => currentSound?.playNext()}
            >
              <FaForward className="text-xl" />
            </button>
          </div>
        </>
      ) : (
        <p className="text-sm">No track playing</p>
      )}
    </div>
  );
};

export default BottomBar;
