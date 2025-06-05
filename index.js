const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Add a GET route for the root path
app.get("/", (req, res) => {
  res.send(
    <html>
      <head>
        <title>Chat API</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          h1 {
            color: #333;
          }
          p {
            line-height: 1.6;
          }
        </style>
      </head>
      <body>
        <h1>Chat API Server</h1>
        <p>This is a simple chat API server. To use it, send a POST request to /chat with a JSON body containing a "message" field.</p>
        <p>Example using curl:</p>
        <pre>curl -X POST http://localhost:3000/chat -H "Content-Type: application/json" -d '{"message":"Hello!"}'</pre>
      </body>
    </html>
  );
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4", // or gpt-3.5-turbo
      messages: [{ role: "user", content: message }],
      temperature: 0.7,
    });

    const reply = response.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));