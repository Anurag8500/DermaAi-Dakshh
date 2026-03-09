import { Activity } from "lucide-react";
import Link from "next/link";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-12">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-8 group">
        <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center">
          <Activity className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
        </div>
        <span className="text-xl font-semibold text-slate-900 tracking-tight">
          Derma<span className="text-emerald-600">AI</span>
        </span>
      </Link>

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-sm px-8 py-9">
        {/* Heading */}
        <div className="mb-7">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-1.5">
            {title}
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">{subtitle}</p>
        </div>

        {children}
      </div>
    </div>
  );
}
