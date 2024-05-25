const Payment = require('../models/Payment');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create a payment
exports.createPayment = async (req, res) => {
  const { project, amount } = req.body;

  try {
    const payment = new Payment({
      project,
      client: req.user.id,
      freelancer: req.body.freelancer,
      amount,
    });

    await payment.save();
    res.json(payment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Complete a payment
exports.completePayment = async (req, res) => {
  const { paymentId, paymentToken } = req.body;

  try {
    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ msg: 'Payment not found' });
    }

    // Ensure user is the client
    if (payment.client.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    const charge = await stripe.charges.create({
      amount: payment.amount * 100, // Stripe works with smallest currency unit
      currency: 'usd',
      source: paymentToken,
      description: `Payment for project ${payment.project}`,
    });

    payment.status = 'completed';
    payment.paymentDate = Date.now();
    await payment.save();

    res.json(payment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
