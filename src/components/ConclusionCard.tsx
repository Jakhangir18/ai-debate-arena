interface ConclusionCardProps {
  summary: string;
}

const ConclusionCard = ({ summary }: ConclusionCardProps) => {
  return (
    <div className="rounded-lg border border-border p-6 bg-card glow-conclusion">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-agent-a font-mono text-xs font-semibold">Agent A</span>
        <span className="text-muted-foreground font-mono text-xs">×</span>
        <span className="text-agent-b font-mono text-xs font-semibold">Agent B</span>
        <span className="text-muted-foreground font-mono text-xs ml-2">— Synthesized Conclusion</span>
      </div>
      <p className="text-sm leading-relaxed text-foreground">{summary}</p>
    </div>
  );
};

export default ConclusionCard;
