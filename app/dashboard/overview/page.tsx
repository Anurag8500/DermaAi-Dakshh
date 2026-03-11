"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Scan,
  MessageCircle,
  CheckSquare,
  Camera,
  Activity,
  TrendingUp,
  Calendar,
  Star,
  Clock,
  ArrowRight,
} from "lucide-react";

const quickActions = [
  { label: "Analyze Skin", href: "/dashboard/analysis", icon: Scan, color: "bg-emerald-600 hover:bg-emerald-700" },
  { label: "Ask AI Assistant", href: "/dashboard/assistant", icon: MessageCircle, color: "bg-slate-800 hover:bg-slate-900" },
  { label: "View Routine", href: "/dashboard/routine", icon: CheckSquare, color: "bg-blue-600 hover:bg-blue-700" },
  { label: "Upload Progress Photo", href: "/dashboard/tracker", icon: Camera, color: "bg-violet-600 hover:bg-violet-700" },
];

const stats = [
  {
    title: "Last Analysis",
    value: "Acne detected",
    meta: "2 days ago",
    icon: Scan,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    title: "Skin Health Score",
    value: "78 / 100",
    meta: "Good condition",
    icon: Star,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
  },
  {
    title: "Progress Trend",
    value: "Improving",
    meta: "vs. last month",
    icon: TrendingUp,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    title: "Routine Completion",
    value: "5 / 7 days",
    meta: "This week",
    icon: Calendar,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
];

const recentActivity = [
  { label: "Skin analysis completed", time: "2 days ago", icon: Scan },
  { label: "Skincare routine updated", time: "4 days ago", icon: CheckSquare },
  { label: "Progress photo uploaded", time: "1 week ago", icon: Camera },
];

export default function OverviewPage() {
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user.name) {
          setUserName(user.name.split(" ")[0]); // Just first name
        }
      } catch (err) {
        console.error("Failed to parse user data", err);
      }
    }
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Welcome back{userName ? `, ${userName}` : ""}! 👋
        </h2>
        <p className="text-slate-500 mt-1 text-sm">
          Track your skin health and access AI-powered insights.
        </p>
      </div>

      {/* Quick Actions */}
      <section aria-labelledby="quick-actions-heading">
        <h3 id="quick-actions-heading" className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map(({ label, href, icon: Icon, color }) => (
            <Link
              key={href}
              href={href}
              className={`${color} text-white rounded-xl px-4 py-3.5 flex flex-col items-start gap-2.5 transition-colors group`}
            >
              <Icon className="w-5 h-5 opacity-90" strokeWidth={1.75} />
              <span className="text-sm font-medium leading-tight">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats Cards */}
      <section aria-labelledby="stats-heading">
        <h3 id="stats-heading" className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-4">
          Summary
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ title, value, meta, icon: Icon, iconBg, iconColor }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-slate-100 p-5 hover:border-slate-200 hover:shadow-sm transition-all"
            >
              <div className={`w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center mb-4`}>
                <Icon className={`w-4.5 h-4.5 ${iconColor}`} strokeWidth={1.75} />
              </div>
              <p className="text-xs font-medium text-slate-400 mb-1">{title}</p>
              <p className="text-lg font-bold text-slate-900 leading-tight">{value}</p>
              <p className="text-xs text-slate-400 mt-1">{meta}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section aria-labelledby="activity-heading">
        <div className="flex items-center justify-between mb-4">
          <h3 id="activity-heading" className="text-sm font-semibold text-slate-500 uppercase tracking-widest">
            Recent Activity
          </h3>
          <Link
            href="/dashboard/history"
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors"
          >
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-50">
          {recentActivity.map(({ label, time, icon: Icon }) => (
            <div key={label} className="flex items-center gap-4 px-5 py-4">
              <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-slate-400" strokeWidth={1.75} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-700 truncate">{label}</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-400 flex-shrink-0">
                <Clock className="w-3.5 h-3.5" strokeWidth={1.75} />
                {time}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
