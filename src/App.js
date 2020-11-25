import React, { useState, useRef } from 'react'

import data from './store'

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
	
	const timeUpdateHandler = (e) => {
    const timeData = {
      currentTime: e.target.currentTime,
      durationTime: e.target.duration,
    }
    setSongInfo({...songInfo, ...timeData})
  }

	return (
		<div className='App'>
			<MusicLibraryToggle 
				libraryIsOpen={libraryIsOpen}
				setLibraryIsOpen={setLibraryIsOpen}
			/>
			<MusicLibrary 
				songs={songs}
				setSongs={setSongs}
				audioRef={audioRef} 
				isPlaying={isPlaying}
				currentSong={currentSong}
				setCurrentSong={setCurrentSong}
				libraryIsOpen={libraryIsOpen}
			/>
			<Song currentSong={currentSong} />
			<Player 
				currentSong={currentSong}
				audioRef={audioRef}
				songInfo={songInfo}
				isPlaying={isPlaying}
				playSongHandler={playSongHandler}
				setSongInfo={setSongInfo}
			/>

			<audio 
        src={currentSong.audio} 
        ref={audioRef} 
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
      >
      </audio>
		</div>
	)
}

export default App
