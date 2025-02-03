import Link from "next/link";
import Image from "next/image";
import { deleteBook } from "@/app/lib/actions";

export function AddBook() {
  return (
    <Link
      href="/dashboard/books/create"
      className="flex h-10 items-center rounded-lg bg-gray-600 px-4 text-sm font-medium 
      text-white transition-colors hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 
      focus-visible:outline-offset-2 focus-visible:outline-gray-600"
    >
      <span className="sr-only">Update</span>
      <span className="hidden md:block">Add Book</span>{" "}
    </Link>
  );
}

export const UpdateBook = ({ id }: { id: string }) => {
  return (
    <Link
      href={`/dashboard/books/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100 "
    >
      <Image
        src="/pencil.svg"
        alt="pencil icon"
        width={20}
        height={20}
        className="object-contain"
      />
    </Link>
  );
};

export const DeleteBook = ({ id }: { id: string }) => {
  const deleteBookWithId = deleteBook.bind(null, id);

  return (
    <form action={deleteBookWithId} className="max-xl:w-full">
      <button className="rounded-md border p-2 hover:bg-gray-100 w-full">
        <span className="sr-only">Delete</span>
        <Image
          src="/trash.svg"
          alt="trash icon"
          width={20}
          height={20}
          className="object-contain max-xl:hidden"
        />
        <span className="xl:hidden">Delete</span>
      </button>
    </form>
  );
};

export const BorrowBook = ({ id }: { id: string }) => {
  return (
    <Link
      href={`/dashboard/books/${id}/borrow`}
      className="bg-green-200 px-3 py-2 rounded-lg max-xl:w-full text-center hover:scale-105 active:scale-95"
    >
      <span className="sr-only">Borrow</span>
      <span className="font-medium">Borrow</span>
    </Link>
  );
};
