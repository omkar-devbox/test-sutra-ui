import React, { useState, useEffect, useMemo } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  JsonFormRenderer,
  Button,
} from "@/shared/ui";
import formFieldsSchema from "../data/paperTypeFormFields.json";
import type {
  PaperType,
  PaperTypeFormData,
} from "../types/paperTypes.types";

interface PaperTypeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: PaperTypeFormData) => void;
  initialData?: PaperType | null;
  isLoading?: boolean;
}

export const PaperTypeFormModal: React.FC<PaperTypeFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  isLoading = false,
}) => {
  const [formValues, setFormValues] = useState<Record<string, any>>({
    paperTypeName: "",
    category: "Art Paper",
    pricePerUnit: "",
    gsm: "",
    unit: "Sheet",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset or populate form when modal opens or initialData changes
  useEffect(() => {
    if (initialData) {
      setFormValues({
        paperTypeName: initialData.paperTypeName || "",
        category: initialData.category || "Art Paper",
        pricePerUnit: initialData.pricePerUnit ?? "",
        gsm: initialData.gsm ?? "",
        unit: initialData.unit || "Sheet",
      });
    } else {
      setFormValues({
        paperTypeName: "",
        category: "Art Paper",
        pricePerUnit: "",
        gsm: "",
        unit: "Sheet",
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

    if (!formValues.paperTypeName || !String(formValues.paperTypeName).trim()) {
      newErrors.paperTypeName = "Paper Type Name is required";
    }

    if (!formValues.category) {
      newErrors.category = "Category is required";
    }

    if (
      formValues.pricePerUnit === "" ||
      formValues.pricePerUnit === undefined ||
      formValues.pricePerUnit === null
    ) {
      newErrors.pricePerUnit = "Price per Unit is required";
    } else if (isNaN(Number(formValues.pricePerUnit)) || Number(formValues.pricePerUnit) < 0) {
      newErrors.pricePerUnit = "Please enter a valid positive price number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      paperTypeName: String(formValues.paperTypeName).trim(),
      category: String(formValues.category),
      pricePerUnit: formValues.pricePerUnit,
      gsm: formValues.gsm,
      unit: formValues.unit,
    });
  };

  const isEditMode = Boolean(initialData);

  return (
    <Modal open={isOpen} onClose={onClose} size="2xl">
      <form onSubmit={handleSubmit}>
        <ModalHeader
          title={isEditMode ? "Edit Paper Type" : "Add New Paper Type"}
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
            {isEditMode ? "Update Paper Type" : "Create Paper Type"}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};
