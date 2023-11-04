import wheel from '../../images/wheel.png'
import pin from '../../images/pin.png'
import React from 'react';


function Wheel({ wheelAngle }) {



  return (
    <div className="wheel">
      <div className="wheel__container">
        <img className="wheel__pin" src={pin} alt='указатель'></img>
        <img className="wheel__image" src={wheel} alt='колесо-фортуны' style={{
          transform: `rotate(${wheelAngle}deg)`,
        }} />
      </div>
    </div>
  );
}

export default Wheel;