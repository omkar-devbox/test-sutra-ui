import { useState, useEffect, useMemo } from "react";
import type { Customer } from "@/features/customers/types/customers.types";
import type { OrderItem, ShippingInfo, ShippingTag, Order } from "../types/orders.types";
import initialPaperTypes from "@/features/paperTypes/data/initialPaperTypes.json";
import initialCustomers from "@/features/customers/data/initialCustomers.json";

export interface PaperMediaOption {
  id: string;
  paperTypeName: string;
  pricePerUnit: number;
  unit: string;
}

export function useOrderForm(
  initialCustomerId?: string | null,
  onOrderSubmitted?: (newOrder: Order) => void,
  existingOrder?: Order | null
) {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(
    existingOrder ? existingOrder.customerId || null : initialCustomerId || null
  );
  const [customers] = useState<Customer[]>(initialCustomers as Customer[]);
  const [paperTypes] = useState<PaperMediaOption[]>(initialPaperTypes as PaperMediaOption[]);

  // Initial job items from existing order or default
  const [items, setItems] = useState<OrderItem[]>(() => {
    if (existingOrder && existingOrder.items.length > 0) {
      return existingOrder.items;
    }
    return [
      {
        id: "item-1",
        jobName: "",
        mediaId: paperTypes[1]?.id || paperTypes[0]?.id || "",
        mediaName: paperTypes[1]?.paperTypeName || paperTypes[0]?.paperTypeName || "Star Flex Frontlit 240 GSM",
        pricePerUnit: paperTypes[1]?.pricePerUnit || 12.0,
        unit: paperTypes[1]?.unit || "Sq. Ft.",
        heightFt: 0,
        widthFt: 0,
        areaSqFt: 0,
        estimatedCost: 0,
        artworkAttached: false,
        isExpanded: true,
      },
    ];
  });

  // Shipping information
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>(() => {
    if (existingOrder && existingOrder.shippingInfo) {
      return existingOrder.shippingInfo;
    }
    return {
      tag: "Work",
      houseNoBuilding: "",
      landmarkArea: "",
      city: "",
      state: "",
      pincode: "",
      status: "INCOMPLETE",
    };
  });

  // Production notes
  const [productionNotes, setProductionNotes] = useState(
    existingOrder?.productionNotes || ""
  );
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);


  // Auto-select customer if passed in URL or selected
  const selectedCustomer = useMemo(() => {
    return customers.find((c) => c.id === selectedCustomerId) || null;
  }, [customers, selectedCustomerId]);

  // Auto fill shipping if customer changes and auto fill triggered
  const handleAutoFillShipping = () => {
    if (selectedCustomer && selectedCustomer.address) {
      const addrParts = selectedCustomer.address.split(",");
      setShippingInfo((prev) => ({
        ...prev,
        houseNoBuilding: addrParts[0]?.trim() || selectedCustomer.companyName || selectedCustomer.fullName,
        landmarkArea: addrParts[1]?.trim() || "",
        city: addrParts[2]?.trim() || "Pune",
        state: "Maharashtra",
        pincode: "411001",
        status: "COMPLETE",
      }));
    }
  };

  const MAX_ITEMS = 5;

  // Add new item card (max 5 items)
  const addNewItem = () => {
    if (items.length >= MAX_ITEMS) return;

    const defaultPaper = paperTypes[1] || paperTypes[0];
    const newItem: OrderItem = {
      id: `item-${Date.now()}`,
      jobName: "",
      mediaId: defaultPaper?.id || "",
      mediaName: defaultPaper?.paperTypeName || "Star Flex Frontlit 240 GSM",
      pricePerUnit: defaultPaper?.pricePerUnit || 12.0,
      unit: defaultPaper?.unit || "Sq. Ft.",
      heightFt: 0,
      widthFt: 0,
      areaSqFt: 0,
      estimatedCost: 0,
      artworkAttached: false,
      isExpanded: true,
    };
    setItems((prev) => [...prev, newItem]);
  };


  // Remove item card
  const removeItem = (id: string) => {
    if (items.length <= 1) return;
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Update item field and calculate area & cost
  const updateItemField = (id: string, field: keyof OrderItem, value: any) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id !== id) return item;

        const updated = { ...item, [field]: value };

        // If media changed, update mediaName and pricePerUnit
        if (field === "mediaId") {
          const matchedMedia = paperTypes.find((p) => p.id === value);
          if (matchedMedia) {
            updated.mediaName = matchedMedia.paperTypeName;
            updated.pricePerUnit = matchedMedia.pricePerUnit;
            updated.unit = matchedMedia.unit;
          }
        }

        // Calculate area & cost
        const h = Number(updated.heightFt) || 0;
        const w = Number(updated.widthFt) || 0;
        const area = Math.round(h * w * 100) / 100;
        const cost = Math.round(area * (updated.pricePerUnit || 1) * 100) / 100;

        updated.areaSqFt = area;
        updated.estimatedCost = cost;

        return updated;
      })
    );
  };

  // Attach artwork file
  const attachArtwork = (id: string, fileName?: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        return {
          ...item,
          artworkAttached: true,
          artworkFileName: fileName || `artwork_${item.id.slice(-4)}.pdf`,
        };
      })
    );
  };

  // Totals calculations
  const totalBatchCount = items.length;
  const totalPayloadSqFt = items.reduce((sum, item) => sum + (item.areaSqFt || 0), 0);
  const totalValuation = items.reduce((sum, item) => sum + (item.estimatedCost || 0), 0);

  // Check shipping status
  useEffect(() => {
    const isComplete =
      shippingInfo.houseNoBuilding.trim() !== "" &&
      shippingInfo.city.trim() !== "" &&
      shippingInfo.state.trim() !== "";
    setShippingInfo((prev) => ({
      ...prev,
      status: isComplete ? "COMPLETE" : "INCOMPLETE",
    }));
  }, [shippingInfo.houseNoBuilding, shippingInfo.city, shippingInfo.state]);

  // Submit Order
  const submitOrder = () => {
    const newOrder: Order = {
      id: existingOrder ? existingOrder.id : `ord-${Date.now()}`,
      orderNumber: existingOrder ? existingOrder.orderNumber : `ORD-2026-${Math.floor(100 + Math.random() * 900)}`,
      customerId: selectedCustomerId,
      customerName: selectedCustomer ? `${selectedCustomer.fullName} ${selectedCustomer.companyName ? `(${selectedCustomer.companyName})` : ""}` : "Self (Walk-in Customer)",
      items,
      shippingInfo,
      productionNotes,
      totalBatchCount,
      totalPayloadSqFt,
      totalValuation,
      status: existingOrder ? existingOrder.status : "Submitted",
      createdAt: existingOrder ? existingOrder.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (onOrderSubmitted) {
      onOrderSubmitted(newOrder);
    }
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 3000);
  };


  // Save Draft
  const saveDraft = () => {
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 3000);
  };

  // Discard / Reset
  const resetForm = () => {
    setSelectedCustomerId(null);
    setItems([
      {
        id: "item-1",
        jobName: "",
        mediaId: paperTypes[1]?.id || paperTypes[0]?.id || "",
        mediaName: paperTypes[1]?.paperTypeName || "Star Flex Frontlit 240 GSM",
        pricePerUnit: paperTypes[1]?.pricePerUnit || 12.0,
        unit: paperTypes[1]?.unit || "Sq. Ft.",
        heightFt: 0,
        widthFt: 0,
        areaSqFt: 0,
        estimatedCost: 0,
        artworkAttached: false,
        isExpanded: true,
      },
    ]);
    setShippingInfo({
      tag: "Work",
      houseNoBuilding: "",
      landmarkArea: "",
      city: "",
      state: "",
      pincode: "",
      status: "INCOMPLETE",
    });
    setProductionNotes("");
  };

  return {
    selectedCustomerId,
    setSelectedCustomerId,
    selectedCustomer,
    customers,
    paperTypes,
    items,
    addNewItem,
    removeItem,
    updateItemField,
    attachArtwork,
    shippingInfo,
    setShippingInfo,
    handleAutoFillShipping,
    productionNotes,
    setProductionNotes,
    totalBatchCount,
    totalPayloadSqFt,
    totalValuation,
    submitSuccess,
    draftSaved,
    maxItemsReached: items.length >= MAX_ITEMS,
    maxItems: MAX_ITEMS,
    submitOrder,
    saveDraft,
    resetForm,
  };
}

