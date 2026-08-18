import React from "react";
import { AlertTriangle } from "lucide-react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@/shared/ui";
import type { Customer } from "../types/customers.types";

interface CustomerDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  customer: Customer | null;
  isLoading?: boolean;
}

export const CustomerDeleteModal: React.FC<CustomerDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  customer,
  isLoading = false,
}) => {
  if (!customer) return null;

  return (
    <Modal open={isOpen} onClose={onClose} size="md">
      <ModalHeader
        title="Delete Customer"
        onClose={onClose}
      />
      <ModalBody className="py-6 flex items-start gap-4">
        <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400 shrink-0">
          <AlertTriangle size={24} />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            Are you sure you want to delete{" "}
            <span className="text-rose-600 dark:text-rose-400 font-bold">
              {customer.fullName}
            </span>
            ?
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            This action cannot be undone. Customer record ({customer.email}) and related history will be removed.
          </p>
        </div>
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
          onClick={onConfirm}
          isLoading={isLoading}
          className="bg-rose-600 hover:bg-rose-700 text-white px-6 font-semibold border-none"
        >
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
};
