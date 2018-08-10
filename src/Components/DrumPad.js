import React from 'react';
import drumImg from '../img/drum-pad-transparent.png';

const DrumPad = (props) => {

  return (
    <div 
      className="drum-pad" 
      id={`${props.text}-${props.name}`}
      onClick={props.handlePadClick}
      style={{
          background: `url(${drumImg}) no-repeat center`,
          backgroundSize: "contain"
        }}
    >
      <p id={`${props.text}-text`}>{props.text}</p>
      <audio id={props.text} className="clip" src={props.sound}/>
    </div>
  );

}

export default DrumPad;