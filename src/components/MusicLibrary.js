import React from 'react'

import MusicLibraryItem from './MusicLibraryItem'

const MusicLibrary = ({ songs, setSongs, audioRef, playSongHandler, currentSong, setCurrentSong, libraryIsOpen }) => {
  return (
    <div className={`library ${libraryIsOpen ? 'library_open' : ''}`}>
      <h2>Library</h2>
      <div className="library__songs">
        {
          songs.map((song) => {
            return <MusicLibraryItem 
              song={song}
              setSongs={setSongs}
              audioRef={audioRef} 
              playSongHandler={playSongHandler}
              currentSong={currentSong}
              setCurrentSong={setCurrentSong}
              id={song.id}
              key={song.id} 
            />
          })
        }
      </div>
    </div>
  )
}

export default MusicLibrary
