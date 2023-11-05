import React, { useEffect, useState } from 'react';
import bridge from '@vkontakte/vk-bridge';
import Main from './components/main/Main';
import Header from './components/header/Header';
import InfoTooltip from './components/InfoToolTip/InfoTooltip';
import { getUser } from './utils/MainApi';


function App() {
  const [fetchedUser, setUser] = useState(null);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(null);
  const [res, setRes] = React.useState(false);
  const [currentWinValue, setCurrentWinValue] = React.useState(null)
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
    if (!currentWinValue) {
      return
    }
    if (currentWinValue === 'JACKPOT') {
      console.log('JACKPOT');
      setCurrentWinValue(0)
      return;
    }
    const currunetBalance = currentWinValue + currentUser.balance - 300;
    setCurrentUser({
      ...currentUser,
      balance: currunetBalance,
    })
    setCurrentWinValue(0)
  }, [currentWinValue]);

  useEffect(() => {
    if (!fetchedUser) {
      return
    }
    getUser(fetchedUser.id, fetchedUser.first_name, fetchedUser.last_name)
      .then(res => {
        console.log(res)
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



  function closeAllPopups() {
    setIsInfoTooltipOpen(false)
  }


  return (
    <div className="page" >
      <div className='page__content'>
        <Header />
        <Main onClick={setIsInfoTooltipOpen} user={currentUser} onWin={setCurrentWinValue} />
        <InfoTooltip onClose={closeAllPopups} isOpen={isInfoTooltipOpen} res={res} />
      </div>
    </div>
  );
}

export default App;
