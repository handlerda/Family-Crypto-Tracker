import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LoginForm from "./components/LoginFormModal/LoginForm";
import ZaboPopup from "./components/controls/ZaboPopup";
import Settings from "./components/Settings";
import { getWallet } from "./store/wallet";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  async function handleClick(e) {
    const data = await dispatch(getWallet("123455"));
    console.log(data);
  }

  return (
    <>
      {isLoaded && (
        <>
          <Navigation isLoaded={isLoaded} />
          <Switch>
            <Route path="/" exact>
              <div>
                <h1>Hello world</h1>
                <button onClick={handleClick}>Test</button>
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
