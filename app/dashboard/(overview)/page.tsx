import Books from "@/app/ui/dashboard/books";
import CardWrapper from "@/app/ui/dashboard/cards";
import LatestTransactions from "@/app/ui/dashboard/latest-transaction";
import {
  DashboardCardsSkeleton,
  DashboardLatestAddedBooksSkeleton,
  DashboardLatestTransactionsSkeleton,
} from "@/app/ui/skeletons";
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

  return (
    <div>
      <span className="text-2xl font-semibold text-[#383838]">Dashboard</span>
      <Suspense fallback={<DashboardCardsSkeleton />}>
        <CardWrapper />
      </Suspense>
      <div className="grid xl:grid-cols-2 grid-cols-1 gap-4">
        <Suspense fallback={<DashboardLatestAddedBooksSkeleton />}>
          <Books />
        </Suspense>
        <Suspense
          key={query + currentPage}
          fallback={<DashboardLatestTransactionsSkeleton />}
        >
          <LatestTransactions query={query} currentPage={currentPage} />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
