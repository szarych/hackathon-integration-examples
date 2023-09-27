import React, { useEffect, useState } from "react";

export function Card() {
  const [checkoutInstance, setCheckoutInstance] = useState(undefined);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    window.Worldpay.checkout.init(
      {
        id: "dd0ea6d1-6a59-4fc2-89b3-f50296d7aec5",
        form: "#card",
        fields: {
          pan: {
            selector: "#card-pan",
            placeholder: "0000 0000 0000 0000"
          },
          expiry: {
            selector: "#card-expiry",
          },
          cvv: {
            selector: "#card-cvc",
            placeholder: "000"
          },
        },
        styles: {
          "input": {
            "color": "black",
            "letter-spacing": "1px",
          },
          "input.is-invalid": {
            "color": "red",
          },
          "input.is-onfocus": {
            "color": "black",
          },
        },
        enablePanFormatting: true,
      },
      function (error, checkout) {
        if (error) {
          console.error(error);
        } else {
          setCheckoutInstance(checkout);
        }
      },
    );
  }, []);

  function createVerifiedToken(session) {
    request
    .post('/addCard')
    .then(response => {
        this.setState({
            message: response.data,
        });
    });
  }

  function generateSession () {
    checkoutInstance.generateSessionState(
      function (error, session) {
        if (error) {
          console.warn(`Failed to generate session: ${error}`);
          return;
        }

        console.log(session)
        // createVerifiedToken(session);
      });
  }

  return (
    <div>
      <h1 className="title">Add new card</h1>

      <div className="card" id="card">
          <div className="front">
              <div className="card-type"><img src="https://developer.worldpay.com/assets/embeddable/checkout/img/visa-logo.png"></img></div>
              <label htmlFor="card-pan">Card number</label>
              <div id="card-pan" className="field pan"></div>
              <label htmlFor="card-expiry">Expiry date</label>
              <div id="card-expiry" className="field expiry"></div>
          </div>
          <div className="back">
              <label htmlFor="card-cvc">Code</label>
              <div id="card-cvc" className="field cvc"></div>
              <p className="text">The number on the back of the card</p>
          </div>
      </div>

      <div className="footer">
          <button className="btn add-card-btn" onClick={generateSession}>Add card</button>
      </div>
    </div>
  );
}