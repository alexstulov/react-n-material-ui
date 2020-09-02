import React from "react";
import { PlayerConsumer } from "../player-context";

const withPlayer = () => (Wrapped: any) => {
  return (props: any) => {
    return (
      <PlayerConsumer>
        {(playerService: any) => {
          return <Wrapped {...props} playerService={playerService} />;
        }}
      </PlayerConsumer>
    );
  };
};

export default withPlayer;
