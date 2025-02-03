import EditForm from "@/app/ui/books/edit-form";
import React from "react";
import { fetchBookById } from "@/app/lib/data";
import { notFound } from "next/navigation";

const Page = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const params = await props.params;
  const id = params.id;

  const book = await fetchBookById(id);
  if (!book) {
    notFound();
  }

  return (
    <div>
      <span className="text-2xl font-semibold text-[#383838]">
        Book / Edit
      </span>
      <div className="mt-4 md:mt-8">
      <EditForm book={book} />
      </div>
    </div>
  );
};

export default Page;
