import React from 'react'

const MusicLibraryItem = ({ currentSong }) => {
  return (
    <div className="library-item">
			<div className="library-item__image">
				<img src={currentSong.cover} alt={currentSong.name}/>
			</div>
			<div className="library-item__description">
        <h2 className="library-item__name">{currentSong.name}</h2>
			  <p className="library-item__artist">{currentSong.artist}</p>
      </div>
		</div>
  )
}

export default MusicLibraryItem
