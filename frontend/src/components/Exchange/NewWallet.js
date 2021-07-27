import React, { useState, useEffect } from "react";
import Zabo from "zabo-sdk-js";
import { zaboLogin } from "../Navigation";

function NewWallet({ name }) {
  const [blockchains, setBlockchains] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!blockchains) {
      (async () => {
        try {
          const zabo = await Zabo.init({
            clientId: process.env.REACT_APP_ZABO_CLIENT_ID,
            env: "sandbox",
          });
          const accountInfo = await zabo.providers.getOne(name);
          console.log(`here comes accountInfo ${accountInfo}`);
          if (accountInfo) {
            setBlockchains(accountInfo.available_currencies);
            setLoaded(true);
          } else {
            console.log(`there is an error`);
          }
        } catch (error) {
          console.log(`there is an error`);
        }
      })();
    }
  });

  console.log(`here come the blockchains ${JSON.stringify(blockchains)}`);

  return (
    loaded && (
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div className="space-y-6">
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Blockchain
            </label>
            <select
              id="location"
              name="location"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-400 focus:outline-none border-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              defaultValue="Canada"
            >
              {blockchains[0].list.map((chain) => (
                <option>{chain}</option>
              ))}
              }
            </select>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Account name
            </label>
            <div className="mt-1">
              <input
                id="account_id"
                name="account_id"
                type="text"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between">
              <button className="inline-flex items-center px-4 mt-5 py-1 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Clear
              </button>
              <button className="px-4 mt-5 py-1 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default NewWallet;
