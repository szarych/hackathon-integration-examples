import React, { createContext, useState, useContext } from 'react';
import { Card } from './checkout';

import './app.css';

export const CardsContext = createContext();

export const App = () => {
  const [cards, addCard] = useState([]);

  return (
    <CardsContext.Provider value={{ cards, addCard }}>
      <section className="container">
          <section className="wrapper">
              <Card />
          </section>
          {JSON.stringify(cards)}
      </section>
    </CardsContext.Provider>
  );
};