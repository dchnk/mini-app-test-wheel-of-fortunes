import React from 'react';
import Wheel from '../wheel/Wheel';
import Winners from '../winners/Winners';
import Button from '../button/Button';

function App({onClick, user, onWin}) {

  const [wheelAngle, setWheelAngle] = React.useState(0)
  const [isClicked, setIsClicked] = React.useState(false);

  React.useEffect(() => {
    if (!isClicked) {
      return
    }
    setTimeout(()=> {
      const currentAngle = wheelAngle % 360;
      if (currentAngle > 25 && currentAngle <= 70) {
        onClick(750);
      } else if (currentAngle > 70 && currentAngle <= 115) {
        onClick(200);
      } else if (currentAngle > 115 && currentAngle <= 160) {
        onClick(150);
      } else if (currentAngle > 160 && currentAngle <= 205) {
        onClick(100);
      } else if (currentAngle > 205 && currentAngle <= 250) {
        onClick(10);
      } else if (currentAngle > 250 && currentAngle <= 295) {
        onClick(400);
      } else if (currentAngle > 295 && currentAngle <= 340) {
        onClick(250);
      } else {
        onClick('JACKPOT');
      }
    
    }, 4500)
    
  }, [wheelAngle])

  function checkWin (angle) {
    if (angle > 25 && angle <= 70) {
      return 750;
    } else if (angle > 70 && angle <= 115) {
      return 200;
    } else if (angle > 115 && angle <= 160) {
      return 150;
    } else if (angle > 160 && angle <= 205) {
      return 100;
    } else if (angle > 205 && angle <= 250) {
      return 10;
    } else if (angle > 250 && angle <= 295) {
      return 400;
    } else if (angle > 295 && angle <= 340) {
      return 250;
    } else {
      return('JACKPOT');
    }
  }

  function handleButtonClick() {
    
    returnCurrentWin();
    setIsClicked(true);
  }


  function randomInteger(min, max) {
    let rand = Math.floor(min + Math.random() * (max + 1 - min));
    return rand;
  }
  
  const returnCurrentWin = () => {
    onWin(0);
    if (user.balance < 300) {
      return onClick('You need 300 for SPIN');
    }
    const randomMath = randomInteger(1, 360);
    const currentWin = checkWin((wheelAngle + randomMath) % 360);   
    setWheelAngle(wheelAngle + randomMath + 3600);
    onWin(currentWin);
  }

  const getRandomWheelAngle = () => {
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
          <Button className="main__button-spin" onClick={handleButtonClick} content={'SPIN WHEEL'}/>
        </div>
      </div>
      <Winners/>

    </main>
  );
}

export default App;
