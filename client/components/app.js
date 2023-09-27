import React, { createContext, useState, useContext } from 'react';
import { Card } from './checkout';
import { CardList} from './cardList';
import './app.css';

export const CardsContext = createContext();

export const App = () => {
  const [cards, addCard] = useState([]);

  return (
    <CardsContext.Provider value={{ cards, addCard }}>
      <section className="container" style={{display: 'flex', flexDirection: 'row'}}>
          <section className="wrapper" style={{marginRight: '1rem'}}>
            <Card />
          </section>
          <section className="wrapper">
            <CardList cards={cards} />
            {/* {JSON.stringify(cards)} */}
          </section>
      </section>
    </CardsContext.Provider>
  );
};