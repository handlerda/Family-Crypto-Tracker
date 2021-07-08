import { csrfFetch } from "./csrf";
// calls the household api (when new account)
const SET_USER = "session/setUser";
// calls the user api (adds a user associated with an account)
const ADD_USER = "session/addUser";
const REMOVE_USER = "session/removeUser";
const GET_USERS = "session/getUsers";
const DELETE_USER = "session/deleteUser";

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const addUser = (user) => {
  return {
    type: ADD_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

const getUsers = (users) => {
  return {
    type: GET_USERS,
    payload: users,
  };
};

const deleteUser = (user) => {
  return {
    type: DELETE_USER,
    payload: user,
  };
};

//login thunk
export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};
//restore session user thunk
export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

//signup thunk
//calls the household api
export const signup =
  (
    firstName,
    lastName,
    email,
    phone,
    password,
    familyMembers,
    familyPassword
  ) =>
  async (dispatch) => {
    const response = await csrfFetch("/api/households", {
      method: "POST",
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phone,
        password,
        familyMembers,
        familyPassword,
      }),
    });
    const data = await response.json();
    console.log(data);
    dispatch(setUser(data.headHouseHold));
    return response;
  };

export const addNewFamilyMember = (member) => async (dispatch) => {
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify(member),
  });
  const data = await response.json();
  dispatch(addUser(data));
  return data;
};

export const deleteFamilyMember = (memberId) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${memberId}`, {
    method: "DELETE",
  });
  const data = await response.json();
  dispatch(deleteUser(data));
  return data;
};

//logout thunk
export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  dispatch(removeUser());
  return response;
};

export const getFamilyMembers = () => async (dispatch) => {
  const response = await csrfFetch("/api/users");
  const data = await response.json();
  dispatch(getUsers(data));
  console.log(`here comes data`, data);
  return data;
};

const initialState = { user: null, familyMembers: [] };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    case ADD_USER:
      newState = Object.assign({}, state);
      newState.newFamilyMember = action.payload;
      return newState;
    case GET_USERS:
      newState = Object.assign({}, state);
      newState.familyMembers = action.payload;
      return newState;
    case DELETE_USER:
      newState = Object.assign({}, state);
      newState.deletedFamilyMember = action.payload;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
