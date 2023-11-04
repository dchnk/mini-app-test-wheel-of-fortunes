import React from 'react';
import Wheel from '../wheel/Wheel';
import Winners from '../winners/Winners';
import Button from '../button/Button';

function App({onClick, user}) {

  const [wheelAngle, setWheelAngle] = React.useState(null)
  const [currentWinValue, setCurrentWinValue] = React.useState(null)
  const [isClicked, setIsClicked] = React.useState(false);

  React.useEffect(() => {
    if (!isClicked) {
      return
    }
    setTimeout(()=> {
      const currentAngle = wheelAngle % 360;
      if (currentAngle > 22.5 && currentAngle <= 67.5) {
        onClick('750');
        console.log('750 очков на барабане');
      } else if (currentAngle > 67.5 && currentAngle <= 112.5) {
        onClick('200');
        console.log('200 очков на барабане');
      } else if (currentAngle > 112.5 && currentAngle <= 157.5) {
        onClick('150');
        console.log('150 очков на барабане');
      } else if (currentAngle > 157.5 && currentAngle <= 202.5) {
        onClick('100');
        console.log('100 очков на барабане');
      } else if (currentAngle > 202.5 && currentAngle <= 247.5) {
        onClick('10');
        console.log('10 очков на барабане');
      } else if (currentAngle > 247.5 && currentAngle <= 292.5) {
        onClick('400');
        console.log('400 очков на барабане');
      } else if (currentAngle > 292.5 && currentAngle <= 337.5) {
        onClick('250');
        console.log('250 очков на барабане');
      } else {
        onClick('JACKPOT');
        console.log('JACKPOT!');
      }
    
    }, 4700)
    
  }, [wheelAngle])

  function randomInteger(min, max) {
    let rand = Math.floor((min + Math.random() * (max + 1 - min)) * 10) / 10;
    if (Math.floor(rand) === 360) {
      rand = 4;
      return rand;
    }
    return rand;
  }

  const getRandomWheelAngle = () => {
    setIsClicked(true)
    const randomMath = randomInteger(1, 360);
    setWheelAngle(wheelAngle + randomMath + 3600)
  }

  return (
    <main className="main" >
      <div className="main__container">
        <Wheel wheelAngle={wheelAngle} />
        <div className="main__info">
          <div className="main__info-container">
            <p className='main__info-heading'>JACKPOT 1000</p>
          </div>
          <div className="main__info-container">
            <p className='main__info-heading'>{`BALANCE ${user.balance}`}</p>
          </div>
          <Button className="main__button-spin" onClick={getRandomWheelAngle} content={'SPIN WHEEL'}/>
        </div>
      </div>
      <Winners/>

    </main>
  );
}

export default App;
