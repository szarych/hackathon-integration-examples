import React, { Component } from 'react';
import { render } from 'react-dom';
import { Card } from './components/checkout';
import request from 'axios';

import './app.css';

class App extends Component {
    constructor() {
        super();

        this.state = {
            message: '',
        }
    }

    componentDidMount() {
        request
            .get('/api/message')
            .then(response => {
                this.setState({
                    message: response.data,
                });
            });
    }

    render() {
        return (
            <section className="container">
                <section className="wrapper">
                    <Card />
                </section>
            </section>
        );
    }
}

render(<App />, document.getElementById('app'));