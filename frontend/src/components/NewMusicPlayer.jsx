import React, { useRef, useState } from "react";
import { Howl } from "howler";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { TouchBackend } from 'react-dnd-touch-backend';
import update from "immutability-helper";
import { FaBars } from "react-icons/fa";

const NewMusicPlayer = ({ currentTrack, setCurrentTrack, currentSound, setCurrentSound, toggleSidebar, trackList, setTrackList }) => {
  const playTrack = (track, autoPlayNext = true) => {
    if (currentSound) {
      currentSound.stop();
    }

    setCurrentTrack(track);
    const sound = new Howl({
      src: [track.src],
      html5: true,
      onend: () => {
        if (autoPlayNext) {
          const currentIndex = trackList.findIndex(t => t.id === track.id);
          const nextIndex = currentIndex + 1;
          if (nextIndex < trackList.length) {
            playTrack(trackList[nextIndex]);
          } else {
            setCurrentTrack(null);
            setCurrentSound(null);
          }
        }
      }
    });
    setCurrentSound(sound);
    sound.play();
  };

  const moveTrack = (dragIndex, hoverIndex) => {
    const draggedTrack = trackList[dragIndex];
    setTrackList(update(trackList, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, draggedTrack]
      ]
    }));
  };

  const TrackRow = ({ track, index }) => {
    const ref = useRef(null);
    const [, drop] = useDrop({
      accept: "TRACK",
      hover(item, monitor) {
        if (!ref.current) return;
        const dragIndex = item.index;
        const hoverIndex = index;
        if (dragIndex === hoverIndex) return;

        const hoverBoundingRect = ref.current.getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

        moveTrack(dragIndex, hoverIndex);
        item.index = hoverIndex;
      },
    });

    const [{ isDragging }, drag] = useDrag({
      type: "TRACK",
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    drag(drop(ref));

    return (
      <tr
        ref={ref}
        onClick={() => playTrack(track)}
        className={`cursor-pointer ${currentTrack?.id === track.id ? "bg-custom-red border-l-8 border-red-700" : "bg-transparent"} ${isDragging ? "opacity-50" : "hover:bg-gray-700"}`}
      >
        <td className="px-2 md:px-4 py-2">{index + 1}</td>
        <td className="px-2 md:px-4 py-2">{track.title}</td>
        <td className="px-2 md:px-4 py-2">{track.playing}</td>
        <td className="px-2 md:px-4 py-2">{track.time}</td>
        <td className="hidden md:table-cell px-2 md:px-4 py-2">{track.album}</td>
      </tr>
    );
  };

  return (
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
      <div className='w-full h-screen bg-[linear-gradient(180deg,#4C0000_0%,#0A0A0A_100%),linear-gradient(90deg,rgba(0,0,0,0)_73.01%,rgba(15,15,15,0.6)_73.01%)] p-2'>
        <div className="flex flex-col w-full h-screen bg-[linear-gradient(180deg,#4C0000_0%,#0A0A0A_100%),linear-gradient(90deg,rgba(0,0,0,0)_73.01%,rgba(15,15,15,0.6)_73.01%)] text-white">
          <div className="flex flex-col md:flex-row justify-between items-start px-4 md:px-8 mt-4 space-y-4 md:space-y-0">
            <div className="flex gap-4 md:gap-6 text-white">
              <button className="lg:hidden" onClick={toggleSidebar}>
                <FaBars className="text-2xl" />
              </button>
              <a href="#" className="hover:text-red-500">Music</a>
              <a href="#" className="hover:text-red-500">Podcast</a>
              <a href="#" className="hover:text-red-500">Live</a>
              <a href="#" className="hover:text-red-500">Radio</a>
            </div>
            <input type="text" placeholder="Michael Jackson" className="bg-[rgba(44,0,0,1)] p-2 rounded-full w-full md:w-1/3 text-white"/>
          </div>
          <div className="flex justify-center items-center mt-4">
            <div className="h-[200px] md:h-[400px] w-full md:w-[700px] relative rounded-3xl flex items-center bg-cover bg-center">
              <div className="absolute bg-[url('/Background.png')] w-full rounded-3xl h-[150px] md:h-[250px] -z-0 bg-cover"></div>
              <div className="absolute right-0 bottom-0 h-full w-[50%] -z-0 bg-contain bg-no-repeat" style={{ backgroundImage: "url('/Michael.png')" }}></div>
              <div className="p-4 md:p-8 z-10">
                <div className="flex gap-1 items-center">
                  <div className="w-[10px] md:w-[14px] h-[10px] md:h-[14px] rounded-full bg-blue-400"></div>
                  <p>Verified Artist</p>
                </div>
                <h2 className="text-xl md:text-3xl font-bold mt-3">Michael Jackson</h2>
                <p className="text-xs md:text-sm text-left text-gray-400 mt-4 md:mt-8">27,808,202 monthly listeners</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center px-4 md:px-6 mt-4">
            <h1 className="font-extrabold text-sm md:text-lg">Popular</h1>
            <p className="text-xs md:text-sm">See All</p>
          </div>
          <div className="mt-3 mb-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800">
            <table className="w-full text-left text-white text-sm md:text-base">
              <thead>
                <tr className="text-left border-b border-gray-700">
                  <th className="px-2 md:px-4 py-2">#</th>
                  <th className="px-2 md:px-4 py-2">Title</th>
                  <th className="px-2 md:px-4 py-2">Playing</th>
                  <th className="px-2 md:px-4 py-2">Time</th>
                  <th className="hidden md:table-cell px-2 md:px-4 py-2">Album</th>
                </tr>
              </thead>
              <tbody>
                {trackList.map((track, index) => (
                  <TrackRow key={track.id} track={track} index={index} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default NewMusicPlayer;
