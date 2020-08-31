import React from "react";
import Square from "./Square";

class Board extends React.Component<{squares: any[], onClick: (i: number) => void, winnerLine: any[] | null}> {
  renderSquare(i: number, classNames: string) {
    return <Square
      key={i}
      value={this.props.squares[i]}
      classNames={classNames}
      onClick={() => this.props.onClick(i)}
    />;
  }

  render() {
    let rows = [];
    let columns = [];
    let index = 0;
    let classNames;
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
      for (let columnIndex = 0; columnIndex < 3; columnIndex++) {
        classNames = this.props.winnerLine && this.props.winnerLine.indexOf(index) >= 0 ? 'square win-square' : 'square';
        columns.push(
          this.renderSquare(index, classNames)
        );
        index++;
      }
      rows.push(<div key={rowIndex} className="board-row">{columns}</div>);
      columns = [];
    }

    return rows;
  }
}

export default Board;
