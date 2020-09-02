import BufferLoader from "./buffer-loader";
declare const window: any;

export default class Player {
  context: object;
  gainNode: object;
  bufferLoader: object;
  sounds: any[];
  bufferedSounds: any[];
  constructor() {
    this.context = {};
    this.gainNode = {};
    this.bufferLoader = {};
    this.sounds = [];
    this.bufferedSounds = [];
  }

  fetchSounds(sounds: any[]) {
    this.sounds = sounds;
    // Fix up prefixing
    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    const player = this;
    player.context = new AudioContext();
    //@ts-ignore
    if (!this.context.createGain)
      //@ts-ignore
      player.context.createGain = player.context.createGainNode;
    //@ts-ignore
    player.gainNode = player.context.createGain();

    setTimeout(() => {
      player.bufferLoader = new BufferLoader(
        player.context,
        this.sounds,
        player.finishedLoading
      );
      //@ts-ignore
      player.bufferLoader.load();
    }, 2000);
  }

  finishedLoading = (bufferList: any[]) => {
    const player = this;
    player.bufferedSounds = bufferList;
  };

  updateVolume(volumeLevel: number) {
    //@ts-ignore
    this.gainNode.gain.value = volumeLevel;
  }

  playSound(letter: string) {
    //@ts-ignore
    const sound = this.bufferedSounds[letter];

    if (!sound) {
      return;
    }

    // Connect gain node to destination
    //@ts-ignore
    this.gainNode.connect(this.context.destination);
    //@ts-ignore
    var source = this.context.createBufferSource();
    source.buffer = sound;

    // Connect source to a gain node
    source.connect(this.gainNode);
    source.start();
  }
}
