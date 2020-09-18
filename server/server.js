const express = require('express');
const cors = require('cors');
//TODO: add a stripe key
const stripe = require("stripe")("sk_test_51HSaNRH7b8yKfXqkqtYHlVBNTXWiaPnsSw0a5DrLjMjwUgJN1PvDsWWHCcOJGbpwm4fMXYPcgPrDFglRFrQe1K2g00OPVQyGsA");
const { v4: uuidv4 } = require('uuid');

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.get("/",(req,res)=>{
    res.send("It is working!");
})

app.post("/payment", (req,res)=>{
    const { product, token} = req.body;
    console.log("Product", product);
    console.log("Price", product.price);
    const idempontencyKey = uuidv4();

    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => [
        stripe.charges.create({
            amount: product.price * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: `parchasing product.name`,
            shipping: {
                name: token.card.name,
                address: {
                    country: token.card.address_country
                }
            }
        }, {idempontencyKey})
    ]).then(result => {
        res.status(200).json(result)
    }).catch(err => console.log(err))
})

//listen
app.listen(9000, ()=> console.log(`visit: localhost:9000`));