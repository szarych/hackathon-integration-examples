import React, { useEffect, useContext, useState } from "react";

export function CardList({cards}) {
    console.log(cards);
    useEffect(() => {
    }, []);
  
    return (
      <div>
        <h1 className="title">Payment Details</h1>
  
        <div className="cardList">
            <div className="front">
              <div>
                {cards.map((card, index) => (
                  <div key={index} className="item">
                    <div className="brand-text">{card.brand}</div>
                  </div>
                ))
              }
              </div>
            </div>
        </div>
      </div>
    );
  }