import { useState, useEffect } from "react";

interface ObserverDeckProps {
  onForceConclusion: () => void;
  isDebating: boolean;
  hasMessages: boolean;
}

const ObserverDeck = ({ onForceConclusion, isDebating, hasMessages }: ObserverDeckProps) => {
  const [notes, setNotes] = useState(() => {
    return localStorage.getItem("arena-observer-notes") || "";
  });

  useEffect(() => {
    localStorage.setItem("arena-observer-notes", notes);
  }, [notes]);

  return (
    <div className="border-t border-border bg-card p-4">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
          <label className="text-xs font-mono text-muted-foreground mb-1.5 block">
            Human Observation / Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Your observations about this debate..."
            className="w-full h-20 bg-muted border border-border rounded-md p-3 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-1 focus:ring-ring font-mono"
          />
        </div>
        <button
          onClick={onForceConclusion}
          disabled={!hasMessages || isDebating}
          className="px-6 py-3 rounded-md font-mono text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed glow-primary whitespace-nowrap"
        >
          ⚡ Force Conclusion
        </button>
      </div>
    </div>
  );
};

export default ObserverDeck;
