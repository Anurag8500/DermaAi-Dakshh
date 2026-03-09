import { Upload, Brain, FileText, BarChart2 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload Your Skin Image",
    description:
      "Take or upload a clear photo of the affected skin area directly through the platform.",
  },
  {
    number: "02",
    icon: Brain,
    title: "AI Analysis",
    description:
      "Our computer vision model analyzes the image and predicts possible skin conditions.",
  },
  {
    number: "03",
    icon: FileText,
    title: "Receive Guidance",
    description:
      "Get AI-powered explanations, recommended care steps, and skincare routine suggestions.",
  },
  {
    number: "04",
    icon: BarChart2,
    title: "Track Your Progress",
    description:
      "Upload images regularly to monitor improvements and maintain healthier skin habits.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-3">
            The Process
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            How DermaAI Works
          </h2>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;
            return (
              <div key={step.number} className="relative">
                {/* Connector line (desktop) */}
                {!isLast && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+2.5rem)] right-0 h-px bg-slate-200 z-0" />
                )}

                <div className="relative z-10 bg-slate-50 rounded-2xl p-6 border border-slate-100 h-full flex flex-col">
                  {/* Step number + Icon */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 bg-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-white" strokeWidth={1.75} />
                    </div>
                    <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">
                      Step {step.number}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-slate-900 mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
