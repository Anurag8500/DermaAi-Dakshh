import { MessageCircle, Sparkles, Send } from "lucide-react";

const sampleQuestions = [
  "What causes acne breakouts?",
  "How can I reduce skin redness?",
  "What skincare routine suits oily skin?",
];

export default function AssistantPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">AI Health Assistant</h2>
        <p className="text-slate-500 mt-1 text-sm">
          Ask questions about skin conditions and receive AI-powered guidance.
        </p>
      </div>

      {/* Chat container */}
      <div className="bg-white rounded-2xl border border-slate-100 flex flex-col" style={{ minHeight: "480px" }}>
        {/* Chat header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-emerald-600" strokeWidth={1.75} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">DermaAI Assistant</p>
            <p className="text-xs text-emerald-500 font-medium">● Online</p>
          </div>
        </div>

        {/* Chat body placeholder */}
        <div className="flex-1 px-5 py-8 flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
            <MessageCircle className="w-6 h-6 text-slate-300" strokeWidth={1.5} />
          </div>
          <p className="text-sm font-medium text-slate-500 mb-1">No messages yet</p>
          <p className="text-xs text-slate-400 max-w-xs">
            Ask any question about your skin and our AI will guide you with personalized insights.
          </p>

          {/* Sample prompts */}
          <div className="flex flex-wrap gap-2 justify-center mt-5">
            {sampleQuestions.map((q) => (
              <button
                key={q}
                type="button"
                className="px-3 py-1.5 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 text-xs text-slate-600 hover:text-emerald-700 rounded-lg transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Chat input */}
        <div className="px-5 py-4 border-t border-slate-100">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
            <input
              type="text"
              placeholder="Ask your question..."
              className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none"
              aria-label="Ask AI assistant"
            />
            <button
              type="button"
              className="p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
