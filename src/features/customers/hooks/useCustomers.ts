import { useState, useMemo, useEffect, useCallback } from "react";
import type {
  Customer,
  CustomerFormData,
  CustomersStats,
} from "../types/customers.types";
import initialCustomersData from "../data/initialCustomers.json";
import { local } from "@/shared/lib/Storage/localstorage";

const STORAGE_KEY = "sutra_customers_v1";

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>(() => {
    const cached = local.get<Customer[]>(STORAGE_KEY);
    if (cached && Array.isArray(cached) && cached.length > 0) {
      return cached;
    }
    return initialCustomersData as Customer[];
  });

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [deletingCustomer, setDeletingCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Sync to local storage whenever customers change
  useEffect(() => {
    local.set(STORAGE_KEY, customers);
  }, [customers]);

  // Calculated Stats
  const stats: CustomersStats = useMemo(() => {
    const totalCount = customers.length;
    const activeCount = customers.filter((c) => c.status === "Active").length;
    const inactiveCount = customers.filter((c) => c.status === "Inactive").length;
    const companyCount = customers.filter((c) => Boolean(c.companyName?.trim())).length;

    return {
      totalCount,
      activeCount,
      inactiveCount,
      companyCount,
    };
  }, [customers]);

  // Filtered Customers
  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        c.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.contactNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.companyName && c.companyName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (c.address && c.address.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus =
        selectedStatus === "All" || c.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [customers, searchQuery, selectedStatus]);

  // Modal actions
  const openCreateModal = useCallback(() => {
    setEditingCustomer(null);
    setIsModalOpen(true);
  }, []);

  const openEditModal = useCallback((customer: Customer) => {
    setEditingCustomer(customer);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingCustomer(null);
  }, []);

  const openDeleteModal = useCallback((customer: Customer) => {
    setDeletingCustomer(customer);
    setIsDeleteModalOpen(true);
  }, []);

  const openDeleteModalById = useCallback(
    (id: string) => {
      const target = customers.find((c) => c.id === id);
      if (target) {
        setDeletingCustomer(target);
        setIsDeleteModalOpen(true);
      }
    },
    [customers]
  );

  const closeDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
    setDeletingCustomer(null);
  }, []);

  // Save / Update Customer
  const saveCustomer = useCallback(
    (formData: CustomerFormData) => {
      setIsLoading(true);

      if (editingCustomer) {
        // Edit mode
        setCustomers((prev) =>
          prev.map((c) =>
            c.id === editingCustomer.id
              ? {
                  ...c,
                  fullName: formData.fullName,
                  email: formData.email,
                  contactNumber: formData.contactNumber,
                  companyName: formData.companyName || "",
                  address: formData.address || "",
                  houseNoBuilding: formData.houseNoBuilding || "",
                  landmarkArea: formData.landmarkArea || "",
                  city: formData.city || "",
                  state: formData.state || "",
                  pincode: formData.pincode || "",
                  status: formData.status || c.status,
                  updatedAt: new Date().toISOString(),
                }
              : c
          )
        );
      } else {
        // Create mode
        const newRecord: Customer = {
          id: `cust-${Date.now()}`,
          fullName: formData.fullName,
          email: formData.email,
          contactNumber: formData.contactNumber,
          companyName: formData.companyName || "",
          address: formData.address || "",
          houseNoBuilding: formData.houseNoBuilding || "",
          landmarkArea: formData.landmarkArea || "",
          city: formData.city || "",
          state: formData.state || "",
          pincode: formData.pincode || "",
          status: formData.status || "Active",
          totalOrders: 0,
          createdAt: new Date().toISOString(),
          lastActive: "Just added",
        };

        setCustomers((prev) => [newRecord, ...prev]);
      }

      setIsLoading(false);
      closeModal();
    },
    [editingCustomer, closeModal]
  );

  // Confirm Delete Customer
  const confirmDelete = useCallback(() => {
    if (!deletingCustomer) return;
    setCustomers((prev) => prev.filter((c) => c.id !== deletingCustomer.id));
    closeDeleteModal();
  }, [deletingCustomer, closeDeleteModal]);

  // Toggle Active/Inactive status
  const toggleStatus = useCallback((id: string) => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status: c.status === "Active" ? "Inactive" : "Active",
              updatedAt: new Date().toISOString(),
            }
          : c
      )
    );
  }, []);

  // Reset to initial default data
  const resetToDefaultData = useCallback(() => {
    setCustomers(initialCustomersData as Customer[]);
    setSearchQuery("");
    setSelectedStatus("All");
  }, []);

  return {
    customers: filteredCustomers,
    allCustomers: customers,
    stats,
    searchQuery,
    setSearchQuery,
    selectedStatus,
    setSelectedStatus,
    isModalOpen,
    editingCustomer,
    isDeleteModalOpen,
    deletingCustomer,
    isLoading,
    openCreateModal,
    openEditModal,
    closeModal,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
    saveCustomer,
    deleteCustomer: openDeleteModalById,
    toggleStatus,
    resetToDefaultData,
  };
}
