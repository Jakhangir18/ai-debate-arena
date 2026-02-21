interface ChatBubbleProps {
  agent: "a" | "b";
  name: string;
  message: string;
  timestamp: string;
}

const ChatBubble = ({ agent, name, message, timestamp }: ChatBubbleProps) => {
  const isA = agent === "a";

  return (
    <div className={`flex ${isA ? "justify-start" : "justify-end"}`}>
      <div className={`max-w-[75%] rounded-lg border p-4 ${isA ? "border-glow-a bg-agent-a-subtle" : "border-glow-b bg-agent-b-subtle"}`}>
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-xs font-mono font-semibold ${isA ? "text-agent-a" : "text-agent-b"}`}>{name}</span>
          <span className="text-[10px] text-muted-foreground font-mono">{timestamp}</span>
        </div>
        <p className="text-sm leading-relaxed text-foreground">{message}</p>
      </div>
    </div>
  );
};

export default ChatBubble;
