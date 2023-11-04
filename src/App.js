import React, { useEffect, useState } from 'react';
import bridge from '@vkontakte/vk-bridge';
import Main from './components/main/Main';
import Header from './components/header/Header';
import InfoTooltip from './components/InfoToolTip/InfoTooltip';
import { number } from 'prop-types';


function App() {

  const [fetchedUser, setUser] = useState(null);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(null);
  const [res, setRes] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({
    id: '',
    first_name: "",
    last_name: "",
    photo: "",
    balance: 100,
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
   setCurrentUser({
    ...currentUser,
    id: fetchedUser.id,
    first_name: fetchedUser.first_name,
    last_name: fetchedUser.last_name,
    photo: fetchedUser.photo_max_orig,
   })
   
    console.log(fetchedUser)
  }, [fetchedUser]);



  function closeAllPopups() {
    setIsInfoTooltipOpen(false)
  }


  return (
    <div className="page" >
      <div className='page__content'>
        <Header />
        <Main onClick={setIsInfoTooltipOpen} user={currentUser} />
        <InfoTooltip onClose={closeAllPopups} isOpen={isInfoTooltipOpen} res={res} />
      </div>
    </div>
  );
}

export default App;
