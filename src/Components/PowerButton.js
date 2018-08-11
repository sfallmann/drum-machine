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
      
      <div>
        <p>POWER</p>
        <img src={buttonImg} className={className} alt="power button"/>
        <div>SPF-1000 Drum Machine</div>
      </div>
      
    </div>
  )
}

export default PowerButton;