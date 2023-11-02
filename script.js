const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));


// Set the desired port number
const port = 4000;

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// // Serve your HTML page when accessing the root URL
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });

// Serve your HTML page when accessing the root URL
app.get('/api/question', (req, res) => {
    const question = req.query.q;
    generateChatbotResponse(question).then(result => {
        res.send(result);
    });
});


// Your OpenAI configuration and functions should be defined here
const apiKey = "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";

const openai = new OpenAI(apiKey);

function placeHolder(question) {
    return "The answer to " + question + " is ....";
}

// Function to generate a response from the chatbot
async function generateChatbotResponse(question) {

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "Who won the world series in 2020?"},
            {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
            {"role": "user", "content": "Where was it played?"}],
      });
    
      return response.choices[0];
    }




