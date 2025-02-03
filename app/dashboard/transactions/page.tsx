import { fetchTransactionsPages } from "@/app/lib/data";
import Pagination from "@/app/ui/pagination";
import Search from "@/app/ui/search";
import { TransactionCardsSkeleton } from "@/app/ui/skeletons";
import TransactionCards from "@/app/ui/transactions/cards";
import { Suspense } from "react";

const Page = async (props: {
  searchParams?: Promise<{
    query?: string;
    page?: number;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page || 1);
  const totalPages = await fetchTransactionsPages(query);

  return (
    <div>
      <span className="text-2xl font-semibold text-[#383838]">
        Transactions
      </span>
      <div className="my-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search transaction" />
      </div>
      <Suspense
        key={query + currentPage}
        fallback={<TransactionCardsSkeleton />}
      >
        <TransactionCards query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-8">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default Page;
