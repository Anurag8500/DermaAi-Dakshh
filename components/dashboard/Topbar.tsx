"use client";

import { usePathname } from "next/navigation";
import { Bell, Menu } from "lucide-react";

const pageTitles: Record<string, string> = {
  "/dashboard/overview": "Overview",
  "/dashboard/analysis": "Skin Analysis",
  "/dashboard/assistant": "AI Health Assistant",
  "/dashboard/routine": "Skincare Routine",
  "/dashboard/tracker": "Skin Progress Tracker",
  "/dashboard/history": "Analysis History",
  "/dashboard/settings": "Account Settings",
};

interface TopbarProps {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const pathname = usePathname();
  const title = pageTitles[pathname] ?? "Dashboard";

  return (
    <header className="h-16 border-b border-slate-100 bg-white flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
      {/* Left: hamburger (mobile) + page title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-base sm:text-lg font-semibold text-slate-900">{title}</h1>
      </div>

      {/* Right: notifications + avatar */}
      <div className="flex items-center gap-2">
        <button
          className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="View notifications"
        >
          <Bell className="w-5 h-5" strokeWidth={1.75} />
          {/* Notification dot */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full" aria-hidden="true" />
        </button>

        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 ml-1">
          <span className="text-xs font-semibold text-emerald-700">U</span>
        </div>
      </div>
    </header>
  );
}
