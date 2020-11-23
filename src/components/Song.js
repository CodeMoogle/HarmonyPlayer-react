import React from 'react'

const Song = ({currentSong}) => {
	return (
		<div className="song">
			<div className="song__image">
				<img src={currentSong.cover} alt={currentSong.name}/>
			</div>
			<h2 className="song__name">{currentSong.name}</h2>
			<p className="song__artist">{currentSong.artist}</p>
		</div>
	)
}

export default Song
