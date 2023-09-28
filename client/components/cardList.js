import React, { useContext, useState } from "react";
import { CardsContext } from "./app";
import axios from 'axios';

export function CardList({cards}) {
  const {setDisplay} = useContext(CardsContext);
  const [active, setActive] = useState();

  const deleteCard = () => {
    console.log(cards[active]);
    axios
      .post('/api/deleteCard', {
        tokenHref: cards[active].tokenPaymentInstrument.href
      })
      .then(response => {
        if (response.status == 204) {
          cards.splice(active, 1);
          setActive();
        }
      })
  }

  return (
    <div>
      <h1 className="title">Payment Details</h1>

      <div className="cardList">
          <div className="front">
            <h2>Credit cards</h2>
            <ul>
              {cards.map((card, index) => (
                <li key={index}>
                  <div className={active === index ? 'item active': "item"} onClick={() => active === index ? setActive() : setActive(index)}>
                    <div className={`card-logo ${card.brand.toLowerCase()}`}></div><span>{card.cardNumber}</span>
                  </div>
                  { active === index &&
                    <button className="delete-card-btn" onClick={deleteCard}>&#10006;</button>
                  } 
                </li>
              ))
            }
            </ul>

            <button className="btn add-new-card-btn" onClick={() => setDisplay('add-card')}>Add card <span>+</span></button>
          </div>
      </div>

      <div className="footer">
        <button className="btn add-card-btn">Pay £300</button>
      </div>
    </div>
  );
}