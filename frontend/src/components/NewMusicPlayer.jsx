import React, { useRef, useState } from "react";
import { Howl } from "howler";
import { useDrag, useDrop } from "react-dnd";
import update from "immutability-helper";

const NewMusicPlayer = ({ currentTrack, setCurrentTrack, currentSound, setCurrentSound }) => {
  const tracks = [
    { id: 1, title: "Billie Jean", artist: "Michael Jackson", album: "Thriller 25 Super...", time: "4:53", playing: 1040811084, src: "/path/to/billie-jean.mp3" },
    { id: 2, title: "Beat It", artist: "Michael Jackson", album: "Thriller 25 Super...", time: "4:18", playing: 643786045, src: "/music/beat-it.mp3" },
    { id: 3, title: "Smooth Criminal", artist: "Michael Jackson", album: "Bad 25th Ann...", time: "4:17", playing: 407234604, src: "/music/smooth-criminal.mp3" },
    { id: 4, title: "Don't Stop 'Til You Get Enough", artist: "Michael Jackson", album: "Off The Wall", time: "6:04", playing: 507234604, src: "/path/to/dont-stop.mp3" },
    { id: 5, title: "Rock With You", artist: "Michael Jackson", album: "Off The Wall", time: "3:38", playing: 268187216, src: "/path/to/rock-with-you.mp3" }
  ];

  const [trackList, setTrackList] = useState(tracks);

  const playTrack = (track) => {
    // Stop the current track if one is playing
    if (currentSound) {
      currentSound.stop();
    }

    // Set the new current track
    setCurrentTrack(track);
    const sound = new Howl({
      src: [track.src],
      html5: true,
      onend: () => setCurrentTrack(null)
    });
    setCurrentSound(sound); // Store the current Howl instance
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
        if (!ref.current) {
          return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;
        if (dragIndex === hoverIndex) {
          return;
        }
        const hoverBoundingRect = ref.current.getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }

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
        <td className="px-4 py-2">{index + 1}</td>
        <td className="px-4 py-2">{track.title}</td>
        <td className="px-4 py-2">{track.playing}</td>
        <td className="px-4 py-2">{track.time}</td>
        <td className="px-4 py-2">{track.album}</td>
      </tr>
    );
  };

  return (
    <div className='w-full h-screen bg-[linear-gradient(180deg,#4C0000_0%,#0A0A0A_100%),linear-gradient(90deg,rgba(0,0,0,0)_73.01%,rgba(15,15,15,0.6)_73.01%)] p-2'>
      <div className="flex flex-col w-full h-screen bg-[linear-gradient(180deg,#4C0000_0%,#0A0A0A_100%),linear-gradient(90deg,rgba(0,0,0,0)_73.01%,rgba(15,15,15,0.6)_73.01%)] text-white">
        <div className="flex justify-between items-center px-8 mt-4">
          <div className="flex gap-6 text-white">
            <a href="#" className="hover:text-red-500">Music</a>
            <a href="#" className="hover:text-red-500">Podcast</a>
            <a href="#" className="hover:text-red-500">Live</a>
            <a href="#" className="hover:text-red-500">Radio</a>
          </div>
          <input type="text" placeholder="Michael Jackson" className="bg-[rgba(44,0,0,1)] p-2 rounded-full w-1/3 text-white"/>
        </div>
        <div className="flex justify-center items-center">
          <div className="h-[400px] w-[700px] relative rounded-3xl flex items-center bg-cover bg-center">
            <div className="absolute bg-[url('/Background.png')] w-full rounded-3xl h-[250px] -z-0 bg-cover">
            </div>
            {/* <div className="absolute right-0  h-full w-[50%] -z-0 bg-contain bg-no-repeat" style={{ backgroundImage: "url('/Michael.png')" }}></div> */}
            <div className="absolute right-0 bottom-0 h-full w-[50%] -z-0 bg-contain bg-no-repeat" style={{ backgroundImage: "url('/Michael.png')" }}></div>
            <div className="p-8 z-10">
              <div className="flex gap-1 items-center">
                <div className="w-[14px] h-[14px] rounded-full bg-blue-400"></div>
                <p>Verified Artist</p>
              </div>
              <h2 className="text-3xl font-bold mt-3">Michael Jackson</h2>
              <p className="text-sm text-left text-gray-400 mt-8">27,808,202 monthly listeners</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center px-6">
          <h1 className="font-extrabold">Popular</h1>
          <p>See All</p>
        </div>
        <div className="mt-3 mb-2">
          <table className="w-full text-left text-white">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Playing</th>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Album</th>
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
  );
};

export default NewMusicPlayer;
