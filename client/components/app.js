import React from 'react';
import { Card, CardList } from './checkout';
import request from 'axios';

import './app.css';

export const App = () => {
  const cards = [
    {
      brand: "visa", 
      cardNumber:"4444********1111", 
      href:"https://try.access.worldpay.com/tokens/visaToken"
    },
    {
      brand: "master", 
      cardNumber:"5200********1005", 
      href:"https://try.access.worldpay.com/tokens/masterToken"
    },
    {
      brand: "Amex", 
      cardNumber:"3400********1007", 
      href:"https://try.access.worldpay.com/tokens/amexToekn"
    },
  ];

  return (
    <section className="container">
        <section className="wrapper">
            {/* <Card /> */}
            <CardList cards={cards}></CardList>
        </section>
    </section>
  );
};