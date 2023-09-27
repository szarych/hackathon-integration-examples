import express from "express";
import axios from 'axios';
import bodyParser from "body-parser";

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 9001;
const PROD = process.env.NODE_ENV === 'production';
const encodedCredentials = btoa(process.env.wpUsername + ':' + process.env.wpPassword);

const vtEndpoint = 'https://try.access.worldpay.com/verifiedTokens/cardOnFile';
const tokenHeaders = {
    'Content-Type': 'application/vnd.worldpay.verified-tokens-v3.hal+json',
    Accept: 'application/vnd.worldpay.verified-tokens-v3.hal+json',
    Authorization: `Basic ${encodedCredentials}`,
}

if (PROD) {
    app.use('/', express.static('dist'));
}

app.use(bodyParser.json())

app.post('/api/addCard', async (req, res) => {
    try {
        const reqBody = {
            "paymentInstrument": {
                "type": "card/plain",
                "cardHolderName": req.body.cardHolderName,
                "cardNumber": req.body.cardNumber,
                "cardExpiryDate": {
                  "month": req.body.cardExpiryDate.month,
                  "year": req.body.cardExpiryDate.year
                },
                "cvc": req.body.cvc,
                "billingAddress": {
                  "address1": req.body.address1,
                  "postalCode": req.body.postalCode,
                  "city": req.body.city,
                  "countryCode": req.body.countryCode
                }
              },
              "merchant": {
                "entity": "default"
              },
              "verificationCurrency": "GBP"
        }

        const response = await axios.post(vtEndpoint, reqBody, { headers: tokenHeaders })
        res.send(response.data);
    } catch (error) {
        console.log(error)
        res.status(error.response.status)
        res.send(error.response.data)
    }
});

app.listen(port, () => {
    if (PROD) {
        console.log(`\n\n\n🚀  Server running at http://localhost:${port}.\n\n\n`);
    } else {
        console.log(`\n\n\n🚀  Server running at http://localhost:9000.\n\n\n`);
    }
})