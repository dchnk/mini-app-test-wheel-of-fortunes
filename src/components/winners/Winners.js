import React from 'react';
import Winner from '../winner/Winner';

function Winners({ }) {

const winnersList = [
  {
    id: '1',
    firstName: "Оксана",
    secondName: "Киркорова",
    avatar: '../../images/Avatar.svg'
  },
  {
    id: '2',
    firstName: "Оксана2",
    secondName: "Киркорова",
    avatar: '../../images/Avatar.svg'
  },
  {
    id: '3',
    firstName: "Оксана3",
    secondName: "Киркорова",
    avatar: '../../images/Avatar.svg'
  },
  {
    id: '4',
    firstName: "Оксана4",
    secondName: "Киркорова",
    avatar: '../../images/Avatar.svg'
  },
  
]

  return (
    <section className="winners">
      <h2 className='winners__heading'>Winners</h2>
      <ul className='winners__list'>
      
        {winnersList.map((winner) => (<Winner key={winner.id} avatar={winner.avatar} name={winner.firstName + ' ' + winner.secondName}/>))}
        
      </ul>
    </section>
  );
}

export default Winners;