import React from "react";
import { Users as UsersIcon, UserCheck, ShieldCheck, KeyRound, Plus } from "lucide-react";
import { Button } from "@/shared/ui";
import type { UsersStats } from "../types/users.types";
import { usersStyles } from "../style/users.styles";

interface UsersHeaderProps {
  stats: UsersStats;
  onAddClick: () => void;
  onResetClick?: () => void;
}

export const UsersHeader: React.FC<UsersHeaderProps> = ({
  stats,
  onAddClick,
}) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Action Bar Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/60 dark:bg-[#00253d]/60 backdrop-blur-md p-4 md:p-6 rounded-2xl border border-[#0077be]/20 shadow-sm">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-[#004066] dark:text-[#ebf7ff] flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-[#0077be]/10 text-[#0077be] dark:bg-[#0077be]/20 dark:text-[#38bdf8]">
              <UsersIcon size={24} />
            </span>
            Users Management
          </h1>
          <p className="text-xs md:text-sm text-[#004066]/70 dark:text-[#ebf7ff]/70 mt-1">
            Manage system users, contact details, security credentials, and access roles
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <Button
            variant="primary"
            size="sm"
            onClick={onAddClick}
            leftIcon={<Plus size={18} />}
            className="bg-[#0077be] hover:bg-[#005c94] text-white shadow-md hover:shadow-lg transition-all text-xs font-semibold px-4 py-2"
          >
            Add User
          </Button>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 md:gap-5">
        {/* Card 1: Total Users */}
        <div className={usersStyles.statCard}>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[#004066]/60 dark:text-[#ebf7ff]/60">
              Total Users
            </p>
            <h3 className="text-2xl md:text-3xl font-extrabold text-[#004066] dark:text-[#ebf7ff] mt-1">
              {stats.totalCount}
            </h3>
          </div>
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
            <UsersIcon size={22} />
          </div>
        </div>

        {/* Card 2: Active Users */}
        <div className={usersStyles.statCard}>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[#004066]/60 dark:text-[#ebf7ff]/60">
              Active Users
            </p>
            <h3 className="text-2xl md:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
              {stats.activeCount}
            </h3>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
            <UserCheck size={22} />
          </div>
        </div>

        {/* Card 3: Admins */}
        <div className={usersStyles.statCard}>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[#004066]/60 dark:text-[#ebf7ff]/60">
              Admins
            </p>
            <h3 className="text-2xl md:text-3xl font-extrabold text-purple-600 dark:text-purple-400 mt-1">
              {stats.adminCount}
            </h3>
          </div>
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400">
            <ShieldCheck size={22} />
          </div>
        </div>

        {/* Card 4: System Roles */}
        <div className={usersStyles.statCard}>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[#004066]/60 dark:text-[#ebf7ff]/60">
              Active Roles
            </p>
            <h3 className="text-2xl md:text-3xl font-extrabold text-[#0077be] dark:text-[#38bdf8] mt-1">
              {stats.rolesCount}
            </h3>
          </div>
          <div className="p-3 rounded-xl bg-sky-500/10 text-[#0077be] dark:bg-sky-500/20 dark:text-[#38bdf8]">
            <KeyRound size={22} />
          </div>
        </div>
      </div>
    </div>
  );
};
