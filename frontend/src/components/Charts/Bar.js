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
import randomColor from "randomcolor";

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
      {/* {Object.values(releventData[0]).map((data) => {
        return Object.keys(data).map((ticker) => {
          return ticker !== "name" && <Bar dataKey={ticker} fill="black" />;
        });
      })} */}

      {Object.keys(releventData[0]).map((value) => {
        return (
          value !== "name" &&
          value !== "RANDOMZABO" &&
          value !== "XYZ" && <Bar dataKey={value} fill={randomColor()} />
        );
      })}
      {/* <Bar dataKey="BTC" fill="RED" />;
      <Bar dataKey="ETH" fill="BLACK" />; */}
    </BarChart>
    // </ResponsiveContainer>
  );
}

export default BarChar;
