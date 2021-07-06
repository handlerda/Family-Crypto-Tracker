import Zabo from "zabo-sdk-js";
import { csrfFetch } from "./csrf";

//crypfam === wallet
//zabo === account

const GET_ACCOUNT = "wallet/getAccount";
const GET_ACCOUNTS = "wallet/getAccounts";
const ADD_ACCOUNT = "wallet/addAccount";
const REMOVE_ACCOUNT = "session/removeAccount";

const thunk = (type, payload) => {
  return {
    type,
    payload,
  };
};

// GET SINGLE account
export const getAccount = (accountId) => async (dispatch) => {
  const response = await csrfFetch(`/api/accounts?id=${accountId}`, {
    method: "GET",
  });
  const data = await response.json();
  dispatch(thunk(GET_ACCOUNT, data.wallet));
  return response;
};

//GET MULTIPLE WALLETS
export const getAccounts = () => async (dispatch) => {
  // const response = await csrfFetch(`/api/wallet?userId=${userId}`, {
  //   method: "GET",
  // });
  // const data = await response.json();
  // dispatch(thunk(GET_WALLETS, data.wallets));
  // return response

  const response = await csrfFetch(`/api/accounts`);
  const data = await response.json();
  dispatch(thunk(GET_ACCOUNTS, data));
};

// take in array of accountIds

//ADD WALLETS
export const addAccount = (userId, zaboAccountObject) => async (dispatch) => {
  const response = await csrfFetch(`/api/account`, {
    // send Zabo account id and Crypfam userId in body
    method: "POST",
    body: JSON.stringify({ zaboAccountObject, userId }),
  });
  const data = await response.json();
  dispatch(thunk(ADD_ACCOUNT, data.wallet));
  return response;
};

//ADD WALLETS
export const deleteAccount =
  (userId = null, accountId) =>
  async (dispatch) => {
    const response = await csrfFetch(`/api/account`, {
      // send Zabo account id and Crypfam userId in body (userId can be null)
      method: "DELETE",
      body: JSON.stringify({ accountId, userId }),
    });
    const data = await response.json();
    dispatch(thunk(REMOVE_ACCOUNT, data.wallet));
    return response;
  };

const initialState = { wallet: null };

const accountReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ACCOUNT:
      newState = Object.assign({}, state);
      newState.account = action.payload;
      return newState;
    case GET_ACCOUNTS:
      newState = Object.assign({}, state);
      newState.accounts = action.payload;
      return newState;
    case ADD_ACCOUNT:
      newState = Object.assign({}, state);
      newState.addedAccount = action.payload;
      return newState;
    case REMOVE_ACCOUNT:
      newState = Object.assign({}, state);
      newState.removedAccount = action.payload;
      return newState;
    default:
      return state;
  }
};

export default accountReducer;
