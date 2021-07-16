import Zabo from "zabo-sdk-js";
import { csrfFetch } from "./csrf";

//crypfam === wallet
//zabo === account

const GET_ACCOUNT = "wallet/getAccount";
const GET_ACCOUNTS = "wallet/getAccounts";
const ADD_ACCOUNT = "wallet/addAccount";
const MODIFY_ACCOUNT = "wallet/modifyAccounts";
const REMOVE_ACCOUNT = "wallet/removeAccount";
const CLEAR_ACCOUNT_STORE = "wallet/clearAccounts";
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
  const { accounts } = data;
  dispatch(thunk(GET_ACCOUNTS, accounts));
  return accounts;
};

// take in array of accountIds

//ADD WALLETS
export const addAccount = (userId, zaboAccountObject) => async (dispatch) => {
  const response = await csrfFetch(`/api/accounts`, {
    // send Zabo account id and Crypfam userId in body
    method: "POST",
    body: JSON.stringify({ zaboAccountObject, userId }),
  });
  const data = await response.json();
  console.log(`here comes data`, data);
  dispatch(thunk(ADD_ACCOUNT, data));
  return response;
};

export const modifyAccountAccess = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/accounts`, {
    // send Zabo account id and Crypfam userId in body
    method: "PATCH",
    //pass in the object as an array to process via Promise.all on the server
    body: JSON.stringify(Object.values(payload)),
  });
  const data = await response.json();
  dispatch(thunk(MODIFY_ACCOUNT, data));
  return response;
};

//ADD WALLETS
export const deleteAccount = (accountId) => async (dispatch) => {
  const response = await csrfFetch(`/api/accounts/${accountId}`, {
    // send Zabo account id and Crypfam userId in body (userId can be null)
    method: "DELETE",
  });
  const data = await response.json();
  console.log(data);
  dispatch(thunk(REMOVE_ACCOUNT, data.accountId));
  return response;
};

export const clearAccountStore = () => async (dispatch) => {
  //clear the account
  dispatch(thunk(CLEAR_ACCOUNT_STORE, null));
  return null;
};

const initialState = { wallet: null, all: {} };

const accountReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ACCOUNT:
      newState = Object.assign({}, state);
      newState.account = action.payload;
      return newState;
    case GET_ACCOUNTS:
      newState = Object.assign({}, state);
      //console.log(action.payload);
      for (const account in action.payload) {
        newState.all[action.payload[account].id] = action.payload[account]; // should be the same just a : wimilq4
      }
      return newState;
    case ADD_ACCOUNT:
      newState = Object.assign({}, state);
      newState.all[action.payload.id] = action.payload;
      return { ...newState, all: { ...newState.all } };
    case REMOVE_ACCOUNT:
      delete state.all[action.payload];
      return {
        ...state,
        all: { ...state.all },
      };
    case MODIFY_ACCOUNT:
      newState = Object.assign({}, state);
      newState.modifiedAccounts = action.payload;
      return newState;
    case CLEAR_ACCOUNT_STORE:
      newState = Object.assign({}, state);
      newState = initialState;
      return newState;
    default:
      return state;
  }
};

export default accountReducer;
