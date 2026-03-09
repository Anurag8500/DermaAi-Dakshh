import { Scan, TrendingUp, TrendingDown, Minus } from "lucide-react";

const historyItems = [
  {
    label: "Analysis — March 8, 2026",
    result: "Acne detected",
    trend: "up",
    severity: "Moderate",
    badge: "bg-amber-100 text-amber-700",
  },
  {
    label: "Analysis — March 1, 2026",
    result: "Mild irritation",
    trend: "neutral",
    severity: "Mild",
    badge: "bg-blue-100 text-blue-700",
  },
  {
    label: "Analysis — February 20, 2026",
    result: "Clear skin",
    trend: "down",
    severity: "Low",
    badge: "bg-emerald-100 text-emerald-700",
  },
];

const trendIcon = {
  up: <TrendingUp className="w-4 h-4 text-amber-500" strokeWidth={1.75} />,
  down: <TrendingDown className="w-4 h-4 text-emerald-500" strokeWidth={1.75} />,
  neutral: <Minus className="w-4 h-4 text-slate-400" strokeWidth={1.75} />,
};

export default function HistoryPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Analysis History</h2>
        <p className="text-slate-500 mt-1 text-sm">
          Review your past skin analyses and track changes over time.
        </p>
      </div>

      {/* History list */}
      <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-50">
        {historyItems.map(({ label, result, trend, severity, badge }) => (
          <div
            key={label}
            className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50/60 transition-colors"
          >
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <Scan className="w-4.5 h-4.5 text-emerald-600" strokeWidth={1.75} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800 truncate">{label}</p>
              <p className="text-xs text-slate-400 mt-0.5">{result}</p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              {trendIcon[trend as keyof typeof trendIcon]}
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badge}`}>
                {severity}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state nudge */}
      <p className="text-center text-xs text-slate-400 py-2">
        More history will appear as you run skin analyses.
      </p>
    </div>
  );
}
