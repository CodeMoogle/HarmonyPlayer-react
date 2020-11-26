export const formatTime = time => Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)

export const getPercentage = (current, total) => {
  const roundedCurrent = Math.round(current)
  const roundedTotal = Math.round(total)

  return Math.round((roundedCurrent / roundedTotal) * 100)
}