import React, { useState } from 'react';
import Coins from '../../images/coins 1.png'
import Jackpot from '../../images/JACKPOT.svg'

function Winner({ winner }) {
  const [currentWinner, setCurrenWinner] = useState({
    first_name: '',
    last_name: '',
    photo: null,
    win: Number,
    jackpot: false,
    time: null
  })
  
  React.useEffect(() => {
    let now = new Date()
    let winDate = new Date(winner.createdAt)
    let winTimeAgo = Math.floor((now - winDate) / (1000))
    if (winTimeAgo > 60) {
      setCurrenWinner({
        ...currentWinner,
        first_name: winner.first_name,
        last_name: winner.last_name,
        photo: winner.photo,
        win: winner.win,
        jackpot: winner.jackpot,
        time: '> 1 m.',
      })
      return;
    }
    setCurrenWinner({
      ...currentWinner,
      first_name: winner.first_name,
      last_name: winner.last_name,
      photo: winner.photo,
      win: winner.win,
      jackpot: winner.jackpot,
      time: `${winTimeAgo} c.`,
    })
  }, [winner])

  return (
    <li className='winner__item'>
      <img className='winner__photo' src={winner.photo} alt='avatar' />
      <p className='winner__name'>{winner.first_name + ' ' + winner.last_name}</p>
      {!winner.jackpot && <div className='winner__win'>
        <p className='winner__win-value'>{winner.win}</p>
        <img className='winner__win-image' src={Coins} alt='монеты'></img>
      </div>}
      {winner.jackpot && <img className='winner__jackpot' src={Jackpot} alt='джэкпот'></img>}
      <p className='winner__win-time'>{currentWinner.time}</p>
    </li>
  );
}

export default Winner;