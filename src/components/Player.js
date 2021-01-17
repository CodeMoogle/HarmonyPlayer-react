import React from 'react'

import { formatTime } from '../utils/playerUtils'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStepBackward, faStepForward, faPause } from '@fortawesome/free-solid-svg-icons'

const Player = ({
	songs,
	currentSong,
	setCurrentSong,
	isPlaying,
	setIsPlaying,
	audioRef,
	songInfo,
	setSongInfo,
	playSongHandler,
}) => {
	// Inline styles to paint progress tracker
	const styles = {
		translateTrack: {
			transform: `translateX(${songInfo.totalPercentage}%)`,
		},
		gradientBackround: {
			background: `linear-gradient(45deg, ${currentSong.color[0]}, ${currentSong.color[1]})`,
		},
		iconColor: {
			color: `${currentSong.color[0]}`,
		},
	}

	const inputDragHandler = e => {
		const currentTime = e.target.value

		audioRef.current.currentTime = currentTime
		setSongInfo({ ...songInfo, currentTime })
	}

	const skipTrackHandler = async direction => {
		const currentIndex = songs.findIndex(song => song.id === currentSong.id)
		const nextIndex = (currentIndex + 1) % songs.length
		const prevIndex = currentIndex - 1 === -1 ? songs.length - 1 : (currentIndex - 1) % songs.length

		if (direction === 'forward') {
			await setCurrentSong(songs[nextIndex])
		}
		if (direction === 'back') {
			await setCurrentSong(songs[prevIndex])
		}

		setIsPlaying(true)

		audioRef.current.play()
	}

	return (
		<div className='player'>
			<div className='player__time-control'>
				<span>{formatTime(songInfo.currentTime)}</span>
				<div className='track' style={styles.gradientBackround}>
					<input
						type='range'
						min={0}
						max={songInfo.durationTime || 0}
						value={songInfo.currentTime}
						onChange={inputDragHandler}
					/>
					<div className='animate-track' style={styles.translateTrack}></div>
				</div>
				<span>{songInfo.durationTime ? formatTime(songInfo.durationTime) : '0:00'}</span>
			</div>

			<div className='player__play-control' style={styles.iconColor}>
				<FontAwesomeIcon
					className='player__control-backward'
					icon={faStepBackward}
					size='2x'
					onClick={() => skipTrackHandler('back')}
				/>
				<FontAwesomeIcon
					className='player__control-play'
					icon={isPlaying ? faPause : faPlay}
					size='3x'
					onClick={playSongHandler}
				/>
				<FontAwesomeIcon
					className='player__control-forward'
					icon={faStepForward}
					size='2x'
					onClick={() => skipTrackHandler('forward')}
				/>
			</div>
		</div>
	)
}

export default Player
