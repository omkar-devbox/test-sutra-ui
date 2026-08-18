import { useState, useMemo, useEffect, useCallback } from "react";
import type {
  User,
  UserFormData,
  UsersStats,
} from "../types/users.types";
import initialUsersData from "../data/initialUsers.json";
import { local } from "@/shared/lib/Storage/localstorage";

const STORAGE_KEY = "sutra_users_v1";

export function useUsers() {
  const [users, setUsers] = useState<User[]>(() => {
    const cached = local.get<User[]>(STORAGE_KEY);
    if (cached && Array.isArray(cached) && cached.length > 0) {
      return cached;
    }
    return initialUsersData as User[];
  });

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Sync to local storage whenever users change
  useEffect(() => {
    local.set(STORAGE_KEY, users);
  }, [users]);

  // Calculated Stats
  const stats: UsersStats = useMemo(() => {
    const totalCount = users.length;
    const activeCount = users.filter((u) => u.status === "Active").length;
    const adminCount = users.filter((u) => u.systemRole === "Admin").length;
    const rolesSet = new Set(users.map((u) => u.systemRole));

    return {
      totalCount,
      activeCount,
      adminCount,
      rolesCount: rolesSet.size,
    };
  }, [users]);

  // Unique roles for filtering
  const rolesList = useMemo(() => {
    const roles = Array.from(new Set(users.map((u) => u.systemRole)));
    return ["All", ...roles];
  }, [users]);

  // Filtered Users
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.contactNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.systemRole.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole =
        selectedRole === "All" || u.systemRole === selectedRole;

      return matchesSearch && matchesRole;
    });
  }, [users, searchQuery, selectedRole]);

  // Modal actions
  const openCreateModal = useCallback(() => {
    setEditingUser(null);
    setIsModalOpen(true);
  }, []);

  const openEditModal = useCallback((user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingUser(null);
  }, []);

  const openDeleteModal = useCallback((user: User) => {
    setDeletingUser(user);
    setIsDeleteModalOpen(true);
  }, []);

  const openDeleteModalById = useCallback((id: string) => {
    const target = users.find((u) => u.id === id);
    if (target) {
      setDeletingUser(target);
      setIsDeleteModalOpen(true);
    }
  }, [users]);

  const closeDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
    setDeletingUser(null);
  }, []);

  // Save / Update User
  const saveUser = useCallback(
    (formData: UserFormData) => {
      setIsLoading(true);

      if (editingUser) {
        // Edit mode
        setUsers((prev) =>
          prev.map((u) =>
            u.id === editingUser.id
              ? {
                  ...u,
                  fullName: formData.fullName,
                  email: formData.email,
                  contactNumber: formData.contactNumber,
                  systemRole: formData.systemRole,
                  password: formData.password || u.password,
                  updatedAt: new Date().toISOString(),
                }
              : u
          )
        );
      } else {
        // Create mode
        const newRecord: User = {
          id: `usr-${Date.now()}`,
          fullName: formData.fullName,
          email: formData.email,
          contactNumber: formData.contactNumber,
          systemRole: formData.systemRole || "Staff",
          password: formData.password,
          status: "Active",
          createdAt: new Date().toISOString(),
          lastActive: "Just created",
        };

        setUsers((prev) => [newRecord, ...prev]);
      }

      setIsLoading(false);
      closeModal();
    },
    [editingUser, closeModal]
  );

  // Confirm Delete User
  const confirmDelete = useCallback(() => {
    if (!deletingUser) return;
    setUsers((prev) => prev.filter((u) => u.id !== deletingUser.id));
    closeDeleteModal();
  }, [deletingUser, closeDeleteModal]);

  // Toggle Active/Inactive status
  const toggleStatus = useCallback((id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? {
              ...u,
              status: u.status === "Active" ? "Inactive" : "Active",
              updatedAt: new Date().toISOString(),
            }
          : u
      )
    );
  }, []);

  // Reset to initial default data
  const resetToDefaultData = useCallback(() => {
    setUsers(initialUsersData as User[]);
    setSearchQuery("");
    setSelectedRole("All");
  }, []);

  return {
    users: filteredUsers,
    allUsers: users,
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
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
    saveUser,
    deleteUser: openDeleteModalById,
    toggleStatus,
    resetToDefaultData,
  };
}
