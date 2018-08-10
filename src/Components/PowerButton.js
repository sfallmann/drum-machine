import React from 'react';
import buttonImg from '../img/power-button.png';

const PowerButton = (props) => {
  console.log(props.power)
  let className = props.power ? 'power-btn-img power' : 'power-btn-img';

  return (
    <div 
      id="powerbutton" 
      onClick={props.handlePowerBtnClick}
    >
      <p>POWER</p>
      <div>
        <img src={buttonImg} className={className} alt="power button"/>
        <h3>SPF-1000 Drum Machine</h3>
      </div>
      
    </div>
  )
}

export default PowerButton;