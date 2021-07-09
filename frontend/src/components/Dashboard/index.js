import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAccounts } from "../../store/account";
import { getFamilyMembers } from "../../store/session";
import BarChar from "../Charts/Bar";
import Header from "../Controls/Header";
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
    <div className="flex flex-col">
      <div>
        <h1>Hello world</h1>
        {/* <button onClick={handleClick}>Test</button> */}
      </div>
      <div className=" content-end">
        <div className="mt-auto">
          <Header title="Wallets"></Header>
          {accounts.length === false && <BarChar />}
          {accounts.length === false && <Table />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
