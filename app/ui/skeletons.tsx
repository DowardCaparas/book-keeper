const DashboardCardSkeleton = () => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm">
      <div className="flex p-4">
        <div className="h-5 w-5 rounded bg-gray-200" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-10">
        <div className="h-7 w-20 rounded-md bg-gray-200" />
      </div>
    </div>
  );
};

export const DashboardCardsSkeleton = () => {
  return (
    <div className="grid xl:grid-cols-4 grid-cols-2 gap-4 mt-5">
      <DashboardCardSkeleton />
      <DashboardCardSkeleton />
      <DashboardCardSkeleton />
      <DashboardCardSkeleton />
    </div>
  );
};

export const DashboardLatestTransactionsSkeleton = () => {
  return (
    <div className="flex flex-col">
      <div className="h-7 w-40 bg-gray-100 rounded mt-10 mb-5"></div>
      <div className="bg-gray-100 p-5 rounded-xl flex flex-col gap-2 border shadow-sm">
        <div className="bg-white h-36 h- w-full rounded"></div>
        <div className="bg-white h-36 w-full rounded"></div>
        <div className="bg-white h-36 w-full rounded"></div>
        <div className="bg-white h-36 w-full rounded"></div>
      </div>
    </div>
  );
};

export const DashboardLatestAddedBooksSkeleton = () => {
  return (
    <div className="flex flex-col">
      <div className="h-7 w-40 bg-gray-100 rounded mt-10 mb-5"></div>
      <div className="bg-gray-100 p-5 rounded-xl flex flex-col border shadow-sm">
        <div className="bg-white h-28 h- w-full border-b-2"></div>
        <div className="bg-white h-28 w-full border-b-2"></div>
        <div className="bg-white h-28 w-full border-b-2"></div>
        <div className="bg-white h-28 w-full border-b-2"></div>
      </div>
    </div>
  );
};

function TableRowSkeleton() {
  return (
    <tr
      className="w-full border-b border-gray-100 last-of-type:border-none 
        [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg 
        [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
    >
      {/* Name */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-32 rounded bg-gray-100"></div>
      </td>
      {/* Date Added */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Category */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Status */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Quantity */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Actions */}
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <div className="h-[38px] w-[55px] rounded bg-gray-100"></div>
          <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
          <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
        </div>
      </td>
    </tr>
  );
}

const BooksMobileSkeleton = () => {
  return (
    <div className="bg-white rounded-lg px-5 py-8 border">
      <div className="flex justify-between items-center">
        <div className="inline-grid">
          <div className="w-20 h-7 bg-gray-200 rounded mb-2"></div>
          <div className="w-24 h-5 bg-gray-200 rounded"></div>
        </div>
        <div className="w-10 h-5 bg-gray-200 rounded"></div>
      </div>
      <div className="my-8">
        <div className="flex justify-between items-center">
          Date added: <div className="w-14 h-5 bg-gray-200 rounded"></div>
        </div>
        <div className="flex justify-between items-center">
          Status: <div className="w-14 h-5 bg-gray-200 rounded"></div>
        </div>
        <div className="flex justify-between items-center">
          Quantity: <div className="w-14 h-5 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="flex gap-3">
        <div className="w-full h-10 bg-gray-200 rounded"></div>
        <div className="w-full h-10 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export const BooksTableSkeleton = () => {
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
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
        </tbody>
      </table>

      {/* UI for mobile or small screen sizes */}
      <div className="xl:hidden grid lg:grid-cols-2 sm:max-md:grid-cols-2 grid-cols-1 gap-4">
        <BooksMobileSkeleton />
        <BooksMobileSkeleton />
        <BooksMobileSkeleton />
        <BooksMobileSkeleton />
        <BooksMobileSkeleton />
        <BooksMobileSkeleton />
      </div>
    </div>
  );
};

const CustomersMobileSkeleton = () => {
  return (
    <div className="bg-white rounded-lg px-5 py-8 border flex flex-col">
      <div className="inline-grid">
        <div className="rounded h-5 w-20 bg-gray-100"></div>
        <div className="rounded h-5 w-14 bg-gray-100"></div>
      </div>
      <div className="inline-grid my-5">
        Address:
        <div className="rounded h-5 w-20 bg-gray-100"></div>
        Contact number:
        <div className="rounded h-5 w-20 bg-gray-100"></div>
      </div>
      <div className="flex gap-3">
        <div className="w-full h-10 bg-gray-200 rounded"></div>
        <div className="w-full h-10 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export const CustomersTableSkeleton = () => {
  const theads = ["Name", "Email", "Address", "Contact number"];
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
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
        </tbody>
      </table>

      {/* UI for mobile or small screen sizes */}
      <div className="xl:hidden grid lg:grid-cols-2 sm:max-md:grid-cols-2 grid-cols-1 gap-4">
        <CustomersMobileSkeleton />
        <CustomersMobileSkeleton />
        <CustomersMobileSkeleton />
        <CustomersMobileSkeleton />
        <CustomersMobileSkeleton />
        <CustomersMobileSkeleton />
      </div>
    </div>
  );
};

export const TransactionCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg border p-5">
          <div className="flex justify-between items-center">
            <div className="inline-grid">
              <div className="h-7 w-10 rounded bg-gray-100"></div>
              <div className="h-5 w-14 rounded bg-gray-100"></div>
            </div>
            <div className="h-5 w-5 bg-gray-200 rounded"></div>
          </div>
    
          <div className="my-7 flex flex-col gap-2 text-sm">
            <div className="flex justify-between items-center">
              Book name: <div className="h-5 w-14 rounded- bg-gray-100"></div>
            </div>
            <div className="flex justify-between items-center">
              Category: <div className="h-5 w-14 rounded- bg-gray-100"></div>
            </div>
            <div className="flex justify-between items-center">
              Date borrowed:{" "}
              <div className="h-5 w-14 rounded- bg-gray-100"></div>
            </div>
            <div className="flex justify-between items-center">
              Date returned:{" "}
              <div className="h-5 w-14 rounded- bg-gray-100"></div>
            </div>
          </div>
          <div className="w-full h-10 bg-gray-200 rounded"></div>
        </div>
  );
}


export const TransactionCardsSkeleton = () => {
  return (
    <div className="grid lg:grid-cols-2 sm:max-md:grid-cols-2 grid-cols-1 gap-4">
      <TransactionCardSkeleton/>
      <TransactionCardSkeleton/>
      <TransactionCardSkeleton/>
      <TransactionCardSkeleton/>
      <TransactionCardSkeleton/>
      <TransactionCardSkeleton/>
    </div>
  );
}
