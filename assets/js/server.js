const express = require('express');
const app = express();
const path = require('path');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const dotenv = require('dotenv');

dotenv.config();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const YOUR_DOMAIN = 'https://your-vercel-domain.com';

app.post('/create-checkout-session', async (req, res) => {
  const { priceId } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${YOUR_DOMAIN}/success.html`,
      cancel_url: `${YOUR_DOMAIN}/cancel.html`,
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).send(`Error creating checkout session: ${error.message}`);
  }
});

app.listen(3000, () => console.log('Running on port 3000'));
