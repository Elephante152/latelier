const stripe = Stripe('pk_live_51PHxC4089CJ3PNUMCklxG6BxswiBl81ATm8ua95ZCjgOGCsY1QlUuU4oP5ippxYzOwf2tLkeqclZKYDw9agq8P2R00wdt2YVDu');

// Event listeners for different checkout buttons
document.getElementById('checkout-tech-audit').addEventListener('click', () => handleCheckout('tech_audit'));
document.getElementById('checkout-custom-solutions').addEventListener('click', () => handleCheckout('custom_solutions'));
document.getElementById('checkout-service-agreement').addEventListener('click', () => handleCheckout('service_agreement'));
document.getElementById('checkout-why-choose').addEventListener('click', () => handleCheckout('why_choose'));
document.getElementById('checkout-restaurant').addEventListener('click', () => handleCheckout('restaurant'));
document.getElementById('checkout-salon').addEventListener('click', () => handleCheckout('salon'));
document.getElementById('checkout-gallery').addEventListener('click', () => handleCheckout('gallery'));

function handleCheckout(product) {
  fetch('https://latelier-kszcpkaoy-rachit-sainis-projects.vercel.app', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ product })
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
