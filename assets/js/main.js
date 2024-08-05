// Initialize AOS animations
AOS.init({
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 700, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});

// DOMContentLoaded event to ensure the DOM is fully loaded before executing scripts
document.addEventListener("DOMContentLoaded", function() {

  // Chatbot functionality
  const chatMessages = document.querySelector('.chat-messages');
  const chatInput = document.querySelector('.chat-input');
  const chatSendButton = document.querySelector('.chat-send-button');

  // Initial greeting message
  const greetingMessage = "Hey, welcome to L'Atelier De Rachit. If you're wondering, that translates to 'The Workshop of Creation.' Now you're @ the right spot if you have less time on your hand than you'd like. Funny how automating your baseline can open up a world to unrealized gains and revenue. Now in order for us to be efficient, drop us your *Full Name, Phone #, Email, Business name, Business website, a brief message with your next available times for a meeting/zoom call*. We will contact you ONLY if we can improve your current business baseline by at least 40%.";

  // Display the greeting message when the chatbot loads
  addMessage(greetingMessage, 'bot');

  // Function to add a message to the chat
  function addMessage(content, sender = 'user') {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', sender);
    messageDiv.textContent = content;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Function to handle sending a message
  function sendMessage() {
    const message = chatInput.value.trim();
    if (message !== '') {
      addMessage(message, 'user');
      chatInput.value = '';

      // Simulate a response from the bot
      setTimeout(() => {
        const response = getChatbotResponse(message);
        addMessage(response, 'bot');
      }, 1000);
    }
  }

  // Event listener for the send button
  chatSendButton.addEventListener('click', sendMessage);

  // Event listener for pressing Enter in the input field
  chatInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      sendMessage();
    }
  });

  // Function to validate user input and respond accordingly
  function getChatbotResponse(message) {
    const requiredFields = ['full name', 'phone', 'email', 'business name', 'business website', 'message', 'next available times'];
    const userInput = message.toLowerCase();

    // Check if the message contains all required fields
    const isValid = requiredFields.every(field => userInput.includes(field));

    if (isValid) {
      return "Thank you for providing all the details. Our team will review your information and contact you shortly.";
    } else {
      return "It seems you haven't provided all the required information. Please make sure to include your *Full Name, Phone #, Email, Business Name, Business Website, a brief message, and your next available times for a meeting/zoom call.* Alternatively, you can submit the form or call us during business hours.";
    }
  }

  // Form toggle functionality
  const ctaButton = document.getElementById('cta-form-trigger');
  const formContainer = document.getElementById('embedded-form');

  ctaButton.addEventListener('click', function() {
    formContainer.classList.toggle('hidden');
  });

});


});
