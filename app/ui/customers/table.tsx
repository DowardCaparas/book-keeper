import { fetchFilteredCustomers } from "@/app/lib/data";
import { DeleteCustomer, UpdateCustomer } from "./buttons";

const CustomerTable = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const theads = ["Name", "Email", "Address", "Contact number"];
  const customers = await fetchFilteredCustomers(query, currentPage);

  return (
    <div>
      <table className="min-w-full bg-gray-200 max-xl:hidden">
        <thead className="text-left text-sm">
          <tr>
            {theads.map((head) => (
              <th key={head} className="px-3 py-5 font-medium">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {customers?.map((customer) => (
            <tr
              key={customer.id}
              className="w-full border-b py-3 text-sm last-of-type:border-none 
                          [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg 
                          [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
            >
              <td className="whitespace-nowrap p-3">{customer.name}</td>
              <td className="whitespace-nowrap p-3">{customer.email}</td>
              <td className="whitespace-nowrap p-3">{customer.address}</td>
              <td className="whitespace-nowrap p-3">{customer.contact}</td>
              <td className="whitespace-nowrap py-3 pl-6 pr-3">
                <div className="flex justify-end gap-3">
                  <UpdateCustomer id={customer.id} />
                  <DeleteCustomer id={customer.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* UI for mobile or small screen sizes */}
      <div className="xl:hidden grid lg:grid-cols-2 sm:max-md:grid-cols-2 grid-cols-1 gap-4">
        {customers?.map((customer) => (
          <div key={customer.id} className="bg-white rounded-lg px-5 py-8 border flex flex-col">
            <div className="inline-grid">
              <span className="md:text-xl text-lg font-medium">{customer.name}</span>
              <span>{customer.email}</span>
            </div>
            <div className="inline-grid my-5">
              Address:
              <span className="font-medium mb-2">{customer.address}</span>
              Contact number:
              <span className="font-medium">{customer.contact}</span>
            </div>
           <div className="flex gap-3">
            <UpdateCustomer id={customer.id}/>
            <DeleteCustomer id={customer.id}/>
           </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerTable;
