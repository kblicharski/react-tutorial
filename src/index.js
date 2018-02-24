import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Square is an example of a "controlled component".
// This component type stores no state of its own --
// it receives values from its parent and notifies its parent
// when interacted with.

// class Square extends React.Component {
//
//   render() {
//     return (
//         // Note that we're passing a function
//         // to onClick. If we didn't, it would
//         // happen immediately instead of on
//         // each button click.
//       <button
//         className="square"
//         onClick={() => this.props.onClick()}>
//         {this.props.value}
//       </button>
//         // Note that we are calling this.setState.
//         // Whenever modifying the state of a component,
//         // you should call this function so React can
//         // rerender it and its descendants.
//     );
//   }
//
// }

// The above example can be more succinctly expressed
// as a "functional component". These are components that
// only have a "render" method and no internal state.
//
// Note that we're binding the function reference "props.onClick"
// to the button attribute "onClick". The same could have been
// accomplished using {() => props.onClick()}
function Square(props) {
  return (
    <button
      className="square"
      onClick={ props.onClick }
    >
      { props.value }
    </button>
  );
}

class Board extends React.Component {

  constructor(props) {
    // In JS, when subclassing we always have to
    // explicitly call super.
    super(props);
    this.state = {
      squares: Array(9).fill(null)

    };
  }

  // Note that this function is pure, because it enforces
  // immutability in our state. We copy squares before modifying
  // it, and then reset the entire container.
  //
  // Immutability is important because:
  //      1. It increases component and application performance.
  //      2. It lets us maintain a history of changes. With this,
  //      we can implement things like undo and redo.
  //      3. We can easily check if something is changed, because
  //      if it has been changed its reference will be different.
  //      This is a lot simpler than "dirty checking" by checking
  //      each key and value in the entire object for changes.
  //      4. Pure components allow React to easily re-render.
  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({squares: squares});
  }

  renderSquare(i) {
    return (
      <Square
        value={ this.state.squares[i] }
        onClick={ () => this.handleClick(i) }
      />
    );
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{ status }</div>
        <div className="board-row">
          { this.renderSquare(0) }
          { this.renderSquare(1) }
          { this.renderSquare(2) }
        </div>
        <div className="board-row">
          { this.renderSquare(3) }
          { this.renderSquare(4) }
          { this.renderSquare(5) }
        </div>
        <div className="board-row">
          { this.renderSquare(6) }
          { this.renderSquare(7) }
          { this.renderSquare(8) }
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board/>
        </div>
        <div className="game-info">
          <div>{ /* status */ }</div>
          <ol>{ /* TODO */ }</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game/>,
  document.getElementById('root')
);
