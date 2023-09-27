import React, { useEffect, useState } from "react";
import axios from 'axios';

export function Card() {
  const [checkoutInstance, setCheckoutInstance] = useState(undefined);
  const cards = [];

  useEffect(() => {
    window.Worldpay.checkout.init(
      {
        id: "efdf8ca3-97fe-4b79-9034-0daabe16f669",
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
    axios
      .post('/api/addCard', {
        "paymentInstrument": {
          "type": "card/checkout",
          "cardHolderName": "Sherlock Holmes",
          "sessionHref": session,
          "billingAddress": {
            "address1": "221B Baker Street",
            "postalCode": "NW1 6XE",
            "city": "London",
            "countryCode": "GB",
          }
        },
        "merchant": {
          "entity": "MindPalaceLtd"
        },
        "verificationCurrency": "GBP"
      })
      .then(response => {
        console.log("VerifiedToken: ", response.data);
        cards.push(response.data);
      })
      .catch((error) => {
        if (error.response) {
            console.log("VerifiedToken: ", error.response.data);
            cards.push(error.response.data);
        }
      })
      .finally(() => {
        console.log("Cards: ", cards);
      })
  }

  function generateSession () {
    checkoutInstance.generateSessionState(
      function (error, session) {
        if (error) {
          console.warn(`Failed to generate session: ${error}`);
          return;
        }

        console.log("Session: ", session);
        createVerifiedToken(session);
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