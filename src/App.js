import React from "react";
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import "./assets/scss/style.scss";
import LandingPage from "./pages/LandingPage";
import Example from "./pages/Example";
import DetailsPage from "./pages/DetailsPage";
import Checkout from "./pages/Checkout";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import forgotPassword from "./pages/forgotpassword";
import Profile from "./pages/Profile";
import VerifyEmail from "./pages/verify/VerifyEmail";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>

        <Route exact path="/" component={LandingPage}></Route>
        <Route path="/login" component={LoginPage}></Route>
        <Route path="/profile" component={Profile}></Route>
        <Route path="/signup" component={SignupPage}></Route>
        <Route path="/forgotpassword" component={forgotPassword}></Route>
        <Route exact path="/properties/:id" component={DetailsPage}></Route>
        <Route path="/checkout" component={Checkout}></Route>
        <Route path="/example" component={Example}></Route>
        <Route path="/verify-email/:tokenAktif" component={VerifyEmail} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
