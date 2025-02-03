import { Customers, Transactions } from '@/app/lib/definition'
import { formatDateToLocal } from '@/app/lib/utils'
import { updateTransaction } from '@/app/lib/actions'
import { fetchBookQuantity } from '@/app/lib/data';

const EditForm = async({transaction}: {transaction: (Transactions & Customers)}) => {
  const book = await fetchBookQuantity(transaction.book_id);
  const updateTransactionById = updateTransaction.bind(null, transaction.id);

  return (
    <form action={updateTransactionById} className="flex flex-col gap-6">
        <div className="inline-grid">
        <label htmlFor="book_id">Book Id</label>
        <input
          type="text"
          name="book_id"
          id="book_id"
          defaultValue={transaction.book_id}
          className="border rounded-lg p-3 bg-gray-100"
          readOnly
        />
      </div>
      <div className="inline-grid">
        <label htmlFor="book_quantity">Book quantity</label>
        <input
          type="number"
          name="book_quantity"
          id="book_quantity"
          defaultValue={book.quantity}
          className="border rounded-lg p-3 bg-gray-100"
          readOnly
        />
      </div>
         <div className="inline-grid">
        <label htmlFor="customer_name">Customer name</label>
        <input
          type="text"
          name="customer_name"
          id="customer_name"
          defaultValue={transaction.name}
          className="border rounded-lg p-3"
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
          className="border rounded-lg p-3"
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
          className="border rounded-lg p-3"
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
          className="border rounded-lg p-3"
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
          className="border rounded-lg p-3"
          readOnly
        />
      </div>
      <div className="inline-grid">
        <label htmlFor="date_returned">Date returned</label>
        <input
          type="date"
          name="date_returned"
          id="date_returned"
          className="border rounded-lg p-3"
        />
      </div>
      
      <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg">
        Return book
      </button>
    </form>
  )
}

export default EditForm