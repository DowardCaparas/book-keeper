import { fetchBooks } from "@/app/lib/data";
import clsx from "clsx";
import React from "react";

const Books = async () => {
  const books = await fetchBooks();
  return (
    <div className="flex flex-col mt-10">
      <span className="text-xl font-medium">Latest Added Books</span>
      
      <div className="inline-grid border rounded-lg shadow-sm p-5 bg-gray-100 mt-5">
        {books.map((book) => (
          <Card
            key={book.id}
            name={book.name}
            category={book.category}
            status={book.status}
            quantity={book.quantity}
          />
        ))}
      </div>
    </div>
  );
};

const Card = ({
  name,
  category,
  status,
  quantity,
}: {
  name: string;
  category: string;
  status: "Available" | "Not available";
  quantity: number;
}) => {
  return (
    <div className="bg-white border-b-2 p-5 ">
      <div className="flex justify-between items-center">
        <span className="text-lg font-medium">{name}</span>
        <span
          className={clsx("py-1 px-2 rounded-full text-sm font-medium", {
            "bg-red-300": status === "Not available",
            "bg-green-300": status === "Available",
          })}
        >
          {status}
        </span>
      </div>
      <div className="flex justify-between items-center mt-2">
        <span>{category}</span>
        <span>Qty: {quantity}</span>
      </div>
    </div>
  );
};

export default Books;
