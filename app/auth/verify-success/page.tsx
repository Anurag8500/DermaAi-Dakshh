"use client";

import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";

export default function VerifySuccessPage() {
  return (
    <AuthLayout
      title="Verification Successful"
      subtitle="Your email has been verified. You can now access all features of DermaAI."
    >
      <div className="flex flex-col items-center gap-6 py-4">
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center border-4 border-emerald-100/50">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" strokeWidth={1.5} />
        </div>
        
        <div className="text-center space-y-2">
          <p className="text-slate-600 text-sm leading-relaxed px-2">
            Thank you for verifying your email address. Your account is now fully active and ready to use.
          </p>
        </div>

        <Link
          href="/auth/login"
          className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 group shadow-sm hover:shadow-md active:scale-[0.98]"
        >
          Proceed to Login
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </AuthLayout>
  );
}
