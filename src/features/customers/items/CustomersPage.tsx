import React, { useState } from "react";
import { customersStyles } from "../style/customers.styles";
import { useCustomers } from "../hooks/useCustomers";
import { CustomersHeader } from "./CustomersHeader";
import { CustomersTable } from "./CustomersTable";
import { CustomerFormModal } from "./CustomerFormModal";
import { CustomerDeleteModal } from "./CustomerDeleteModal";
import { CustomerAnalysisModal } from "./CustomerAnalysisModal";

export const CustomersPage: React.FC = () => {
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);
  const {
    customers,
    stats,
    searchQuery,
    setSearchQuery,
    isModalOpen,
    editingCustomer,
    isDeleteModalOpen,
    deletingCustomer,
    isLoading,
    openCreateModal,
    openEditModal,
    closeModal,
    closeDeleteModal,
    confirmDelete,
    saveCustomer,
    deleteCustomer,
    toggleStatus,
    resetToDefaultData,
  } = useCustomers();

  return (
    <div className={customersStyles.container}>
      {/* Header Section */}
      <CustomersHeader
        stats={stats}
        onAddClick={openCreateModal}
        onResetClick={resetToDefaultData}
      />

      {/* Main Data Table */}
      <CustomersTable
        data={customers}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onEdit={openEditModal}
        onDelete={deleteCustomer}
        onToggleStatus={toggleStatus}
      />

      {/* Analytics Modal */}
      <CustomerAnalysisModal
        isOpen={isAnalysisOpen}
        onClose={() => setIsAnalysisOpen(false)}
        customers={customers}
      />

      {/* Form Modal for Add/Edit using JSON Form Renderer */}
      <CustomerFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={saveCustomer}
        initialData={editingCustomer}
        isLoading={isLoading}
      />

      {/* Delete Confirmation Modal */}
      <CustomerDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        customer={deletingCustomer}
        isLoading={isLoading}
      />
    </div>
  );
};

export default CustomersPage;

