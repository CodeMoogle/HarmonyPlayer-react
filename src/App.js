import React, { useState, useRef } from 'react'

import data from './store'
import { getPercentage } from './utils'

import './styles/app.scss'

import Player from './components/Player'
import Song from './components/Song'
import MusicLibrary from './components/MusicLibrary'
import MusicLibraryToggle from './components/MusicLibraryToggle'


function App() {
  const [songs, setSongs] = useState(data())
	const [currentSong, setCurrentSong] = useState(songs[0])
	const [isPlaying, setIsPlaying] = useState(false)
	const [songInfo, setSongInfo] = useState({
    currentTime: 0,
		durationTime: 0,
		totalPercentage: 0,
	})
	const [libraryIsOpen, setLibraryIsOpen] = useState(false)

	const audioRef = useRef(null)

	const playSongHandler = () => {
		if(isPlaying) {
			setIsPlaying(false)
			audioRef.current.pause()
		} else {
			setIsPlaying(true)
			audioRef.current.play()
		}
	}

	const nextSongHandler = async () => {
		const currentIndex = songs.findIndex(song => song.id === currentSong.id)
		const nextIndex = (currentIndex + 1) % songs.length;

		await setCurrentSong(songs[nextIndex])
		if(isPlaying) audioRef.current.play()
	}
	
	const timeUpdateHandler = (e) => {
		const currentTime = e.target.currentTime
		const durationTime = e.target.duration
		const totalPercentage = getPercentage(currentTime, durationTime)

    const timeData = {
      currentTime,
			durationTime,
			totalPercentage
    }
    setSongInfo({...songInfo, ...timeData})
  }

	return (
		<div className={`App ${libraryIsOpen ? 'App_library-open' : ''}`}>
			<MusicLibraryToggle 
				libraryIsOpen={libraryIsOpen}
				setLibraryIsOpen={setLibraryIsOpen}
			/>
			
			<Song currentSong={currentSong} />

			<Player
				songs={songs}
				currentSong={currentSong}
				audioRef={audioRef}
				songInfo={songInfo}
				isPlaying={isPlaying}
				playSongHandler={playSongHandler}
				setSongInfo={setSongInfo}
				setCurrentSong={setCurrentSong}
			/>

			<MusicLibrary 
				songs={songs}
				setSongs={setSongs}
				audioRef={audioRef} 
				playSongHandler={playSongHandler}
				currentSong={currentSong}
				setCurrentSong={setCurrentSong}
				libraryIsOpen={libraryIsOpen}
			/>
			<audio 
        src={currentSong.audio} 
        ref={audioRef} 
        onLoadedMetadata={timeUpdateHandler}
				onTimeUpdate={timeUpdateHandler}
				onEnded={nextSongHandler}
      >
      </audio>
		</div>
	)
}

export default App
