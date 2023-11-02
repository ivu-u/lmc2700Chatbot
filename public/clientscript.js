// Assuming you have a reference to the Send button element
const sendButton = document.getElementById('sendButton');

// Add an event listener to the Send button
sendButton.addEventListener('click', async () => {
    // Assuming you have a reference to the user input element
    const userInput = document.getElementById('user-input');
    const userMessage = userInput.value;

    // Make an API request to '/api/question' with the user's message
    const response = await fetch(`/api/question?q=${userMessage}`);
    
    if (response.ok) {
        // If the API request is successful, parse the response
        const result = await response.text();
        
        // Assuming you have a reference to the chat container
        const chatContainer = document.getElementById('chat-container');
        
        // Create a new div to display the chat message
        const chatMessage = document.createElement('div');
        chatMessage.textContent = result;
        
        // Append the chat message to the chat container
        chatContainer.appendChild(chatMessage);
        
        // Clear the user input field
        userInput.value = '';
    } else {
        console.error('Error while fetching response from the API');
    }
});
