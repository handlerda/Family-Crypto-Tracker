import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LoginForm from "./components/LoginFormModal/LoginForm";
import ZaboPopup from "./components/controls/ZaboPopup";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <Switch>
          <Route path="/" exact>
            <Navigation isLoaded={isLoaded} />
          </Route>
          <Route path="/sign-up" exact>
            <Navigation isLoaded={isLoaded} />
            <SignupFormPage />
          </Route>
          <Route path="/login" exact>
            <Navigation isLoaded={isLoaded} />
            <LoginForm />
          </Route>
          {/* <Route path="/connect" exact>
            <Navigation isLoaded={isLoaded} />
            <ZaboPopup />
          </Route> */}
        </Switch>
      )}
    </>
  );
}

export default App;
