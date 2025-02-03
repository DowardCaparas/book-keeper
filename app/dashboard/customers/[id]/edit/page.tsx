import { fetchCustomerById } from "@/app/lib/data";
import EditForm from "@/app/ui/customers/edit-form";
import { notFound } from "next/navigation";
import React from "react";

const Page = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const params = await props.params;
  const id = params.id;

  const customer = await fetchCustomerById(id);

  if (!customer) {
    notFound();
  }

  return (
    <div>
      <span className="text-2xl font-semibold text-[#383838]">
        Customer / Edit
      </span>
      <div className="mt-4 md:mt-8">
        <EditForm customer={customer} />
      </div>
    </div>
  );
};

export default Page;
