import React, { useState } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

const Payments = ({ projectId, freelancerId, amount }) => {
  const [paymentToken, setPaymentToken] = useState('');

  const onToken = token => {
    setPaymentToken(token.id);
  };

  const completePayment = async e => {
    e.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({
      paymentId: paymentToken,
      amount,
      project: projectId,
      freelancer: freelancerId,
    });

    try {
      await axios.post('/api/payments/complete', body, config);
      alert('Payment successful!');
    } catch (err) {
      console.error(err.response.data);
      alert('Payment failed');
    }
  };

  return (
    <div>
      <h1>Make a Payment</h1>
      <StripeCheckout
        token={onToken}
        stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
        amount={amount * 100}
        name="Freelance Platform Payment"
      />
      <button onClick={completePayment}>Complete Payment</button>
    </div>
  );
};

export default Payments;
