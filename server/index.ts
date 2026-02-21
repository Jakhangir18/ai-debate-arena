import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(express.json());

// System prompts for each speaker
const SYSTEM_PROMPTS = {
  'Agent A': "You are an aggressive, visionary Y Combinator Partner. Debate the given topic. Focus on business value, scale, and market mechanics. Be harsh but brilliant. Keep your response under 3 sentences.",
  'Agent B': "You are a pragmatic, hardcore Senior Staff Engineer. Debate the given topic. Focus on technical feasibility, architecture, edge cases, and physics of the system. Disagree with the investor's fluff. Keep your response under 3 sentences.",
  'Judge': "You are an AI Moderator. Read the debate history. Output a final, synthesized conclusion that merges the business vision and technical reality. Format it as a structured markdown takeaway."
};

// Different AI models and settings for each agent
const AI_CONFIGS = {
  'Agent A': {
    model: 'gpt-4o',  // More powerful model for aggressive business perspective
    temperature: 0.9,  // Higher creativity for bold statements
    max_tokens: 300,
  },
  'Agent B': {
    model: 'gpt-4o-mini',  // Efficient model for technical precision
    temperature: 0.7,  // More focused and consistent
    max_tokens: 300,
  },
  'Judge': {
    model: 'gpt-4o',  // Powerful model for synthesis
    temperature: 0.6,  // Balanced for clear conclusions
    max_tokens: 500,  // More tokens for detailed synthesis
  }
};

interface DebateRequest {
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
    name?: string;
  }>;
  currentSpeaker: 'Agent A' | 'Agent B' | 'Judge';
  topic: string;
}

app.post('/api/debate', async (req, res) => {
  try {
    const { messages, currentSpeaker, topic } = req.body as DebateRequest;

    // Validate input
    if (!currentSpeaker || !topic) {
      return res.status(400).json({ error: 'Missing required fields: currentSpeaker and topic' });
    }

    if (!SYSTEM_PROMPTS[currentSpeaker]) {
      return res.status(400).json({ error: 'Invalid currentSpeaker. Must be "Agent A", "Agent B", or "Judge"' });
    }

    // Build the messages array for OpenAI
    const systemPrompt = SYSTEM_PROMPTS[currentSpeaker];
    const aiConfig = AI_CONFIGS[currentSpeaker];
    
    const openaiMessages: Array<{ role: 'system' | 'user' | 'assistant'; content: string; name?: string }> = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Debate topic: ${topic}` },
      ...(messages || [])
    ];

    // Call OpenAI API with speaker-specific configuration
    console.log(`🤖 ${currentSpeaker} using model: ${aiConfig.model} (temp: ${aiConfig.temperature})`);
    
    const completion = await openai.chat.completions.create({
      model: aiConfig.model,
      messages: openaiMessages,
      temperature: aiConfig.temperature,
      max_tokens: aiConfig.max_tokens,
    });

    const response = completion.choices[0]?.message?.content || 'No response generated.';

    return res.json({ response });
  } catch (error: any) {
    console.error('Error calling OpenAI API:', error);
    
    // Handle specific OpenAI errors
    if (error?.status === 401) {
      return res.status(500).json({ 
        error: 'OpenAI API key is invalid or missing. Please set OPENAI_API_KEY in your .env file.' 
      });
    }
    
    if (error?.status === 429) {
      return res.status(429).json({ 
        error: 'Rate limit exceeded. Please try again in a moment.' 
      });
    }

    return res.status(500).json({ 
      error: error?.message || 'Internal server error while processing debate request' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Debate API is running' });
});

app.listen(port, () => {
  console.log(`🚀 Debate API server running on http://localhost:${port}`);
  console.log(`📡 API endpoint: http://localhost:${port}/api/debate`);
  console.log(`\n🤖 AI Configuration:`);
  console.log(`   Agent A (YC Partner):     ${AI_CONFIGS['Agent A'].model} (temp: ${AI_CONFIGS['Agent A'].temperature})`);
  console.log(`   Agent B (Engineer):       ${AI_CONFIGS['Agent B'].model} (temp: ${AI_CONFIGS['Agent B'].temperature})`);
  console.log(`   Judge (Moderator):        ${AI_CONFIGS['Judge'].model} (temp: ${AI_CONFIGS['Judge'].temperature})`);
  console.log(`\n✨ Two different AI models for authentic debates!\n`);
});
