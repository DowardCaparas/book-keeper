import { deleteTransaction } from "@/app/lib/actions";
import Image from "next/image";
import Link from "next/link";

export const UpdateTransaction = ({ id }: { id: string }) => {
  return (
    <Link
      href={`/dashboard/transactions/${id}/edit`}
      className="rounded-md py-2 px-3 bg-black text-white hover:border"
    >
    <span className="sr-only">Update</span>
    <span className="w-full">Update</span>
    </Link>
  );
  };
  
  export const DeleteTransaction = ({ id }: { id: string }) => {
    const deleteCustomerWithId = deleteTransaction.bind(null, id);
  
    return (
      <form action={deleteCustomerWithId}>
        <button className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span>
          <Image
            src="/trash.svg"
            alt="trash icon"
            width={20}
            height={20}
            className="object-contain"
          />
        </button>
      </form>
    );
  };