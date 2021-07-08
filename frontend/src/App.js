import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LoginForm from "./components/LoginFormModal/LoginForm";
import Settings from "./components/Settings";
import { getAccounts } from "./store/account";
import Table from "./components/Table";
import Header from "./components/Controls/Header";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [accountsLoaded, setAccountsLoaded] = useState(false);
  const [familyMembersLoaded, setFamilyMembersLoaded] = useState();
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAccounts()).then(() => setAccountsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    dispatch(sessionActions.getFamilyMembers()).then(() =>
      setFamilyMembersLoaded(true)
    );
  }, [dispatch]);

  // async function handleClick(e) {
  //   const data = await dispatch(getAccounts());
  //   console.log(data);
  // }

  // \  //want to call if an add or subtract opp happens
  // useEffect(() => {
  //   if (!familyMembersLoaded) {
  //     (async () => {
  //       await dispatch(getFamilyMembers());
  //       setFamilyMembersLoaded(true);
  //     })();
  //   }
  // }, [dispatch, familyMembersLoaded]);

  return (
    <>
      {isLoaded && (
        <>
          <Navigation isLoaded={isLoaded} />
          <Switch>
            <Route path="/" exact>
              <div className="flex flex-col">
                <div>
                  <h1>Hello world</h1>
                  {/* <button onClick={handleClick}>Test</button> */}
                </div>
                <div className=" content-end">
                  <div className="mt-auto">
                    <Header title="Wallets"></Header>
                    {accountsLoaded && <Table />}
                  </div>
                </div>
              </div>
            </Route>
            <Route path="/sign-up" exact>
              <SignupFormPage />
            </Route>
            <Route path="/login" exact>
              <LoginForm />
            </Route>
            <Route path="/settings" exact>
              <Settings />
            </Route>
          </Switch>
        </>
      )}
    </>
  );
}

export default App;
