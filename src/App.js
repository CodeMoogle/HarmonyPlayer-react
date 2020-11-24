import React, {useState} from 'react'

import data from './store'

import './styles/app.scss'

import Player from './components/Player'
import Song from './components/Song'
import MusicLibrary from './components/MusicLibrary'


function App() {
  const [songs, setSongs] = useState(data())
	const [currentSong, setCurrentSong] = useState(songs[9])
	const [isPlaying, setIsPlaying] = useState(false)

	return (
		<div className='App'>
			<MusicLibrary songs={songs} currentSong={currentSong} />
			<Song currentSong={currentSong} />
			<Player 
				currentSong={currentSong}
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
			/>
		</div>
	)
}

export default App
