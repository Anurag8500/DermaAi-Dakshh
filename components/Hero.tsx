import { Shield, Lock, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full text-sm font-medium text-emerald-700 mb-8">
          <Sparkles className="w-3.5 h-3.5" />
          AI-Powered Skin Health Assistant
        </div>

        {/* Heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight leading-tight mb-6">
          Derma<span className="text-emerald-600">AI</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto mb-10 font-normal">
          AI-powered skin health assistant that analyzes skin conditions,
          provides personalized skincare guidance, and helps you track
          your skin progress over time.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
          <a
            href="/auth/login"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-sm"
          >
            Analyze My Skin
          </a>
          <a
            href="/auth/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 rounded-lg transition-colors"
          >
            Create Account
          </a>
        </div>

        {/* Trust Line */}
        <div className="flex items-center justify-center gap-5 text-xs text-slate-400 font-medium">
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-500" />
            Private
          </span>
          <span className="w-px h-3 bg-slate-200" />
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-500" />
            Secure
          </span>
          <span className="w-px h-3 bg-slate-200" />
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            AI-Assisted Health Insights
          </span>
        </div>
      </div>
    </section>
  );
}
