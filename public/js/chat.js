const form = document.getElementById('chatForm');
const messageInput = document.getElementById('messageInput');
const responseDiv = document.getElementById('response');
const errorDiv = document.getElementById('error');
const sendButton = document.getElementById('sendButton');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = messageInput.value;

    // Clear previous errors and responses
    errorDiv.style.display = 'none';
    errorDiv.textContent = '';
    responseDiv.textContent = 'Loading...';
    sendButton.disabled = true;

    try {
        console.log('Sending request:', { message });
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });

        console.log('Response status:', response.status);
        const data = await response.json();
        console.log('Response data:', data);

        if (!response.ok) {
            throw new Error(data.error || data.details || 'Failed to get response');
        }

        responseDiv.textContent = data.reply;
    } catch (error) {
        console.error('Error:', error);
        errorDiv.style.display = 'block';
        errorDiv.textContent = `Error: ${error.message}`;
        responseDiv.textContent = '';
    } finally {
        sendButton.disabled = false;
    }
}); 