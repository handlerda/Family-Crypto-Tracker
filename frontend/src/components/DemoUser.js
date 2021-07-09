import React, { useEffect } from "react";
import * as sessionActions from "../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function DemoUser() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(sessionActions.signInDemoUser());
  }, [dispatch, user]);

  if (user) return <Redirect to="/" />;
  else return null;
}

export default DemoUser;
