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
  const numAccounts = useSelector((state) => state.account.all);
  console.log(accounts);
  useEffect(() => {
    if (!accountsLoaded) {
      dispatch(getAccounts()).then(() => setAccountsLoaded(true));
    }
  }, [dispatch, accounts, accountsLoaded]);

  useEffect(() => {
    dispatch(getFamilyMembers()).then(() => setFamilyMembersLoaded(true));
  }, [dispatch]);
  return (
    <div className="bg-gray-100 relative h-full">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 ">
        <Header title="Your accounts"></Header>
        <div className="py-10  sm:px-0 px">
          {accounts.length > 0 && (
            <div className="flex flex-row justify-between">
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
            <div className="flex justify-center mt-32">
              <ActionPanel />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
