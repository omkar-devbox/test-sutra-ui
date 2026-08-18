export type UserRole = "Admin" | "Staff" | "Customer";

export type OrderStatus = "Draft" | "Submitted" | "In Production" | "Completed" | "Cancelled";

export interface KpiStatCard {
  id: string;
  title: string;
  value: string | number;
  change?: string;
  changeType?: "increase" | "decrease" | "neutral";
  iconName: string;
  subtext?: string;
}

export interface PrintJobQueueItem {
  id: string;
  orderNumber: string;
  customerName: string;
  jobName: string;
  paperType: string;
  quantity: number;
  sqft: number;
  status: OrderStatus;
  dueDate: string;
  priority: "High" | "Medium" | "Normal";
}

export interface CustomerOrderTracking {
  id: string;
  orderNumber: string;
  jobName: string;
  totalAmount: number;
  paymentStatus: "Paid" | "Pending" | "Partial";
  currentStage: OrderStatus;
  stageProgress: number; // 0 to 100
  estimatedCompletion: string;
  orderDate: string;
}

export interface SystemActivityLog {
  id: string;
  timestamp: string;
  user: string;
  role: UserRole;
  action: string;
  details: string;
  type: "info" | "warning" | "success" | "error";
}

export interface PaperStockAlert {
  id: string;
  paperName: string;
  gsm: number;
  availableRolls: number;
  minimumThreshold: number;
  status: "Critical" | "Low" | "Adequate";
}
