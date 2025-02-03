import { fetchCustomersPages } from "@/app/lib/data";
import CustomerTable from "@/app/ui/customers/table";
import InsertButton from "@/app/ui/insert-button";
import Pagination from "@/app/ui/pagination";
import Search from "@/app/ui/search";
import { CustomersTableSkeleton } from "@/app/ui/skeletons";
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
  const totalPages = await fetchCustomersPages(query);

  return (
    <div>
      <span className="text-2xl font-semibold text-[#383838]">Customers</span>
      <div className="my-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search customer" />
        <InsertButton pageName="customers" innerText="Add Customer" />
      </div>
      <Suspense key={query + currentPage} fallback={<CustomersTableSkeleton />}>
        <CustomerTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-8">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default Page;
