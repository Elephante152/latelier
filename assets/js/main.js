// Initialize AOS library for animations
document.addEventListener('DOMContentLoaded', () => {
    AOS.init();
});

// Chatbot functionality
const chatWidget = document.querySelector('.chat-widget-container');
const chatMessages = chatWidget.querySelector('.chat-messages');
const chatInput = chatWidget.querySelector('.chat-input');
const chatSendBtn = chatWidget.querySelector('.chat-send-btn');

function appendMessage(text, isUser = false) {
    const message = document.createElement('div');
    message.classList.add('chat-message');
    if (isUser) message.classList.add('user');
    message.textContent = text;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

chatSendBtn.addEventListener('click', () => {
    const text = chatInput.value.trim();
    if (text) {
        appendMessage(text, true);
        chatInput.value = '';
        setTimeout(() => {
            // Here, you would integrate your chatbot's response logic
            appendMessage("Hey, welcome to L'Atelier De Rachit. If you're wondering, that translates to 'The Workshop of Creation.' Now you're @ the right spot if you have less time on your hand than you'd like. Funny how automating your baseline can open up a world to unrealized gains and revenue. Now in order for us to be efficient, drop us your *Full Name, Phone #, Email, Business name, Business website, a brief message with your next available times for a meeting/zoom call* We will contact you ONLY if we can improve your current business's baseline by at least 40%.");
        }, 1000);
    }
});

chatInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        chatSendBtn.click();
    }
});

// CTA button functionality
const ctaButton = document.getElementById('cta-form-trigger');
const embeddedForm = document.getElementById('embedded-form');

ctaButton.addEventListener('click', () => {
    const formIsOpen = embeddedForm.classList.toggle('open');
    if (formIsOpen) {
        ctaButton.querySelector('.cta-arrow').style.transform = 'rotate(180deg)';
    } else {
        ctaButton.querySelector('.cta-arrow').style.transform = 'rotate(0deg)';
    }
});
