"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { formatDateToLocal } from "./utils";

// Definitions and Form Validation
const BookFormSchema = z.object({
  id: z.string(),
  bookName: z.string().min(1, { message: "Book name is required." }),
  date: z.string(),
  bookCategory: z.string().min(1, { message: "Book category is required." }),
  status: z.enum(["Available", "Not available"], {
    invalid_type_error: "Please select a book status.",
  }),
  quantity: z.coerce
    .number()
    .gt(0, { message: "Please enter quantity greater than 0." }),
});

const CustomerFormSchema = z.object({
  id: z.string(),
  name: z.string().min(2, { message: "Please enter customer name." }),
  email: z
    .string({ message: "Please enter a valid email address." })
    .refine((email) => email.endsWith("@gmail.com"), {
      message: "Email must end with @gmail.com.",
    }),
  address: z.string().min(7, { message: "Please enter customer address." }),
  contact: z.string().min(11, { message: "Please enter contact number." }),
});

const TransactionFormSchema = z.object({
  id: z.string(),
  customer_id: z.string(),
  book_id: z.string(),
  book_quantity: z.coerce.number(),
  book_name: z.string(),
  book_category: z.string(),
  date_borrowed: z.string(),
  date_returned: z.string(),
});

export type BookAddFormState = {
  errors?: {
    bookName?: string[];
    bookCategory?: string[];
    status?: string[];
    quantity?: string[];
  };
  message?: string | null;
};

export type BookEditFormState = {
  errors?: {
    bookName?: string[];
    bookCategory?: string[];
    quantity?: string[];
  };
  message?: string | null;
};

export type CustomerFormState = {
  errors?: {
    name?: string[],
    email?: string[],
    address?: string[],
    contact?: string[],
  };
  message?: string | null;
}

// End of definitions and Form Validation
// ============================================================================

// Add book function
const AddBook = BookFormSchema.omit({ id: true, date: true });

export const addBook = async (
  prevState: BookAddFormState,
  formData: FormData
) => {
  // Validate form fields using zod
  const validatedFields = AddBook.safeParse({
    bookName: formData.get("book_name")?.toString().trim(),
    bookCategory: formData.get("book_category")?.toString().trim(),
    quantity: Number(
      formData.get("book_quantity")?.toString().replace("/s+/g", "")
    ),
    status: formData.get("book_status"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Add book.",
    };
  }

  // Prepare data for insertion into the database
  const { bookName, bookCategory, quantity, status } = validatedFields.data;
  // create new date
  const date = new Date().toISOString().split("T")[0];

  try {
    // inserting data in the database
    await sql`
  INSERT INTO books (name, date_added, category, status, quantity)
  VALUES (${bookName}, ${date}, ${bookCategory}, ${status}, ${quantity})
  ON CONFLICT (id) DO NOTHING
`;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.log("Database Error:", error);
    return {
      message: "Database Error: Failed to Add Book.",
    };
  }

  revalidatePath("/dashboard/books");
  redirect("/dashboard/books");
};

// Add customer function
const AddCustomer = CustomerFormSchema.omit({ id: true });

export const addCustomer = async (prevState: CustomerFormState, formData: FormData) => {
  
  const validatedFields = AddCustomer.safeParse({
    name: formData.get("customer_name")?.toString().trim(),
    email: formData.get("customer_email")?.toString().trim(),
    address: formData.get("customer_address")?.toString().trim(),
    contact: formData.get("customer_contact")?.toString().trim()
  });

  if(!validatedFields.success){
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields, Failed to Add Customer."
    }
  }

  const {name, email, address, contact} = validatedFields.data;

  try {
    await sql`
            INSERT INTO customers (name, email, address, contact)
            VALUES (${name}, ${email}, ${address}, ${contact})
            ON CONFLICT (id) DO NOTHING
        `;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Database error: Failed to add customer");
  }

  revalidatePath("/dashboard/customers");
  redirect("/dashboard/customers");
};

// Add transaction function
const CreateTransaction = TransactionFormSchema.omit({
  id: true,
  date_borrowed: true,
  date_returned: true,
});

