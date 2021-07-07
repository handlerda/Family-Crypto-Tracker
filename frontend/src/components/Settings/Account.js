import React from "react";
import { useSelector } from "react-redux";
import Header from "../Controls/Header";
import Input from "../Controls/Input";

function Account() {
  const accounts = useSelector((state) => state.account.accounts.accounts);
  const user = useSelector((state) => state.session.user);

  function showDelete(user, account) {
    if (user.headOfHouseHold) return true;
    if (user.id === account.userId) return true;
    else return false;
  }

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Account Details
          </h2>
        </div>
      </div>
      <ul className="divide-y divide-gray-200">
        {accounts.map((account) => (
          <li key={account.id} className="py-8 flex">
            <img
              className="h-10 w-30 rounded-full"
              src={account.provider.logo}
              alt=""
            />
            <div className="ml-10">
              <p className="text-sm font-medium text-gray-900">
                <span className="font-bold"> Account name: </span>
                {account.provider.display_name}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-bold text-gray-800">
                  {" "}
                  Account owner:{" "}
                </span>
                {account.firstName}
              </p>
              <li className="text-sm text-gray-500">
                <span className="font-bold text-gray-800">
                  {" "}
                  What crypfam has access to:{" "}
                </span>
                {account.provider.scopes.map((scope) => {
                  return <li className="ml-3">{scope}</li>;
                })}
              </li>
              <li className="text-sm text-gray-500">
                <span className="font-bold text-gray-800">
                  {" "}
                  Associated Wallets:{" "}
                </span>
                {account.balances.map((balance) => {
                  return (
                    <li className="ml-3">
                      <span> Ticker:</span>
                      <span className="font-bold ml-2">{balance.ticker}</span>
                      <span> Amount:</span>
                      <span className="font-bold ml-2">{balance.amount}</span>
                    </li>
                  );
                })}

                {showDelete(user, account) && (
                  <div className="flex flex-row mt-5 ">
                    <button
                      className="inline-flex items-center px-4  border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      // onClick={() => deleteUser(member.id)}
                    >
                      Delete
                    </button>
                    <p className="ml-8">
                      Deleting an account removes the UUID that points to your
                      external wallet. Crypfam does not keep any of your private
                      keys in our encrypted database. Deleting your account
                      removes the link from Crypfam to your wallet(s). This
                      action will not effect your crypto.
                    </p>
                  </div>
                )}
              </li>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Account;

//delete if user is head of household
//delete if the user === user associated with the account
