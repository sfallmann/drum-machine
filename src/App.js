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
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      drumRacks,
      displayText: ''
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleOnKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleOnKeyDown);
  }

  clearAnimation(el) {
    Object.assign(el.style, {
      animationDuration: '',
      animationName: ''
    });
    el.removeEventListener("animationend", this.clearAnimation.bind(this, el));
  }

  setAnimation(el, animationName, animationDuration) {
    Object.assign(el.style, {
      animationDuration,
      animationName
    });
  }

  displayPadHit(key) {

    let displayText = document.querySelector(`[id^="${key}"]`).id
    this.setState(() => ({displayText}));

    let p = document.getElementById(`${key}-text`);
    let display = document.getElementById('display');

    this.clearAnimation(p);
    this.clearAnimation(display);

    this.setAnimation(p, 'hitPad', '.1s');
    this.setAnimation(display, 'fadeDisplay', '.5s');

    p.addEventListener("animationend", this.clearAnimation.bind(this, p));
    display.addEventListener("animationend", this.clearAnimation.bind(this, display));
    
  }

  playPadAudio(key) {

    let audio = document.getElementById(`${key}`);
    audio.currentTime = 0;
    audio.play();

  }

  handleClick(e) {

    let key = e.target.querySelector('p').id.replace('-text', '');
    this.handleHit(key);
  }


  handleHit(key) {
    this.displayPadHit(key);
    this.playPadAudio(key);

  }

  handleOnKeyDown(e) {

    if(!e.key) return;

    let validKeys = ['Q','W','E','A','S','D','Z','X','C'];
    let key = e.key.toUpperCase();

    if (validKeys.indexOf(key) < 0) return;

    this.handleHit(key);
    
  }

  render() {

    return (
      <div id="drum-machine" onKeyDown={this.handleOnKeyDown}>
        <div>
          {
            this.state.drumRacks.map((rack, i) => {
              return (
                <DrumRack 
                  key={`rack_${i}`} 
                  drumPads={rack.drumPads} 
                  keyPressed={this.state.keyPressed} 
                  handleClick={this.handleClick}
                />
              )
            })
          }
        </div>
        <section id="control-panel">
          <h3 id="display">{this.state.displayText}</h3>
        </section>
      </div>
    );
  }
}

export default App;
