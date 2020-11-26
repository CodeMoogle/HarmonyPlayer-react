export const formatTime = time => Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)

export const playAudio = (audioRef, isPlaying) => {
  if(isPlaying) {
    const playPromise = audioRef.current.play()
    if(playPromise !== undefined) {
      playPromise.then(() => {
        audioRef.current.play()
      })
    }
  }
}