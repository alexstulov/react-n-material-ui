import React, { Component } from "react";
import "./styles.sass";

import Keyboard from "../keyboard";
import Top from "../top";
import { connect } from "react-redux";
import withPlayer from "../hoc";

class App extends Component<{ sounds: any[]; playerService: any }, {}> {
  componentDidMount() {
    let musicObject = {};
    this.props.sounds.forEach((item) => {
      //@ts-ignore
      musicObject[item.letter] = item.src;
    });
    this.props.playerService.fetchSounds(musicObject);
  }

  render() {
    return (
      <div className="drum-machine">
        <small style={{ color: "lightgrey" }}>
          Use your keyboard to drum and control volume level
        </small>
        <Top />
        <Keyboard />
      </div>
    );
  }
}

const mapStateToProps = (
  { sounds }: { sounds: any[] },
  { playerService }: { playerService: any }
) => ({ sounds, playerService });

export default withPlayer()(connect(mapStateToProps)(App));
