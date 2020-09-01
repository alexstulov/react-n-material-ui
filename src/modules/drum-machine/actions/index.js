const changeVolume1 = (level) => {
  return {
    type: 'CHANGE_VOLUME_LEVEL',
    payload: level
  }
};

const changeVolume = (playerService) => (volumeLevel) => {
  playerService.updateVolume(volumeLevel);
  return changeVolume1(volumeLevel);
};

const playSound1 = (letter) => {
  return {
    type: 'PLAY_SOUND',
    payload: letter
  };
};

const playSound = (playerService) => (letter) => {
  playerService.playSound(letter);
  return playSound1(letter);
};

export {
  changeVolume,
  playSound
};
