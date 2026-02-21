# AI Debate Arena - Setup Instructions

## Overview

This application uses **TWO DIFFERENT AI MODELS** to power authentic debates:
- **Agent A (YC Partner)**: Uses **GPT-4o** (temp: 0.9) - Business-focused, aggressive, visionary
- **Agent B (Senior Engineer)**: Uses **GPT-4o-mini** (temp: 0.7) - Technical, pragmatic, architecture-focused
- **Judge**: Uses **GPT-4o** (temp: 0.6) - Synthesizes both perspectives into a conclusion

Each agent has its own AI model and temperature settings to create distinct personalities!

## Setup Steps

### 1. Install Dependencies

All necessary dependencies are already installed. If you need to reinstall:

```bash
npm install
```

### 2. Configure OpenAI API Key

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=sk-your-actual-api-key-here
   PORT=3001
   ```

3. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)

### 3. Run the Application

You have two options:

**Option A: Run frontend and backend together (recommended)**
```bash
npm run dev:all
```

This will start:
- Frontend (Vite): http://localhost:8080
- Backend API: http://localhost:3001

**Option B: Run separately**

Terminal 1 (Backend):
```bash
npm run server
```

Terminal 2 (Frontend):
```bash
npm run dev
```

### 4. Use the Application

1. Open http://localhost:8080 in your browser
2. Enter a debate topic (e.g., "Will React exist in 5 years?")
3. Click "Start Debate"
4. Watch Agent A and Agent B debate in 4 turns (A → B → A → B)
5. Click "Force Conclusion" to get a synthesized takeaway from the Judge

## Features Implemented

### Backend (`server/index.ts`)
- ✅ Express API server with CORS support
- ✅ `/api/debate` POST endpoint
- ✅ **TWO DIFFERENT AI MODELS** for authentic debates:
  - Agent A uses **GPT-4o** with temperature 0.9 (aggressive, creative)
  - Agent B uses **GPT-4o-mini** with temperature 0.7 (precise, technical)
  - Judge uses **GPT-4o** with temperature 0.6 (balanced synthesis)
- ✅ Dynamic system prompts based on speaker (Agent A, Agent B, Judge)
- ✅ Model-specific configurations (temperature, max_tokens per agent)
- ✅ Comprehensive error handling (API key validation, rate limits, etc.)
- ✅ Environment variable configuration
- ✅ Logging which model is being used for each response

### Frontend Updates (`src/pages/Index.tsx`)
- ✅ Real API integration replacing mock data
- ✅ 4-turn debate flow (A → B → A → B)
- ✅ Loading states with typing indicators
- ✅ Auto-scrolling chat window
- ✅ Error handling with toast notifications
- ✅ Force conclusion feature using Judge agent
- ✅ Message history tracking for context

### API Service (`src/lib/debateAPI.ts`)
- ✅ Type-safe API client
- ✅ Error handling and response validation
- ✅ TypeScript interfaces for requests/responses

## API Endpoints

### POST `/api/debate`

**Request Body:**
```json
{
  "messages": [
    {
      "role": "assistant",
      "content": "previous message",
      "name": "Agent A"
    }
  ],
  "currentSpeaker": "Agent A",
  "topic": "Will React exist in 5 years?"
}
```

**Response:**
```json
{
  "response": "The AI agent's response..."
}
```

**Supported Speakers:**
- `"Agent A"` - Y Combinator Partner persona
- `"Agent B"` - Senior Staff Engineer persona
- `"Judge"` - Moderator/synthesizer persona

### GET `/api/health`

Health check endpoint to verify the API is running.

## Error Handling

The application includes robust error handling:

- **Missing API Key**: Clear error message prompting to set `OPENAI_API_KEY`
- **Rate Limits**: Graceful handling of OpenAI rate limit errors
- **Network Errors**: User-friendly toast notifications
- **Invalid Requests**: Validation of required fields

## Troubleshooting

### "OpenAI API key is invalid or missing"
- Ensure `.env` file exists in the project root
- Verify `OPENAI_API_KEY` is set correctly
- Restart the server after updating `.env`

### Port already in use
- Change the `PORT` in `.env` to a different port (e.g., 3002)
- Or kill the process using port 3001: `lsof -ti:3001 | xargs kill -9`

### Frontend can't connect to backend
- Ensure both servers are running
- Check that Vite proxy is configured (it should be)
- Verify backend is running on port 3001

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend**: Express, TypeScript, OpenAI SDK
- **AI Models**: 
  - Agent A: OpenAI GPT-4o (powerful, creative)
  - Agent B: OpenAI GPT-4o-mini (efficient, precise)
  - Judge: OpenAI GPT-4o (synthesis)

## Constraints Met

✅ OpenAI SDK integration  
✅ Dynamic system prompts per speaker  
✅ 4-turn debate sequence (A → B → A → B)  
✅ Judge conclusion synthesis  
✅ Robust error handling (try/catch)  
✅ Auto-scrolling chat  
✅ Loading states with typing indicators  
✅ No design changes (Tailwind preserved)  
✅ TypeScript throughout  

## Notes

- **Agent A uses GPT-4o** (temp: 0.9) for bold, aggressive business insights
- **Agent B uses GPT-4o-mini** (temp: 0.7) for precise technical analysis
- **Judge uses GPT-4o** (temp: 0.6) for balanced synthesis
- Different models create more authentic debates with distinct personalities
- Max tokens: 300 for agents, 500 for judge
- All debate history is passed to OpenAI for context-aware responses
