"use client";

import { addCustomer, CustomerFormState } from "@/app/lib/actions";
import { useActionState } from "react";

const CreateForm = () => {
  const initialState: CustomerFormState = { message: null, errors: {} };
  const [state, formAction] = useActionState(addCustomer, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-6">

      {/* Display validation message */}
      {state.message && (
        <p className="text-sm text-red-500 text-center">{state.message}</p>
      )}
      
      <div className="inline-grid">
        <label htmlFor="customer_name">Name</label>
        <input
          type="text"
          name="customer_name"
          id="customer_name"
          className="border rounded-lg p-3"
          aria-describedby="customer-name-error"
        />
      </div>
      <div className="-mt-5" id="customer-name-error" aria-live="polite" aria-atomic="true">
        {state.errors?.name && 
          state.errors.name.map((error) => (
            <p className="text-sm text-red-500" key={error}>
              {error}
            </p>
          ))
        }
      </div>

      <div className="inline-grid">
        <label htmlFor="customer_email">Email</label>
        <input
          type="text"
          name="customer_email"
          id="customer_email"
          className="border rounded-lg p-3"
          aria-describedby="customer-email-error"
        />
      </div>
        <div className="-mt-5" id="customer-email-error" aria-live="polite" aria-atomic="true">
          {state.errors?.email &&
            state.errors.email.map((error) => (
              <p className="text-sm text-red-500" key={error}>
                {error}
              </p>
            ))
          }
        </div>

      <div className="inline-grid">
        <label htmlFor="customer_address">Address</label>
        <input
          type="text"
          name="customer_address"
          id="customer_address"
          className="border rounded-lg p-3"
          aria-describedby="customer-address-error"
        />
      </div>
      <div className="-mt-5" id="customer-address-error" aria-live="polite" aria-atomic="true">
          {state.errors?.address && 
            state.errors.address.map((error) => (
              <p className="text-sm text-red-500" key={error}>
                {error}
              </p>
            ))
          }  
      </div>


      <div className="inline-grid">
        <label htmlFor="customer_contact">Contact number</label>
        <input
          type="text"
          name="customer_contact"
          id="customer_contact"
          className="border rounded-lg p-3"
          aria-describedby="customer-contact-error"
        />
      </div>
      <div className="-mt-5" id="customer-contact-error" aria-live="polite" aria-atomic="true">
          {state.errors?.contact && 
            state.errors.contact.map((error) => (
              <p className="text-sm text-red-500" key={error}>
                {error}
              </p>
            ))
          }
      </div>


      <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg">
        Add Customer
      </button>
    </form>
  );
};

export default CreateForm;
