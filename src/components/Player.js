import React from 'react'

import { formatTime, playAudio } from '../utils.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStepBackward, faStepForward, faPause } from '@fortawesome/free-solid-svg-icons'

const Player = ({ songs, currentSong, setCurrentSong, isPlaying, audioRef, songInfo, setSongInfo, playSongHandler }) => {
  const inputDragHandler = (e) => {
    const currentTime = e.target.value
    
    audioRef.current.currentTime = currentTime
    setSongInfo({...songInfo, currentTime})
  }

  const skipTrackHandler = (direction) => {
    const currentIndex = songs.findIndex(song => song.id === currentSong.id)
    const nextIndex = (currentIndex + 1) % songs.length;
    const prevIndex = currentIndex - 1 === -1 ? songs.length - 1 : (currentIndex - 1) % songs.length;

		if(direction === 'forward') {
      setCurrentSong(songs[nextIndex])
    }
		if(direction === 'back') {
      setCurrentSong(songs[prevIndex])
    }
    playAudio(audioRef, isPlaying)
	}

  return (
    <div className="player">
      <div className="player__time-control">
        <span>{formatTime(songInfo.currentTime)}</span>
        <input 
          type="range" 
          min={0} 
          max={songInfo.durationTime || 0}
          value={songInfo.currentTime}
          onChange={inputDragHandler}
        />
        <span>{songInfo.durationTime ? formatTime(songInfo.durationTime) : '0:00'}</span>
      </div>

      <div className="player__play-control">
      <FontAwesomeIcon 
        className="player__control-backward" 
        icon={faStepBackward} 
        size="2x" 
        onClick={() => skipTrackHandler('back')} 
      />
      <FontAwesomeIcon 
        className="player__control-play" 
        icon={isPlaying ? faPause : faPlay} 
        size="3x" 
        onClick={playSongHandler} 
      />
      <FontAwesomeIcon 
        className="player__control-forward" 
        icon={faStepForward} 
        size="2x" 
        onClick={() => skipTrackHandler('forward')} 
      />
      </div>

      <div className="play-control"></div>
    </div>
  )
}

export default Player
