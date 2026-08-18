import React from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Clock,
  CheckCircle,
  FileDown,
  ArrowRight,
  Sparkles,
  CreditCard,
  Package,
  ExternalLink,
  FileEdit,
  Send,
  Play,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import type { CustomerOrderTracking, OrderStatus } from "../types/dashboard.types";

const mockCustomerOrders: CustomerOrderTracking[] = [
  {
    id: "cust-ord-1",
    orderNumber: "ORD-2026-001",
    jobName: "450 SqFt Canvas Promotional Wall Art Banner",
    totalAmount: 18500,
    paymentStatus: "Paid",
    currentStage: "In Production",
    stageProgress: 65,
    estimatedCompletion: "Today by 5:30 PM",
    orderDate: "18 Aug 2026",
  },
  {
    id: "cust-ord-2",
    orderNumber: "ORD-2026-002",
    jobName: "Backlit Glow Sign Board - Storefront",
    totalAmount: 32000,
    paymentStatus: "Partial",
    currentStage: "Submitted",
    stageProgress: 35,
    estimatedCompletion: "Tomorrow, 11:00 AM",
    orderDate: "17 Aug 2026",
  },
  {
    id: "cust-ord-3",
    orderNumber: "ORD-2026-004",
    jobName: "1000 Pcs Matte Finish Die-Cut Stickers",
    totalAmount: 14000,
    paymentStatus: "Paid",
    currentStage: "Completed",
    stageProgress: 100,
    estimatedCompletion: "Delivered on 10 Aug",
    orderDate: "08 Aug 2026",
  },
];

export const CustomerDashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#004066] via-[#006699] to-[#0088cc] text-white p-6 md:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sky-200 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles size={14} className="text-amber-300" />
              Customer Self-Service Portal
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Welcome Back, Client Portal!
            </h1>
            <p className="text-sky-100 text-sm mt-1 max-w-xl">
              Track active print jobs through Orders Management status stages (Draft, Submitted, In Production, Completed, Cancelled).
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/orders/create"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-sm transition-all shadow-lg hover:shadow-amber-400/20 active:scale-95"
            >
              <ShoppingBag size={18} />
              Request New Print Order
            </Link>
          </div>
        </div>
      </div>

      {/* Account Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#00253d] border border-[#d0e8f7] dark:border-[#00385c] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Total Spent</span>
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center">
              <CreditCard size={18} />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">₹64,500</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Across 12 print orders</p>
        </div>

        <div className="bg-white dark:bg-[#00253d] border border-[#d0e8f7] dark:border-[#00385c] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">In Production Jobs</span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Package size={18} />
            </div>
          </div>
          <p className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-2">1 Printing</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Est. completion today</p>
        </div>

        <div className="bg-white dark:bg-[#00253d] border border-[#d0e8f7] dark:border-[#00385c] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Pending Balance</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Clock size={18} />
            </div>
          </div>
          <p className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-2">₹12,000</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Due on completion of #ORD-2026-002</p>
        </div>
      </div>

      {/* Active Order Live Tracker */}
      <div className="bg-white dark:bg-[#00253d] border border-[#d0e8f7] dark:border-[#00385c] rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-[#e0f0fb] dark:border-[#003354]">
          <div>
            <span className="text-xs font-bold text-[#0077be] uppercase tracking-wider">Live Production Tracker</span>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
              Order #ORD-2026-001 - 450 SqFt Canvas Banner
            </h2>
          </div>
          <span className="px-3 py-1 text-xs font-extrabold rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 uppercase">
            Current Stage: In Production
          </span>
        </div>

        {/* Progress Bar & Orders Management Stages */}
        <div className="mt-6 space-y-4">
          <div className="relative">
            <div className="overflow-hidden h-3 text-xs flex rounded-full bg-slate-100 dark:bg-[#001726]">
              <div
                style={{ width: "65%" }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full transition-all duration-500"
              />
            </div>
          </div>

          {/* Exact Stages from Orders Management */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="flex items-center gap-2">
              <CheckCircle size={18} className="text-slate-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">1. Draft</p>
                <p className="text-[11px] text-slate-400">Created</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={18} className="text-emerald-500 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">2. Submitted</p>
                <p className="text-[11px] text-slate-400">Verified</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Play size={18} className="text-blue-500 animate-pulse shrink-0" />
              <div>
                <p className="text-xs font-bold text-blue-600 dark:text-blue-400">3. In Production</p>
                <p className="text-[11px] text-slate-400">Active</p>
              </div>
            </div>
            <div className="flex items-center gap-2 opacity-50">
              <CheckCircle2 size={18} className="text-slate-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">4. Completed</p>
                <p className="text-[11px] text-slate-400">Final Stage</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Order History */}
      <div className="bg-white dark:bg-[#00253d] border border-[#d0e8f7] dark:border-[#00385c] rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-[#e0f0fb] dark:border-[#003354]">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShoppingBag className="text-[#0077be]" size={20} />
            Your Recent Orders & Stage Status
          </h2>
          <Link to="/orders" className="text-xs font-semibold text-[#0077be] hover:underline flex items-center gap-1">
            View All Orders <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-4 space-y-3">
          {mockCustomerOrders.map((order) => (
            <div
              key={order.id}
              className="p-4 rounded-xl border border-slate-200 dark:border-[#003354] bg-slate-50/50 dark:bg-[#001c2e] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#0077be] font-mono">{order.orderNumber}</span>
                  <span className="text-xs text-slate-400">• {order.orderDate}</span>
                  <span
                    className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full uppercase border ${order.currentStage === "Completed"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/30"
                        : order.currentStage === "In Production"
                          ? "bg-blue-500/10 text-blue-600 dark:text-blue-300 border-blue-500/30"
                          : order.currentStage === "Submitted"
                            ? "bg-amber-500/10 text-amber-600 dark:text-amber-300 border-amber-500/30"
                            : order.currentStage === "Cancelled"
                              ? "bg-red-500/10 text-red-600 dark:text-red-300 border-red-500/30"
                              : "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-300 dark:border-slate-700"
                      }`}
                  >
                    {order.currentStage}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                  {order.jobName}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Amount: <strong className="text-slate-800 dark:text-slate-200">₹{order.totalAmount.toLocaleString()}</strong> | Payment: {order.paymentStatus}
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#002b48] dark:hover:bg-[#00365c] text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <FileDown size={14} />
                  Download Invoice
                </button>
                <Link
                  to="/orders/create"
                  className="px-3 py-2 rounded-xl bg-[#0077be] hover:bg-[#005c94] text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink size={14} />
                  Re-order
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
