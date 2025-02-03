
import { fetchCustomers } from "@/app/lib/data";
import { BookForm } from "@/app/lib/definition"
import SelectCustomerName from "./select-customer";
import { createTransaction } from "@/app/lib/actions";


const BorrowForm = async ({book}: {book: BookForm}) => {
  const createTransactionWithId = createTransaction.bind(null, book.id);
  const customers = await fetchCustomers();

  return (
    <form action={createTransactionWithId} className="flex flex-col gap-6">
      <div className="inline-grid">
      <label htmlFor="book_id">Book Id:</label>
      <input
        type="text"
        name="book_id"
        id="book_id"
        defaultValue={book.id}
        className="border rounded-lg p-3 bg-gray-100"
        readOnly
      />
    </div>
    <div className="inline-grid">
      <label htmlFor="book_quantity">Quantity</label>
      <input
        type="text"
        name="book_quantity"
        id="book_quantity"
        defaultValue={book.quantity}
        className="border rounded-lg p-3 bg-gray-100"
        readOnly
      />
    </div>
 <div className="inline-grid">
      <label htmlFor="book_name">Book name</label>
      <input
        type="text"
        name="book_name"
        id="book_name"
        defaultValue={book.name}
        className="border rounded-lg p-3"
        readOnly
      />
    </div>
    <div className="inline-grid">
      <label htmlFor="book_category">Category</label>
      <input
        type="text"
        name="book_category"
        id="book_category"
        defaultValue={book.category}
        className="border rounded-lg p-3"
        readOnly
      />
    </div>

      <SelectCustomerName customers={customers}/>

      <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg">
        Create transaction
      </button>
    </form>
  );
}

export default BorrowForm