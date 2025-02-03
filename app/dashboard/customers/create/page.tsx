import CreateForm from "@/app/ui/customers/create-form";
import React from "react";

const Page = () => {
  return (
    <div>
      <span className="text-2xl font-semibold text-[#383838]">
        Customer / Create
      </span>
      <div className="mt-4 md:mt-8">
        <CreateForm />
      </div>
    </div>
  );
};

export default Page;
