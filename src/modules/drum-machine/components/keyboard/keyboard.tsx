import React, { Component, Fragment } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { playSound } from "../../actions";
import withPlayer from "../hoc/with-player";

class Keyboard extends Component<{
  playSound: (letter: string) => void;
  sounds: any[];
}> {
  componentDidMount() {
    this.listenComputerKeyboardEvents();
  }

  listenComputerKeyboardEvents() {
    const keyboardComponentContext = this;
    document.addEventListener("keydown", (event) => {
      if (event.code.substr(0, 3) !== "Key") {
        return;
      }
      const letter = event.code[3].toLowerCase();
      if ("qweasdzxc".includes(letter)) {
        keyboardComponentContext.props.playSound(letter);
      }
    });
  }

  generateButtonsMarkup(sounds: any[]) {
    let markup = [];
    if (!sounds) return;
    let index = 0;
    for (let row = 0; row < 3; row++) {
      let rowMarkup = [];
      for (let column = 0; column < 3; column++) {
        let currentSound = sounds[index];
        let columnMarkup = (
          <div key={column} className="column-4">
            <div
              className="button-light center"
              id={currentSound.letter + "-light"}
            />
            <button
              type="button"
              id={currentSound.letter + "-button"}
              className="keyboard-button"
              onClick={() => {
                this.props.playSound(currentSound.letter);
              }}
            >
              <span>{currentSound.letter.toUpperCase()}</span>
            </button>
          </div>
        );
        rowMarkup.push(columnMarkup);
        index++;
      }
      markup.push(<div key={index}>{rowMarkup}</div>);
    }
    return <div className="keyboard">{markup}</div>;
  }

  render() {
    return <Fragment>{this.generateButtonsMarkup(this.props.sounds)}</Fragment>;
  }
}

const mapStateToProps = ({ sounds }: { sounds: any[] }) => ({ sounds });

const mapDispatchToProps = (
  dispatch: any,
  { playerService }: { playerService: any }
) => {
  return bindActionCreators(
    {
      playSound: playSound(playerService),
    },
    dispatch
  );
};

export default withPlayer()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    //@ts-ignore
    Keyboard
  )
);
