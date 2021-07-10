import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LoginForm from "./components/LoginFormModal/LoginForm";
import Settings from "./components/Settings";
import { getAccounts } from "./store/account";
import Table from "./components/Table";
import Header from "./components/Controls/Header";
import BarChar from "./components/Charts/Bar";
import DemoUser from "./components/DemoUser";
import Dashboard from "./components/Dashboard";
import Splash from "./components/Splash";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

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
              <div>
                <Dashboard />
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
            <Route path="/demo-user">
              <DemoUser />
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
