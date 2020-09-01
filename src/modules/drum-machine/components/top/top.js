import React, { Component } from 'react';
import { connect } from 'react-redux';
import withPlayer from '../hoc/with-player';
import VolumeKnob from "../volume-knob";

class Top extends Component {
  render() {
    return (
      <div className="row top">
        <div className="column-3">
          <VolumeKnob/>
        </div>
        <div className="column-9">
          <div className="player-screen">
            <span id="screen">{this.props.lastSoundName.toUpperCase()}</span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ lastSoundName }) => ({ lastSoundName });

export default withPlayer()(
  connect(mapStateToProps)(
    Top
  )
);
