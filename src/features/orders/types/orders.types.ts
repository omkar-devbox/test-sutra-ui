export type ShippingTag = "Home" | "Work" | "Store" | "Location";

export interface OrderItem {
  id: string;
  jobName: string;
  mediaId: string;
  mediaName: string;
  pricePerUnit: number;
  unit: string; // e.g. "Sq. Ft." or "Sheet"
  heightFt: number;
  widthFt: number;
  areaSqFt: number;
  estimatedCost: number;
  artworkAttached: boolean;
  artworkFileName?: string;
  isExpanded?: boolean;
}

export interface ShippingInfo {
  tag: ShippingTag;
  houseNoBuilding: string;
  landmarkArea: string;
  city: string;
  state: string;
  pincode: string;
  status: "INCOMPLETE" | "COMPLETE";
}

export type OrderStatus = "Draft" | "Submitted" | "In Production" | "Completed" | "Cancelled";

export interface Order {
  id: string;
  orderNumber: string;
  customerId?: string | null; // null or undefined means "Self (Default)"
  customerName: string;
  items: OrderItem[];
  shippingInfo: ShippingInfo;
  productionNotes: string;
  totalBatchCount: number;
  totalPayloadSqFt: number;
  totalValuation: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt?: string;
}
