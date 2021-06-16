import "./App.css";
import MainLayout from "./components/MainLayout";
import { Switch, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Shop from "./pages/Shop";

function App() {
  return (
    <div className="app">
      <Switch>
        <Route path="/" exact>
          <MainLayout />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/shop">
          <Shop />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
