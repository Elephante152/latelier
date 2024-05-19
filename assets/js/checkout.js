// checkout.js
document.addEventListener('DOMContentLoaded', function() {
    // Ensure Stripe.js has loaded
    if (!window.Stripe) {
        console.error("Stripe.js has not loaded.");
        return;
    }

    const stripe = Stripe('pk_live_51PHxC4089CJ3PNUMCklxG6BxswiBl81ATm8ua95ZCjgOGCsY1QlUuU4oP5ippxYzOwf2tLkeqclZKYDw9agq8P2R00wdt2YVDu');

    const handleCheckout = (priceId) => {
        fetch('/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                priceId: priceId
            })
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
    };

    document.getElementById('checkout-tech-audit').addEventListener('click', function() {
        handleCheckout('price_1PHzgA089CJ3PNUMRrPe9xqR'); // Replace with your actual Price ID for the tech audit
    });

    document.getElementById('checkout-custom-solutions').addEventListener('click', function() {
        handleCheckout('price_1PHzgA089CJ3PNUMRrPe9xqR'); // Replace with your actual Price ID for custom solutions
    });

    document.getElementById('checkout-service-agreement').addEventListener('click', function() {
        handleCheckout('price_1PHzgA089CJ3PNUMRrPe9xqR'); // Replace with your actual Price ID for the service agreement
    });

    document.getElementById('checkout-why-choose').addEventListener('click', function() {
        handleCheckout('price_1PHzgA089CJ3PNUMRrPe9xqR'); // Replace with your actual Price ID for why choose
    });

    document.getElementById('checkout-restaurant').addEventListener('click', function() {
        handleCheckout('price_1PHzRv089CJ3PNUMgNmcfoek'); // Replace with your actual Price ID for restaurant automation
    });

    document.getElementById('checkout-salon').addEventListener('click', function() {
        handleCheckout('price_1PHzZt089CJ3PNUM4O3sMLBL'); // Replace with your actual Price ID for salon automation
    });

    document.getElementById('checkout-gallery').addEventListener('click', function() {
        handleCheckout('price_1PHzbB089CJ3PNUMT9Mr5sob'); // Replace with your actual Price ID for gallery automation
    });
});
