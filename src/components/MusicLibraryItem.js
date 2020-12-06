import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'

const MusicLibraryItem = ({ song, currentSong, setCurrentSong, isPlaying, playSong, stopSong }) => {
  const songHandler = async () => {
    await setCurrentSong(song)
    
    if (song.id === currentSong.id && isPlaying) {
      stopSong()
    } else {
      playSong()
    }
  }

  return (
    <div className={`library-item ${song.id === currentSong.id ? 'library-item_selected' : ''}`} onClick={songHandler}>
			<div className="library-item__image">
				<img src={song.cover} alt={song.name}/>
			</div>
			<div className="library-item__description">
        <h2 className="library-item__name">{song.name}</h2>
			  <p className="library-item__artist">{song.artist}</p>
      </div>

      {song.id === currentSong.id 
        && <FontAwesomeIcon 
        className="library-item__icon" 
        icon={isPlaying ? faPause : faPlay}
      />}
		</div>
  )
}

export default MusicLibraryItem
