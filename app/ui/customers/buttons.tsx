import { deleteCustomer } from "@/app/lib/actions";
import Image from "next/image";
import Link from "next/link";

export const UpdateCustomer = ({ id }: { id: string }) => {
    return (
      <Link
        href={`/dashboard/customers/${id}/edit`}
        className="rounded-md border p-2 hover:bg-gray-100 max-xl:w-full text-center"
      >
      <span className="sr-only">Edit</span>
        <Image
          src="/pencil.svg"
          alt="pencil icon"
          width={20}
          height={20}
          className="object-contain max-xl:hidden"
        />
      <span className="xl:hidden">Edit</span>
      </Link>
    );
  };
  
  export const DeleteCustomer = ({ id }: { id: string }) => {
    const deleteCustomerWithId = deleteCustomer.bind(null, id);
  
    return (
      <form action={deleteCustomerWithId} className="max-xl:w-full">
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