import { fetchTransactions } from "@/app/lib/data";
import { TransactionCardProps } from "@/app/lib/definition";
import { formatDateToLocal } from "@/app/lib/utils";

const LatestTransactions = async () => {
  const transactions = await fetchTransactions();

  return (
    <div className="flex flex-col mt-10">
      <span className="text-xl font-medium">Latest Transactions</span>
      <div className="inline-grid gap-2 border rounded-lg shadow-sm p-5 bg-gray-100 mt-5">
      {transactions.map((transaction) => (
        <Card
          key={transaction.id}
          id={transaction.id}
          name={transaction.name}
          bookName={transaction.book_name}
          bookCategory={transaction.book_category}
          dateBorrowed={transaction.date_borrowed}
          dateReturned={transaction.date_returned}
        />
      ))}
    </div>
    </div>
  );
};

const Card = ({
  name,
  bookName,
  bookCategory,
  dateBorrowed,
  dateReturned,
}: TransactionCardProps) => {
  return (
    <div className="bg-white p-5 rounded-lg border inline-grid text-sm">
      <span className="text-lg font-semibold mb-2">{name}</span>
      <div className="flex flex-col gap-2">
      <span>
        Borrowed book: <span className="font-medium ml-4">{bookName}</span>
      </span>
      <span>
        Book category: <span className="font-medium ml-4">{bookCategory}</span>
      </span>
      <span>
        Date borrowed: <span className="font-medium ml-4">{formatDateToLocal(dateBorrowed)}</span>
      </span>
      <span>
        Date returned:{" "}
        <span>
          {dateReturned === null ? (
            <span className="bg-yellow-200 py-1 px-2 rounded-full text-sm font-medium ml-4">
              Pending
            </span>
          ) : (
            <span className="font-medium ml-4">{formatDateToLocal(dateReturned)}</span>
          )}
        </span>
      </span>
      </div>
    </div>
  );
};

export default LatestTransactions;
