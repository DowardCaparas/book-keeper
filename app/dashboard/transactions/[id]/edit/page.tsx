import { fetchTransactionById } from "@/app/lib/data";
import EditForm from "@/app/ui/transactions/edit-form";
import { notFound } from "next/navigation";

const Page = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const params = await props.params;
  const id = params.id;

  const transaction = await fetchTransactionById(id);

  if (!transaction) {
    notFound();
  }

  return (
    <div>
      <span className="text-2xl font-semibold text-[#383838]">
        Transaction / Edit
      </span>
      <div className="mt-4 md:mt-8">
        <EditForm transaction={transaction} />
      </div>
    </div>
  );
};

export default Page;
