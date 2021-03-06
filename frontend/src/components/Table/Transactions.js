import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransactions } from "../../store/account";

const headers = [
  "Type",
  "Blockchain",
  "Amount",
  "Fee",
  "Dollar Amount",
  "Date",
];

function Transactions({ accountId }) {
  const transactions = useSelector((state) => state.account.transaction);
  // console.log(transactions, `here come transactions`);
  // const [transactionsLoaded, setTransactionsLoaded] = useState(false);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   if (transactions !== undefined || !transactionsLoaded) {
  //     dispatch(getTransactions(accountId));
  //     setTransactionsLoaded(true);
  //   }
  // }, [transactionsLoaded, dispatch, transactions, accountId]);

  // if (transactionsLoaded || transactions !== undefined) {

  function formDate(epochDate) {
    const date = new Date(epochDate);
    return date.toLocaleString("en-US", { hour12: false });
  }

  function parseFee(fees) {
    let value = fees.reduce((a, b) => {
      return a.amount + b.amount;
    }, 0);

    //handle undefined
    if (typeof value === "string") {
      value = value.split("undefined")[1];
      return `${+value} $`;
    } else {
      return `${value} $`;
    }
  }

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {headers.map((item) => {
                    return (
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        key={item}
                      >
                        {item}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.data.map((transaction) => {
                  return (
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                        <span className="">
                          {transaction.transaction_type === "trade" && (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              {transaction.transaction_type}
                            </span>
                          )}
                          {transaction.transaction_type === "deposit" && (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {transaction.transaction_type}
                            </span>
                          )}
                          {transaction.transaction_type === "withdrawal" && (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              {transaction.transaction_type}
                            </span>
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {transaction.parts[0].provider_ticker}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {transaction.parts !== undefined
                          ? transaction.parts[0].amount
                          : "n/a"}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {parseFee(transaction.fees)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {
                          transaction.parts
                            .reduce((a, b) => {
                              return a.fiat_value + b.fiat_value;
                            }, 0)
                            .split("undefined")[1]
                        }{" "}
                        $
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {formDate(transaction.confirmed_at)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
  // } else {
  //   return <h1>Loading</h1>;
  // }
}

export default Transactions;
