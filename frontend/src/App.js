import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LoginForm from "./components/LoginFormModal/LoginForm";
import Settings from "./components/Settings";
import Dashboard from "./components/Dashboard";
import Splash from "./components/Splash";
import { get } from "js-cookie";
import { getAccounts } from "./store/account";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);
  const [accountsLoaded, setAccountsLoaded] = useState(false);
  const user = useSelector((state) => state.session.user);
  const accounts = useSelector((state) => state.account.all);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    if (isLoaded && !accountsLoaded)
      (async () => {
        await dispatch(getAccounts());
        setAccountsLoaded(true);
      })();
  });

  if (isLoaded) {
    return (
      isLoaded && (
        <div>
          <Navigation isLoaded={isLoaded} />
          <Switch>
            <Route path="/" exact>
              {user ? history.push("/dashboard") : <Splash />}
            </Route>
            <Route path="/dashboard" exact>
              <div>{accountsLoaded && <Dashboard />}</div>
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
        </div>
      )
    );
  } else {
    return <h1>loading</h1>;
  }
}

export default App;
