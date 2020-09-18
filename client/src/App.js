import React, { useState } from 'react';
import './App.css';
import StripeCheckout from 'react-stripe-checkout';

function App() {

  const [product, setProduct ] = useState({
    name: "React from Facebook",
    price: 10,
    productBy: "Facebook"
  });

  const makePayment = token => {
    const body = {
      token,
      product
    }
    const headers = {
      "Content-Type": "application/json"
    }
    return fetch(`http://localhost:9000/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    }).then(response => {
      console.log(response);
      const { status } = response;
      console.log("Status"+ status)
    })
    .catch(err=>{
      console.log(err);
    })
  }

  return (
    <div className="App">
      <StripeCheckout  
      stripeKey="pk_test_51HSaNRH7b8yKfXqktVjqKsp6c5UwmgNKorVPrP0yHm6YhxNanfcMSB3CECL7NMxs6ssVxEiiScRDAmFttAbI63iG00ojPjjVzH"
      token={makePayment}
      name="Buy React"
      amount={product.price * 100}
      >
        <button className="btn-large blue">Buy React {product.price}</button>
      </StripeCheckout>
    </div>
  );
}

export default App;
