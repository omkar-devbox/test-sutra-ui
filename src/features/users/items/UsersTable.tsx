import React from "react";
import { Edit2, Trash2, CheckCircle, XCircle, Search, Mail, Phone } from "lucide-react";
import { DataTable, Button, Badge } from "@/shared/ui";
import type { ColumnDef } from "@/shared/ui/dataTable/types/dataTable.types";
import type { User } from "../types/users.types";
import { getRoleBadgeStyle } from "../style/users.styles";

interface UsersTableProps {
  data: User[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

const getInitials = (name: string): string => {
  if (!name) return "U";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

export const UsersTable: React.FC<UsersTableProps> = ({
  data,
  searchQuery,
  onSearchChange,
  onEdit,
  onDelete,
  onToggleStatus,
}) => {
  const columns: ColumnDef<User>[] = [
    {
      id: "fullName",
      label: "Full Name",
      key: "fullName",
      sortable: true,
      render: (row: User) => (
        <div className="flex items-center gap-3 py-1">
          <div className="w-8 h-8 rounded-full bg-[#0077be]/10 text-[#0077be] dark:bg-[#0077be]/25 dark:text-[#38bdf8] flex items-center justify-center font-bold text-xs shrink-0 border border-[#0077be]/20">
            {getInitials(row.fullName)}
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-slate-800 dark:text-slate-100 text-sm">
              {row.fullName}
            </span>
          </div>
        </div>
      ),
    },
    {
      id: "email",
      label: "Email Address",
      key: "email",
      sortable: true,
      render: (row: User) => (
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300">
          <Mail size={13} className="text-slate-400 shrink-0" />
          <span>{row.email}</span>
        </div>
      ),
    },
    {
      id: "contactNumber",
      label: "Contact Number",
      key: "contactNumber",
      sortable: true,
      render: (row: User) => (
        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-600 dark:text-slate-300">
          <Phone size={13} className="text-slate-400 shrink-0" />
          <span>{row.contactNumber}</span>
        </div>
      ),
    },
    {
      id: "systemRole",
      label: "System Role",
      key: "systemRole",
      sortable: true,
      render: (row: User) => (
        <span className={getRoleBadgeStyle(row.systemRole)}>
          {row.systemRole}
        </span>
      ),
    },
    {
      id: "status",
      label: "Status",
      key: "status",
      sortable: true,
      render: (row: User) => {
        const isActive = row.status === "Active";
        return (
          <button
            onClick={() => onToggleStatus(row.id)}
            title="Click to toggle status"
            className="inline-flex items-center gap-1.5 cursor-pointer focus:outline-none"
          >
            <Badge variant={isActive ? "success" : "default"}>
              {isActive ? <CheckCircle size={12} className="inline mr-1" /> : <XCircle size={12} className="inline mr-1" />}
              {row.status}
            </Badge>
          </button>
        );
      },
    },
    {
      id: "actions",
      label: "Actions",
      width: 160,
      minWidth: 160,
      render: (row: User) => (
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(row)}
            className="h-8 w-8 p-0 text-slate-600 dark:text-slate-300 hover:text-[#0077be] hover:bg-blue-50 dark:hover:bg-blue-950/40"
            title="Edit User"
          >
            <Edit2 size={15} />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(row.id)}
            className="h-8 w-8 p-0 text-slate-600 dark:text-slate-300 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
            title="Delete User"
          >
            <Trash2 size={15} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4 bg-white/70 dark:bg-[#00253d]/70 backdrop-blur-md p-4 md:p-6 rounded-2xl border border-[#0077be]/20 shadow-sm">
      {/* Quick Search Filter */}
      <div className="flex items-center justify-end border-b border-slate-200/80 dark:border-slate-800 pb-4">
        {/* Search Bar */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name, email, role..."
            className="w-full pl-9 pr-4 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0077be]/40 focus:border-[#0077be]"
          />
        </div>
      </div>

      {/* Shared UI DataTable */}
      <div className="rounded-xl border border-slate-200/70 dark:border-slate-800 overflow-hidden shadow-xs">
        <DataTable
          data={data}
          columns={columns}
          enableSearch={false}
          hideToolbar={true}
          getRowId={(row) => row.id}
          className="w-full"
        />
      </div>
    </div>
  );
};