export const createTransaction = async (id: string, formData: FormData) => {
  const { customer_id, book_id, book_quantity, book_name, book_category } =
    CreateTransaction.parse({
      customer_id: formData.get("customer_id"),
      book_quantity: formData.get("book_quantity"),
      book_name: formData.get("book_name"),
      book_id: formData.get("book_id"),
      book_category: formData.get("book_category"),
    });

  // create new data
  const date = new Date().toISOString().split("T")[0];

  // Subtract book quantity
  const quantity = book_quantity - 1;
  // set new book status
  let status = "Available";

  if (quantity >= 1) {
    status = "Available";
  } else {
    status = "Not available";
  }

  try {
    await sql`
            INSERT INTO transactions (customer_id, book_id, book_name, book_category, date_borrowed)
            VALUES (${customer_id}, ${book_id}, ${book_name}, ${book_category}, ${date})
            ON CONFLICT (id) DO NOTHING
        `;

    await sql`
            UPDATE books 
            SET status = ${status}, quantity = ${quantity}
            WHERE id = ${id}
        `;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Database error: Failed to add transaction");
  }

  revalidatePath("/dashboard/transactions");
  redirect("/dashboard/transactions");
};

// Update/Edit book function
const UpdateBook = BookFormSchema.omit({ id: true, date: true, status: true });

export const updateBook = async (
  id: string,
  prevState: BookEditFormState,
  formData: FormData
) => {
  const validatedFields = UpdateBook.safeParse({
    bookName: formData.get("book_name")?.toString().trim(),
    bookCategory: formData.get("book_category")?.toString().trim(),
    quantity: Number(
      formData.get("book_quantity")?.toString().replace("/s+/g", "")
    ),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields, Failed to Update book.",
    };
  }

  const { bookName, bookCategory, quantity } = validatedFields.data;

  // set status
  let status = "Available";
  if (quantity >= 1) {
    status = "Available";
  } else {
    status = "Not Available";
  }

  try {
    await sql`
            UPDATE books
            SET name = ${bookName}, category = ${bookCategory}, status = ${status}, quantity = ${quantity}
            WHERE id = ${id}
        `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.log("Database Error:", error);
    return {
      message: "Database Error: Failed to Update Book.",
    };
  }

  revalidatePath("/dashboard/books");
  redirect("/dashboard/books");
};

// Update/Edit customers
const UpdateCustomer = CustomerFormSchema.omit({ id: true });

export const udpateCustomer = async (id: string, prevState: CustomerFormState, formData: FormData) => {
  
  const validatedFields = UpdateCustomer.safeParse({
    name: formData.get("customer_name")?.toString().trim(),
    email: formData.get("customer_email")?.toString().trim(),
    address: formData.get("customer_address")?.toString().trim(),
    contact: formData.get("customer_contact")?.toString().trim()
  });

  if(!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields, Failed to Update Customer."
    }
  }

  const {name, email, address, contact} = validatedFields.data;

  try {
    await sql`
            UPDATE customers
            SET name = ${name}, email = ${email}, address = ${address}, contact = ${contact}
            WHERE id = ${id}
        `;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Database error: Failed to update customers");
  }

  revalidatePath("/dashboard/customers");
  redirect("/dashboard/customers");
};

// Update transaction
const UpdateTransaction = TransactionFormSchema.omit({
  id: true,
  customer_id: true,
  book_name: true,
  book_category: true,
  date_borrowed: true,
});

export const updateTransaction = async (id: string, formData: FormData) => {
  const { book_id, date_returned, book_quantity } = UpdateTransaction.parse({
    book_id: formData.get("book_id"),
    date_returned: formData.get("date_returned"),
    book_quantity: formData.get("book_quantity"),
  });

  const date = formatDateToLocal(date_returned);
  // set book quantity
  const quantity = book_quantity + 1;

  let status = "Available";

  if (quantity >= 1) {
    status = "Available";
  } else {
    status = "Not available";
  }

  try {
    await sql`
        UPDATE transactions
        SET date_returned = ${date}
        WHERE transactions.id = ${id}
        `;

    await sql`
        UPDATE books
        SET status = ${status}, quantity = ${quantity}
        WHERE books.id = ${book_id}
        `;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Database error: Failed to update transaction");
  }

  revalidatePath("/dashboard/transactions");
  redirect("/dashboard/transactions");
};

// Delete book function
export const deleteBook = async (id: string) => {
  try {
    await sql`DELETE FROM books WHERE id = ${id}`;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Database error: Failed to delete book");
  }

  //revalidate the path to display new fetched data from the database
  revalidatePath("/dashboard/books");
};

// Delete customers function
export const deleteCustomer = async (id: string) => {
  try {
    await sql`DELETE FROM customers WHERE id = ${id}`;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Database error: Failed to delete customer");
  }

  //revalidate the path to display new fetched data from the database
  revalidatePath("/dashboard/customers");
};

// Delete transactions function
export const deleteTransaction = async (id: string) => {
  try {
    await sql`DELETE FROM transactions WHERE id = ${id}`;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Database error: Failed to delete transaction");
  }

  //revalidate the path to display new fetched data from the database
  revalidatePath("/dashboard/transactions");
};
