import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  JsonFormRenderer,
  Button,
} from "@/shared/ui";
import formFieldsSchema from "../data/userFormFields.json";
import type {
  User,
  UserFormData,
} from "../types/users.types";

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: UserFormData) => void;
  initialData?: User | null;
  isLoading?: boolean;
}

export const UserFormModal: React.FC<UserFormModalProps> = ({
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
    password: "",
    systemRole: "Staff",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset or populate form when modal opens or initialData changes
  useEffect(() => {
    if (initialData) {
      setFormValues({
        fullName: initialData.fullName || "",
        email: initialData.email || "",
        contactNumber: initialData.contactNumber || "",
        password: "",
        systemRole: initialData.systemRole || "Staff",
      });
    } else {
      setFormValues({
        fullName: "",
        email: "",
        contactNumber: "",
        password: "",
        systemRole: "Staff",
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
      newErrors.fullName = "Full Name is required";
    }

    if (!formValues.email || !String(formValues.email).trim()) {
      newErrors.email = "Email Address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(formValues.email).trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formValues.contactNumber || !String(formValues.contactNumber).trim()) {
      newErrors.contactNumber = "Contact Number is required";
    }

    if (!formValues.systemRole) {
      newErrors.systemRole = "System Role is required";
    }

    // Password required when creating new user
    if (!initialData) {
      if (!formValues.password || !String(formValues.password).trim()) {
        newErrors.password = "Password is required for new user";
      } else if (String(formValues.password).length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
    } else if (formValues.password && String(formValues.password).length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      fullName: String(formValues.fullName).trim(),
      email: String(formValues.email).trim(),
      contactNumber: String(formValues.contactNumber).trim(),
      password: formValues.password ? String(formValues.password) : undefined,
      systemRole: String(formValues.systemRole),
    });
  };

  const isEditMode = Boolean(initialData);

  return (
    <Modal open={isOpen} onClose={onClose} size="2xl">
      <form onSubmit={handleSubmit}>
        <ModalHeader
          title={isEditMode ? "Edit User" : "Add New User"}
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
            {isEditMode ? "Update User" : "Create User"}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};
