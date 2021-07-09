import React from "react";
import { MailIcon, PhoneIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";

const people = [
  {
    name: "Jane Cooper",
    title: "Regional Paradigm Technician",
    role: "Admin",
    email: "janecooper@example.com",
    telephone: "+1-202-555-0170",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  // More people...
];

function AccountsGrid() {
  const accounts = useSelector((state) => state.account.all);
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Object.values(accounts).map((account) => (
        <li
          key={account.id}
          className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
        >
          <div className="w-full flex items-center justify-between p-6 space-x-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="text-gray-900 text-sm font-medium truncate">
                  {account.provider.display_name}
                </h3>
              </div>
              <p className="mt-1 text-gray-500 text-sm truncate">
                {`Account value: ${
                  account.balances
                    .reduce((a, b) => a.fiat_value + b.fiat_value)
                    .split(".")[0]
                } $`}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default AccountsGrid;
