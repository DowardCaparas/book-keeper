import { fetchCardData } from "@/app/lib/data";
import Image from "next/image";
import React from "react";

const CardWrapper = async () => {
  const { numberOfBooks, numberOfCustomers, numberOfTransactions, numberOfAvailableBooks } =
    await fetchCardData();

  return (
    <div className="grid xl:grid-cols-4 grid-cols-2 gap-4 mt-5">
      <Card title="Total of Books" value={numberOfBooks} type="books" />
      <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      />
      <Card
        title="Total transactions"
        value={numberOfTransactions}
        type="transactions"
      />
       <Card
        title="Available books"
        value={numberOfAvailableBooks}
        type="available"
      />
    </div>
  );
};

const iconMap = {
  books: "/books.svg",
  customers: "/users.svg",
  transactions: "/arrow-left-right.svg",
  available: "/bookCheck.svg"
};

const Card = ({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: "books" | "customers" | "transactions" | "available";
}) => {
  const Icon = iconMap[type];

  return (
    <div className="border rounded-lg shadow-sm text-center bg-white">
      <div className="flex gap-2 bg-gray-100 py-5 px-5">
        {Icon && <Image src={Icon} alt={Icon} width={20} height={20} /> }
        <span className="text-sm font-medium">{title}</span>
      </div>
      <div className="py-10">
      <span className="font-semibold text-2xl">{value}</span>
      </div>
    </div>
  );
};

export default CardWrapper;
