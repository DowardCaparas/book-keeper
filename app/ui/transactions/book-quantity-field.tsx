import { fetchBookQuantity } from "@/app/lib/data";

const BookQuantity = async ({ id }: { id: string }) => {
  const book = await fetchBookQuantity(id);
  return (
    <>
      <label htmlFor="book_quantity" className="hidden">Book quantity</label>
      <input
        type="number"
        name="book_quantity"
        id="book_quantity"
        defaultValue={book.quantity}
        className="border rounded-lg p-3 mt-1 bg-gray-100 hidden"
        readOnly
      />
    </>
  );
};

export default BookQuantity;
