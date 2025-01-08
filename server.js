const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express()
const PORT = 3000;

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error('OpenAI API Key is missing. Please add it to your .env file.');
  process.exit(1);
}

app.get('/', (req, res) => {
  res.send('Server is running and ready to handle requests!');
});

app.post('/translate', async (req, res) => {
  const { text, language } = req.body;

  if (!text || !language) {
    return res.status(400).json({ error: 'Missing text or language in request body.' });
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `Translate the following text to ${language}:`,
          },
          {
            role: 'user',
            content: text,
          },
        ],
        max_tokens: 100,
        temperature: 0.1,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    const translation = response.data.choices[0].message.content;

    res.status(200).json({ translation });
  } catch (error) {
    console.error('Error translating text:', error.message);
    if (error.response) {
      console.error('Error details:', error.response.data);
    }

    res.status(500).json({
      error: error.response?.data?.error?.message || 'Failed to translate text.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
