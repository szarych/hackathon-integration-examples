import React, { useEffect, useContext, useState } from "react";

export function CardList({cards}) {

  const [active, setActive] = useState();

  
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
          </div>
      </div>

      <div className="footer">
        <button className="btn add-card-btn">Pay £300</button>
      </div>
    </div>
  );
}