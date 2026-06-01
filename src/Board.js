import React, { Component } from "react";
import Cell from "./Cell";
import "./Board.css";

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
  };

  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard(),
      chanceLightStartsOn: 0.3,
    };
    this.createBoard = this.createBoard.bind(this);
    this.flipCellsAround = this.flipCellsAround.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  createBoard() {
    let board = [];
    for (let y = 0; y < this.props.nrows; y++) {
      let row = [];
      for (let x = 0; x < this.props.ncols; x++) {
        row.push(Math.random() < this.props.chanceLightStartsOn);
      }
      board.push(row);
    }
    return board;
  }

  flipCellsAround(coord) {
    if (this.state.hasWon) return;

    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);

    function flipCell(y, x) {
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    flipCell(y, x);
    flipCell(y, x - 1);
    flipCell(y, x + 1);
    flipCell(y - 1, x);
    flipCell(y + 1, x);

    const hasWon = board.every((row) => row.every((cell) => cell === false));

    this.setState((st) => ({
      board: board,
      hasWon: hasWon,
    }));
  }

  resetGame() {
    this.setState((st) => ({
      hasWon: false,
      board: this.createBoard(),
    }));
  }

  render() {
    if (this.state.hasWon) {
      return (
        <div>
          <h1 className="board-title">You Win!</h1>
          <button className="reset-btn" onClick={this.resetGame}>
            Play Again
          </button>
        </div>
      );
    }

    const tableBoard = this.state.board.map((row, y) => (
      <tr key={y}>
        {row.map((cell, x) => {
          let coord = `${y}-${x}`;
          return (
            <Cell
              key={coord}
              isLit={cell}
              flipCellsAroundMe={() => this.flipCellsAround(coord)}
            />
          );
        })}
      </tr>
    ));
    return (
      <div className="game">
        <h1>Lights Out</h1>
        <table className="Board">
          <tbody>{tableBoard}</tbody>
        </table>

        <div className="posveta">
          <p>Za Snežanu :D</p>
        </div>
      </div>
    );
  }
}

export default Board;
