// checkout.js

// Initialize Stripe with your public key
const stripe = Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

document.getElementById('checkout-restaurant').addEventListener('click', () => handleCheckout('price_1PHzRv089CJ3PNUMgNmcfoek'));
document.getElementById('checkout-salon').addEventListener('click', () => handleCheckout('price_1PHzZt089CJ3PNUM4O3sMLBL'));
document.getElementById('checkout-gallery').addEventListener('click', () => handleCheckout('price_1PHzbB089CJ3PNUMT9Mr5sob'));
document.getElementById('checkout-tech-audit').addEventListener('click', () => handleCheckout('price_1PHzgA089CJ3PNUMRrPe9xqR'));

function handleCheckout(priceId) {
  fetch('/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      priceId: priceId,
    }),
  })
    .then(response => response.json())
    .then(session => {
      return stripe.redirectToCheckout({ sessionId: session.id });
    })
    .then(result => {
      if (result.error) {
        alert(result.error.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}