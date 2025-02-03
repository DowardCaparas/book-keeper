"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const links = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: "/dashboard.svg",
  },
  {
    label: "Manage Books",
    path: "/dashboard/books",
    icon: "/books.svg",
  },
  {
    label: "Customers",
    path: "/dashboard/customers",
    icon: "/users.svg",
  },
  {
    label: "Transactions",
    path: "/dashboard/transactions",
    icon: "/arrow-left-right.svg",
  },
];

const SideNav = () => {
  const pathname = usePathname();

  return (
    <div className="h-full bg-white">
      <div className="bg-black w-full h-36 p-5 text-white flex flex-col justify-around gap-10">
       <div className="inline-flex items-center gap-2">
       <Image
          src="/user.svg"
          alt="user"
          width={40}
          height={40}
          className="object-contain"
        />
        <span className="text-xl font-semibold">Book Keeper</span>
       </div>
        <span className="inline-grid text-sm">
        Created By: <span>Dounhuward B. Caparas</span>
      </span>
      </div>
      <div className="flex md:flex-col ">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.path}
            className={`flex p-5 gap-3 w-full
             ${
               pathname === link.path
                 ? "bg-green-200"
                 : `hover:bg-gray-100 active:bg-gray-200 transition-transform  duration-100 ease-in`
             }
         `}
          >
            <Image
              src={link.icon}
              alt={link.label}
              width={20}
              height={20}
              className="object-contain max-md:mx-auto"
            />
            <span className="font-medium max-md:hidden">{link.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideNav;
