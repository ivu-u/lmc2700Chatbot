const express = require('express');
const app = express();
const OpenAI = require('openai');
const apiKey = 'YOUR_OPENAI_API_KEY'; // Replace with your actual API key

const openai = new OpenAI({ apiKey });

// Serve your HTML page when accessing the root URL
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use(express.json());

// Set the desired port number
const port = 3000;

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Function to generate a response from the chatbot
async function generateChatbotResponse(userMessage, apiKey) {
    const apiUrl = 'https://api.openai.com/v1/chat/completions'; // Use the appropriate endpoint for your API version

    const requestBody = {
        messages: [
            {
                role: 'system',
                content: 'You have entered a chat with a chatbot. You are a helpful assistant.'
            },
            {
                role: 'user',
                content: userMessage
            }
        ],
        max_tokens: 50, // Adjust this to control the response length
    };

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(requestBody),
    });

    if (response.ok) {
        const data = await response.json();
        return data.choices[0].message.content.trim(); // Extract and clean the response text
    } else {
        console.error('Failed to generate chatbot response');
        return 'Chatbot: An error occurred while processing your request.';
    }
}
    
// Function to display a message in the chat container
function displayMessage(message) {
    var chatContainer = document.getElementById("chat-container");
    var messageElement = document.createElement("p");
    messageElement.textContent = message;
    chatContainer.appendChild(messageElement);
}

    // Function to send a message to OpenAI and get a response
async function sendMessage() {
    // Get the user's message from the input field
    const userMessage = document.getElementById("user-input").value;

    // Clear the input field
    document.getElementById("user-input").value = "";

    // Display the user's message in the chat container
    displayMessage("You: " + userMessage);

    // Make a request to OpenAI's GPT-3 API to get a response
    const response = await generateChatbotResponse(userMessage, apiKey);

    // Display the chatbot's response
    displayMessage("Chatbot: " + response);
}

