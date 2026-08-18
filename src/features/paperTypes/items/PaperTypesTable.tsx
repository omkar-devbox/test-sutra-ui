import React from "react";
import { Edit2, Trash2, CheckCircle, XCircle, Search } from "lucide-react";
import { DataTable, Button, Badge } from "@/shared/ui";
import type { ColumnDef } from "@/shared/ui/dataTable/types/dataTable.types";
import type { PaperType } from "../types/paperTypes.types";
import { getCategoryBadgeStyle } from "../style/paperTypes.styles";

interface PaperTypesTableProps {
  data: PaperType[];
  categoriesList: string[];
  selectedCategory: string;
  onCategorySelect: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onEdit: (paperType: PaperType) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export const PaperTypesTable: React.FC<PaperTypesTableProps> = ({
  data,
  categoriesList,
  selectedCategory,
  onCategorySelect,
  searchQuery,
  onSearchChange,
  onEdit,
  onDelete,
  onToggleStatus,
}) => {

  const columns: ColumnDef<PaperType>[] = [
    {
      id: "paperTypeName",
      label: "Paper Type Name",
      key: "paperTypeName",
      sortable: true,
      render: (row: PaperType) => (
        <div className="flex flex-col gap-0.5 py-1">
          <span className="font-semibold text-slate-800 dark:text-slate-100 text-sm">
            {row.paperTypeName}
          </span>
        </div>
      ),
    },
    {
      id: "category",
      label: "Category",
      key: "category",
      sortable: true,
      width: 300,
      render: (row: PaperType) => (
        <span className={getCategoryBadgeStyle(row.category)}>
          {row.category}
        </span>
      ),
    },
    {
      id: "pricePerUnit",
      label: "Price / Unit",
      key: "pricePerUnit",
      sortable: true,
      width: 300,
      render: (row: PaperType) => (
        <div className="flex items-baseline gap-1 font-mono">
          <span className="text-[#0077be] dark:text-[#38bdf8] font-bold text-base">
            ₹{Number(row.pricePerUnit).toFixed(2)}
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500">
            / {row.unit || "Unit"}
          </span>
        </div>
      ),
    },
    {
      id: "gsm",
      label: "GSM",
      key: "gsm",
      width: 300,
      sortable: true,
      render: (row: PaperType) => (
        <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
          {row.gsm ? `${row.gsm} GSM` : "N/A"}
        </span>
      ),
    },
    {
      id: "status",
      label: "Status",
      key: "status",
      sortable: true,
      render: (row: PaperType) => {
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
      render: (row: PaperType) => (
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(row)}
            className="h-8 w-8 p-0 text-slate-600 dark:text-slate-300 hover:text-[#0077be] hover:bg-blue-50 dark:hover:bg-blue-950/40"
            title="Edit Paper Type"
          >
            <Edit2 size={15} />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(row.id)}
            className="h-8 w-8 p-0 text-slate-600 dark:text-slate-300 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
            title="Delete Paper Type"
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
            placeholder="Search paper types..."
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
