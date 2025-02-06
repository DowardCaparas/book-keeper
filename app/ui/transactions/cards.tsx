import { fetchFilteredTransactions } from "@/app/lib/data";
import { TransactionCardProps } from "@/app/lib/definition";
import { formatDateToLocal } from "@/app/lib/utils";
import { DeleteItem } from "../confirm-delete-data-modal";
import { deleteTransaction } from "@/app/lib/actions";
import Link from "next/link";

const TransactionCards = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const transactions = await fetchFilteredTransactions(query, currentPage);

  return (
    <div className="grid lg:grid-cols-2 sm:max-md:grid-cols-2 grid-cols-1 gap-4">
      {transactions.map((transaction) => (
        <Card
          key={transaction.id}
          id={transaction.id}
          name={transaction.name}
          email={transaction.email}
          bookName={transaction.book_name}
          bookCategory={transaction.book_category}
          dateBorrowed={transaction.date_borrowed}
          dateReturned={transaction.date_returned}
        />
      ))}
    </div>
  );
};

const Card = ({
  id,
  name,
  email,
  bookName,
  bookCategory,
  dateBorrowed,
  dateReturned,
}: TransactionCardProps) => {
  return (
    <div className="bg-white rounded-lg border p-5">
      <div className="flex justify-between items-center">
        <div className="inline-grid">
          <span className="text-xl max-md:text-lg font-medium">{name}</span>
          <span className="text-sm">{email}</span>
        </div>
      </div>

      <div className="my-7 flex flex-col gap-2 text-sm">
        <span className="flex justify-between items-center">
          Book name: <span className="font-medium">{bookName}</span>
        </span>
        <span className="flex justify-between items-center">
          Category: <span className="font-medium">{bookCategory}</span>
        </span>
        <span className="flex justify-between items-center">
          Date borrowed:{" "}
          <span className="font-medium">{formatDateToLocal(dateBorrowed)}</span>
        </span>
        <span className="flex justify-between items-center">
          Date returned:{" "}
          <span className="font-medium">
            {dateReturned === null ? (
              <span className="bg-yellow-200 py-1 px-2 rounded-full text-sm font-medium">
                Pending
              </span>
            ) : (
              formatDateToLocal(dateReturned)
            )}
          </span>
        </span>
      </div>

      {/* If the date returned is null go to edit page, otherwise delete it. */}
      <div className="flex gap-3">
        {dateReturned !== null ? (
          <>
            <Link
              href={`/dashboard/transactions/${id}/edit/date-returned`}
              className="rounded-md py-2 px-4 bg-black hover:bg-opacity-80 active:bg-opacity-90
                    max-xl:w-full text-center font-medium text-white"
            >
              <span className="sr-only">Edit Date Returned</span>
              <span>Edit date returned</span>
            </Link>
            <DeleteItem
              id={id}
              itemName={name}
              title="Delete Transaction"
              deleteFunction={deleteTransaction}
            />
          </>
        ) : (
          // Go to edit page to return book
          <Link
            href={`/dashboard/transactions${id}/edit/date-returned`}
            className="rounded-md py-2 px-4 bg-green-600 hover:bg-green-700 active:bg-green-600 
                    text-white max-xl:w-full text-center font-medium"
          >
            <span className="sr-only">Return</span>
            <span>Return</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default TransactionCards;
