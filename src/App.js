import React, { useEffect, useState } from 'react';
import bridge from '@vkontakte/vk-bridge';
import Main from './components/main/Main';
import Header from './components/header/Header';
import InfoTooltip from './components/InfoToolTip/InfoTooltip';
import { getUser, updateUserBalance, getJackpot, increaseJackpot, winJackpot, getWinners, createWinner } from './utils/MainApi';


function App() {
  const [fetchedUser, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [wheelAngle, setWheelAngle] = React.useState(0)
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(null);
  const [jackpot, setJackpot] = useState(0)
  const [winnerList, setWinnerList] = useState([])
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
      .then(() => {
        getJackpot()
          .then((jackpot) => {
            setJackpot(jackpot[0].current_jackpot);
          })
      })
      .then(() => {
        getWinners()
          .then((winners) => {
            setWinnerList(winners)
          })
      })
  }, [fetchedUser]);

  function handleUpdateUserBalance(currunetWin) {

    if (currunetWin === 'JACKPOT') {
      return winJackpot()
        .then((res) => {
          createWinner(currentUser.id, currentUser.first_name, currentUser.last_name, currentUser.photo, res.currentWin.current_jackpot, true)
          setJackpot(res.jackpot.current_jackpot)

          const currunetBalance = res.currentWin.current_jackpot + currentUser.balance - 300;
          return updateUserBalance(currentUser.id, currunetBalance);
        });
    }

    if (currunetWin === 'GIFT300') {
      const currunetBalance = 300;
      return updateUserBalance(currentUser.id, currunetBalance);
    }

    const currunetBalance = currunetWin + currentUser.balance - 300;
    createWinner(currentUser.id, currentUser.first_name, currentUser.last_name, currentUser.photo, currunetWin, false)
    
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
          setCurrentUser({
            ...currentUser,
            balance: res.balance,
          })
        });
      setIsInfoTooltipOpen('noCoins');
      return;
    }

    increaseJackpot()
      .then((res) => {
        setJackpot(res.current_jackpot)
        setCurrentUser({
          ...currentUser,
          balance: currentUser.balance - 300,
        })
      })

    const randomMath = randomInteger(1, 360);
    const currentWin = checkWin((wheelAngle + randomMath) % 360);

    handleUpdateUserBalance(currentWin)
      .then(res => {
        setTimeout(() => {
          setIsInfoTooltipOpen(currentWin)
          setCurrentUser({
            ...currentUser,
            balance: res.balance,
          })
          getWinners()
          .then((winners) => {
            setWinnerList(winners)
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
        <Main user={currentUser} onClickButtonSpin={handleButtonClick} isLoading={isLoading} wheelAngle={wheelAngle} jackpot={jackpot} winnerList={winnerList} />
        <InfoTooltip onClose={closeAllPopups} isOpen={isInfoTooltipOpen} />
      </div>
    </div>
  );
}

export default App;
