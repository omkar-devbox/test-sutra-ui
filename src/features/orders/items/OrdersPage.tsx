import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Plus, Clock, Layers, DollarSign } from "lucide-react";
import { Button } from "@/shared/ui";
import { useOrders } from "../hooks/useOrders";
import { OrdersTable } from "./OrdersTable";
import { OrderCreationTerminal } from "./OrderCreationTerminal";
import { ordersStyles } from "../style/orders.styles";
import type { Order } from "../types/orders.types";

export const OrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    orders,
    stats,
    searchQuery,
    setSearchQuery,
    updateOrder,
    updateOrderStatus,
    deleteOrder,
  } = useOrders();

  const [editingOrder, setEditingOrder] = useState<Order | null>(null);

  if (editingOrder) {
    return (
      <OrderCreationTerminal
        existingOrder={editingOrder}
        onOrderCreated={(updated) => {
          updateOrder(updated);
          setEditingOrder(null);
        }}
        onClose={() => setEditingOrder(null)}
      />
    );
  }

  return (
    <div className={ordersStyles.container}>
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/60 dark:bg-[#00253d]/60 backdrop-blur-md p-4 md:p-6 rounded-2xl border border-[#0077be]/20 shadow-sm">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-[#004066] dark:text-[#ebf7ff] flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-[#0077be]/10 text-[#0077be] dark:bg-[#0077be]/20 dark:text-[#38bdf8]">
              <ShoppingCart size={24} />
            </span>
            Orders Management
          </h1>
          <p className="text-xs md:text-sm text-[#004066]/70 dark:text-[#ebf7ff]/70 mt-1">
            Track print jobs, production status, customer billing & manifests
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate("/orders/create")}
          leftIcon={<Plus size={18} />}
          className="bg-[#0077be] hover:bg-[#005c94] text-white shadow-md hover:shadow-lg transition-all text-xs font-semibold px-4 py-2"
        >
          Create New Order
        </Button>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center justify-between bg-white/70 dark:bg-[#00253d]/70 backdrop-blur-md border border-[#0077be]/20 rounded-2xl p-5 shadow-sm">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[#004066]/60 dark:text-[#ebf7ff]/60">
              Total Processed Orders
            </p>
            <h3 className="text-2xl md:text-3xl font-extrabold text-[#004066] dark:text-[#ebf7ff] mt-1">
              {stats.totalOrders}
            </h3>
          </div>
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
            <ShoppingCart size={22} />
          </div>
        </div>

        <div className="flex items-center justify-between bg-white/70 dark:bg-[#00253d]/70 backdrop-blur-md border border-[#0077be]/20 rounded-2xl p-5 shadow-sm">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[#004066]/60 dark:text-[#ebf7ff]/60">
              In Production Queue
            </p>
            <h3 className="text-2xl md:text-3xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">
              {stats.inProduction}
            </h3>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
            <Clock size={22} />
          </div>
        </div>

        <div className="flex items-center justify-between bg-[#00253d]/70 backdrop-blur-md border border-[#0077be]/20 rounded-2xl p-5 shadow-sm">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[#004066]/60 dark:text-[#ebf7ff]/60">
              Total Queue Valuation
            </p>
            <h3 className="text-2xl md:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
              ₹{stats.totalValuation.toLocaleString()}
            </h3>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
            <DollarSign size={22} />
          </div>
        </div>
      </div>

      {/* Orders Data Table */}
      <OrdersTable
        data={orders}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onDeleteOrder={deleteOrder}
        onStatusChange={updateOrderStatus}
        onEditOrder={(ord) => setEditingOrder(ord)}
      />
    </div>
  );
};

export default OrdersPage;

