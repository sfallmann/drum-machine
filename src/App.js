import React, { Component } from 'react';
import  DrumRack from './Components/DrumRack';
import kits from './audio';
import './App.css';

const drumRacks = [
  {
    drumPads: [
      { text: 'Q'},
      { text: 'W'},
      { text: 'E'}
    ]
  },
  {
    drumPads: [
      { text: 'A'},
      { text: 'S'},
      { text: 'D'}
    ]
  },
  {
    drumPads: [
      { text: 'Z'},
      { text: 'X'},
      { text: 'C'}
    ]
  }        
]

drumRacks.forEach((rack, rackIndex) => {
  rack.drumPads.forEach((pad, padIndex) => {
    let index = padIndex + (3 * rackIndex);
    pad.sound = kits.acousticKit[index].file;
    pad.name = kits.acousticKit[index].name;
  })
});

console.log(drumRacks);

class App extends Component {
  constructor(props){
    super(props);
    this.props = props;
    this.handleOnKeyDown = this.handleOnKeyDown.bind(this);

    this.state = {
      drumRacks
    }
  }

  handleOnKeyDown(e) {
    let validKeys = ['Q','W','E','A','S','D','Z','X','C'];
    let key = e.key.toUpperCase();

    if (validKeys.indexOf(key) < 0) return;
    let audio = document.querySelector(`#${key} audio`);
    audio.load();
    audio.play();
    console.log(audio);
  }

  render() {

    return (
      <div id="drum-machine" onKeyDown={this.handleOnKeyDown} tabIndex={1}>
        {
          drumRacks.map((rack, i) => {
            return <DrumRack key={`rack_${i}`} drumPads={rack.drumPads}/>
          })
        }
      </div>   
    );
  }
}

export default App;
