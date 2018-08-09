import React from 'react';

const DrumPad = (props) => {

  return (
    <div className="drum-pad" id={props.text}>
      <p>{props.text}</p>
      <audio src={props.sound}/>
    </div>
  );

}

export default DrumPad;