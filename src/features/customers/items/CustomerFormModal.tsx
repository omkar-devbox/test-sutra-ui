import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  JsonFormRenderer,
  Button,
} from "@/shared/ui";
import formFieldsSchema from "../data/customerFormFields.json";
import type {
  Customer,
  CustomerFormData,
} from "../types/customers.types";

interface CustomerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CustomerFormData) => void;
  initialData?: Customer | null;
  isLoading?: boolean;
}

export const CustomerFormModal: React.FC<CustomerFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  isLoading = false,
}) => {
  const [formValues, setFormValues] = useState<Record<string, any>>({
    fullName: "",
    email: "",
    contactNumber: "",
    companyName: "",
    houseNoBuilding: "",
    landmarkArea: "",
    city: "",
    state: "",
    pincode: "",
    status: "Active",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset or populate form when modal opens or initialData changes
  useEffect(() => {
    if (initialData) {
      const parts = (initialData.address || "").split(",").map((s) => s.trim());
      setFormValues({
        fullName: initialData.fullName || "",
        email: initialData.email || "",
        contactNumber: initialData.contactNumber || "",
        companyName: initialData.companyName || "",
        houseNoBuilding: initialData.houseNoBuilding || parts[0] || "",
        landmarkArea: initialData.landmarkArea || (parts.length > 3 ? parts[1] : ""),
        city: initialData.city || (parts.length > 2 ? parts[parts.length - 2] : parts[1] || ""),
        state: initialData.state || (parts.length > 1 ? parts[parts.length - 1] : ""),
        pincode: initialData.pincode || "",
        status: initialData.status || "Active",
      });
    } else {
      setFormValues({
        fullName: "",
        email: "",
        contactNumber: "",
        companyName: "",
        houseNoBuilding: "",
        landmarkArea: "",
        city: "",
        state: "",
        pincode: "",
        status: "Active",
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  const handleFieldChange = (name: string, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formValues.fullName || !String(formValues.fullName).trim()) {
      newErrors.fullName = "Full Name / Contact Person is required";
    }

    if (!formValues.email || !String(formValues.email).trim()) {
      newErrors.email = "Email Address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(formValues.email).trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formValues.contactNumber || !String(formValues.contactNumber).trim()) {
      newErrors.contactNumber = "Contact Number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const houseNoBuilding = formValues.houseNoBuilding ? String(formValues.houseNoBuilding).trim() : "";
    const landmarkArea = formValues.landmarkArea ? String(formValues.landmarkArea).trim() : "";
    const city = formValues.city ? String(formValues.city).trim() : "";
    const state = formValues.state ? String(formValues.state).trim() : "";
    const pincode = formValues.pincode ? String(formValues.pincode).trim() : "";

    const addressParts = [
      houseNoBuilding,
      landmarkArea,
      city,
      state ? (pincode ? `${state} - ${pincode}` : state) : pincode,
    ].filter(Boolean);
    const combinedAddress = addressParts.join(", ");

    onSave({
      fullName: String(formValues.fullName).trim(),
      email: String(formValues.email).trim(),
      contactNumber: String(formValues.contactNumber).trim(),
      companyName: formValues.companyName ? String(formValues.companyName).trim() : "",
      address: combinedAddress,
      houseNoBuilding,
      landmarkArea,
      city,
      state,
      pincode,
      status: formValues.status || "Active",
    });
  };

  const isEditMode = Boolean(initialData);

  return (
    <Modal open={isOpen} onClose={onClose} size="2xl">
      <form onSubmit={handleSubmit}>
        <ModalHeader
          title={isEditMode ? "Edit Customer" : "Add New Customer"}
          onClose={onClose}
        />

        <ModalBody className="py-4">
          <JsonFormRenderer
            schema={formFieldsSchema as any}
            values={formValues}
            errors={errors}
            onChange={handleFieldChange}
            gridCols={2}
            gap="md"
          />
        </ModalBody>

        <ModalFooter className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            type="button"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            isLoading={isLoading}
            className="bg-[#0077be] hover:bg-[#005c94] text-white px-6 font-semibold"
          >
            {isEditMode ? "Update Customer" : "Create Customer"}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};
