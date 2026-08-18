import React from "react";
import { DataTable, Button } from "@/shared/ui";
import type { ColumnDef } from "@/shared/ui/dataTable/types/dataTable.types";
import type { Order } from "../types/orders.types";
import { Search, ShoppingBag, Trash2, Edit2, Layers } from "lucide-react";

interface OrdersTableProps {
  data: Order[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onDeleteOrder: (id: string) => void;
  onStatusChange: (id: string, status: Order["status"]) => void;
  onEditOrder?: (order: Order) => void;
}

export const OrdersTable: React.FC<OrdersTableProps> = ({
  data,
  searchQuery,
  onSearchChange,
  onDeleteOrder,
  onStatusChange,
  onEditOrder,
}) => {
  const columns: ColumnDef<Order>[] = [
    {
      id: "orderNumber",
      label: "Order #",
      key: "orderNumber",
      sortable: true,
      render: (row: Order) => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#0077be]/10 text-[#0077be] dark:bg-[#0077be]/25 dark:text-[#38bdf8] flex items-center justify-center font-bold text-xs shrink-0">
            <ShoppingBag size={15} />
          </div>
          <div>
            <span className="font-bold text-slate-800 dark:text-slate-100 text-xs font-mono">
              {row.orderNumber}
            </span>
            <span className="block text-[10px] text-slate-400">
              {new Date(row.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      ),
    },
    {
      id: "customerName",
      label: "Customer Account",
      key: "customerName",
      sortable: true,
      render: (row: Order) => (
        <span className="font-semibold text-slate-700 dark:text-slate-200 text-xs">
          {row.customerName}
        </span>
      ),
    },
    {
      id: "items",
      label: "Payload Jobs & SQFT",
      render: (row: Order) => (
        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 font-bold text-[11px]">
            {row.totalBatchCount} {row.totalBatchCount === 1 ? "Job" : "Jobs"}
          </span>
          <span className="text-slate-400 font-mono flex items-center gap-1">
            <Layers size={11} /> {row.totalPayloadSqFt} SQFT
          </span>
        </div>
      ),
    },
    {
      id: "totalValuation",
      label: "Total Valuation",
      key: "totalValuation",
      sortable: true,
      render: (row: Order) => (
        <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">
          ₹{row.totalValuation.toLocaleString()}
        </span>
      ),
    },
    {
      id: "status",
      label: "Status",
      key: "status",
      sortable: true,
      render: (row: Order) => {
        const isCompleted = row.status === "Completed";
        const isInProduction = row.status === "In Production";

        return (
          <select
            value={row.status}
            onChange={(e) => onStatusChange(row.id, e.target.value as Order["status"])}
            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase border appearance-none cursor-pointer focus:outline-none ${
              isCompleted
                ? "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 border-emerald-500/30"
                : isInProduction
                ? "bg-blue-500/10 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300 border-blue-500/30"
                : "bg-amber-500/10 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300 border-amber-500/30"
            }`}
          >
            <option value="Draft">Draft</option>
            <option value="Submitted">Submitted</option>
            <option value="In Production">In Production</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        );
      },
    },
    {
      id: "actions",
      label: "Actions",
      width: 160,
      minWidth: 160,
      render: (row: Order) => (
        <div className="flex items-center gap-1">
          {onEditOrder && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEditOrder(row)}
              className="h-8 w-8 p-0 text-slate-500 hover:text-[#0077be] hover:bg-blue-50 dark:hover:bg-blue-950/40"
              title="Edit Order"
            >
              <Edit2 size={15} />
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDeleteOrder(row.id)}
            className="h-8 w-8 p-0 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
            title="Delete Order"
          >
            <Trash2 size={15} />
          </Button>
        </div>
      ),
    },
  ];


  return (
    <div className="flex flex-col gap-4 bg-white/70 dark:bg-[#00253d]/70 backdrop-blur-md p-4 md:p-6 rounded-2xl border border-[#0077be]/20 shadow-sm">
      {/* Search Header */}
      <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-4">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">
          Order Processing Queue
        </h3>

        <div className="relative w-full md:w-72 shrink-0">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search order # or customer..."
            className="w-full pl-9 pr-4 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0077be]/40 focus:border-[#0077be]"
          />
        </div>
      </div>

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
