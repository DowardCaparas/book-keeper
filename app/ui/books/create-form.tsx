"use client";

import { addBook, BookAddFormState } from "@/app/lib/actions";
import { useActionState } from "react";

const CreateForm = () => {
  const initialState: BookAddFormState = { message: null, errors: {} };
  const [state, formAction] = useActionState(addBook, initialState);

  const className = "border rounded-lg p-3 mt-1";

  return (
    <form action={formAction} className="flex flex-col gap-6">
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
          className={`${className}`}
          aria-describedby="book-name-error"
        />
      </div>
      <div className="-mt-5" id="book-name-error" aria-live="polite" aria-atomic="true">
        {state.errors?.bookName &&
          state.errors.bookName.map((error: string) => (
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
          className={`${className}`}
          aria-describedby="book-category-error"
        />
      </div>
      <div className="-mt-5" id="book-category-error" aria-live="polite" aria-atomic="true">
        {state.errors?.bookCategory &&
          state.errors.bookCategory.map((error: string) => (
            <p className="text-sm text-red-500" key={error}>{error}</p>
          ))}
      </div>

      <div className="inline-grid">
        <label htmlFor="book_quantity">Quantity</label>
        <input
          type="text"
          name="book_quantity"
          id="book_quantity"
          className={`${className}`}
          defaultValue="1"
          aria-describedby="book-quantity-error"
        />
      </div>
      <div className="-mt-5" id="book-quantity-error" aria-live="polite" aria-atomic="true">
          {state.errors?.quantity && 
            state.errors.quantity.map((error: string) => (
              <p className="text-sm text-red-500" key={error}>
                {error}
              </p>
            ))
          }
      </div>

      <div className="inline-grid">
        <label htmlFor="book_status">Status</label>
        <input
          type="text"
          name="book_status"
          id="book_status"
          className={`${className} bg-gray-200`}
          defaultValue="Available"
          readOnly
        />
      </div>
          
      <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg">
        Add Book
      </button>
    </form>
  );
};

export default CreateForm;
