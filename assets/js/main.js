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
const chatMinimizeBtn = chatWidgetContainer.querySelector('.chat-minimize');
const embeddedForm = document.getElementById('sticky-sidebar-right-0X1zbJgl3WzJ6y66oxV8');

let chatStep = 0;
const userResponses = {};

// Chat steps and respective form field IDs
const chatSteps = [
    { message: "Hey, welcome to L'Atelier De Rachit. Let's get started! Please provide your <strong>Full Name</strong>.", field: 'full_name' },
    { message: "Thank you! Now, please provide your <strong>Phone #</strong>.", field: 'phone' },
    { message: "Great! Next, please provide your <strong>Email</strong>.", field: 'email' },
    { message: "Thank you! Now, please provide your <strong>Business Name</strong>.", field: 'business_name' },
    { message: "Almost done! Please provide your <strong>Business Website</strong>.", field: 'business_website' },
    { message: "Lastly, let us know your next available times for a meeting/zoom call.", field: 'meeting_times' }
];

// Append message to chat
function appendMessage(text, isUser = false) {
    const message = document.createElement('div');
    message.classList.add('chat-message');
    if (isUser) message.classList.add('user');
    message.innerHTML = text;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Minimize chat widget
chatMinimizeBtn.addEventListener('click', () => {
    chatWidgetContainer.classList.toggle('minimized');
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

// Send and process user message
function sendMessage() {
    const text = chatInput.value.trim();
    if (text) {
        appendMessage(text, true);
        userResponses[chatSteps[chatStep].field] = text;
        chatInput.value = '';

        // Populate the embedded form field
        populateFormField(chatSteps[chatStep].field, text);

        // Move to the next step
        setTimeout(() => {
            chatStep++;
            if (chatStep < chatSteps.length) {
                appendMessage(chatSteps[chatStep].message);
            } else {
                appendMessage("Thank you for the information. We will contact you if we can improve your current business's baseline by at least 40%.");
                submitFormToCRM();
            }
        }, 1000);

        // Show minimize button and hide close button after the first response
        if (chatStep === 1) {
            chatMinimizeBtn.classList.remove('hidden');
            chatCloseBtn.classList.add('hidden');
        }
    }
}

// Populate form field
function populateFormField(field, value) {
    const formIframe = embeddedForm.contentWindow.document;
    const formField = formIframe.querySelector(`[name="${field}"]`);
    if (formField) {
        formField.value = value;
    }
}

// Submit form to CRM
function submitFormToCRM() {
    const formIframe = embeddedForm.contentWindow.document;
    const form = formIframe.querySelector('form');
    if (form) {
        form.submit();
    } else {
        console.error("Form not found in the iframe.");
    }
}

// Initialize chat with the first step
appendMessage(chatSteps[chatStep].message);
