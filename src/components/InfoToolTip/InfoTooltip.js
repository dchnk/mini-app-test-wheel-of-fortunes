import React from "react";
import { usePopupClose } from "../hooks/usePopupClose";
import Coins from '../../images/coins 1.png'
import Jackpot from '../../images/JACKPOT.svg'
import Button from '../button/Button';

function InfoTooltip(props) {

  usePopupClose(props.isOpen, props.onClose)

  return (

    <div className={props.isOpen ? ("popup popup_opened") : ("popup")}>
      <div className="popup__container">
        <h2 className="popup__heading">You win!</h2>
        {props.isOpen !== 'JACKPOT'  && <div className="popup__win">
          <p className="popup__win-value">{props.isOpen}</p>
          <img className="popup__win-image" src={Coins} alt="коины"/>
        </div>}
        {props.isOpen === 'JACKPOT' && <img className="popup__jackpot" src={Jackpot} alt="джэкпот"/>}
        <Button className="popup__button" onClick={props.onClose} content={'GREAT'}/>
      </div>
    </div>

  )


}

export default InfoTooltip;