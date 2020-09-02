const changeVolume = (playerService: any) => (volumeLevel: number) => {
  playerService.updateVolume(volumeLevel);
  return {
    type: "CHANGE_VOLUME_LEVEL",
    payload: volumeLevel,
  };
};

const playSound = (playerService: any) => (letter: "string") => {
  playerService.playSound(letter);
  return {
    type: "PLAY_SOUND",
    payload: letter,
  };
};

export { changeVolume, playSound };
