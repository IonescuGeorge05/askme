const { Configuration, OpenAIApi } = require('openai');
const { config } = require('../config');
const { logger } = require('../utils/logger');

const configuration = new Configuration({
  apiKey: config.openai.apiKey,
});
const openai = new OpenAIApi(configuration);

const chatController = {
  async handleChat(req, res) {
    const { message } = req.body;
    logger.info('Received chat request', { message });

    if (!message) {
      logger.error('No message provided in request');
      return res.status(400).json({ error: 'Message is required' });
    }

    try {
      logger.info('Calling OpenAI API', { 
        model: config.openai.model,
        messageLength: message.length 
      });

      const response = await openai.createChatCompletion({
        model: config.openai.model,
        messages: [{ role: 'user', content: message }],
        temperature: config.openai.temperature,
      });

      const reply = response.data.choices[0].message.content;
      logger.info('Successfully received response from OpenAI', { 
        replyLength: reply.length 
      });

      res.json({ reply });
    } catch (error) {
      logger.error('Error in chat controller', { 
        error: error.message,
        stack: error.stack 
      });
      res.status(500).json({ 
        error: 'Failed to process chat request',
        details: error.message 
      });
    }
  }
};

module.exports = { chatController }; 