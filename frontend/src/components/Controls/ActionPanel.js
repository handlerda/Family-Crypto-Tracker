import React from "react";
import { useSelector } from "react-redux";

function ActionPanel() {
  const user = useSelector((state) => state.session.user);
  console.log(user);
  return (
    <div className="bg-purple-400 shadow sm:rounded-lg">
      <div className="px-4 py-3 sm:p-6 mb-6">
        <h3 className=" text-2xl mt-7 mb-6 leading-6 text-center font-medium text-white">
          You do not have any accounts!
        </h3>
        <h5 className="text-lg leading-6 text-center font-medium text-white">
          Click connect a crypto wallet to get started 🎉
        </h5>
        {user.demoUser && (
          <div className="mt-5">
            <p className="leading-6 text-center font-medium text-white">
              Looks like you are in demo mode!
            </p>
            <p className="leading-6 text-center font-medium text-white">
              API keys have been pre-populated!
            </p>
            <p className="leading-6 text-center font-medium text-white pt-11">
              To get out of demo mode click the setting gear and sign out.
            </p>
            <p className="leading-6 text-center font-medium text-white pt-6">
              I want to get your feedback! Sending me a note
              davis@dlh-ventures.com
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ActionPanel;
