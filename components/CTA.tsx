export default function CTA() {
  return (
    <section id="cta" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900">
      <div className="max-w-3xl mx-auto text-center">
        {/* Tag */}
        <p className="text-sm font-semibold text-emerald-400 uppercase tracking-widest mb-4">
          Get Started
        </p>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-5">
          Start Your Skin Analysis Today
        </h2>

        {/* Description */}
        <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl mx-auto mb-10">
          Understand your skin better and take the first step toward healthier
          skincare with AI-powered insights.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="/auth/login"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors"
          >
            Analyze My Skin
          </a>
          <a
            href="/auth/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white border border-slate-600 hover:border-slate-400 hover:bg-slate-800 rounded-lg transition-colors"
          >
            Create Account
          </a>
        </div>
      </div>
    </section>
  );
}
