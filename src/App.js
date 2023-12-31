import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./assets/scss/style.scss";
import LandingPage from "./pages/LandingPage";
import Review from "./pages/Review";
import DetailsPage from "./pages/DetailsPage";
import Checkout from "./pages/Checkout";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import forgotPassword from "./pages/forgotpassword";
import Profile from "./pages/Profile";
import VerifyEmail from "./pages/verify/VerifyEmail";
import Dashboard from "./pages/Dashboard";
import Ticket from "./pages/Ticket";
import TicketActive from "./pages/TiketActive";
import History from "./pages/Riwayat";
import Porter from "./pages/Porter";
import Simulator from "./pages/Simulator";
import About from "./pages/About";
import Example from "./pages/Example";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage}></Route>
          <Route path="/menunggu-pembayaran" component={Dashboard}></Route>
          <Route path="/porter" component={Porter}></Route>
          <Route path="/riwayat" component={History}></Route>
          <Route path="/simulator" component={Simulator}></Route>
          <Route path="/pesanan-saya" component={TicketActive}></Route>
          <Route path="/login" component={LoginPage}></Route>
          <Route exact path="/profile" component={Profile}></Route>
          <Route path="/signup" component={SignupPage}></Route>
          <Route path="/review/:id" component={Review}></Route>
          <Route path="/tentang-kami" component={About}></Route>
          <Route path="/ticket-show/:id" component={Ticket}></Route>
          <Route path="/forgotpassword" component={forgotPassword}></Route>
          <Route path="/properties/:id" component={DetailsPage}></Route>
          <Route path="/checkout" component={Checkout}></Route>
          <Route path="/example" component={Example}></Route>
          <Route path="/verify-email/:tokenAktif" component={VerifyEmail} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
