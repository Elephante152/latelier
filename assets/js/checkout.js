const stripe = Stripe('pk_live_51PHxC4089CJ3PNUMCklxG6BxswiBl81ATm8ua95ZCjgOGCsY1QlUuU4oP5ippxYzOwf2tLkeqclZKYDw9agq8P2R00wdt2YVDu');

const handleCheckout = async (priceId) => {
  const response = await fetch('/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ priceId }),
  });
  const session = await response.json();

  // Redirect to Stripe Checkout
  const result = await stripe.redirectToCheckout({ sessionId: session.id });
  if (result.error) {
    alert(result.error.message);
  }
};

// Replace these values with your actual Stripe Price IDs
document.getElementById('checkout-tech-audit').addEventListener('click', () => handleCheckout('price_1PHzgA089CJ3PNUMRrPe9xqR'));
document.getElementById('checkout-custom-solutions').addEventListener('click', () => handleCheckout('price_1PHzgA089CJ3PNUMRrPe9xqR'));
document.getElementById('checkout-service-agreement').addEventListener('click', () => handleCheckout('price_1PHzgA089CJ3PNUMRrPe9xqR'));
document.getElementById('checkout-why-choose').addEventListener('click', () => handleCheckout('price_1PHzgA089CJ3PNUMRrPe9xqR'));
document.getElementById('checkout-restaurant').addEventListener('click', () => handleCheckout('price_1PHzRv089CJ3PNUMgNmcfoek'));
document.getElementById('checkout-salon').addEventListener('click', () => handleCheckout('price_1PHzZt089CJ3PNUM4O3sMLBL'));
document.getElementById('checkout-gallery').addEventListener('click', () => handleCheckout('price_1PHzbB089CJ3PNUMT9Mr5sob'));
