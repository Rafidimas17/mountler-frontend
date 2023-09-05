import React, { useState } from "react";
import Button from "../elements/Button";
import CardWelcome from "../parts/CardWelcome";
import { IconGoogle } from "../assets";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [direct, setRedirect] = useState(false);
  const [error, setError] = useState("");

  const usernameChange = (e) => {
    const usernameUser = e.target.value;
    setUsername(usernameUser);
  };

  const passwordChange = (e) => {
    const passwordUser = e.target.value;
    setPassword(passwordUser);
  };

  const handleLogin = () => {
    const data = {
      username: username,
      password: password,
    };
    console.log(data);
    axios
      .post(`${process.env.REACT_APP_HOST}/api-v1/login`, data)
      .then((result) => {
        if (result) {
          console.log(result);
          localStorage.setItem("token", result.data.token);
          setRedirect(true);
        }
      })
      .catch((e) => {
        setError(e.response.data.message);
      });
  };
  return (
    <>
      {direct && <Redirect to="/" />}
      <div className="container">
        <div className="row">
          <div className="col-tag col-6">
            <CardWelcome />
          </div>
          <div className="col-6 p-5">
            <div className="container">
              <h5 className="title-signup">Login</h5>
              <p className="tagline-welcome mt-2">
                Don't have any account?{" "}
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  <span className="regist"> Register</span>
                </Link>
              </p>
              <div className="input-group-form">
                <div className="form-group">
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}
                  <h4 htmlFor="exampleInputusername">Email/Username</h4>
                  <input
                    type="text"
                    value={username}
                    className="form-control"
                    onChange={usernameChange}
                    id="exampleInputusername1"
                    aria-describedby="usernameHelp"
                    placeholder="example@example.com"
                  />
                </div>
                <div className="form-group">
                  <h4 htmlFor="exampleInputPassword">
                    Password
                    <Link to="/forgotpassword">
                      <span
                        htmlFor="exampleForgotPassword"
                        className="forgot-password float-right">
                        Forgot Password?
                      </span>
                    </Link>
                  </h4>
                  <input
                    type="password"
                    value={password}
                    onChange={passwordChange}
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="example"
                  />
                </div>

                <div className="form-group">
                  <Button
                    className="btn btn-shadow mt-4"
                    onClick={handleLogin}
                    style={{
                      borderRadius: 8,
                      backgroundColor: "#3252DF",
                      color: "white",
                      width: "100%",
                      height: "52px",
                      padding: "13px",
                      boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
                      fontSize: "15px",
                      fontFamily: "Poppins",
                    }}>
                    Login
                  </Button>
                </div>
                <div className="form-group mb-0 justify-content-center text-center">
                  <h4 className="text-center" htmlFor="exampleInputPassword">
                    OR
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
