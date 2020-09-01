const initialState = {
  volumeLevel: 0.5,
  lastSoundName: 'SCREEN',
  sounds: [
    // sounds collection borrowed from https://sampleswap.org/filebrowser-new.php?d=DRUMS+%28FULL+KITS%29%2FDRUM+MACHINES%2F808+Extended%2F
    {
      letter: 'q',
      name: 'tme3',
      src: './audio/44[kb]808-tme3.wav.mp3',
      // src: 'https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/808%20Extended/44[kb]808-tme3.wav.mp3',
    },
    {
      letter: 'w',
      name: 'tlo2',
      src: './audio/77[kb]808-tlo2.wav.mp3',
      // src: 'https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/808%20Extended/77[kb]808-tlo2.wav.mp3',
    },
    {
      letter: 'e',
      name: 'sd14',
      src: './audio/35[kb]808-sd14.wav.mp3',
      // src: 'https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/808%20Extended/35[kb]808-sd14.wav.mp3',
    },
    {
      letter: 'a',
      name: 'hh08',
      src: './audio/23[kb]808-hh08.wav.mp3',
      // src: 'https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/808%20Extended/23[kb]808-hh08.wav.mp3',
    },
    {
      letter: 's',
      name: 'cym04',
      src: './audio/145[kb]808-cym04.wav.mp3',
      // src: 'https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/808%20Extended/145[kb]808-cym04.wav.mp3',
    },
    {
      letter: 'd',
      name: 'clo2',
      src: './audio/64[kb]808-clo2.wav.mp3',
      // src: 'https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/808%20Extended/64[kb]808-clo2.wav.mp3',
    },
    {
      letter: 'z',
      name: 'clap4',
      src: './audio/67[kb]808-clap4.wav.mp3',
      // src: 'https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/808%20Extended/67[kb]808-clap4.wav.mp3',
    },
    {
      letter: 'x',
      name: 'chi2',
      src: './audio/43[kb]808-chi2.wav.mp3',
      // src: 'https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/808%20Extended/43[kb]808-chi2.wav.mp3',
    },
    {
      letter: 'c',
      name: 'bd05',
      src: './audio/243[kb]808-bd05.wav.mp3',
      // src: 'https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/808%20Extended/243[kb]808-bd05.wav.mp3',
    },
  ]
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'CHANGE_VOLUME_LEVEL':
      return {
        ...state,
        volumeLevel: action.payload
      };
    case 'PLAY_SOUND':
      const sound = state.sounds.find((sound) => sound.letter === action.payload);
      return {
        ...state,
        lastSoundName: sound ? sound.name.toUpperCase() : 'NONE'
      };
    default:
      return state;
  }
};

export default reducer;
