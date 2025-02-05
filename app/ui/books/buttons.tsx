import Link from "next/link";

export function AddBook() {
  return (
    <Link
      href="/dashboard/books/create"
      className="flex h-10 items-center rounded-lg bg-gray-600 px-4 text-sm font-medium 
      text-white transition-colors hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 
      focus-visible:outline-offset-2 focus-visible:outline-gray-600"
    >
      <span className="sr-only">Adding book</span>
      <span className="hidden md:block">Add Book</span>{" "}
    </Link>
  );
}

export const BorrowBook = ({ id }: { id: string }) => {
  return (
    <Link
      href={`/dashboard/books/${id}/borrow`}
      className="bg-green-200 px-3 py-2 rounded-lg max-xl:w-full text-center hover:scale-105 active:scale-95"
    >
      <span className="sr-only">Borrowing book</span>
      <span className="font-medium">Borrow</span>
    </Link>
  );
};
