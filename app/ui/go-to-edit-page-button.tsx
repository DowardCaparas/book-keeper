"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const GoToEditPage = ({ id }: { id: string }) => {
  const pathname = usePathname();

  return (
    <Link
      href={`${pathname}/${id}/edit`}
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
