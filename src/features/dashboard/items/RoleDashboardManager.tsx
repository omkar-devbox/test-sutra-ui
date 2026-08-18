import React, { useState } from "react";
import { AdminDashboard } from "./AdminDashboard";
import { StaffDashboard } from "./StaffDashboard";
import { CustomerDashboard } from "./CustomerDashboard";
import { ShieldCheck, Wrench, UserCheck, Eye } from "lucide-react";
import type { UserRole } from "../types/dashboard.types";

interface RoleDashboardManagerProps {
  initialRole?: UserRole;
}

export const RoleDashboardManager: React.FC<RoleDashboardManagerProps> = ({
  initialRole = "Admin",
}) => {
  const [currentRole, setCurrentRole] = useState<UserRole>(initialRole);

  return (
    <div className="space-y-6">
      {/* Dynamic Role Switcher Navigation Bar */}
      <div className="bg-white dark:bg-[#00253d] border border-[#d0e8f7] dark:border-[#00385c] rounded-2xl p-3 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 px-2">
          <div className="w-8 h-8 rounded-lg bg-[#0077be]/10 text-[#0077be] dark:bg-[#0077be]/20 dark:text-[#66c2ff] flex items-center justify-center">
            <Eye size={18} />
          </div>
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Dashboard View Mode
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Select role view to test dashboard layout & permissions
            </p>
          </div>
        </div>

        {/* Role Toggle Selector */}
        <div className="flex items-center p-1 rounded-xl bg-[#ebf7ff] dark:bg-[#001726] border border-[#cce7fa] dark:border-[#002f4a] w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setCurrentRole("Admin")}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              currentRole === "Admin"
                ? "bg-[#0077be] text-white shadow-md scale-100"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <ShieldCheck size={15} />
            Admin View
          </button>

          <button
            type="button"
            onClick={() => setCurrentRole("Staff")}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              currentRole === "Staff"
                ? "bg-[#0077be] text-white shadow-md scale-100"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Wrench size={15} />
            Staff View
          </button>

          <button
            type="button"
            onClick={() => setCurrentRole("Customer")}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              currentRole === "Customer"
                ? "bg-[#0077be] text-white shadow-md scale-100"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <UserCheck size={15} />
            Customer View
          </button>
        </div>
      </div>

      {/* Render Active Role Dashboard */}
      <div>
        {currentRole === "Admin" && <AdminDashboard />}
        {currentRole === "Staff" && <StaffDashboard />}
        {currentRole === "Customer" && <CustomerDashboard />}
      </div>
    </div>
  );
};
