import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Sidebar from './components/Sidebar';
import NewMusicPlayer from './components/NewMusicPlayer';
import CurrentTrackSidebar from './components/CurrentTrackSidebar';
import BottomBar from './components/BottomBar';  // Import the new BottomBar component

function App() {
  const tracks = [
    { id: 1, title: "Billie Jean", artist: "Michael Jackson", album: "Thriller 25 Super...", time: "4:53", playing: 1040811084, src: "/path/to/billie-jean.mp3" },
    { id: 2, title: "Beat It", artist: "Michael Jackson", album: "Thriller 25 Super...", time: "4:18", playing: 643786045, src: "/music/beat-it.mp3" },
    { id: 3, title: "Smooth Criminal", artist: "Michael Jackson", album: "Bad 25th Ann...", time: "4:17", playing: 407234604, src: "/music/smooth-criminal.mp3" },
    { id: 4, title: "Don't Stop 'Til You Get Enough", artist: "Michael Jackson", album: "Off The Wall", time: "6:04", playing: 507234604, src: "/path/to/dont-stop.mp3" },
    { id: 5, title: "Rock With You", artist: "Michael Jackson", album: "Off The Wall", time: "3:38", playing: 268187216, src: "/path/to/rock-with-you.mp3" }
    
  ];

  const [trackList, setTrackList] = useState(tracks);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentSound, setCurrentSound] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
        className={`lg:block ${isSidebarOpen ? 'block' : 'hidden'} lg:static absolute z-50`} 
      />

      <DndProvider backend={HTML5Backend}>
        <NewMusicPlayer
          currentTrack={currentTrack}
          setCurrentTrack={setCurrentTrack}
          currentSound={currentSound}
          setCurrentSound={setCurrentSound}
          toggleSidebar={toggleSidebar}
          setTrackList={setTrackList}
          trackList={trackList}
        />
      </DndProvider>

      {/* Show CurrentTrackSidebar on large screens only */}
      <CurrentTrackSidebar
        currentTrack={currentTrack}
        setCurrentSound={setCurrentSound}
        setCurrentTrack={setCurrentTrack}
        currentSound={currentSound}
        trackList={trackList}
      
      />

      {/* Show BottomBar on mobile screens */}
      <BottomBar
        currentTrack={currentTrack}
        setCurrentSound={setCurrentSound}
        setCurrentTrack={setCurrentTrack}
        currentSound={currentSound}
       
      />
    </div>
  );
}

export default App;
