export type PaperCategory =
  | "Art Paper"
  | "Cardstock"
  | "Vinyl Flex"
  | "Bond Paper"
  | "Glossy"
  | "Matte"
  | "Specialty";

export type UnitOfMeasure = "Sheet" | "Sq. Ft." | "Meter" | "Roll" | "Pack";

export interface PaperType {
  id: string;
  paperTypeName: string;
  category: PaperCategory | string;
  pricePerUnit: number;
  gsm?: number;
  unit?: UnitOfMeasure | string;
  description?: string;
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt?: string;
}

export interface PaperTypeFormData {
  paperTypeName: string;
  category: string;
  pricePerUnit: number | string;
  gsm?: number | string;
  unit?: string;
  description?: string;
  status?: "Active" | "Inactive";
}

export interface PaperTypesState {
  paperTypes: PaperType[];
  searchQuery: string;
  selectedCategory: string;
  isModalOpen: boolean;
  editingPaperType: PaperType | null;
  isLoading: boolean;
}

export interface PaperTypesStats {
  totalCount: number;
  activeCount: number;
  categoriesCount: number;
  averagePrice: number;
}
