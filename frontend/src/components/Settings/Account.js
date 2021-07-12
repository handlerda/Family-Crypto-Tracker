import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccount, modifyAccountAccess } from "../../store/account";
import Header from "../Controls/Header";
import Input from "../Controls/Input";

function Account() {
  const accounts = useSelector((state) => state.account.all);
  const user = useSelector((state) => state.session.user);
  const familyMembers = useSelector(
    (state) => state.session.familyMembers.users
  );
  console.log(familyMembers);
  const [userCrud] = useState({});
  const dispatch = useDispatch();

  // allows a user to delete or add a wallet
  function allowCrud(user, account) {
    if (user.headOfHouseHold) return true;
    if (user.id === account.userId) return true;
    else return false;
  }

  function deleteAccountClick(accountId) {
    console.log(`button clicked`);
    const deletedUser = dispatch(deleteAccount(accountId));
    console.log(deletedUser);
  }

  function handleUserChange(e, userId, accountId) {
    if (e.target.checked) {
      //add user to db
      userCrud[userId] = {
        status: "add",
        accountId,
        userId,
      };
    } else {
      //remove user from the database
      console.log(`delete from db`);
      userCrud[userId] = {
        status: "delete",
        accountId,
        userId,
      };
    }
  }

  function modifyUserAccountAccess(e) {
    //prevent default
    e.preventDefault();
    console.log(userCrud);
    dispatch(modifyAccountAccess(userCrud));
  }

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Account Details
          </h2>
        </div>
      </div>
      {!Object.keys(accounts).length && (
        <h1>You have no accounts! Click the connect button to get started!</h1>
      )}
      <ul className="divide-y divide-gray-200">
        {Object.values(accounts).map((account) => (
          <li key={account.id} className="py-8 flex">
            <img className="h-10 w-30 " src={account.provider.logo} alt="" />
            <div className="ml-10">
              <p className="text-sm font-medium text-gray-900">
                <span className="font-bold"> Account name: </span>
                {account.provider.display_name}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-bold text-gray-800">
                  {" "}
                  Account owner:{" "}
                </span>
                {account.firstName}
              </p>
              <li className="text-sm text-gray-500">
                <span className="font-bold text-gray-800">
                  {" "}
                  What crypfam has access to:{" "}
                </span>
                {account.provider.scopes.map((scope) => {
                  return <li className="ml-3">{scope}</li>;
                })}
              </li>
              <li className="text-sm text-gray-500">
                <span className="font-bold text-gray-800">
                  {" "}
                  Associated Wallets:{" "}
                </span>
                {account.balances.map((balance) => {
                  return (
                    <li className="ml-3">
                      <span> Ticker:</span>
                      <span className="font-bold ml-2">{balance.ticker}</span>
                      <span> Amount:</span>
                      <span className="font-bold ml-2">{balance.amount}</span>
                    </li>
                  );
                })}

                {allowCrud(user, account) && (
                  <div>
                    <div class="flex items-center">
                      <div class="max-w-lg space-y-4">
                        <ul className="divide-y divide-gray-200">
                          {/* <li key={account.id} className="py-8 flex"> */}
                          <p className="font-bold text-black mt-5">
                            Family member access:{" "}
                          </p>
                          {familyMembers.map((member) => {
                            return (
                              <li className="py-8 flex">
                                <div class="relative flex items-start">
                                  <p className="text-sm font-medium text-gray-900">
                                    First Name: {member.firstName}
                                  </p>

                                  <div class="flex items-center h-5">
                                    {!member.headOfHouseHold ? (
                                      <input
                                        type="checkbox"
                                        class="border-gray-300 rounded form-checkbox ml-10"
                                        defaultChecked={account.accessibleUsers.some(
                                          (user) => user.id === member.id
                                        )}
                                        onChange={(e) =>
                                          handleUserChange(
                                            e,
                                            member.id,
                                            account.crypfamId
                                          )
                                        }
                                      />
                                    ) : (
                                      <input
                                        type="checkbox"
                                        class="border-gray-300 rounded form-checkbox ml-10"
                                        checked={account.accessibleUsers.some(
                                          (user) => user.id === member.id
                                        )}
                                      />
                                    )}
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                        <div className="flex flex-row mt-5 ">
                          <button
                            className="inline-flex items-center px-4  border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                            onClick={(e) => modifyUserAccountAccess(e)}
                          >
                            Modify user permissions
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row mt-5 ">
                      <button
                        className="inline-flex items-center px-4  border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        onClick={(e) => deleteAccountClick(account.id)}
                      >
                        Delete
                      </button>
                      <p className="ml-8">
                        Deleting an account removes the UUID that points to your
                        external wallet. Crypfam does not keep any of your keys
                        in our encrypted database. Deleting your account removes
                        the link from Crypfam to your wallet(s). This action
                        will not effect your crypto.
                      </p>
                    </div>
                  </div>
                )}
              </li>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Account;

//delete if user is head of household
//delete if the user === user associated with the account
