import "./App.css";
import React, { useContext } from "react";
import MainLayout from "./components/MainLayout";
import { Switch, Route } from "react-router-dom";

import Workouts from "./components/Workouts/Workouts";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

import { UserContext } from "./context/auth-context";
import BuyMembership from "./components/Membership/BuyMembership";

function App() {
  const { state, dispatch } = useContext(UserContext);
  const isLoggedIn = state.loggedIn;
  console.log(isLoggedIn);
  return (
    <div className="app">
      <Switch>
        <Route path="/" exact>
          <MainLayout />
        </Route>
        <Route path="/membership/buy-membership" exact>
          <BuyMembership />
        </Route>
        <Route path="/workouts" exact>
          <Workouts />
        </Route>
        {isLoggedIn === null && (
          <>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/login" exact>
              <Login />
            </Route>
          </>
        )}
      </Switch>
    </div>
  );
}

export default App;
