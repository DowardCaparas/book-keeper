"use client";

import { updateBook, BookEditFormState } from "@/app/lib/actions";
import { BookForm } from "@/app/lib/definition";
import { useActionState, useTransition } from "react";
import SubmitButton from "../submit-button";

const EditForm = ({ book }: { book: BookForm }) => {
  const initialState: BookEditFormState = { message: null, errors: {} };
  const updateBookWithId = updateBook.bind(null, book.id);
  const [state, formAction] = useActionState(updateBookWithId, initialState);
  const [isPending, startTransition] = useTransition();

  const className = "border rounded-lg p-3 mt-1";

  return (
    <form
      action={(formData) => startTransition(() => formAction(formData))}
      className="flex flex-col gap-6"
    >
      {/* Display validation message */}
      {state.message && (
        <p className="text-sm text-red-500 text-center">{state.message}</p>
      )}

      <div className="inline-grid">
        <label htmlFor="book_name">Book name</label>
        <input
          type="text"
          name="book_name"
          id="book_name"
          defaultValue={book.name}
          className={`${className}`}
          aria-describedby="book-name-error"
        />
      </div>
      <div
        className="-mt-5"
        id="book-name-error"
        aria-live="polite"
        aria-atomic="true"
      >
        {state.errors?.bookName &&
          state.errors.bookName.map((error) => (
            <p className="text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>

      <div className="inline-grid">
        <label htmlFor="book_category">Category</label>
        <input
          type="text"
          name="book_category"
          id="book_category"
          defaultValue={book.category}
          className={`${className}`}
          aria-describedby="book-category-error"
        />
      </div>
      <div
        className="-mt-5"
        id="book-category-error"
        aria-live="polite"
        aria-atomic="true"
      >
        {state.errors?.bookCategory &&
          state.errors.bookCategory.map((error) => (
            <p className="text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>

      <div className="inline-grid">
        <label htmlFor="book_quantity">Quantity</label>
        <input
          type="text"
          name="book_quantity"
          id="book_quantity"
          defaultValue={book.quantity}
          className={`${className}`}
          aria-describedby="book-quantity-error"
        />
      </div>
      <div
        className="-mt-5"
        id="book-quantity-error"
        aria-live="polite"
        aria-atomic="true"
      >
        {state.errors?.quantity &&
          state.errors.quantity.map((error) => (
            <p className="text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>

      {/* Submit button with loading state */}
      <SubmitButton isPending={isPending} innerText="Save Changes" innerText2="Saving"/>
    </form>
  );
};

export default EditForm;
