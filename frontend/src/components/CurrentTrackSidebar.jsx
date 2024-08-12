import React, { useEffect, useState } from 'react';
import { FaPlay, FaPause, FaForward, FaBackward, FaStop } from 'react-icons/fa';

const CurrentTrackSidebar = ({ currentTrack, setCurrentTrack, currentSound, setCurrentSound, trackList }) => {
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

  const playTrack = (track) => {
    if (currentSound) {
      currentSound.stop();
    }

    setCurrentTrack(track);
    const sound = new Howl({
      src: [track.src],
      html5: true,
      onend: () => {
        const currentIndex = trackList.findIndex(t => t.id === track.id);
        const nextIndex = currentIndex + 1;
        if (nextIndex < trackList.length) {
          playTrack(trackList[nextIndex]);
        } else {
          setCurrentTrack(null); // Reset when the last track ends
          setCurrentSound(null);
        }
      }
    });
    setCurrentSound(sound);
    sound.play();
  };

  const handleSeekChange = (event) => {
    const newSeek = event.target.value;
    setSeek(newSeek);
    if (currentSound) {
      currentSound.seek(newSeek); // Seek to the selected position
    }
  };

  const handleNext = () => {
    if (currentTrack) {
      const currentIndex = trackList.findIndex(t => t.id === currentTrack.id);
      const nextIndex = currentIndex + 1;
      if (nextIndex < trackList.length) {
        playTrack(trackList[nextIndex]);
      }
    }
  };

  const handlePrevious = () => {
    if (currentTrack) {
      const currentIndex = trackList.findIndex(t => t.id === currentTrack.id);
      const previousIndex = currentIndex - 1;
      if (previousIndex >= 0) {
        playTrack(trackList[previousIndex]);
      }
    }
  };

  return (
    <div className="fixed bottom-0 lg:static w-full lg:w-[400px] lg:flex justify-center items-end bg-[rgba(44,0,0,1)] text-white h-[100px] lg:h-full hidden ">
      {currentTrack && (
        <div className="bg-custom-red shadow-lg w-full lg:w-[15vw] h-full lg:h-[20vw] lg:m-4 rounded-3xl flex flex-col lg:flex-none">
          <div className="flex items-center justify-center pt-4 px-4 font-bold text-xl">Now Playing</div>
          <img src="/currentimg.png" alt={currentTrack.title} className="object-cover px-4 pt-2 rounded-3xl" />
          <div className="p-3">
            <div className="text-center">
              <h3 className="text-sm md:text-md font-semibold truncate">{currentTrack.title}</h3>
              <p className="text-gray-300 text-xs md:text-sm">{currentTrack.artist}</p>
            </div>
            <input
              type="range"
              min="0"
              max={currentSound ? currentSound.duration() : 100} 
              value={seek}
              className="p-2 w-[80vw] md:w-[12vw] bg-gray-600 rounded"
              onChange={handleSeekChange}
            />
            <div className="flex justify-between items-center mt-2">
              <button aria-label="Previous" onClick={handlePrevious}>
                <FaBackward className="text-white text-xl md:text-2xl" />
              </button>
              <button aria-label="Play/Pause" onClick={togglePlayPause}>
                {currentSound && currentSound.playing() ? (
                  <FaPause className="text-white text-xl md:text-2xl" />
                ) : (
                  <FaPlay className="text-white text-xl md:text-2xl" />
                )}
              </button>
              <button aria-label="Stop" onClick={stopMusic}>
                <FaStop className="text-white text-xl md:text-2xl" />
              </button>
              <button aria-label="Next" onClick={handleNext}>
                <FaForward className="text-white text-xl md:text-2xl" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentTrackSidebar;
