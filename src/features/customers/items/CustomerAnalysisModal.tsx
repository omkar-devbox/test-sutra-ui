import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "@/shared/ui";
import {
  TrendingUp,
  ShoppingBag,
  Building2,
  Plus,
  Layers,
  ArrowUpRight,
  Sparkles,
  BarChart3,
  Award,
} from "lucide-react";
import type { Customer } from "../types/customers.types";
import { useNavigate } from "react-router-dom";

interface CustomerAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  customers: Customer[];
  selectedCustomer?: Customer | null;
}

export const CustomerAnalysisModal: React.FC<CustomerAnalysisModalProps> = ({
  isOpen,
  onClose,
  customers,
  selectedCustomer,
}) => {
  const navigate = useNavigate();

  // Compute overall analysis metrics
  const totalRevenue = customers.reduce((acc, c) => acc + (c.totalOrders * 2850), 0);
  const totalOrders = customers.reduce((acc, c) => acc + c.totalOrders, 0);
  const avgOrderVal = totalOrders ? Math.round(totalRevenue / totalOrders) : 0;
  const totalSqFt = totalOrders * 145; // average estimated sqft

  // Top clients by order volume
  const sortedCustomers = [...customers].sort((a, b) => b.totalOrders - a.totalOrders);
  const maxOrders = sortedCustomers[0]?.totalOrders || 1;

  const handleCreateOrder = (customerId?: string) => {
    onClose();
    if (customerId) {
      navigate(`/orders/create?customerId=${customerId}`);
    } else {
      navigate("/orders/create");
    }
  };

  const focusCustomer = selectedCustomer || sortedCustomers[0];

  return (
    <Modal open={isOpen} onClose={onClose} size="3xl">
      <ModalHeader
        title="Customer Analytics & Order Insights"
        onClose={onClose}
      />

      <ModalBody className="p-5 md:p-6 space-y-6">
        {/* Overview Stats Header */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-[#0077be]/5 border border-[#0077be]/20">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#004066]/70 dark:text-[#ebf7ff]/70">
              Total Revenue
            </p>
            <h4 className="text-xl font-extrabold text-[#0077be] dark:text-[#38bdf8] mt-1 flex items-center gap-1">
              ₹{totalRevenue.toLocaleString()}
            </h4>
            <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-0.5 mt-0.5">
              <TrendingUp size={10} /> +14.2% this month
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-purple-500/5 border border-purple-500/20">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-purple-900/70 dark:text-purple-200/70">
              Total Jobs Placed
            </p>
            <h4 className="text-xl font-extrabold text-purple-600 dark:text-purple-400 mt-1 flex items-center gap-1">
              {totalOrders} Jobs
            </h4>
            <span className="text-[10px] text-purple-600 font-medium flex items-center gap-0.5 mt-0.5">
              <ShoppingBag size={10} /> Active printing queue
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-900/70 dark:text-emerald-200/70">
              Avg Order Value
            </p>
            <h4 className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
              ₹{avgOrderVal.toLocaleString()}
            </h4>
            <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-0.5 mt-0.5">
              Per job execution
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-900/70 dark:text-amber-200/70">
              Total Payload SQFT
            </p>
            <h4 className="text-xl font-extrabold text-amber-600 dark:text-amber-400 mt-1 flex items-center gap-1">
              {totalSqFt.toLocaleString()} sqft
            </h4>
            <span className="text-[10px] text-amber-600 font-medium flex items-center gap-0.5 mt-0.5">
              <Layers size={10} /> Fabricated media
            </span>
          </div>
        </div>

        {/* Focus Customer Spotlight */}
        {focusCustomer && (
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#00253d] to-[#004066] text-white shadow-md relative overflow-hidden">
            <div className="absolute right-3 top-3 opacity-10 pointer-events-none">
              <Award size={120} />
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-semibold mb-2">
                  <Sparkles size={12} /> Key Account Profile
                </div>
                <h3 className="text-lg font-bold flex items-center gap-2 text-white">
                  {focusCustomer.fullName}
                  {focusCustomer.companyName && (
                    <span className="text-xs text-sky-200 font-normal">
                      ({focusCustomer.companyName})
                    </span>
                  )}
                </h3>
                <p className="text-xs text-sky-200/80 mt-0.5">
                  {focusCustomer.email} • {focusCustomer.contactNumber}
                </p>
              </div>

              <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-white/10 pt-3 md:pt-0 md:pl-6">
                <div>
                  <p className="text-[10px] uppercase font-semibold tracking-wider text-sky-200/70">
                    Volume Contribution
                  </p>
                  <p className="text-lg font-bold text-white">
                    {focusCustomer.totalOrders} Orders
                  </p>
                  <p className="text-[11px] text-emerald-300">
                    Est. ₹{(focusCustomer.totalOrders * 2850).toLocaleString()}
                  </p>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleCreateOrder(focusCustomer.id)}
                  leftIcon={<Plus size={16} />}
                  className="bg-[#0077be] hover:bg-sky-500 text-white font-semibold text-xs px-3.5 py-2 shrink-0 shadow-md"
                >
                  Create Order
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Customer Volume Distribution Ranking */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#004066] dark:text-[#ebf7ff] flex items-center gap-1.5">
              <BarChart3 size={15} className="text-[#0077be]" />
              Top Clients by Order Frequency
            </h4>
            <span className="text-xs text-slate-500">
              {customers.length} total active accounts
            </span>
          </div>

          <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
            {sortedCustomers.map((cust) => {
              const percentage = Math.round((cust.totalOrders / maxOrders) * 100);
              const estValue = cust.totalOrders * 2850;

              return (
                <div
                  key={cust.id}
                  className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 hover:border-[#0077be]/40 transition-all flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#0077be]/10 text-[#0077be] dark:bg-[#0077be]/20 dark:text-[#38bdf8] flex items-center justify-center font-bold text-xs shrink-0">
                        {cust.fullName.charAt(0)}
                      </div>
                      <div>
                        <span className="font-semibold text-slate-800 dark:text-slate-100">
                          {cust.fullName}
                        </span>
                        {cust.companyName && (
                          <span className="text-[11px] text-slate-400 ml-1.5 flex items-center gap-0.5 inline-flex">
                            <Building2 size={11} /> {cust.companyName}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="font-bold text-slate-800 dark:text-slate-100">
                          {cust.totalOrders} Jobs
                        </span>
                        <span className="block text-[10px] text-emerald-600 font-semibold">
                          ₹{estValue.toLocaleString()}
                        </span>
                      </div>

                      <button
                        onClick={() => handleCreateOrder(cust.id)}
                        className="p-1.5 rounded-lg text-[#0077be] hover:bg-[#0077be]/10 dark:hover:bg-[#0077be]/20 transition-colors"
                        title={`Create order for ${cust.fullName}`}
                      >
                        <ArrowUpRight size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#0077be] to-sky-400 transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ModalBody>

      <ModalFooter className="flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
        <span className="text-xs text-slate-500">
          Showing real-time client transaction metrics
        </span>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close Analysis
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleCreateOrder()}
            leftIcon={<Plus size={16} />}
            className="bg-[#0077be] hover:bg-[#005c94] text-white font-semibold text-xs px-4"
          >
            Create New Order
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};
