document.addEventListener('DOMContentLoaded', () => {
    const stripe = Stripe(process.env.STRIPE_PUBLISHABLE_KEY);
  
    const createCheckoutSession = async (priceId) => {
      try {
        const response = await fetch('/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ priceId }),
        });
  
        const session = await response.json();
        const result = await stripe.redirectToCheckout({ sessionId: session.id });
  
        if (result.error) {
          alert(result.error.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    document.querySelector('#checkout-restaurant').addEventListener('click', () => {
      createCheckoutSession('price_1PHzRv089CJ3PNUMgNmcfoek');
    });
  
    document.querySelector('#checkout-salon').addEventListener('click', () => {
      createCheckoutSession('price_1PHzZt089CJ3PNUM4O3sMLBL');
    });
  
    document.querySelector('#checkout-gallery').addEventListener('click', () => {
      createCheckoutSession('price_1PHzbB089CJ3PNUMT9Mr5sob');
    });
  
    document.querySelector('#checkout-tech-audit').addEventListener('click', () => {
      createCheckoutSession('price_1PHzgA089CJ3PNUMRrPe9xqR');
    });
  
    document.querySelector('#checkout-custom-solutions').addEventListener('click', () => {
      createCheckoutSession('price_1PHzgA089CJ3PNUMRrPe9xqR');
    });
  
    document.querySelector('#checkout-service-agreement').addEventListener('click', () => {
      createCheckoutSession('price_1PHzgA089CJ3PNUMRrPe9xqR');
    });
  
    document.querySelector('#checkout-why-choose').addEventListener('click', () => {
      createCheckoutSession('price_1PHzgA089CJ3PNUMRrPe9xqR');
    });
  });
  