import React from "react";
import { useSelector } from "react-redux";

function ActionPanel({ children }) {
  const user = useSelector((state) => state.session.user);

  return <div className="bg-purple-400 shadow sm:rounded-lg">{children}</div>;
}

export default ActionPanel;
