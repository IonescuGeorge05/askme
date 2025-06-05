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

    if (!config.openai.apiKey) {
      logger.error('OpenAI API key is not configured');
      return res.status(500).json({ 
        error: 'Server configuration error',
        details: 'OpenAI API key is not configured. Please check your .env file.'
      });
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

      // Handle specific error cases
      if (error.response) {
        switch (error.response.status) {
          case 401:
            return res.status(500).json({ 
              error: 'Authentication error',
              details: 'Invalid or missing OpenAI API key. Please check your .env file.'
            });
          case 429:
            return res.status(500).json({ 
              error: 'Rate limit exceeded',
              details: 'You have exceeded your OpenAI API rate limit. Please try again later.'
            });
          default:
            const errorMessage = error.response.data && 
                               error.response.data.error && 
                               error.response.data.error.message || 
                               error.message;
            return res.status(500).json({ 
              error: 'OpenAI API error',
              details: errorMessage
            });
        }
      }

      res.status(500).json({ 
        error: 'Failed to process chat request',
        details: error.message 
      });
    }
  }
};

module.exports = { chatController }; 