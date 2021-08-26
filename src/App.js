import React from 'react';

// 变成函数组件
function Square(props) {
  // 需要展示对应的值，和触发点击事件
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  // 设置获胜条件
  winLine = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  // 在构造函数里声明状态
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null), // 每个square的值
      isNext: true // 下一步的标志位 处理输入 x 还是 o
    };
  }
  // 处理点击事件
  handleClick(i) {
    // 获取state里的squares的拷贝
    const squares = this.state.squares.slice();
    // 根据标志位获取对应修改的值
    const setValue = this.state.isNext ? 'X' : 'O';
    // 修改square对应的值
    squares[i] = setValue;
    // 通过setState修改state的内部属性
    this.setState({
      squares,
      isNext: !this.state.isNext // 修改后将标志位取反
    });
  }
  /**
   * 判断获胜者
   */
  checkWinner(squares) {
    let winner = '';
    this.winLine.some(line => {
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        winner = squares[a];
        return true;
      }
      winner = '';
    });
    return winner;
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    // 获胜者
    const winner = this.checkWinner(this.state.squares);
    let status = '';
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      // 根据状态来判断下一个谁操作
      status = `Next player: ${this.state.isNext ? 'X' : 'O'}`;
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

// ReactDOM.render(<Game />, document.getElementById('root'));
