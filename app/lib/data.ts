import { sql } from "@vercel/postgres";
import { Books, Customers, Transactions } from "./definition";

const ITEMS_PER_PAGE = 6;

// Books
export const fetchFilteredBooks = async (
  query: string,
  currentPage: number
) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const data = await sql<Books>`
            SELECT * 
            FROM books
            WHERE 
                name ILIKE ${`%${query}%`} OR
                date_added::text ILIKE ${`%${query}%`} OR
                category ILIKE ${`%${query}%`} OR
                status ILIKE ${`%${query}%`}
            ORDER BY name
            LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch all books.");
  }
};

export const fetchFilteredCustomers = async (
  query: string,
  currentPage: number
) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const data = await sql<Customers>`
        SELECT * 
        FROM customers
        WHERE
          name ILIKE ${`%${query}%`} OR
          email ILIKE ${`%${query}%`} OR
          address ILIKE ${`%${query}%`} OR
          contact ILIKE ${`%${query}%`}
        ORDER BY name
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch all customers.");
  }
};

export const fetchCustomers = async () => {
  try {
    const data = await sql<Customers>`
        SELECT id, name
        FROM customers
        ORDER BY name
      `;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch customers.");
  }
};

export const fetchBooks = async () => {
  try {
    const data = await sql<Books>`
        SELECT *
        FROM books
        ORDER BY date_added DESC
        LIMIT 5
      `;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch books.");
  }
};

// Fetch books by id
export const fetchBookById = async (id: string) => {
  try {
    const data = await sql<Books>`
            SELECT books.id, books.quantity, books.name, books.category
            FROM books
            WHERE id = ${id}
        `;

    const book = data.rows.map((book) => ({
      ...book,
    }));

    return book[0];
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to fetch book");
  }
};

// Fetch customers by id
export const fetchCustomerById = async (id: string) => {
  try {
    const data = await sql<Customers>`
      SELECT *
      FROM customers
      WHERE id = ${id}
    `;

    const customers = data.rows.map((customer) => ({
      ...customer,
    }));

    return customers[0];
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to fetch customer");
  }
};

// Transactions

export const fetchTransactions = async () => {
  try {
    const data = await sql<Transactions & {name: string}>`
      SELECT transactions.*, customers.name
      FROM transactions
      JOIN customers ON transactions.customer_id = customers.id
      ORDER BY transactions.date_borrowed DESC
      LIMIT 5
    `;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch all transactions.");
  }
}

export const fetchFilteredTransactions = async (query: string, currentPage: number) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const data = await sql<Transactions & Customers>`
            SELECT transactions.*, customers.name, customers.email 
            FROM transactions
            JOIN customers ON transactions.customer_id = customers.id
            WHERE
              customers.name ILIKE ${`%${query}%`} OR
              customers.email ILIKE ${`%${query}%`} OR
              transactions.book_name ILIKE ${`%${query}%`} OR
              transactions.book_category ILIKE ${`%${query}%`} OR
              transactions.date_borrowed::text ILIKE ${`%${query}%`} OR
              transactions.date_returned::text ILIKE ${`%${query}%`}
            ORDER BY transactions.date_returned DESC
            LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch all transactions.");
  }
};

export const fetchTransactionById = async (id: string) => {
  try {
    const data = await sql<Transactions & Customers & {quantity: number}>`
            SELECT transactions.*, books.quantity, customers.name, customers.email 
            FROM transactions
            JOIN customers ON transactions.customer_id = customers.id
            JOIN books ON transactions.book_id = books.id
            WHERE transactions.id = ${id}
        `;

    const transactions = data.rows.map((transaction) => ({ ...transaction }));
    return transactions[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch all transactions.");
  }
};

export const fetchBookQuantity = async (id: string) => {
  try {
    const data = await sql<Books>`
      SELECT quantity
      FROM books
      WHERE id = ${id}
    `;

    const quantities = data.rows.map((quantity) => ({ ...quantity }));
    return quantities[0]; // Return the first quantity
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch book quantity.");
  }
};

// Total Pages

// Books
export const fetchBooksPages = async (query: string) => {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM books
    WHERE
      books.name ILIKE ${`%${query}%`} OR
      books.category ILIKE ${`%${query}%`} OR
      books.status ILIKE ${`%${query}%`} OR
      books.date_added::text ILIKE ${`%${query}%`} OR
      books.quantity::text ILIKE ${`%${query}%`}
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch book pages.");
  }
};

// Customers
export const fetchCustomersPages = async (query: string) => {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM customers
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      customers.address ILIKE ${`%${query}%`} OR
      customers.contact ILIKE ${`%${query}%`} 
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch customer pages.");
  }
};

// Transactions
export const fetchTransactionsPages = async (query: string) => {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM transactions
    WHERE
      transactions.book_name ILIKE ${`%${query}%`} OR
      transactions.book_category ILIKE ${`%${query}%`} OR
      transactions.date_borrowed::text ILIKE ${`%${query}%`} OR
      transactions.date_returned::text ILIKE ${`%${query}%`} 
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch transactions pages.");
  }
};

// Cards
// Counts

export const fetchCardData = async () => {
  try {
    const booksCountPromise = await sql`SELECT COUNT(*) FROM books`;
    const customersCountPromise = await sql`SELECT COUNT(*) FROM customers`;
    const transactionsCountPromise =
      await sql`SELECT COUNT(*) FROM transactions`;
    const availableBooksCountPromise =
      await sql`SELECT COUNT(CASE WHEN status = 'Available' THEN 1 END)
      FROM books`;

    const data = await Promise.all([
      booksCountPromise,
      customersCountPromise,
      transactionsCountPromise,
      availableBooksCountPromise,
    ]);

    const numberOfBooks = Number(data[0].rows[0].count ?? "0");
    const numberOfCustomers = Number(data[1].rows[0].count ?? "0");
    const numberOfTransactions = Number(data[2].rows[0].count ?? "0");
    const numberOfAvailableBooks = Number(data[3].rows[0].count ?? "0");

    return {
      numberOfBooks,
      numberOfCustomers,
      numberOfTransactions,
      numberOfAvailableBooks,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch counts");
  }
};
