import { Camera, UploadCloud, ImageIcon } from "lucide-react";

const timeline = [
  { date: "March 10, 2026", label: "Latest", badge: "bg-emerald-100 text-emerald-700" },
  { date: "February 28, 2026", label: "2 weeks ago", badge: "bg-slate-100 text-slate-500" },
  { date: "February 14, 2026", label: "1 month ago", badge: "bg-slate-100 text-slate-500" },
];

export default function TrackerPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Skin Progress Tracker</h2>
          <p className="text-slate-500 mt-1 text-sm">
            Upload progress photos and visualize your skin improvements over time.
          </p>
        </div>
        <button
          type="button"
          className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          <Camera className="w-4 h-4" />
          Upload Photo
        </button>
      </div>

      {/* Upload prompt */}
      <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 hover:border-emerald-300 transition-colors px-8 py-10 flex flex-col items-center text-center">
        <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
          <UploadCloud className="w-6 h-6 text-slate-300" strokeWidth={1.5} />
        </div>
        <p className="text-sm font-medium text-slate-600 mb-1">Upload your first progress photo</p>
        <p className="text-xs text-slate-400">
          Take consistent photos to monitor your skin journey
        </p>
      </div>

      {/* Timeline placeholder */}
      <div>
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-4">
          Progress Timeline
        </h3>
        <div className="space-y-3">
          {timeline.map(({ date, label, badge }) => (
            <div key={date} className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center gap-4">
              <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <ImageIcon className="w-5 h-5 text-slate-300" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-700">{date}</p>
                <p className="text-xs text-slate-400 mt-0.5">Progress photo</p>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badge}`}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
