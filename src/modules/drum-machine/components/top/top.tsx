import React, { Component } from "react";
import { connect } from "react-redux";
import withPlayer from "../hoc/with-player";
import VolumeKnob from "../volume-knob";

class Top extends Component<{ lastSoundName: string }> {
  render() {
    return (
      <div className="top">
        <div className="column-3">
          <VolumeKnob />
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

const mapStateToProps = ({ lastSoundName }: { lastSoundName: string }) => ({
  lastSoundName,
});

export default withPlayer()(connect(mapStateToProps)(Top));
