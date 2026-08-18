import { useState, useMemo, useEffect, useCallback } from "react";
import type {
  PaperType,
  PaperTypeFormData,
  PaperTypesStats,
} from "../types/paperTypes.types";
import initialPaperTypesData from "../data/initialPaperTypes.json";
import { local } from "@/shared/lib/Storage/localstorage";

const STORAGE_KEY = "sutra_paper_types_v1";

export function usePaperTypes() {
  const [paperTypes, setPaperTypes] = useState<PaperType[]>(() => {
    const cached = local.get<PaperType[]>(STORAGE_KEY);
    if (cached && Array.isArray(cached) && cached.length > 0) {
      return cached;
    }
    return initialPaperTypesData as PaperType[];
  });

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingPaperType, setEditingPaperType] = useState<PaperType | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [deletingPaperType, setDeletingPaperType] = useState<PaperType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Sync to local storage whenever paperTypes change
  useEffect(() => {
    local.set(STORAGE_KEY, paperTypes);
  }, [paperTypes]);

  // Calculated Stats
  const stats: PaperTypesStats = useMemo(() => {
    const totalCount = paperTypes.length;
    const activeCount = paperTypes.filter((pt) => pt.status === "Active").length;
    const categoriesSet = new Set(paperTypes.map((pt) => pt.category));
    const totalPrice = paperTypes.reduce(
      (sum, pt) => sum + (Number(pt.pricePerUnit) || 0),
      0
    );
    const averagePrice = totalCount > 0 ? totalPrice / totalCount : 0;

    return {
      totalCount,
      activeCount,
      categoriesCount: categoriesSet.size,
      averagePrice: Number(averagePrice.toFixed(2)),
    };
  }, [paperTypes]);

  // Unique categories for filtering
  const categoriesList = useMemo(() => {
    const categories = Array.from(new Set(paperTypes.map((pt) => pt.category)));
    return ["All", ...categories];
  }, [paperTypes]);

  // Filtered Paper Types
  const filteredPaperTypes = useMemo(() => {
    return paperTypes.filter((pt) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        pt.paperTypeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pt.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (pt.description && pt.description.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === "All" || pt.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [paperTypes, searchQuery, selectedCategory]);

  // Modal actions
  const openCreateModal = useCallback(() => {
    setEditingPaperType(null);
    setIsModalOpen(true);
  }, []);

  const openEditModal = useCallback((paperType: PaperType) => {
    setEditingPaperType(paperType);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingPaperType(null);
  }, []);

  const openDeleteModal = useCallback((paperType: PaperType) => {
    setDeletingPaperType(paperType);
    setIsDeleteModalOpen(true);
  }, []);

  const openDeleteModalById = useCallback((id: string) => {
    const target = paperTypes.find((pt) => pt.id === id);
    if (target) {
      setDeletingPaperType(target);
      setIsDeleteModalOpen(true);
    }
  }, [paperTypes]);

  const closeDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
    setDeletingPaperType(null);
  }, []);

  // Save / Update Paper Type
  const savePaperType = useCallback(
    (formData: PaperTypeFormData) => {
      setIsLoading(true);

      const numericPrice = typeof formData.pricePerUnit === "string"
        ? parseFloat(formData.pricePerUnit) || 0
        : formData.pricePerUnit;

      const numericGsm = formData.gsm
        ? typeof formData.gsm === "string"
          ? parseInt(formData.gsm, 10) || undefined
          : formData.gsm
        : undefined;

      if (editingPaperType) {
        // Edit mode
        setPaperTypes((prev) =>
          prev.map((pt) =>
            pt.id === editingPaperType.id
              ? {
                  ...pt,
                  paperTypeName: formData.paperTypeName,
                  category: formData.category,
                  pricePerUnit: numericPrice,
                  gsm: numericGsm,
                  unit: formData.unit || "Sheet",
                  description: formData.description || "",
                  updatedAt: new Date().toISOString(),
                }
              : pt
          )
        );
      } else {
        // Create mode
        const newRecord: PaperType = {
          id: `pt-${Date.now()}`,
          paperTypeName: formData.paperTypeName,
          category: formData.category || "Art Paper",
          pricePerUnit: numericPrice,
          gsm: numericGsm,
          unit: formData.unit || "Sheet",
          description: formData.description || "",
          status: "Active",
          createdAt: new Date().toISOString(),
        };

        setPaperTypes((prev) => [newRecord, ...prev]);
      }

      setIsLoading(false);
      closeModal();
    },
    [editingPaperType, closeModal]
  );

  // Confirm Delete Paper Type
  const confirmDelete = useCallback(() => {
    if (!deletingPaperType) return;
    setPaperTypes((prev) => prev.filter((pt) => pt.id !== deletingPaperType.id));
    closeDeleteModal();
  }, [deletingPaperType, closeDeleteModal]);

  // Toggle Active/Inactive status
  const toggleStatus = useCallback((id: string) => {
    setPaperTypes((prev) =>
      prev.map((pt) =>
        pt.id === id
          ? {
              ...pt,
              status: pt.status === "Active" ? "Inactive" : "Active",
              updatedAt: new Date().toISOString(),
            }
          : pt
      )
    );
  }, []);

  // Reset to initial default data
  const resetToDefaultData = useCallback(() => {
    setPaperTypes(initialPaperTypesData as PaperType[]);
    setSearchQuery("");
    setSelectedCategory("All");
  }, []);

  return {
    paperTypes: filteredPaperTypes,
    allPaperTypes: paperTypes,
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
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
    savePaperType,
    deletePaperType: openDeleteModalById,
    toggleStatus,
    resetToDefaultData,
  };
}
