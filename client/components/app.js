import React, { createContext, useState, useEffect } from 'react';
import { Card } from './checkout';
import { CardList} from './cardList';
import './app.css';

export const CardsContext = createContext();

export const App = () => {
  const [cards, addCard] = useState([]);
  const [display, setDisplay] = useState('add-card')

  useEffect(() => {
    console.log("Cards: ", cards);
  }, [cards])

  return (
    <CardsContext.Provider value={{ cards, addCard, display, setDisplay }}>
      <section className="container">
          <section className="wrapper">
            {display === 'add-card' && <Card />}
            {display === 'card-list' && <CardList cards={cards} />}
          </section>
      </section>
    </CardsContext.Provider>
  );
};