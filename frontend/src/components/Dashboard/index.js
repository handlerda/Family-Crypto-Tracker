import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAccounts } from "../../store/account";
import { getFamilyMembers } from "../../store/session";
import BarChar from "../Charts/Bar";
import AccountsGrid from "../Controls/AccountsGrid";
import ActionPanel from "../Controls/ActionPanel";
import Header from "../Controls/Header";
import Table from "../Table";
import NoAccounts from "./NoAccounts";

function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const accounts = useSelector((state) => state.account.all);
  const [loadDashboard, setLoadDashboard] = useState(false);
  const [accountsPresent, setAccountsPresent] = useState(null);
  useEffect(() => {
    if (user && accounts) {
      // should we render accounts or dummy text
      Object.keys(accounts).length > 0
        ? setAccountsPresent(true)
        : setAccountsPresent(false);
      //load the dashboard
      setLoadDashboard(true);
    }
  }, [user, accounts, accountsPresent]);

  useEffect(() => {
    dispatch(getFamilyMembers());
  }, [dispatch]);
  return (
    loadDashboard && (
      <div className="bg-gray-100 relative h-full">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 ">
          <Header title="Your accounts"></Header>
          <div className="py-10  sm:px-0 px">
            {accountsPresent && (
              <div className="flex flex-row justify-between">
                <div>
                  <h2 className="text-center mb-4">Crypto account value</h2>
                  <BarChar />
                </div>
                <div className="flex flex-col">
                  <h2 className=" text-right mr-44 mb-4">Account value USD</h2>
                  <AccountsGrid />
                </div>
              </div>
            )}
            {accountsPresent && (
              <div className="mt-12">
                <h2>Account Summary</h2>
                <div className="mt-10">
                  <Table />
                </div>
              </div>
            )}
            {!accountsPresent && <NoAccounts />}
          </div>
        </div>
      </div>
    )
  );
}

export default Dashboard;
