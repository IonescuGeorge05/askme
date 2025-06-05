const form = document.getElementById('chatForm');
const messageInput = document.getElementById('messageInput');
const responseDiv = document.getElementById('responseDiv');
const errorDiv = document.getElementById('errorDiv');
const sendButton = document.getElementById('sendButton');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = messageInput.value.trim();
    if (!message) return;

    // Disable input and button while processing
    messageInput.disabled = true;
    sendButton.disabled = true;

    // Clear previous error
    errorDiv.textContent = '';

    // Add user message to chat
    const userMessageElement = document.createElement('div');
    userMessageElement.className = 'message user-message';
    userMessageElement.textContent = message;
    responseDiv.appendChild(userMessageElement);

    // Clear input
    messageInput.value = '';

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        const data = await response.json();
        console.log('Response data:', data);

        if (response.ok) {
            // Add bot message to chat
            const botMessageElement = document.createElement('div');
            botMessageElement.className = 'message bot-message';
            botMessageElement.textContent = data.reply;
            responseDiv.appendChild(botMessageElement);
        } else {
            errorDiv.textContent = data.error || 'An error occurred';
        }
    } catch (error) {
        console.error('Error:', error);
        errorDiv.textContent = 'Failed to send message. Please try again.';
    } finally {
        // Re-enable input and button
        messageInput.disabled = false;
        sendButton.disabled = false;
        messageInput.focus();
    }
}); 