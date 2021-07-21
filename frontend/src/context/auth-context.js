import { useReducer, useContext, createContext } from "react";
const user = JSON.parse(localStorage.getItem("user"));
const loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
const membership = JSON.parse(localStorage.getItem("membership"));

const initialState = {
  user,
  loggedIn,
  membership,
};

export const UserContext = createContext({
  user: null,
  loggedIn: null,
  membership: null,
});

const rootReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null, loggedIn: null };
    case "LOGGED_IN":
      return { ...state, loggedIn: action.payload };
    case "BUY_MEMBERSHIP":
      return { ...state, membership: action.payload };
    default:
      return state;
  }
};

export const UserProvider = (props) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};
