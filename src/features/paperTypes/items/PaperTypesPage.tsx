import React from "react";
import { paperTypesStyles } from "../style/paperTypes.styles";
import { usePaperTypes } from "../hooks/usePaperTypes";
import { PaperTypesHeader } from "./PaperTypesHeader";
import { PaperTypesTable } from "./PaperTypesTable";
import { PaperTypeFormModal } from "./PaperTypeFormModal";
import { PaperTypeDeleteModal } from "./PaperTypeDeleteModal";

export const PaperTypesPage: React.FC = () => {
  const {
    paperTypes,
    stats,
    categoriesList,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    isModalOpen,
    editingPaperType,
    isDeleteModalOpen,
    deletingPaperType,
    isLoading,
    openCreateModal,
    openEditModal,
    closeModal,
    closeDeleteModal,
    confirmDelete,
    savePaperType,
    deletePaperType,
    toggleStatus,
    resetToDefaultData,
  } = usePaperTypes();

  return (
    <div className={paperTypesStyles.container}>
      {/* Header Section */}
      <PaperTypesHeader
        stats={stats}
        onAddClick={openCreateModal}
        onResetClick={resetToDefaultData}
      />

      {/* Main Data Table */}
      <PaperTypesTable
        data={paperTypes}
        categoriesList={categoriesList}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onEdit={openEditModal}
        onDelete={deletePaperType}
        onToggleStatus={toggleStatus}
      />

      {/* Form Modal for Add/Edit using JSON Form Renderer */}
      <PaperTypeFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={savePaperType}
        initialData={editingPaperType}
        isLoading={isLoading}
      />

      {/* Delete Confirmation Modal */}
      <PaperTypeDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        paperType={deletingPaperType}
        isLoading={isLoading}
      />
    </div>
  );
};

export default PaperTypesPage;
