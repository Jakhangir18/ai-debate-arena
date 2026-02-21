interface AgentProfileProps {
  name: string;
  title: string;
  description: string;
  agent: "a" | "b";
  isTyping?: boolean;
}

const AgentProfile = ({ name, title, description, agent, isTyping }: AgentProfileProps) => {
  const isA = agent === "a";

  return (
    <div className={`rounded-lg border p-5 ${isA ? "border-glow-a" : "border-glow-b"} bg-card`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-sm ${isA ? "bg-agent-a-subtle text-agent-a" : "bg-agent-b-subtle text-agent-b"}`}>
          {isA ? "A" : "B"}
        </div>
        <div>
          <h3 className={`font-semibold text-sm ${isA ? "text-agent-a" : "text-agent-b"}`}>{name}</h3>
          <p className="text-xs text-muted-foreground font-mono">{title}</p>
        </div>
        {isTyping && (
          <span className={`ml-auto text-xs font-mono animate-typing ${isA ? "text-agent-a" : "text-agent-b"}`}>
            typing...
          </span>
        )}
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
};

export default AgentProfile;
