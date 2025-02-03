import { fetchBooksPages } from "@/app/lib/data";
import Pagination from "@/app/ui/pagination";
import BooksTable from "@/app/ui/books/table";
import InsertButton from "@/app/ui/insert-button";
import Search from "@/app/ui/search";
import { Suspense } from "react";
import { BooksTableSkeleton } from "@/app/ui/skeletons";

// Update the table based on the user input search

const Page = async (props: {
  searchParams?: Promise<{
    query?: string;
    page?: number;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page || 1);
  const totalPages = await fetchBooksPages(query);

  return (
    <div>
      <span className="text-2xl font-semibold text-[#383838]">Book list</span>
      <div className="my-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search book" />
        <InsertButton pageName="books" innerText="Add Book" />
      </div>
        <Suspense key={query + currentPage} fallback={<BooksTableSkeleton />}>
        <BooksTable query={query} currentPage={currentPage} />
        </Suspense>
      <div className="mt-8">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default Page;
