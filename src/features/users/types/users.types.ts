export type SystemRole = "Admin" | "Manager" | "Operator" | "Staff" | "Viewer";

export type UserStatus = "Active" | "Inactive" | "Suspended";

export interface User {
  id: string;
  fullName: string;
  email: string;
  password?: string;
  contactNumber: string;
  systemRole: SystemRole | string;
  status: UserStatus;
  createdAt: string;
  updatedAt?: string;
  lastActive?: string;
}

export interface UserFormData {
  fullName: string;
  email: string;
  password?: string;
  contactNumber: string;
  systemRole: string;
  status?: UserStatus;
}

export interface UsersState {
  users: User[];
  searchQuery: string;
  selectedRole: string;
  isModalOpen: boolean;
  editingUser: User | null;
  isLoading: boolean;
}

export interface UsersStats {
  totalCount: number;
  activeCount: number;
  adminCount: number;
  rolesCount: number;
}
