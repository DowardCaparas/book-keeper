"use client";

import { ConfirmationModalProps } from "@/app/lib/definition";
import Image from "next/image";
import { useState, useTransition } from "react";

export const DeleteItem = ({
  id,
  itemName,
  deleteFunction,
}: {
  id: string;
  itemName: string;
  deleteFunction: (id: string) => Promise<void>;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      await deleteFunction(id);
      setIsModalOpen(false);
    });
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="rounded-md border p-2 hover:bg-gray-100 w-full"
        disabled={isPending}
      >
        <span className="sr-only">Delete</span>
        <Image
          src="/trash.svg"
          alt="trash icon"
          width={20}
          height={20}
          className="object-contain max-xl:hidden"
        />
        <span className="xl:hidden">Delete</span>
      </button>

      <ConfirmationModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        isDeleting={isPending}
        title="Delete Book"
        message={`Confirm if you want to delete "${itemName}"`}
      />
    </div>
  );
};

export const ConfirmationModal = ({
  isModalOpen,
  onClose,
  onConfirm,
  isDeleting,
  title,
  message,
}: ConfirmationModalProps) => {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[50%]">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="mt-2 text-gray-600">{message}</p>
        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 text-white bg-red-600 rounded-lg disabled:cursor-not-allowed
            disabled:bg-red-400"
          >
            {isDeleting ? "Deleting...": "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};
