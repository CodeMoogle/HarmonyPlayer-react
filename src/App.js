import React, { useState, useRef } from 'react'

import data from './store'

import useClickOutside from './hooks/useClickOutside'
import { getPercentage } from './utils/playerUtils'

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
	const libRef = useRef(null)

	useClickOutside(libRef, () => setLibraryIsOpen(false))

	const playSong = () => {
		setIsPlaying(true)
		audioRef.current.play()
	}

	const stopSong = () => {
		setIsPlaying(false)
		audioRef.current.pause()
	}

	const playSongHandler = () => {
		if (isPlaying) {
			stopSong()
		} else {
			playSong()
		}
	}

	const nextSongHandler = async () => {
		const currentIndex = songs.findIndex(song => song.id === currentSong.id)
		const nextIndex = (currentIndex + 1) % songs.length

		await setCurrentSong(songs[nextIndex])

		if (isPlaying) audioRef.current.play()
	}

	const timeUpdate = e => {
		const currentTime = e.target.currentTime
		const durationTime = e.target.duration
		const totalPercentage = getPercentage(currentTime, durationTime)

		const timeData = {
			currentTime,
			durationTime,
			totalPercentage,
		}
		setSongInfo({ ...songInfo, ...timeData })
	}

	return (
		<div className={`App ${libraryIsOpen ? 'App_library-open' : ''}`}>
			<div className='library-wrapper' ref={libRef}>
				<MusicLibraryToggle libraryIsOpen={libraryIsOpen} setLibraryIsOpen={setLibraryIsOpen} />

				<MusicLibrary
					songs={songs}
					playSong={playSong}
					stopSong={stopSong}
					setSongs={setSongs}
					currentSong={currentSong}
					isPlaying={isPlaying}
					setCurrentSong={setCurrentSong}
					libraryIsOpen={libraryIsOpen}
				/>
			</div>

			<Song currentSong={currentSong} />

			<Player
				songs={songs}
				playSongHandler={playSongHandler}
				currentSong={currentSong}
				setCurrentSong={setCurrentSong}
				audioRef={audioRef}
				songInfo={songInfo}
				setSongInfo={setSongInfo}
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
			/>

			<audio
				src={currentSong.audio}
				ref={audioRef}
				onLoadedMetadata={timeUpdate}
				onTimeUpdate={timeUpdate}
				onEnded={nextSongHandler}
			></audio>
		</div>
	)
}

export default App
