import React from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  Users,
  AlertTriangle,
  FileText,
  DollarSign,
  Activity,
  ArrowUpRight,
  ShieldAlert,
  Settings,
  PlusCircle,
  BarChart3,
  Layers,
} from "lucide-react";
import type { SystemActivityLog, PaperStockAlert } from "../types/dashboard.types";

const mockActivityLogs: SystemActivityLog[] = [
  {
    id: "log-1",
    timestamp: "10 mins ago",
    user: "Omkar Admin",
    role: "Admin",
    action: "Updated Paper Pricing",
    details: "Changed Star Flex 240 GSM rate to ₹12/sqft",
    type: "info",
  },
  {
    id: "log-2",
    timestamp: "25 mins ago",
    user: "Rahul Production",
    role: "Staff",
    action: "Dispatched Order #JH-1048",
    details: "1200 SqFt Vinyl Banner delivered to City Mall",
    type: "success",
  },
  {
    id: "log-3",
    timestamp: "1 hour ago",
    user: "System Watchdog",
    role: "Admin",
    action: "Low Stock Alert Triggered",
    details: "Backlit Flex 320 GSM is below threshold (2 rolls left)",
    type: "warning",
  },
  {
    id: "log-4",
    timestamp: "2 hours ago",
    user: "Sutra Client",
    role: "Customer",
    action: "New Order Submitted",
    details: "Created Order #JH-1052 for 450 SqFt Canvas Print",
    type: "info",
  },
];

