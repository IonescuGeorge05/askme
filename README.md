# Romanian ChatGPT API Server

A secure and robust API server for interacting with OpenAI's ChatGPT API, specifically optimized for Romanian language processing.

## Features

- Secure API endpoints with rate limiting
- Input validation and error handling
- Comprehensive logging
- Environment-based configuration
- Health check endpoint
- Compression and security headers

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd romanian-chatgpt
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
OPENAI_API_KEY=your_api_key_here
PORT=3000
NODE_ENV=development
LOG_LEVEL=info
OPENAI_MODEL=gpt-4
OPENAI_TEMPERATURE=0.7
```

## Usage

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### API Endpoints

#### POST /api/chat
Send a message to the ChatGPT API.

Request body:
```json
{
  "message": "Your message here"
}
```

Response:
```json
{
  "reply": "ChatGPT's response"
}
```

#### GET /health
Health check endpoint.

Response:
```json
{
  "status": "ok"
}
```

## Development

- `npm run dev` - Start development server with hot reload
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm test` - Run tests

## Security

The application includes several security features:
- Rate limiting
- Helmet security headers
- Input validation
- CORS configuration
- Environment variable validation

## License

ISC