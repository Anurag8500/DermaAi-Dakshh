import { UploadCloud, Scan, FileText, Shield } from "lucide-react";

export default function AnalysisPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Skin Analysis</h2>
        <p className="text-slate-500 mt-1 text-sm">
          Upload an image to analyze your skin condition using AI.
        </p>
      </div>

      {/* Upload area */}
      <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 hover:border-emerald-300 transition-colors p-12 flex flex-col items-center justify-center text-center cursor-pointer group">
        <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-emerald-100 transition-colors">
          <UploadCloud className="w-7 h-7 text-emerald-600" strokeWidth={1.5} />
        </div>
        <p className="text-base font-semibold text-slate-700 mb-1">Upload Skin Image</p>
        <p className="text-sm text-slate-400 mb-5">Drag and drop or select an image</p>
        <button
          type="button"
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          Select Image
        </button>
        <p className="text-xs text-slate-400 mt-3">PNG, JPG, WEBP up to 10 MB</p>
      </div>

      {/* What to expect */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: Scan, title: "AI Detection", desc: "Computer vision model identifies possible skin conditions." },
          { icon: FileText, title: "Care Guidance", desc: "Receive personalized skincare recommendations." },
          { icon: Shield, title: "Private & Secure", desc: "Your images are processed securely and never shared." },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center mb-3">
              <Icon className="w-4.5 h-4.5 text-emerald-600" strokeWidth={1.75} />
            </div>
            <p className="text-sm font-semibold text-slate-800 mb-1">{title}</p>
            <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
