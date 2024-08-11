import React, { useEffect, useState } from 'react';
import { FaPlay, FaPause, FaForward, FaBackward, FaStop } from 'react-icons/fa';

const CurrentTrackSidebar = ({ currentTrack, setCurrentTrack, currentSound, setCurrentSound }) => {
  const [seek, setSeek] = useState(0);

  useEffect(() => {
    let timerId;

    if (currentSound) {
      timerId = setInterval(() => {
        setSeek(currentSound.seek()); // Update seek state every second
      }, 1000);
    }

    return () => clearInterval(timerId);
  }, [currentSound]);

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

  const handleSeekChange = (event) => {
    const newSeek = event.target.value;
    setSeek(newSeek);
    if (currentSound) {
      currentSound.seek(newSeek); // Seek to the selected position
    }
  };

  return (
    <div className="w-[400px] flex justify-center items-end bg-[rgba(44,0,0,1)] text-white h-full">
      {currentTrack && (
        <div className="bg-custom-red shadow-custom-shadow w-[15vw] h-[20vw] m-4 rounded-3xl">
          <div className="flex items-center justify-center pt-4 px-4 font-bold text-xl">Now Playing</div>
          <img src="/currentimg.png" alt={currentTrack.title} className="object-cover px-4 pt-2 rounded-3xl" />
          <div className="p-3">
            <div className="text-center">
              <h3 className="text-md font-semibold truncate">{currentTrack.title}</h3>
              <p className="text-gray-300 text-sm">{currentTrack.artist}</p>
            </div>
            <input
              type="range"
              min="0"
              max={currentSound ? currentSound.duration() : 100} 
              value={seek}
              className="p-2 w-[12vw] bg-gray-600 rounded"
              onChange={handleSeekChange}
            />
            <div className="flex justify-between items-center mt-1">
              <button aria-label="Previous">
                <FaBackward className="text-white text-2xl" />
              </button>
              <button aria-label="Play/Pause" onClick={togglePlayPause}>
                {currentSound && currentSound.playing() ? (
                  <FaPause className="text-white text-2xl" />
                ) : (
                  <FaPlay className="text-white text-2xl" />
                )}
              </button>
              <button aria-label="Stop" onClick={stopMusic}>
                <FaStop className="text-white text-2xl" />
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
