import React from "react";
import { MailIcon, PhoneIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";

function AccountsGrid() {
  const accounts = useSelector((state) => state.account.all);
  return (
    <ul className="flex flex-row-reverse flex-wrap">
      {Object.values(accounts).map((account) => (
        <li
          key={account.id}
          className="col-span-1 mx-5 my-5 bg-white rounded-lg shadow divide-y divide-gray-200"
        >
          <div className="w-full flex items-center justify-between p-6 space-x-6">
            <div className="flex-1 truncate ">
              <div className="flex items-center space-x-3">
                <h3 className="text-gray-900 text-sm text-center font-medium truncate">
                  {account.provider.display_name}
                </h3>
              </div>
              <p className="mt-1 text-gray-500 text-sm truncate">
                {`Fiat account value: ${
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
