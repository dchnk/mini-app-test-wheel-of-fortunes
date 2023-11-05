import React, { useEffect, useState } from 'react';
import bridge from '@vkontakte/vk-bridge';
import Main from './components/main/Main';
import Header from './components/header/Header';
import InfoTooltip from './components/InfoToolTip/InfoTooltip';
import { getUser, updateUserBalance } from './utils/MainApi';


function App() {
  const [fetchedUser, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [wheelAngle, setWheelAngle] = React.useState(0)
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(null);
  const [res, setRes] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({
    id: Number,
    first_name: "",
    last_name: "",
    photo: "",
    balance: 0,
  })

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      setUser(user);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!fetchedUser) {
      return
    }
    getUser(fetchedUser.id, fetchedUser.first_name, fetchedUser.last_name)
      .then(res => {
        setCurrentUser({
          ...currentUser,
          id: fetchedUser.id,
          balance: res.balance,
          first_name: fetchedUser.first_name,
          last_name: fetchedUser.last_name,
          photo: fetchedUser.photo_max_orig,
        })
      })
  }, [fetchedUser]);

  function handleUpdateUserBalance(currunetWin) {

    if (currunetWin === 'JACKPOT') {
      console.log('JACKPOT');
      return;
    }

    if (currunetWin === 'GIFT300') {
      const currunetBalance = 300;
      return updateUserBalance(currentUser.id, currunetBalance);
    }

    const currunetBalance = currunetWin + currentUser.balance - 300;
    return updateUserBalance(currentUser.id, currunetBalance);
  }

  function closeAllPopups() {
    setIsLoading(false)
    setIsInfoTooltipOpen(false)
  }

  function randomInteger(min, max) {
    let rand = Math.floor(min + Math.random() * (max + 1 - min));
    return rand;
  }

  const handleButtonClick = () => {
    setIsLoading(true);

    // Если у пользователя меньше 300 Coins, то мы дарим ему их. 

    if (currentUser.balance < 300) {
      handleUpdateUserBalance('GIFT300')
        .then(res => {
          console.log(res)
          setCurrentUser({
            ...currentUser,
            balance: res.balance,
          })
        });
      setIsInfoTooltipOpen('noCoins');
      return;
    }

    setCurrentUser({
      ...currentUser,
      balance: currentUser.balance - 300,
    })

    const randomMath = randomInteger(1, 360);
    const currentWin = checkWin((wheelAngle + randomMath) % 360);

    if (currentWin === 'JACKPOT') {
      return console.log(currentWin)
    }

    handleUpdateUserBalance(currentWin)
      .then(res => {
        setTimeout(() => {
          setIsInfoTooltipOpen(currentWin)
          setCurrentUser({
            ...currentUser,
            balance: res.balance,
          })
        }, 4500)
        setWheelAngle(wheelAngle + randomMath + 3600);
      })
  }

  function checkWin(angle) {
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
      return ('JACKPOT');
    }
  }


  return (
    <div className="page" >
      <div className='page__content'>
        <Header />
        <Main user={currentUser} onClickButtonSpin={handleButtonClick} isLoading={isLoading} wheelAngle={wheelAngle} />
        <InfoTooltip onClose={closeAllPopups} isOpen={isInfoTooltipOpen} res={res} />
      </div>
    </div>
  );
}

export default App;
