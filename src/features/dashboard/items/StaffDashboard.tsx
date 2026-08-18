import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Printer,
  FileEdit,
  Send,
  Play,
  CheckCircle2,
  XCircle,
  PlusCircle,
  Clock,
  Layers,
} from "lucide-react";
import type { PrintJobQueueItem, OrderStatus } from "../types/dashboard.types";

const initialQueueItems: PrintJobQueueItem[] = [
  {
    id: "job-101",
    orderNumber: "ORD-2026-001",
    customerName: "Aarav Mehta (Nexus Advertising)",
    jobName: "Frontlit Flex Shop Hoarding Banner",
    paperType: "Star Flex Frontlit 240 GSM",
    quantity: 4,
    sqft: 200,
    status: "In Production",
    dueDate: "Today, 6:00 PM",
    priority: "High",
  },
  {
    id: "job-102",
    orderNumber: "ORD-2026-002",
    customerName: "Rohan Deshmukh (Apex Outdoor)",
    jobName: "Vinyl Sticker Die-cut Labels",
    paperType: "Glossy Adhesive Vinyl 180 GSM",
    quantity: 500,
    sqft: 96,
    status: "Submitted",
    dueDate: "Tomorrow, 11:00 AM",
    priority: "High",
  },
  {
    id: "job-103",
    orderNumber: "ORD-2026-003",
    customerName: "Sahyadri Builders",
    jobName: "Architectural Plan & Site Board",
    paperType: "Backlit Film 320 GSM",
    quantity: 2,
    sqft: 600,
    status: "Draft",
    dueDate: "Today, 4:30 PM",
    priority: "Medium",
  },
  {
    id: "job-104",
    orderNumber: "ORD-2026-004",
    customerName: "Swastik Jewelers",
    jobName: "Glow Sign Box Backlit Print",
    paperType: "Backlit Flex 340 GSM",
    quantity: 1,
    sqft: 280,
    status: "Completed",
    dueDate: "Completed",
    priority: "Normal",
  },
  {
    id: "job-105",
    orderNumber: "ORD-2026-005",
    customerName: "Kiran Prints",
    jobName: "Cancelled Sample Banner",
    paperType: "Star Flex 240 GSM",
    quantity: 1,
    sqft: 100,
    status: "Cancelled",
    dueDate: "N/A",
    priority: "Normal",
  },
];

export const ORDER_STATUS_OPTIONS: OrderStatus[] = [
  "Draft",
  "Submitted",
  "In Production",
  "Completed",
  "Cancelled",
];