const mockStockAlerts: PaperStockAlert[] = [
  {
    id: "stock-1",
    paperName: "Backlit Flex Star Media",
    gsm: 320,
    availableRolls: 2,
    minimumThreshold: 5,
    status: "Critical",
  },
  {
    id: "stock-2",
    paperName: "Glossy Vinyl Adhesive",
    gsm: 180,
    availableRolls: 4,
    minimumThreshold: 8,
    status: "Low",
  },
  {
    id: "stock-3",
    paperName: "Frontlit Standard Matte",
    gsm: 260,
    availableRolls: 18,
    minimumThreshold: 10,
    status: "Adequate",
  },
];

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Banner / Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#004066] via-[#005c94] to-[#0077be] text-white p-6 md:p-8 shadow-xl">
        <div className="absolute right-0 top-0 -mr-12 -mt-12 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#b0e2ff] text-xs font-bold uppercase tracking-wider mb-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Executive Administrator Command Center
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Admin Overview & Business Analytics
            </h1>
            <p className="text-[#d0eeff] text-sm mt-1 max-w-2xl">
              Monitor overall revenue, manage system users, track printing machine workloads, and approve stock reorders.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              to="/orders/create"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#004066] hover:bg-[#ebf7ff] font-semibold text-sm transition-all shadow-md active:scale-95"
            >
              <PlusCircle size={18} />
              New Order Terminal
            </Link>
            <Link
              to="/configuration/users"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#002d48]/60 hover:bg-[#002d48] text-white font-semibold text-sm border border-white/20 transition-all active:scale-95"
            >
              <Users size={18} />
              Manage Users
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white dark:bg-[#00253d] border border-[#d0e8f7] dark:border-[#00385c] rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wide uppercase text-slate-500 dark:text-slate-400">
              Total Monthly Revenue
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <DollarSign size={20} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              ₹4,85,200
            </span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center">
              <TrendingUp size={12} className="mr-0.5" /> +14.2%
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            vs. ₹4,24,800 last month
          </p>
        </div>

        {/* Metric 2 */}
        <div className="bg-white dark:bg-[#00253d] border border-[#d0e8f7] dark:border-[#00385c] rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wide uppercase text-slate-500 dark:text-slate-400">
              Active Orders
            </span>
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <FileText size={20} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              142 Jobs
            </span>
            <span className="text-xs font-semibold text-sky-600 dark:text-sky-400">
              34 In Printing
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Avg completion: 1.4 days
          </p>
        </div>

        {/* Metric 3 */}
        <div className="bg-white dark:bg-[#00253d] border border-[#d0e8f7] dark:border-[#00385c] rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wide uppercase text-slate-500 dark:text-slate-400">
              System Users & Staff
            </span>
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Users size={20} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              18 Accounts
            </span>
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              4 Admins, 14 Staff
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            9 active on shop floor today
          </p>
        </div>

        {/* Metric 4 */}
        <div className="bg-white dark:bg-[#00253d] border border-[#d0e8f7] dark:border-[#00385c] rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wide uppercase text-slate-500 dark:text-slate-400">
              Low Stock Warnings
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <AlertTriangle size={20} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-600 dark:text-amber-400">
              2 Critical
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Needs reorder
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Backlit & Glossy Media
          </p>
        </div>
      </div>

      {/* Main Grid: Revenue & Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Business Performance Overview */}
        <div className="lg:col-span-2 bg-white dark:bg-[#00253d] border border-[#d0e8f7] dark:border-[#00385c] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-[#e0f0fb] dark:border-[#003354]">
            <div className="flex items-center gap-2">
              <BarChart3 className="text-[#0077be]" size={20} />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Monthly Production & Revenue Breakdown
              </h2>
            </div>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-[#001c30] px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-800">
              Aug 2026
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
            <div className="p-4 rounded-xl bg-[#f0f8ff] dark:bg-[#001d31] border border-[#d4ebfc] dark:border-[#003152]">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Flex Printing</span>
              <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">₹2,45,000</p>
              <p className="text-xs text-sky-600 dark:text-sky-400 mt-0.5">38,500 SqFt printed</p>
            </div>
            <div className="p-4 rounded-xl bg-[#f0f8ff] dark:bg-[#001d31] border border-[#d4ebfc] dark:border-[#003152]">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Vinyl & Stickers</span>
              <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">₹1,62,400</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">14,200 SqFt printed</p>
            </div>
            <div className="p-4 rounded-xl bg-[#f0f8ff] dark:bg-[#001d31] border border-[#d4ebfc] dark:border-[#003152]">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Canvas & Acrylic</span>
              <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">₹77,800</p>
              <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-0.5">3,100 SqFt printed</p>
            </div>
          </div>

          {/* Graphical visual bars representation */}
          <div className="space-y-3 pt-2">
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                <span>Star Flex Media (240-340 GSM)</span>
                <span className="font-semibold">51% (₹2,45,000)</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-[#001726] overflow-hidden">
                <div className="h-full bg-[#0077be] rounded-full" style={{ width: "51%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                <span>Adhesive Vinyl & Glow Signs</span>
                <span className="font-semibold">33% (₹1,62,400)</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-[#001726] overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: "33%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                <span>Canvas Prints & Custom Mounting</span>
                <span className="font-semibold">16% (₹77,800)</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-[#001726] overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: "16%" }} />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#e0f0fb] dark:border-[#003354] flex justify-between items-center text-xs text-slate-500">
            <span>Machine Utilization: 84% Efficiency</span>
            <Link to="/orders" className="text-[#0077be] font-semibold flex items-center hover:underline">
              View Detailed Orders Report <ArrowUpRight size={14} className="ml-1" />
            </Link>
          </div>
        </div>

        {/* Right Column: Inventory Stock Status */}
        <div className="bg-white dark:bg-[#00253d] border border-[#d0e8f7] dark:border-[#00385c] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#e0f0fb] dark:border-[#003354]">
              <div className="flex items-center gap-2">
                <Layers className="text-amber-500" size={20} />
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Paper Stock Alert
                </h2>
              </div>
              <Link
                to="/configuration/paper-types"
                className="text-xs font-semibold text-[#0077be] hover:underline"
              >
                Configure
              </Link>
            </div>

            <div className="mt-4 space-y-3">
              {mockStockAlerts.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl border border-slate-100 dark:border-[#003354] bg-slate-50/50 dark:bg-[#001c2e] flex items-center justify-between"
                >
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                      {item.paperName}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {item.gsm} GSM • Min: {item.minimumThreshold} rolls
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block px-2.5 py-1 text-xs font-bold rounded-lg ${
                        item.status === "Critical"
                          ? "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50"
                          : item.status === "Low"
                          ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900/50"
                          : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50"
                      }`}
                    >
                      {item.availableRolls} Rolls Left
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#e0f0fb] dark:border-[#003354]">
            <Link
              to="/configuration/paper-types"
              className="w-full py-2.5 px-4 rounded-xl bg-[#0077be]/10 text-[#0077be] dark:bg-[#0077be]/20 dark:text-[#66c2ff] font-semibold text-xs flex items-center justify-center gap-2 hover:bg-[#0077be] hover:text-white transition-colors"
            >
              <Settings size={14} />
              Open Paper Specification Settings
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Section: Audit Logs & Quick Shortcuts */}
      <div className="bg-white dark:bg-[#00253d] border border-[#d0e8f7] dark:border-[#00385c] rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-[#e0f0fb] dark:border-[#003354]">
          <div className="flex items-center gap-2">
            <Activity className="text-indigo-500" size={20} />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Recent System & Audit Trail
            </h2>
          </div>
          <span className="text-xs text-slate-500">Real-time system events</span>
        </div>

        <div className="mt-4 divide-y divide-slate-100 dark:divide-[#00304f]">
          {mockActivityLogs.map((log) => (
            <div key={log.id} className="py-3 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {log.type === "warning" ? (
                    <ShieldAlert size={18} className="text-amber-500" />
                  ) : log.type === "success" ? (
                    <TrendingUp size={18} className="text-emerald-500" />
                  ) : (
                    <Activity size={18} className="text-sky-500" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {log.action}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {log.details}
                  </p>
                </div>
              </div>
              <div className="text-right whitespace-nowrap">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                  {log.user} ({log.role})
                </span>
                <span className="text-[11px] text-slate-400">{log.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
