// checkout.js
document.getElementById('checkout-tech-audit').addEventListener('click', function() {
    handleCheckout('price_1PHzgA089CJ3PNUMRrPe9xqR');
  });
  
  document.getElementById('checkout-custom-solutions').addEventListener('click', function() {
    handleCheckout('price_1PHzgA089CJ3PNUMRrPe9xqR');
  });
  
  document.getElementById('checkout-service-agreement').addEventListener('click', function() {
    handleCheckout('price_1PHzgA089CJ3PNUMRrPe9xqR');
  });
  
  document.getElementById('checkout-why-choose').addEventListener('click', function() {
    handleCheckout('price_1PHzgA089CJ3PNUMRrPe9xqR');
  });
  
  document.getElementById('checkout-restaurant').addEventListener('click', function() {
    handleCheckout('price_1PHzRv089CJ3PNUMgNmcfoek');
  });
  
  document.getElementById('checkout-salon').addEventListener('click', function() {
    handleCheckout('price_1PHzZt089CJ3PNUM4O3sMLBL');
  });
  
  document.getElementById('checkout-gallery').addEventListener('click', function() {
    handleCheckout('price_1PHzbB089CJ3PNUMT9Mr5sob');
  });
  
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
    .then((response) => response.json())
    .then((session) => {
      return stripe.redirectToCheckout({ sessionId: session.id });
    })
    .then((result) => {
      if (result.error) {
        alert(result.error.message);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }  