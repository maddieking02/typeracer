const calculateTime = (time) => {
  const min = Math.floor(time / 60);
  const sec = time - min * 60;
  return `${min}:${sec < 10 ? "0" + sec : sec}`;
};

const calculateWPM = (chars) => {
  console.log('inside calculateWPM', chars);
  const WPM = Math.round((chars / 5) / 1);
  return WPM;
};

module.exports = {
  calculateTime, calculateWPM,
};

// Gross WPM is (typed characters / 5) / 1 minute