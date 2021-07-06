import Zabo from "zabo-sdk-js";
import { csrfFetch } from "./csrf";

//crypfam === wallet
//zabo === account

const GET_WALLET = "wallet/getWallet";
const GET_WALLETS = "wallet/getWallets";
const ADD_WALLET = "wallet/addWallet";
const REMOVE_WALLET = "session/removeUser";

const thunk = (type, payload) => {
  return {
    type,
    payload,
  };
};

// GET SINGLE WALLET
export const getWallet = (walletId) => async (dispatch) => {
  const response = await csrfFetch(`/api/wallet?id=${walletId}`, {
    method: "GET",
  });
  const data = await response.json();
  dispatch(thunk(GET_WALLET, data.wallet));
  return response;
};

//GET MULTIPLE WALLETS
export const getWallets = () => async (dispatch) => {
  // const response = await csrfFetch(`/api/wallet?userId=${userId}`, {
  //   method: "GET",
  // });
  // const data = await response.json();
  // dispatch(thunk(GET_WALLETS, data.wallets));
  // return response

  const response = await csrfFetch(`/api/wallet`);
  const data = await response.json();
  console.log(data);
  // dispatch(thunk, data);
  // console.log(data);
  // return data;

  //initialize zabo object
  const zabo = await Zabo.init({
    clientId: process.env.REACT_APP_ZABO_CLIENT_ID,
    env: "sandbox",
  });

  try {
    const accountData = await Promise.all(
      data.accounts.map((account) => {
        return zabo.accounts.get(account.zaboId);
      })
    );

    console.log(accountData);
    dispatch(thunk(GET_WALLETS, accountData));
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
  // take in array of accountIds
};

//ADD WALLETS
export const addWallet = (userId, zaboAccountObject) => async (dispatch) => {
  const response = await csrfFetch(`/api/wallet`, {
    // send Zabo account id and Crypfam userId in body
    method: "POST",
    body: JSON.stringify({ zaboAccountObject, userId }),
  });
  const data = await response.json();
  dispatch(thunk(ADD_WALLET, data.wallet));
  return response;
};

//ADD WALLETS
export const deleteWallet =
  (userId = null, accountId) =>
  async (dispatch) => {
    const response = await csrfFetch(`/api/wallet`, {
      // send Zabo account id and Crypfam userId in body (userId can be null)
      method: "DELETE",
      body: JSON.stringify({ accountId, userId }),
    });
    const data = await response.json();
    dispatch(thunk(REMOVE_WALLET, data.wallet));
    return response;
  };

const initialState = { wallet: null };

const walletReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_WALLET:
      newState = Object.assign({}, state);
      newState.wallet = action.payload;
      return newState;
    case GET_WALLETS:
      newState = Object.assign({}, state);
      newState.wallets = action.payload;
      return newState;
    case ADD_WALLET:
      newState = Object.assign({}, state);
      newState.addedWallet = action.payload;
      return newState;
    case REMOVE_WALLET:
      newState = Object.assign({}, state);
      newState.removedWallet = action.payload;
      return newState;
    default:
      return state;
  }
};

export default walletReducer;
