import React, { Component } from 'react';
import DrumRack from './Components/DrumRack';
import PowerButton from './Components/PowerButton';
import soundbank from './sound-bank';
import './App.css';



class App extends Component {
  constructor(props){
    super(props);

    this.props = props;
    this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
    this.handlePadClick = this.handlePadClick.bind(this);
    this.handlePowerBtnClick = this.handlePowerBtnClick.bind(this);

    this.state = {
      drumRacks: soundbank.acousticKit,
      displayText: '',
      power: true
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

  handlePowerBtnClick() {
    this.setState((prevState) =>({power: !prevState.power}));
  }

  handlePadClick(e) {

    if (!this.state.power) return;

    let key = e.target.querySelector('p').id.replace('-text', '');
    this.handleHit(key);
  }


  handleHit(key) {
    this.displayPadHit(key);
    this.playPadAudio(key);

  }

  handleOnKeyDown(e) {

    if(!e.key || !this.state.power) return;

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
                  handlePadClick={this.handlePadClick}
                />
              )
            })
          }
        </div>
        <section id="control-panel">
          <PowerButton handlePowerBtnClick={this.handlePowerBtnClick} power={this.state.power} />
          <h3 id="display">{this.state.displayText}</h3>
        </section>
      </div>
    );
  }
}

export default App;
