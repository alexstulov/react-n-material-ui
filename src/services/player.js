import BufferLoader from './buffer-loader';

export default class Player {
  constructor() {
    this.context = {};
    this.gainNode = {};
    this.bufferLoader = {};
    this.sounds = {};
    this.bufferedSounds = {};
  }

  fetchSounds(sounds) {
    this.sounds = sounds;
    // Fix up prefixing
    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    const player = this;
    player.context = new AudioContext();
    if (!this.context.createGain)
      player.context.createGain = player.context.createGainNode;
    player.gainNode = player.context.createGain();

    setTimeout(() => {
      player.bufferLoader = new BufferLoader(
        player.context,
        this.sounds,
        player.finishedLoading
      );

      player.bufferLoader.load();
    }, 2000);
  }

  finishedLoading = (bufferList) => {
    const player = this;
    player.bufferedSounds = bufferList;
  };

  updateVolume(volumeLevel) {
    this.gainNode.gain.value = volumeLevel;
  }

  playSound(letter) {
    const sound = this.bufferedSounds[letter];

    if (!sound) {
      return;
    }

    // Connect gain node to destination
    this.gainNode.connect(this.context.destination);
    var source = this.context.createBufferSource();
    source.buffer = sound;

    // Connect source to a gain node
    source.connect(this.gainNode);
    source.start();
  }
}
