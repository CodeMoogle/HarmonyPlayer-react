import React, { useState ,useRef } from 'react'

import { formatTime } from '../utils.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStepBackward, faStepForward, faPause } from '@fortawesome/free-solid-svg-icons'

const Player = ({ currentSong, isPlaying, setIsPlaying }) => {
  const audioRef = useRef(null)
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    durationTime: 0,
  })

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
  const inputDragHandler = (e) => {
    const currentTime = e.target.value
    
    audioRef.current.currentTime = currentTime
    setSongInfo({...songInfo, currentTime})
  } 

  return (
    <div className="player">
      <h1>Player</h1>
      <div className="player__time-control">
        <span>{formatTime(songInfo.currentTime)}</span>
        <input 
          type="range" 
          min={0} 
          max={songInfo.durationTime}
          value={songInfo.currentTime}
          onChange={inputDragHandler}
        />
        <span>{formatTime(songInfo.durationTime)}</span>
      </div>

      <div className="player__play-control">
      <FontAwesomeIcon className="player__control-backward" icon={faStepBackward} size="2x" />
      <FontAwesomeIcon className="player__control-play" icon={isPlaying ? faPause : faPlay} size="3x" onClick={playSongHandler} />
      <FontAwesomeIcon className="player__control-forward" icon={faStepForward} size="2x" />
      </div>

      <div className="play-control"></div>
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

export default Player
