import React from 'react';
import Winner from '../winner/Winner';

function Winners({ winnerList }) {


  return (
    <section className="winners">
      <h2 className='winners__heading'>Winners</h2>
      <ul className='winners__list'>
      
        {winnerList.length > 0 &&  winnerList.map((winner) => (<Winner key={winner.id} winner={winner}/>))}
        
      </ul>
    </section>
  );
}

export default Winners;