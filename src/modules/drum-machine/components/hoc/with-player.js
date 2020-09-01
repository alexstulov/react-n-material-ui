import React from 'react';
import { PlayerConsumer } from "../player-context";

const withPlayer = () => (Wrapped) => {
  return (props) => {
    return (
      <PlayerConsumer>
        {
          (playerService) => {
            return (<Wrapped {...props} playerService={playerService}/>);
          }
        }
      </PlayerConsumer>
    );
  }
};

export default withPlayer;
