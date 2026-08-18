import React from "react";
import { usersStyles } from "../style/users.styles";
import { useUsers } from "../hooks/useUsers";
import { UsersHeader } from "./UsersHeader";
import { UsersTable } from "./UsersTable";
import { UserFormModal } from "./UserFormModal";
import { UserDeleteModal } from "./UserDeleteModal";

export const UsersPage: React.FC = () => {
  const {
    users,
    stats,
    rolesList,
    searchQuery,
    setSearchQuery,
    selectedRole,
    setSelectedRole,
    isModalOpen,
    editingUser,
    isDeleteModalOpen,
    deletingUser,
    isLoading,
    openCreateModal,
    openEditModal,
    closeModal,
    closeDeleteModal,
    confirmDelete,
    saveUser,
    deleteUser,
    toggleStatus,
    resetToDefaultData,
  } = useUsers();

  return (
    <div className={usersStyles.container}>
      {/* Header Section */}
      <UsersHeader
        stats={stats}
        onAddClick={openCreateModal}
        onResetClick={resetToDefaultData}
      />

      {/* Main Data Table */}
      <UsersTable
        data={users}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onEdit={openEditModal}
        onDelete={deleteUser}
        onToggleStatus={toggleStatus}
      />

      {/* Form Modal for Add/Edit using JSON Form Renderer */}
      <UserFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={saveUser}
        initialData={editingUser}
        isLoading={isLoading}
      />

      {/* Delete Confirmation Modal */}
      <UserDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        user={deletingUser}
        isLoading={isLoading}
      />
    </div>
  );
};

export default UsersPage;
