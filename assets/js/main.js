// Initialize AOS library for animations
document.addEventListener('DOMContentLoaded', () => {
    AOS.init();
});

// Chatbot functionality
const chatWidgetContainer = document.querySelector('.chat-widget-container');
const chatMessages = chatWidgetContainer.querySelector('.chat-messages');
const chatInput = chatWidgetContainer.querySelector('.chat-input');
const chatSendBtn = chatWidgetContainer.querySelector('.chat-send-btn');
const chatHeader = chatWidgetContainer.querySelector('.chat-header');
const chatCloseBtn = chatWidgetContainer.querySelector('.chat-close');

function appendMessage(text, isUser = false) {
    const message = document.createElement('div');
    message.classList.add('chat-message');
    if (isUser) message.classList.add('user');
    message.textContent = text;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Open chat widget when clicking the header
chatHeader.addEventListener('click', () => {
    chatWidgetContainer.classList.toggle('open');
});

// Close chat widget
chatCloseBtn.addEventListener('click', () => {
    chatWidgetContainer.style.display = 'none';
});

// Send message on button click
chatSendBtn.addEventListener('click', () => {
    sendMessage();
});

// Send message on pressing Enter
chatInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// Send and append message
function sendMessage() {
    const text = chatInput.value.trim();
    if (text) {
        appendMessage(text, true);
        chatInput.value = '';
        setTimeout(() => {
            // Simulate chatbot response logic
            appendMessage("Hey, welcome to L'Atelier De Rachit. Let's get started! Please provide your *Full Name*.");
        }, 1000);
    }
}

// Chatbot dialogue progression
let chatStep = 0;
const chatSteps = [
    "Hey, welcome to L'Atelier De Rachit. Let's get started! Please provide your *Full Name*.",
    "Thank you! Now, please provide your *Phone #*.",
    "Great! Next, please provide your *Email*.",
    "Thank you! Now, please provide your *Business Name*.",
    "Almost done! Please provide your *Business Website*.",
    "Lastly, let us know your next available times for a meeting/zoom call."
];

function appendMessage(text, isUser = false) {
    const message = document.createElement('div');
    message.classList.add('chat-message');
    if (isUser) message.classList.add('user');
    message.textContent = text;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    if (!isUser && chatStep < chatSteps.length - 1) {
        chatStep++;
        setTimeout(() => {
            appendMessage(chatSteps[chatStep]);
        }, 1000);
    }
}

function sendMessage() {
    const text = chatInput.value.trim();
    if (text) {
        appendMessage(text, true);
        chatInput.value = '';
        setTimeout(() => {
            if (chatStep < chatSteps.length) {
                appendMessage(chatSteps[chatStep]);
            } else {
                appendMessage("Thank you for the information. We will contact you if we can improve your current business's baseline by at least 40%.");
            }
        }, 1000);
    }
}

// CTA button functionality
const ctaButton = document.getElementById('cta-form-trigger');
const embeddedForm = document.getElementById('embedded-form');

// Toggle form visibility on CTA click
ctaButton.addEventListener('click', () => {
    const formIsOpen = embeddedForm.classList.toggle('visible');
    if (formIsOpen) {
        ctaButton.querySelector('.cta-arrow').style.transform = 'rotate(180deg)';
    } else {
        ctaButton.querySelector('.cta-arrow').style.transform = 'rotate(0deg)';
    }
});
