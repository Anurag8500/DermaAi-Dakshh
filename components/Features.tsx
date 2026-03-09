import { ScanLine, ClipboardList, TrendingUp, Lightbulb } from "lucide-react";

const features = [
  {
    icon: ScanLine,
    title: "AI Skin Condition Detection",
    description:
      "Upload an image of your skin concern and our computer vision model analyzes it to identify possible skin conditions such as acne, irritation, eczema, or fungal infections.",
  },
  {
    icon: ClipboardList,
    title: "Personalized Skincare Guidance",
    description:
      "Receive AI-generated care recommendations and personalized skincare routines based on your skin type and concerns.",
  },
  {
    icon: TrendingUp,
    title: "Skin Progress Tracking",
    description:
      "Monitor improvements in your skin by uploading images over time and tracking visible progress.",
  },
  {
    icon: Lightbulb,
    title: "Smart Health Insights",
    description:
      "Get helpful AI-powered explanations about possible causes, precautions, and recommended next steps for your skin concerns.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-3">
            What We Offer
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Key Features
          </h2>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-emerald-200 hover:shadow-md transition-all duration-200"
              >
                <div className="w-11 h-11 bg-emerald-50 rounded-xl flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-emerald-600" strokeWidth={1.75} />
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-3 leading-snug">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
