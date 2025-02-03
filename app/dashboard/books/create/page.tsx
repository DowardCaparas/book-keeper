import CreateForm from "@/app/ui/books/create-form";
import React from "react";

const Page = () => {
  return (
    <div>
      <span className="text-2xl font-semibold text-[#383838] mb-4 md:mb-8">
        Book / Add
      </span>
      <div className="mt-4 md:mt-8">
        <CreateForm />
      </div>
    </div>
  );
};

export default Page;
