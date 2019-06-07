import React from 'react';
import './App.css';
import bomb from './bomb.png'

class Cell extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {isOpened: false};
  }

  handleClick() {
    this.setState({isOpened: true});
  }

  render() {
    const value = this.props.number === -1 ? <img src={bomb} alt="..." width="20px" /> : this.props.number;
    const className = `cell${this.props.number === -1 ? ' bomb' : ''}${this.state.isOpened ? ' opened' : ''}`;
    return (
      <div className={className} onClick={this.handleClick}>
          {this.state.isOpened ? value : ''}
      </div>
    );
  }

}

class Row extends React.Component {

  render() {
    const cells = [];

    for(let i = 0; i < this.props.size; i++) {
      cells.push(<Cell key={i} number={this.props.bombs[i]} />)
    }

    return (
      <div className="row">
        {cells}
      </div>
    );
  }
}

function createBomb(size, bomb) {
  let bombs = [];

  for(let i=0; i < size; i++) {
    let b = [];
    for(let j=0; j < size; j++) {
      b.push(0);
    }
    bombs.push(b);
  }

  for(let i = 0; i < bomb; i++) {
    let index = Math.floor(Math.random() * size * size);
    bombs[Math.floor(index / size)][index % size] = -1;
  }

  let x = [-1, 0, 1, -1, 0, 1, -1, 0, 1];
  let y = [-1, -1, -1, 0, 0, 0, 1, 1, 1];

  for(let i=0; i<size; i++) {
    for(let j=0; j<size; j++) {
      let count = 0;
      if(bombs[i][j] === 0) {
      for(let k = 0; k<9; k++) {
        if(i + x[k] >= 0 && i + x[k] < size && j + y[k] >= 0 && j + y[k] < size && bombs[i + x[k]][j + y[k]] === -1) {
          count++;
        }
      }
      bombs[i][j] = count;
      }
    }
  }

  return bombs;
}

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.bombs = createBomb(this.props.size, this.props.bomb);
    console.log(this.bombs);
  }

  render() {
    const rows = [];
    for(let i = 0; i < this.props.size; i++) {
      rows.push(<Row key={i} size={this.props.size} bombs={this.bombs[i]} />);
    }
    return (
      <div className="App">
        {rows}
      </div>
    );
  }
}

export default App;
