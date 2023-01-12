const calculateTime = (time) => {
  const min = Math.floor(time / 60);
  const sec = time % 60;
  return `${min}:${sec < 10 ? "0" + sec : sec}`;
};

const calculateWPM = (endTime, startTime, player) => {
  const numOfWords = player.currentWordIndex;
  const timeInSec = (endTime - startTime) / 1000;
  const timeInMin = timeInSec / 60;
  const WPM = Math.floor(numOfWords / timeInMin);
  return WPM;
};

module.exports = {
  calculateTime, calculateWPM,
};