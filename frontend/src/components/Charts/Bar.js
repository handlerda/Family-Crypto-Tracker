import React, { PureComponent } from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

function BarChar() {
  const accounts = useSelector((state) => state.account.all);
  const releventData = accounts.map((account) => {
    //do work
    const obj = {};
    //get name
    obj.name = account.provider.display_name;
    //get balances
    account.balances.forEach((balance) => {
      obj[balance.ticker] = balance.amount;
    });
    // console.log(obj);
    return obj;
  });

  console.log(releventData);
  return (
    // <ResponsiveContainer width="100%" height="100%">
    <BarChart
      width={500}
      height={300}
      data={releventData}
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
      {Object.values(releventData[0]).map((data) => {
        return Object.keys(data).map((ticker) => {
          return ticker !== "name" && <Bar dataKey={ticker} fill="black" />;
        });
      })}
    </BarChart>
    // </ResponsiveContainer>
  );
}

export default BarChar;
