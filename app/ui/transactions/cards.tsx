import { fetchFilteredTransactions } from "@/app/lib/data";
import { TransactionCardProps } from "@/app/lib/definition";
import { DeleteTransaction, UpdateTransaction } from "./buttons";
import { formatDateToLocal } from "@/app/lib/utils";

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
        <DeleteTransaction id={id} />
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
      <UpdateTransaction id={id} />
    </div>
  );
};

export default TransactionCards;
