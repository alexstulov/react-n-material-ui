import React from 'react';
import App from './components/app';

import { Provider } from 'react-redux';

import Player from './services/player';
import { PlayerProvider } from "./components/player-context";

import store from './store';
const playerService = new Player();

const basePath = "/drum-machine";

const drumMachineWrapper = () => () => {
return <Provider store={store}>
<PlayerProvider value={playerService}>
  <App/>
</PlayerProvider>
</Provider>;
}

export default () => {
  return {
      name: "DrumMachine",
      routes: [
          {
              routeProps: {
                  path: `${basePath}`,
                  exact: true,
                  component: drumMachineWrapper(),
              },
              name: 'Drum machine'
          }
      ]
  }
}