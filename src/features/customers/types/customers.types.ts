export type CustomerStatus = "Active" | "Inactive";

export interface Customer {
  id: string;
  fullName: string;
  email: string;
  contactNumber: string;
  companyName: string;
  address: string;
  houseNoBuilding?: string;
  landmarkArea?: string;
  city?: string;
  state?: string;
  pincode?: string;
  status: CustomerStatus;
  totalOrders: number;
  createdAt: string;
  updatedAt?: string;
  lastActive?: string;
}

export interface CustomerFormData {
  fullName: string;
  email: string;
  contactNumber: string;
  companyName: string;
  address: string;
  houseNoBuilding?: string;
  landmarkArea?: string;
  city?: string;
  state?: string;
  pincode?: string;
  status?: CustomerStatus;
}

export interface CustomersState {
  customers: Customer[];
  searchQuery: string;
  selectedStatus: string;
  isModalOpen: boolean;
  editingCustomer: Customer | null;
  isLoading: boolean;
}

export interface CustomersStats {
  totalCount: number;
  activeCount: number;
  inactiveCount: number;
  companyCount: number;
}

export interface CustomerAnalytics {
  customerId: string;
  totalRevenue: number;
  totalSqFtOrdered: number;
  averageOrderValue: number;
  lastOrderDate: string;
  topMediaUsed: string;
  recentOrdersCount: number;
}

