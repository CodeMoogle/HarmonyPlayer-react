import React from 'react'

import MusicLibraryItem from './MusicLibraryItem'

const MusicLibrary = ({ songs, currentSong }) => {
  return (
    <div className="library">
      <h2>Library</h2>
      <div className="library__songs">
        {
          songs.map(song => <MusicLibraryItem currentSong={song} key={song.id} />)
        }
      </div>
    </div>
  )
}

export default MusicLibrary
