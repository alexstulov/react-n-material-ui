import React from "react";
import Board from "./Board";
import { getCoordinates, calculateWinner } from "./supportMethods";
import './tictactoe.css';

class Game extends React.Component<{}, {
  history: any[],
  stepNumber: number,
  xIsNext: boolean,
  toggleStepsOrder: boolean
}> {
  constructor(props: any) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        coordinates: [],
      }],
      stepNumber: 0,
      xIsNext: true,
      toggleStepsOrder: false
    }
  }

  shouldComponentUpdate(nextProps: any, nextState: any) {
    return nextState !== this.state;
  }

  handleClick(i: number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length-1];
    const squares = current.squares.slice();
    const coordinates = current.coordinates.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    coordinates.push(getCoordinates(i));
    this.setState({
      history: history.concat([{
        squares: squares,
        coordinates: coordinates
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      let movesStart: number;
      let isFirstStep;
      let coordinates;
      let currentCoordinate;

      if (this.state.toggleStepsOrder) {
        movesStart = this.state.stepNumber - move;
        isFirstStep = move === 0;
        coordinates = current.coordinates.slice().reverse();
        currentCoordinate = move;
      } else {
        movesStart = move;
        isFirstStep = move === this.state.stepNumber;
        coordinates = current.coordinates;
        currentCoordinate = move - 1;
      }

      if (move <= this.state.stepNumber) {
        let desc = movesStart ?
          'Go to move #' + movesStart + ' (' + coordinates[currentCoordinate] + ')' :
          'Go to game start';
        return (
          <li key={movesStart}>
            <button onClick={() => this.jumpTo(movesStart)}>{isFirstStep ? <strong>{desc}</strong> : desc}</button>
          </li>
        );
      } else {
        return ``;
      }
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner.winner;
    } else if (this.state.stepNumber === 9) {
      status = 'Draw!';
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winnerLine={winner && winner.line ? winner.line : null}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div><button onClick={() => { this.setState({toggleStepsOrder: !this.state.toggleStepsOrder}); }}>Toggle steps order</button></div>
          <div>{status}</div>
          <ul>{moves}</ul>
        </div>
      </div>
    );
  }
}

export default Game;
