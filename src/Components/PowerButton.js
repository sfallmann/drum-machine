import React from 'react';

const PowerButton = (props) => {

  let className = props.power ? 'power-on' : '';

  return (
    <div 
      id="powerbutton" 
      className={className}
      onClick={props.handlePowerBtnClick}
    >
      {props.power ? 'Power On' : 'Power Off'}
    </div>
  )
}

export default PowerButton;