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
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chat-messages');
  const chatSendButton = document.getElementById('chat-send-button');

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

  // Simulated chatbot response logic
  function getChatbotResponse(message) {
    // Simple logic for demonstration
    const responses = {
      "hello": "Hi there! How can I help you today?",
      "help": "Sure, let me know what you need help with!",
      "bye": "Goodbye! Have a great day!"
    };

    const lowerCaseMessage = message.toLowerCase();
    return responses[lowerCaseMessage] || "I'm not sure how to respond to that. Can you rephrase?";
  }

  // Form toggle functionality
  const ctaButton = document.getElementById('cta-form-trigger');
  const formContainer = document.getElementById('embedded-form');

  ctaButton.addEventListener('click', function() {
    formContainer.classList.toggle('active');
  });

});
