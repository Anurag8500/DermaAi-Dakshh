import { AlertCircle } from "lucide-react";

export default function Disclaimer() {
  return (
    <section id="disclaimer" className="py-16 px-4 sm:px-6 lg:px-8 bg-amber-50 border-y border-amber-100">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-5">
          <AlertCircle className="w-5 h-5 text-amber-600" strokeWidth={1.75} />
          <h2 className="text-lg font-semibold text-amber-800">
            Medical Disclaimer
          </h2>
        </div>
        <p className="text-sm sm:text-base text-amber-700 leading-relaxed">
          The insights provided by DermaAI are generated using artificial
          intelligence and are intended for{" "}
          <strong className="font-semibold">informational purposes only</strong>.
          They do not replace professional medical advice, diagnosis, or
          treatment. Users should consult qualified healthcare professionals for
          serious or persistent skin conditions.
        </p>
      </div>
    </section>
  );
}