export const StaffDashboard: React.FC = () => {
  const [jobs, setJobs] = useState<PrintJobQueueItem[]>(initialQueueItems);

  // Quick status state change handler
  const handleStatusChange = (id: string, newStatus: OrderStatus) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === id ? { ...job, status: newStatus } : job))
    );
  };

  const draftCount = jobs.filter((j) => j.status === "Draft").length;
  const submittedCount = jobs.filter((j) => j.status === "Submitted").length;
  const inProductionCount = jobs.filter((j) => j.status === "In Production").length;
  const completedCount = jobs.filter((j) => j.status === "Completed").length;
  const cancelledCount = jobs.filter((j) => j.status === "Cancelled").length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Banner / Operational Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#00385c] via-[#005280] to-[#0077be] text-white p-6 md:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-200 text-xs font-bold uppercase tracking-wider mb-2">
              <Printer size={14} className="animate-bounce text-cyan-300" />
              Print Floor & Operator Workstation
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Staff Production Terminal
            </h1>
            <p className="text-cyan-100 text-sm mt-1 max-w-xl">
              Manage order status stages (Draft, Submitted, In Production, Completed, Cancelled) synced directly with Orders Management.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/orders/create"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm transition-all shadow-lg hover:shadow-emerald-500/25 active:scale-95"
            >
              <PlusCircle size={18} />
              Open Order Terminal
            </Link>
          </div>
        </div>
      </div>

      {/* Production Stage Counters (Orders Management Options) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="bg-white dark:bg-[#00253d] border border-[#d0e8f7] dark:border-[#00385c] rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
              Draft
            </span>
            <p className="text-xl font-black text-slate-700 dark:text-slate-300 mt-1">{draftCount} Jobs</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-slate-500/10 text-slate-600 dark:text-slate-400 flex items-center justify-center">
            <FileEdit size={18} />
          </div>
        </div>

        <div className="bg-white dark:bg-[#00253d] border border-[#d0e8f7] dark:border-[#00385c] rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs font-bold uppercase text-amber-600 dark:text-amber-400">
              Submitted
            </span>
            <p className="text-xl font-black text-amber-500 mt-1">{submittedCount} Jobs</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <Send size={18} />
          </div>
        </div>

        <div className="bg-white dark:bg-[#00253d] border border-[#d0e8f7] dark:border-[#00385c] rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs font-bold uppercase text-blue-600 dark:text-blue-400">
              In Production
            </span>
            <p className="text-xl font-black text-blue-500 mt-1">{inProductionCount} Jobs</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
            <Play size={18} className="animate-pulse" />
          </div>
        </div>

        <div className="bg-white dark:bg-[#00253d] border border-[#d0e8f7] dark:border-[#00385c] rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400">
              Completed
            </span>
            <p className="text-xl font-black text-emerald-500 mt-1">{completedCount} Jobs</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <CheckCircle2 size={18} />
          </div>
        </div>

        <div className="bg-white dark:bg-[#00253d] border border-[#d0e8f7] dark:border-[#00385c] rounded-2xl p-4 flex items-center justify-between shadow-sm col-span-2 sm:col-span-1">
          <div>
            <span className="text-xs font-bold uppercase text-red-600 dark:text-red-400">
              Cancelled
            </span>
            <p className="text-xl font-black text-red-500 mt-1">{cancelledCount} Jobs</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center">
            <XCircle size={18} />
          </div>
        </div>
      </div>

      {/* Main Content: Orders Status Management */}
      <div className="bg-white dark:bg-[#00253d] border border-[#d0e8f7] dark:border-[#00385c] rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#e0f0fb] dark:border-[#003354]">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Printer className="text-[#0077be]" size={20} />
              Current Order Stage Workflow
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Select or change order stage using the status selector options below.
            </p>
          </div>

          <Link
            to="/orders"
            className="text-xs font-bold text-[#0077be] hover:underline flex items-center gap-1"
          >
            <Layers size={14} /> Open Full Orders Management
          </Link>
        </div>

        {/* Job Queue List */}
        <div className="mt-4 space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="p-5 rounded-2xl border border-slate-200 dark:border-[#003657] bg-slate-50/50 dark:bg-[#001c2f] hover:border-[#0077be]/50 transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 shadow-xs"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-black text-[#0077be] bg-sky-500/10 px-2.5 py-0.5 rounded-md border border-sky-500/20 font-mono">
                    {job.orderNumber}
                  </span>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      job.priority === "High"
                        ? "bg-red-500/10 text-red-500 border border-red-500/20"
                        : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    {job.priority} Priority
                  </span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Customer: <strong className="text-slate-800 dark:text-slate-200">{job.customerName}</strong>
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {job.jobName}
                </h3>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 dark:text-slate-300">
                  <span>📄 Media: <strong className="text-[#0077be] dark:text-[#66c2ff]">{job.paperType}</strong></span>
                  <span>📐 Area: <strong>{job.sqft} SqFt ({job.quantity} pcs)</strong></span>
                  <span>⏰ Due: <strong>{job.dueDate}</strong></span>
                </div>
              </div>

              {/* Current Stage Options Selector */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full lg:w-auto pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-200 dark:border-slate-800">
                <div className="text-left sm:text-right">
                  <span className="text-[11px] font-semibold text-slate-400 block uppercase">
                    Current Stage
                  </span>
                  <select
                    value={job.status}
                    onChange={(e) =>
                      handleStatusChange(job.id, e.target.value as OrderStatus)
                    }
                    className={`mt-1 px-3 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider border cursor-pointer focus:outline-none transition-all ${
                      job.status === "Completed"
                        ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300 border-emerald-500/30"
                        : job.status === "In Production"
                        ? "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300 border-blue-500/30"
                        : job.status === "Submitted"
                        ? "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-300 border-amber-500/30"
                        : job.status === "Cancelled"
                        ? "bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-300 border-red-500/30"
                        : "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-300 dark:border-slate-700"
                    }`}
                  >
                    {ORDER_STATUS_OPTIONS.map((opt) => (
                      <option key={opt} value={opt} className="bg-white dark:bg-[#00253d] text-slate-900 dark:text-white font-semibold">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
