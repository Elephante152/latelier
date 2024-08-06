// JavaScript for CTA Button and Form
const ctaButton = document.getElementById('cta-form-trigger');
const formContainer = document.getElementById('embedded-form');

// Toggle the visibility of the form
ctaButton.addEventListener('click', () => {
    formContainer.classList.toggle('visible');
});

// Chat Widget Logic
const chatWidgetContainer = document.querySelector('.chat-widget-container');
const chatHeader = document.querySelector('.chat-header');
const chatInput = document.querySelector('.chat-input');
const chatSendBtn = document.querySelector('.chat-send-btn');
const chatMessages = document.querySelector('.chat-messages');

chatHeader.addEventListener('click', () => {
    chatWidgetContainer.classList.toggle('collapsed');
});

chatSendBtn.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message');
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});
