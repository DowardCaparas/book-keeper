"use client";

import { Customers } from "@/app/lib/definition";
import { ChangeEvent, useState } from "react";

const SelectCustomerName = ({ customers }: { customers: Customers[] }) => {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedName = event.target.value;
    const selectedCustomer = customers.find(
      (customer) => customer.name === selectedName
    );
    setSelectedCustomerId(selectedCustomer?.id || "");
  };

  return (
    <div>
      <label htmlFor="customer_name">Customer list</label>
      <select
        id="customer_name"
        name="customer_name"
        className="peer block cursor-pointer rounded-md
              py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
        onChange={handleSelectChange}
      >
        <option value="" disabled>
          Select a customer
        </option>
        {customers.map((customer) => (
          <option key={customer.id} value={customer.name}>
            {customer.name}
          </option>
        ))}
      </select>
      <div>
        <span>Customer Id:</span>
        <label htmlFor="customer_id"></label>
        <input
          id="customer_id"
          type="text"
          name="customer_id"
          defaultValue={selectedCustomerId}
          readOnly
          className="border rounded-lg p-3 w-full"
        />
      </div>
    </div>
  );
};

export default SelectCustomerName;
