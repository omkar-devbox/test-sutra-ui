import { useState, useEffect } from "react";
import type { Order } from "../types/orders.types";
import initialOrders from "../data/initialOrders.json";

const LOCAL_STORAGE_KEY = "sutra_orders_data";

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse orders from localStorage", e);
    }
    return initialOrders as Order[];
  });

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error("Failed to save orders to localStorage", e);
    }
  }, [orders]);

  const addOrder = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  const updateOrder = (updatedOrder: Order) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === updatedOrder.id ? updatedOrder : ord))
    );
  };

  const updateOrderStatus = (id: string, status: Order["status"]) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === id ? { ...ord, status } : ord))
    );
  };

  const deleteOrder = (id: string) => {
    setOrders((prev) => prev.filter((ord) => ord.id !== id));
  };

  const filteredOrders = orders.filter((ord) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      ord.orderNumber.toLowerCase().includes(q) ||
      ord.customerName.toLowerCase().includes(q) ||
      ord.items.some((i) => i.jobName.toLowerCase().includes(q) || i.mediaName.toLowerCase().includes(q))
    );
  });

  const stats = {
    totalOrders: orders.length,
    inProduction: orders.filter((o) => o.status === "In Production").length,
    submitted: orders.filter((o) => o.status === "Submitted").length,
    totalValuation: orders.reduce((sum, o) => sum + o.totalValuation, 0),
  };

  return {
    orders: filteredOrders,
    stats,
    searchQuery,
    setSearchQuery,
    addOrder,
    updateOrder,
    updateOrderStatus,
    deleteOrder,
  };
}

