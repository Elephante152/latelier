// Initialize AOS library for animations
document.addEventListener('DOMContentLoaded', () => {
    AOS.init();
});

// Chatbot functionality
const chatWidgetContainer = document.querySelector('.chat-widget-container');
const chatMessages = chatWidgetContainer.querySelector('.chat-messages');
const chatInput = chatWidgetContainer.querySelector('.chat-input');
const chatSendBtn = chatWidgetContainer.querySelector('.chat-send-btn');
const chatMinimizeBtn = chatWidgetContainer.querySelector('.chat-minimize');
const embeddedForm = document.getElementById('sticky-sidebar-right-0X1zbJgl3WzJ6y66oxV8');

if (!chatWidgetContainer) {
    console.error("Chat widget container not found.");
}
if (!chatMessages) {
    console.error("Chat messages container not found.");
}
if (!chatInput) {
    console.error("Chat input not found.");
}
if (!chatSendBtn) {
    console.error("Chat send button not found.");
}
if (!chatMinimizeBtn) {
    console.error("Chat minimize button not found.");
}
if (!embeddedForm) {
    console.error("Embedded form not found.");
}

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
    if (!chatMessages) return;
    const message = document.createElement('div');
    message.classList.add('chat-message');
    if (isUser) message.classList.add('user');
    message.innerHTML = text;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Minimize chat widget
chatMinimizeBtn.addEventListener('click', () => {
    if (chatWidgetContainer.classList.contains('minimized')) {
        chatWidgetContainer.classList.remove('minimized');
        chatMinimizeBtn.textContent = '-';
    } else {
        chatWidgetContainer.classList.add('minimized');
        chatMinimizeBtn.textContent = '+';
    }
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

        console.log(`Field: ${chatSteps[chatStep].field}, Value: ${text}`);

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
    }
}

// Populate form field
function populateFormField(field, value) {
    try {
        const formIframe = embeddedForm.contentWindow.document;
        const formField = formIframe.querySelector(`[name="${field}"]`);
        if (formField) {
            formField.value = value;
        } else {
            console.error(`Form field ${field} not found.`);
        }
    } catch (error) {
        console.error(`Error accessing form iframe: ${error.message}`);
    }
}

// Submit form to CRM
function submitFormToCRM() {
    try {
        const formIframe = embeddedForm.contentWindow.document;
        const form = formIframe.querySelector('form');
        if (form) {
            form.submit();
        } else {
            console.error("Form not found in the iframe.");
        }
    } catch (error) {
        console.error(`Error submitting form to CRM: ${error.message}`);
    }
}

// Initialize chat with the first step
appendMessage(chatSteps[chatStep].message);
