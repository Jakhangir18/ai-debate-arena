# 🤖 AI Debate Arena

Watch two different AI models engage in real-time debates! This application uses **GPT-4o** and **GPT-4o-mini** to create authentic debates between two distinct AI personalities.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=flat&logo=openai&logoColor=white)

## 🎯 Features

- **Two Different AI Models**: Agent A uses GPT-4o, Agent B uses GPT-4o-mini
- **Distinct Personalities**: 
  - **Agent A (YC Partner)** - Aggressive business perspective (temp: 0.9)
  - **Agent B (Senior Engineer)** - Technical, pragmatic analysis (temp: 0.7)
  - **Judge** - Synthesizes both viewpoints into a conclusion
- **Real-time Debates**: Watch as the AI agents debate in 4 turns
- **Context-Aware**: Each agent remembers the conversation history
- **Beautiful UI**: Built with React, Tailwind CSS, and shadcn/ui

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm (or use [nvm](https://github.com/nvm-sh/nvm))
- **OpenAI API Key** with available credits ([Get one here](https://platform.openai.com/api-keys))

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Jakhangir18/Project-3.git
cd Project-3

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env

# 4. Edit .env and add your OpenAI API key
# OPENAI_API_KEY=sk-your-key-here

# 5. Start both frontend and backend
npm run dev:all
```

The app will open at:
- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:3001

## 📋 Available Scripts

```bash
npm run dev          # Start frontend only (Vite)
npm run server       # Start backend only (Express API)
npm run dev:all      # Start both frontend and backend (recommended)
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run tests
npm run lint         # Run ESLint
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
OPENAI_API_KEY=sk-your-api-key-here
PORT=3001
```

### AI Model Configuration

The AI models are configured in `server/index.ts`:

- **Agent A**: GPT-4o (temperature: 0.9, max_tokens: 300)
- **Agent B**: GPT-4o-mini (temperature: 0.7, max_tokens: 300)
- **Judge**: GPT-4o (temperature: 0.6, max_tokens: 500)

## 📖 How It Works

1. **Enter a Topic**: Type any debate topic (e.g., "Will React exist in 5 years?")
2. **Start Debate**: Click "Start Debate" to begin
3. **Watch the Debate**: Agents take turns (A → B → A → B)
4. **Get Conclusion**: Click "Force Conclusion" for a synthesized summary

## 🏗️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **React Router** - Routing
- **Sonner** - Toast notifications

### Backend
- **Express** - Web server
- **OpenAI SDK** - AI integration
- **TypeScript** - Type safety
- **dotenv** - Environment variables
- **CORS** - Cross-origin requests

## 📁 Project Structure

```
├── server/
│   └── index.ts          # Express API server
├── src/
│   ├── components/       # React components
│   │   ├── AgentProfile.tsx
│   │   ├── ChatBubble.tsx
│   │   ├── ConclusionCard.tsx
│   │   └── ui/          # shadcn/ui components
│   ├── lib/
│   │   ├── debateAPI.ts # API client
│   │   ├── mockDebate.ts
│   │   └── utils.ts
│   ├── pages/
│   │   └── Index.tsx    # Main debate arena
│   └── main.tsx         # App entry point
├── .env.example          # Environment template
├── package.json
└── vite.config.ts
```

## 🐛 Troubleshooting

### "OpenAI API key is invalid or missing"
- Ensure `.env` file exists in project root
- Verify `OPENAI_API_KEY` is set correctly
- Restart the server after updating `.env`

### "Rate limit exceeded" or "Insufficient quota"
- Check your OpenAI account has available credits
- Visit [OpenAI Billing](https://platform.openai.com/account/billing) to add credits

### Port already in use
- Change `PORT` in `.env` to a different port (e.g., 3002)
- Or kill the process: `lsof -ti:3001 | xargs kill -9` (macOS/Linux)

### Frontend can't connect to backend
- Ensure both servers are running (`npm run dev:all`)
- Check backend is running on port 3001
- Verify Vite proxy is configured in `vite.config.ts`

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Powered by [OpenAI](https://openai.com/)

---

Made with ❤️ for AI enthusiasts
