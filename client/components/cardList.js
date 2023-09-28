import React, { useState } from "react";
import axios from 'axios';

export function CardList({cards}) {

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
                <li key={index} className={active === index ? 'item active': "item"} onClick={() => active === index ? setActive() : setActive(index)}>
                  <img src="https://developer.worldpay.com/assets/embeddable/checkout/img/visa-logo.png" /><span>{card.cardNumber}</span>
                </li>
              ))
            }
            </ul>
            { active != undefined &&
              <button className="btn-secondary add-card-btn" onClick={deleteCard}>Delete</button>
            }
          </div>
      </div>

      <div className="footer">
        <button className="btn add-card-btn">Pay £300</button>
      </div>
    </div>
  );
}