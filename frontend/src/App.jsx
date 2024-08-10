import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Sidebar from './components/Sidebar';
import NewMusicPlayer from './components/NewMusicPlayer';
import CurrentTrackSidebar from './components/CurrentTrackSidebar';

function App() {
  // Move currentTrack state to App component
  const [currentTrack, setCurrentTrack] = useState(null);

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <Sidebar />
      <DndProvider backend={HTML5Backend}>
        <NewMusicPlayer
          currentTrack={currentTrack}       
          setCurrentTrack={setCurrentTrack}
        />
      </DndProvider>
      <CurrentTrackSidebar currentTrack={currentTrack} /> 
    </div>
  );
}

export default App;
