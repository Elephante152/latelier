const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

document.getElementById('checkout-tech-audit').addEventListener('click', () => handleCheckout('price_1PHzgA089CJ3PNUMRrPe9xqR'));
document.getElementById('checkout-custom-solutions').addEventListener('click', () => handleCheckout('price_1PHzgA089CJ3PNUMRrPe9xqR'));
document.getElementById('checkout-service-agreement').addEventListener('click', () => handleCheckout('price_1PHzgA089CJ3PNUMRrPe9xqR'));
document.getElementById('checkout-why-choose').addEventListener('click', () => handleCheckout('price_1PHzgA089CJ3PNUMRrPe9xqR'));

document.getElementById('checkout-restaurant').addEventListener('click', () => handleCheckout('price_1PHzRv089CJ3PNUMgNmcfoek'));
document.getElementById('checkout-salon').addEventListener('click', () => handleCheckout('price_1PHzZt089CJ3PNUM4O3sMLBL'));
document.getElementById('checkout-gallery').addEventListener('click', () => handleCheckout('price_1PHzbB089CJ3PNUMT9Mr5sob'));

async function handleCheckout(priceId) {
  const response = await fetch('/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      priceId: priceId,
    }),
  });

  const session = await response.json();

  await stripe.redirectToCheckout({ sessionId: session.id });
}