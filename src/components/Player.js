import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPlay, faStepBackward, faStepForward} from '@fortawesome/free-solid-svg-icons'

const Player = () => {
  return (
    <div className="player">
      <h1>Player</h1>
      <div className="player__time-control">
        <span>Start time</span>
        <input type="range" name="" id=""/>
        <span>End time</span>
      </div>
      <div className="player__play-control">
      <FontAwesomeIcon className="player__control-backward" icon={faStepBackward} size="2x" />
      <FontAwesomeIcon className="player__control-play" icon={faPlay} size="2x" />
      <FontAwesomeIcon className="player__control-forward" icon={faStepForward} size="2x" />
      </div>
      <div className="play-control"></div>
    </div>
  )
}

export default Player
