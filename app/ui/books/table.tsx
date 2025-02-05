import { fetchFilteredBooks } from "@/app/lib/data";
import { formatDateToLocal } from "@/app/lib/utils";
import { BorrowBook } from "./buttons";
import { deleteBook } from "@/app/lib/actions";
import { DeleteItem } from "../confirm-delete-data-modal";
import { GoToEditPage } from "../go-to-edit-page-button";

// Fetching data from database

const BooksTable = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const books = await fetchFilteredBooks(query, currentPage); // from data file

  const theads = ["Name", "Date added", "Category", "Status", "Quantity"];

  return (
    <div>
      <table className="min-w-full bg-gray-200 max-xl:hidden">
        <thead className="text-left text-sm">
          <tr>
            {theads.map((head) => (
              <th key={head} className="px-3 py-5 font-medium">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {books?.map((book) => (
            <tr
              key={book.id}
              className="w-full border-b py-3 text-sm last-of-type:border-none 
                          [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg 
                          [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
            >
              <td className="whitespace-nowrap p-3">{book.name}</td>
              <td className="whitespace-nowrap p-3">
                {formatDateToLocal(book.date_added)}
              </td>
              <td className="whitespace-nowrap p-3">{book.category}</td>
              <td className="whitespace-nowrap p-3">
                {book.status === "Not available" ? (
                  <span className="bg-red-300 py-1 px-2 rounded-full text-sm font-medium">
                    {book.status}
                  </span>
                ) : (
                  book.status
                )}
              </td>
              <td className="whitespace-nowrap p-3">{book.quantity}</td>
              <td className="whitespace-nowrap py-3 pl-6 pr-3">
                <div className="flex justify-end gap-3">
                  {book.quantity > 0 && <BorrowBook id={book.id} />}
                  <GoToEditPage id={book.id}/>
                  <DeleteItem id={book.id} itemName={book.name} deleteFunction={deleteBook}/>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* UI for mobile or small screen sizes */}
      <div className="xl:hidden grid lg:grid-cols-2 sm:max-md:grid-cols-2 grid-cols-1 gap-4">
        {books?.map((book) => (
          <div key={book.id} className="bg-white rounded-lg px-5 py-8 border">
            <div className="flex justify-between items-center">
              <div className="inline-grid">
                <span className="md:text-xl text-lg font-medium">
                  {book.name}
                </span>
                <span>{book.category}</span>
              </div>
              <GoToEditPage id={book.id}/>
            </div>
            <div className="my-8">
              <span className="flex justify-between items-center">
                Date added: <span>{formatDateToLocal(book.date_added)}</span>
              </span>
              <span className="flex justify-between items-center">
                Status:{" "}
                {book.status === "Not available" ? (
                  <span className="bg-red-300 py-1 px-2 rounded-full text-sm font-medium">
                    {book.status}
                  </span>
                ) : (
                  <span>{book.status}</span>
                )}
              </span>
              <span className="flex justify-between items-center">
                Quantity: <span>{book.quantity}</span>
              </span>
            </div>
            <div className="flex gap-3">
              {book.quantity > 0 && <BorrowBook id={book.id} />}
              <DeleteItem id={book.id} itemName={book.name} deleteFunction={deleteBook}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksTable;
