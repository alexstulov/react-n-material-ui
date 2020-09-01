import React, { Component } from 'react';
import './styles.sass';

import Keyboard from '../keyboard';
import Top from '../top';
import {connect} from "react-redux";
import withPlayer from '../hoc';

class App extends Component {
  componentDidMount() {
    let musicObject = {};
    this.props.sounds.forEach((item) => {
      musicObject[item.letter] = item.src;
    });
    this.props.playerService.fetchSounds(musicObject);
  }

  render() {
    return (
      <div className="container drum-machine">
        <Top />
        <Keyboard />
      </div>
    );
  }
}

const mapStateToProps = ({ sounds }, { playerService }) => ({ sounds, playerService });

export default withPlayer()(
  connect(mapStateToProps)(App)
);
