import React from 'react';
import DrumPad from './DrumPad';


const DrumRack = (props) => {
  return (
    <section className="drum-rack">
      {
        props.drumPads.map((pad, i) => {
          return <DrumPad key={`pad_${i}`} {...pad} />
        })
      }
    </section>
  )
}

export default DrumRack;