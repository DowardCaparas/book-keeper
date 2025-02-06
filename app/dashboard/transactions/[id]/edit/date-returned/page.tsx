import { fetchTransactionById } from "@/app/lib/data";
import EditDateReturnedForm from "@/app/ui/transactions/edit-date-returned"
import { notFound } from "next/navigation";


const Page = async (props: {params: Promise<{
    id: string;
}>}) => {

    const params = await props.params;
    const id = params.id;

    const transaction = await fetchTransactionById(id);

    if (!transaction) {
        notFound();
      }

  return (
    <div>
        <EditDateReturnedForm transaction={transaction}/>
    </div>
  )
}

export default Page