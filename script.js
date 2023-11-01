const express = require('express');
const app = express();
const OpenAI = require('openai');
const apiKey = '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'; // Replace with your actual API key
const openai = new OpenAI({ apiKey });

// Serve your HTML page when accessing the root URL
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use(express.json());
app.use(express.static('public'));

// Set the desired port number
const port = 3000;

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


// Function to send a message to OpenAI and get a response
// This is wrong
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

// Function to generate a response from the chatbot
async function generateChatbotResponse(userMessage, apiKey) {
    app.post('/api/chat'), async (req, res) => {
        const userInput = req.body.userInput;
        const response = await openai.chat.completions.create
        }
    }

    
// Function to display a message in the chat container
function displayMessage(message) {
    var chatContainer = document.getElementById("chat-container");
    var messageElement = document.createElement("p");
    messageElement.textContent = message;
    chatContainer.appendChild(messageElement);
}


