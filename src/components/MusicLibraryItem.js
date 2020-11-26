import React from 'react'

import { playAudio } from '../utils.js'

const MusicLibraryItem = ({ song, currentSong, setCurrentSong, audioRef, isPlaying }) => {
  const songHandler = () => {
    setCurrentSong(song)
    playAudio(audioRef, isPlaying)
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
		</div>
  )
}

export default MusicLibraryItem
