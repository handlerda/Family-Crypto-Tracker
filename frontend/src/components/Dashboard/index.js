import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAccounts } from "../../store/account";
import { getFamilyMembers } from "../../store/session";
import BarChar from "../Charts/Bar";
import AccountsGrid from "../Controls/AccountsGrid";
import ActionPanel from "../Controls/ActionPanel";
import Header from "../Controls/Header";
import Warning from "../Controls/Warning";
import Table from "../Table";

function Dashboard() {
  const dispatch = useDispatch();
  const [accountsLoaded, setAccountsLoaded] = useState(false);
  const [familyMembersLoaded, setFamilyMembersLoaded] = useState();
  const accounts = useSelector((state) => Object.keys(state.account.all));
  console.log(accounts);
  useEffect(() => {
    dispatch(getAccounts()).then(() => setAccountsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFamilyMembers()).then(() => setFamilyMembersLoaded(true));
  }, [dispatch]);
  return (
    // <div className="flex flex-col">
    //   <div className="mx-8 mt-14">
    //     <Header title="Wallets"></Header>
    //     <div className="mt-">
    //       {accounts.length > 0 && <BarChar />}
    //       {accounts.length > 0 && <Table />}
    //       {accounts.length === 0 && accountsLoaded && (
    //         <div className="flex justify-center mt-48">
    //           <ActionPanel />
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </div>
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 ">
        <Header title="Your accounts"></Header>
        <div className="py-10  sm:px-0">
          {accounts.length > 0 && (
            <div className="flex flex-row ">
              <div>
                <h2 className="text-center mb-4">Crypto account value</h2>
                <BarChar />
              </div>
              <div>
                <h2 className="text-center mb-4">Account value USD</h2>
                <AccountsGrid />
              </div>
            </div>
          )}
          {accounts.length > 0 && (
            <div className="mt-12">
              <h2>Account Summary</h2>
              <div className="mt-10">
                <Table />
              </div>
            </div>
          )}
          {accounts.length === 0 && accountsLoaded && (
            <div className="flex justify-center mt-48">
              <ActionPanel />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
