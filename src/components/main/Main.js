import React from 'react';
import Wheel from '../wheel/Wheel';
import Winners from '../winners/Winners';
import Button from '../button/Button';

function App({user, wheelAngle, onClickButtonSpin, isLoading, jackpot}) {

  function handleButtonClick() {    
    onClickButtonSpin();
  }

  return (
    <main className="main" >
      <div className="main__container">
        <Wheel wheelAngle={wheelAngle} />
        <div className="main__info">
          <div className="main__info-container">
            <p className='main__info-heading'>{`JACKPOT ${jackpot}`}</p>
          </div>
          <div className="main__info-container">
            <p className='main__info-heading'>{`BALANCE ${user.balance}`}</p>
          </div>
          <Button className="main__button-spin" onClick={handleButtonClick} content={'SPIN WHEEL'} isLoading={isLoading}/>
        </div>
      </div>
      <Winners/>

    </main>
  );
}

export default App;