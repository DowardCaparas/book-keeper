"use client";

import { Customers, Transactions } from "@/app/lib/definition";
import { formatDateToLocal } from "@/app/lib/utils";
import { updateTransaction } from "@/app/lib/actions";
import { useTransition } from "react";
import SubmitButton from "../submit-button";

const EditForm = ({
  transaction,
}: {
  transaction: Transactions & Customers & {quantity: number};
}) => {
  const updateTransactionById = updateTransaction.bind(null, transaction.id);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(() => {
      updateTransactionById(formData);
    })
  }

  const className = "border rounded-lg p-3 mt-1";

  return (
    <form action={handleSubmit} className="flex flex-col gap-6">
      <>
        <label htmlFor="book_id" className="hidden">
          Book Id
        </label>
        <input
          type="text"
          name="book_id"
          id="book_id"
          defaultValue={transaction.book_id}
          className={`${className} bg-gray-100 hidden`}
          readOnly
        />
      </>

      <>
        <label htmlFor="book_quantity" className="hidden">
          Book quantity
        </label>
        <input
          type="text"
          name="book_quantity"
          id="book_quantity"
          defaultValue={transaction.quantity}
          className={`${className} bg-gray-100 hidden`}
          readOnly
        />
      </>

      <div className="inline-grid">
        <label htmlFor="customer_name">Customer name</label>
        <input
          type="text"
          name="customer_name"
          id="customer_name"
          defaultValue={transaction.name}
          className={`${className}`}
          readOnly
        />
      </div>
      <div className="inline-grid">
        <label htmlFor="customer_email">Email</label>
        <input
          type="text"
          name="customer_email"
          id="customer_email"
          defaultValue={transaction.email}
          className={`${className}`}
          readOnly
        />
      </div>
      <div className="inline-grid">
        <label htmlFor="book_name">Book name</label>
        <input
          type="text"
          name="book_name"
          id="book_name"
          defaultValue={transaction.book_name}
          className={`${className}`}
          readOnly
        />
      </div>
      <div className="inline-grid">
        <label htmlFor="book_category">Book category</label>
        <input
          type="text"
          name="book_category"
          id="book_category"
          defaultValue={transaction.book_category}
          className={`${className}`}
          readOnly
        />
      </div>
      <div className="inline-grid">
        <label htmlFor="date_borrowed">Date borrowed</label>
        <input
          type="text"
          name="date_borrowed"
          id="date_borrowed"
          defaultValue={formatDateToLocal(transaction.date_borrowed)}
          className={`${className}`}
          readOnly
        />
      </div>
      <div className="inline-grid">
        <label htmlFor="date_returned">Date returned</label>
        <input
          type="date"
          name="date_returned"
          id="date_returned"
          className={`${className}`}
          required
        />
      </div>

      {/* Submit button with loading state */}
      <SubmitButton isPending={isPending} innerText="Return Book" innerText2="Returning"/>
    </form>
  );
};

export default EditForm;
