import React from 'react';
import { Card } from './checkout';
import request from 'axios';

import './app.css';

export const App = () => {
  return (
    <section className="container">
        <section className="wrapper">
            <Card />
        </section>
    </section>
  );
};