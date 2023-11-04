import React from 'react';
import Avs from '../../images/Avatar.svg'
import Coins from '../../images/coins 1.png'
import Jackpot from '../../images/JACKPOT.svg'
function Winner({ avatar, name }) {
  const ava = avatar;


  return (
    <li className='winner__item'>
      <img className='winner__photo' src={Avs} alt='avatar' />
      <p className='winner__name'>{name}</p>
      <div className='winner__win'>
        <p className='winner__win-value'>900</p>
        <img className='winner__win-image' src={Coins} alt='монеты'></img>
      </div>
      <img className='winner__jackpot' src={Jackpot} alt='джэкпот'></img>
      <p className='winner__win-time'>24 с.</p>
    </li>
  );
}

export default Winner;