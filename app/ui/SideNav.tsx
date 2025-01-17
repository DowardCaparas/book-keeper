"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const links = [
  {
    label: "Home",
    path: "/dashboard",
  },
  {
    label: "Books",
    path: "/dashboard/books",
  },
];

const SideNav = () => {
  const pathname = usePathname();

  return (
    <div>
      <div className="bg-black w-full h-36 p-5">
        <span className="text-white text-2xl font-semibold">Book Keeper</span>
      </div>
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.path}
          className={`flex flex-col hover:bg-[#dddddd] active:bg-[#eeeeee] p-5 
            transition-colors duration-100 ease-in
                ${pathname === link.path && "bg-[#eeeeee]"}
            `}
        >
          <span className="font-medium">{link.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default SideNav;
