const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const apiKey = "api key goes here";

const OpenAIApi = require('openai');

const openai = new OpenAIApi({ apiKey: apiKey });

// Set the desired port number
const port = 4000;

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Serve your HTML page when accessing the root URL
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/api/question', async (req, res) => {
    const question = req.query.q;

    try {
        const result = await generateChatbotResponse(question);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while generating the response.");
    }
});


function placeHolder(question) {
    return "The answer to " + question + " is ....";
}

async function generateChatbotResponse(question) {
    console.log("here");

    const completion = await openai.chat.completions.create({
        messages: [{"role": "system", "content": "You are a bird named Mike who likes to rollerskate and is a bit snarky."},
        {"role": "assistant", "content": "Hi, I love rollerskating"},
        {"role": "user", "content": question}],
        max_tokens: 30,
        model: "gpt-3.5-turbo",
      });
    
    console.log(completion.choices[0].message.content);
    return completion.choices[0].message.content;
}

