import React from "react";
import { useSelector } from "react-redux";

//used as a container to pass children in
function ActionPanel({ children }) {
  return <div className="bg-purple-400 shadow sm:rounded-lg">{children}</div>;
}

export default ActionPanel;
