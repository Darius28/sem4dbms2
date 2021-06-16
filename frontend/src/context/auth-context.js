import { useReducer, useContext, createContext } from "react";
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user,
};

export const UserContext = createContext({
  user: null,
});

const rootReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
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
