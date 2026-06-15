import { useState } from "react";
import { useCollaboration } from "../../context/CollaborationContext";
import { Copy, Check } from "lucide-react";

const ParticipantPresence = () => {
  const { sessionCode, participants, leaveSession } = useCollaboration();
  const [copied, setCopied] = useState(false);

  if (!sessionCode) return null;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(sessionCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3 flex items-center justify-between sticky top-[72px] z-40 shadow-sm transition-colors duration-300">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-400 px-3 py-1.5 rounded-full text-sm font-bold border border-indigo-200 dark:border-indigo-800/50 flex items-center gap-2 shadow-sm">
          <span className="text-lg leading-none">🤝</span>
          Session: <span className="font-mono tracking-widest bg-white/50 dark:bg-black/20 px-2 py-0.5 rounded">{sessionCode}</span>
          <button 
            onClick={handleCopyCode}
            title="Copy Session Code"
            className="ml-1 p-1 hover:bg-indigo-200 dark:hover:bg-indigo-800 rounded-md transition-colors flex items-center justify-center"
          >
            {copied ? <Check size={14} className="text-emerald-600 dark:text-emerald-400" /> : <Copy size={14} />}
          </button>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {participants.map((p, idx) => (
            <div key={idx} className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-xs font-bold border border-slate-200 dark:border-slate-700 shadow-sm" title={`${p} is online`}>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {p}
            </div>
          ))}
        </div>
      </div>
      <button 
        onClick={leaveSession}
        className="text-xs font-bold px-4 py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-900/20 dark:text-rose-400 dark:hover:bg-rose-900/40 rounded-xl transition-colors border border-rose-200 dark:border-rose-800/50 shadow-sm whitespace-nowrap"
      >
        Leave Session
      </button>
    </div>
  );
};

export default ParticipantPresence;
