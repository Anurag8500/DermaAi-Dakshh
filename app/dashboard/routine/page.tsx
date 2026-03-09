import { Sun, Moon, CalendarDays, Plus } from "lucide-react";

const routineSections = [
  {
    icon: Sun,
    label: "Morning Routine",
    color: "bg-amber-50 text-amber-600",
    steps: ["Cleanser", "Toner", "Moisturizer", "SPF 50 Sunscreen"],
  },
  {
    icon: Moon,
    label: "Evening Routine",
    color: "bg-blue-50 text-blue-600",
    steps: ["Makeup Remover", "Cleanser", "Serum", "Night Cream"],
  },
  {
    icon: CalendarDays,
    label: "Weekly Care",
    color: "bg-violet-50 text-violet-600",
    steps: ["Exfoliation (x2)", "Face Mask", "Hydrating Sheet Mask"],
  },
];

export default function RoutinePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Skincare Routine</h2>
          <p className="text-slate-500 mt-1 text-sm">
            Your AI-generated personalized skincare schedule.
          </p>
        </div>
        <button
          type="button"
          className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Step
        </button>
      </div>

      {/* Routine cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {routineSections.map(({ icon: Icon, label, color, steps }) => (
          <div key={label} className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center mb-4`}>
              <Icon className="w-4.5 h-4.5" strokeWidth={1.75} />
            </div>
            <h3 className="text-base font-semibold text-slate-900 mb-4">{label}</h3>
            <ol className="space-y-2.5">
              {steps.map((step, i) => (
                <li key={step} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 text-xs font-semibold flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-sm text-slate-600">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>

      {/* Placeholder note */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl px-5 py-4">
        <p className="text-sm text-emerald-700 font-medium">
          🔒 AI-personalized routines will be generated based on your skin analysis results.
        </p>
      </div>
    </div>
  );
}
