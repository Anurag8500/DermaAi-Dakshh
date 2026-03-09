"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  LayoutDashboard,
  Scan,
  MessageCircle,
  CheckSquare,
  LineChart,
  Clock,
  Settings,
  LogOut,
  X,
} from "lucide-react";

const navItems = [
  { label: "Overview", href: "/dashboard/overview", icon: LayoutDashboard },
  { label: "Skin Analysis", href: "/dashboard/analysis", icon: Scan },
  { label: "AI Health Assistant", href: "/dashboard/assistant", icon: MessageCircle },
  { label: "Skincare Routine", href: "/dashboard/routine", icon: CheckSquare },
  { label: "Skin Progress Tracker", href: "/dashboard/tracker", icon: LineChart },
  { label: "History", href: "/dashboard/history", icon: Clock },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-slate-100">
        <Link href="/dashboard/overview" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <Activity className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-base font-semibold text-slate-900 tracking-tight">
            Derma<span className="text-emerald-600">AI</span>
          </span>
        </Link>
        {/* Mobile close */}
        <button
          onClick={onClose}
          className="lg:hidden p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
          aria-label="Close sidebar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5" aria-label="Dashboard navigation">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              aria-current={isActive ? "page" : undefined}
              className={[
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
              ].join(" ")}
            >
              <Icon
                className={["w-4 h-4 flex-shrink-0", isActive ? "text-emerald-600" : "text-slate-400"].join(" ")}
                strokeWidth={1.75}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* User / Logout */}
      <div className="px-3 py-4 border-t border-slate-100">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg">
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-semibold text-emerald-700">U</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">User Name</p>
            <p className="text-xs text-slate-400 truncate">user@example.com</p>
          </div>
        </div>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors mt-1">
          <LogOut className="w-4 h-4 text-slate-400" strokeWidth={1.75} />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-slate-100 bg-white h-screen sticky top-0 flex-shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          {/* Drawer */}
          <aside className="relative z-50 w-64 bg-white h-full shadow-xl flex flex-col">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
