# 🚀 Quick Start Guide

Get AI Debate Arena running in 3 minutes!

## Step 1: Clone & Install

```bash
git clone https://github.com/Jakhangir18/Project-3.git
cd Project-3
npm install
```

## Step 2: Configure OpenAI API

```bash
# Copy the environment template
cp .env.example .env

# Edit .env and add your OpenAI API key
# Get one at: https://platform.openai.com/api-keys
```

Your `.env` should look like:
```env
OPENAI_API_KEY=sk-your-actual-api-key-here
PORT=3001
```

## Step 3: Start the Application

```bash
npm run dev:all
```

This starts both:
- ✅ Backend API server (port 3001)
- ✅ Frontend React app (port 8080)

## Step 4: Open in Browser

Navigate to: **http://localhost:8080**

## Usage

1. **Enter a topic** (e.g., "Will AI replace programmers?")
2. **Click "Start Debate"** - Watch Agent A (GPT-4o) and Agent B (GPT-4o-mini) debate
3. **Click "Force Conclusion"** - Get a synthesized summary from the Judge

## Troubleshooting

### "OpenAI API key is invalid"
- Check your `.env` file exists and has the correct key
- Restart the server: Stop with `Ctrl+C`, then `npm run dev:all`

### "Insufficient quota"
- Your OpenAI account needs credits
- Visit: https://platform.openai.com/account/billing

### Port already in use
- Frontend will auto-switch to 8081 if 8080 is busy
- Backend: Change `PORT` in `.env` to use different port

## Need Help?

- 📖 Full documentation: [README.md](README.md)
- 🔧 Setup details: [SETUP.md](SETUP.md)
- 🐛 Report issues: Open a GitHub issue
- 💬 Questions: Check existing issues or create a new one

---

**That's it! You're ready to watch AI agents debate! 🎉**
