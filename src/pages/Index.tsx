import { useState, useRef, useEffect, useCallback } from "react";
import AgentProfile from "@/components/AgentProfile";
import ChatBubble from "@/components/ChatBubble";
import ConclusionCard from "@/components/ConclusionCard";
import ObserverDeck from "@/components/ObserverDeck";
import { getMockDebateMessages, getMockConclusion, type DebateMessage } from "@/lib/mockDebate";

const Index = () => {
  const [topic, setTopic] = useState("");
  const [messages, setMessages] = useState<DebateMessage[]>([]);
  const [isDebating, setIsDebating] = useState(false);
  const [conclusion, setConclusion] = useState<string | null>(null);
  const [typingAgent, setTypingAgent] = useState<"a" | "b" | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const debateRef = useRef<boolean>(false);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, conclusion]);

  const startDebate = useCallback(async () => {
    if (!topic.trim() || isDebating) return;

    setMessages([]);
    setConclusion(null);
    setIsDebating(true);
    debateRef.current = true;

    // TODO: Inject real LLM API call here
    // Replace getMockDebateMessages with streaming API calls to your backend
    const mockMessages = getMockDebateMessages(topic);

    for (const msg of mockMessages) {
      if (!debateRef.current) break;

      setTypingAgent(msg.agent);
      await new Promise((r) => setTimeout(r, 2000));

      if (!debateRef.current) break;
      setTypingAgent(null);
      setMessages((prev) => [...prev, { ...msg, timestamp: new Date().toLocaleTimeString() }]);
    }

    setIsDebating(false);
    debateRef.current = false;
  }, [topic, isDebating]);

  const forceConclusion = useCallback(() => {
    if (messages.length === 0) return;
    debateRef.current = false;
    setIsDebating(false);
    setTypingAgent(null);
    // TODO: Inject real LLM API call here
    setConclusion(getMockConclusion(topic));
  }, [messages, topic]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-xl font-bold font-mono tracking-tight text-foreground mb-4">
            <span className="text-agent-a">Agent</span>{" "}
            <span className="text-muted-foreground">Arena</span>
          </h1>
          <div className="flex gap-3">
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && startDebate()}
              placeholder="Enter debate topic (e.g., Will React exist in 5 years?)"
              className="flex-1 bg-muted border border-border rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring font-mono"
              disabled={isDebating}
            />
            <button
              onClick={startDebate}
              disabled={!topic.trim() || isDebating}
              className="px-5 py-2.5 rounded-md font-mono text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {isDebating ? "Debating..." : "Start Debate"}
            </button>
          </div>
        </div>
      </header>

      {/* Arena */}
      <main className="flex-1 overflow-hidden flex flex-col">
        <div className="max-w-5xl mx-auto w-full px-6 py-6 flex-1 overflow-y-auto flex flex-col gap-6">
          {/* Agent Profiles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AgentProfile
              name="The YC Partner"
              title="Agent A — Offense"
              description="Aggressive, business-focused. Sees every problem through the lens of markets, capital, and velocity. Ships fast, breaks things."
              agent="a"
              isTyping={typingAgent === "a"}
            />
            <AgentProfile
              name="The Senior Engineer"
              title="Agent B — Defense"
              description="Pragmatic, technical. Evaluates problems through architecture, sustainability, and engineering rigor. Measures twice, cuts once."
              agent="b"
              isTyping={typingAgent === "b"}
            />
          </div>

          {/* Chat Stream */}
          {(messages.length > 0 || isDebating) && (
            <div className="flex flex-col gap-4 pb-4">
              {messages.map((msg) => (
                <ChatBubble
                  key={msg.id}
                  agent={msg.agent}
                  name={msg.name}
                  message={msg.message}
                  timestamp={msg.timestamp}
                />
              ))}
              {conclusion && <ConclusionCard summary={conclusion} />}
              <div ref={chatEndRef} />
            </div>
          )}

          {/* Empty state */}
          {messages.length === 0 && !isDebating && (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-muted-foreground font-mono text-sm text-center">
                Enter a topic above to start the debate ↑
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Observer Deck */}
      <ObserverDeck
        onForceConclusion={forceConclusion}
        isDebating={isDebating}
        hasMessages={messages.length > 0}
      />
    </div>
  );
};

export default Index;
