import React from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import randomColor from "randomcolor";

function BarChar() {
  // load accounts
  const accounts = useSelector((state) => state.account.all);
  // this should move to a custom hook
  const accountData = Object.values(accounts).map((account) => {
    // loop through each account boject
    const obj = {};
    //get name
    obj.name = account.provider.display_name;
    //get balances
    account.balances.forEach((balance) => {
      obj[balance.ticker] = balance.amount;
    });
    return obj;
  });

  // if there are accounts render
  if (Object.keys(accounts).length) {
    // render the chart
    return (
      <BarChart
        width={500}
        height={300}
        data={accountData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />

        {Object.keys(accountData[0]).map((value) => {
          // remove validation on the server
          return (
            value !== "name" &&
            value !== "RANDOMZABO" &&
            value !== "XYZ" && <Bar dataKey={value} fill={randomColor()} />
          );
        })}
      </BarChart>
    );
  }
}

export default BarChar;
