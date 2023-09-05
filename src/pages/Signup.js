import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import CardWelcome from "../parts/CardWelcome";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const usernameHandler = (e) => {
    const nameUsername = e.target.value;
    setUsername(nameUsername);
  };

  const emailHandler = (e) => {
    const emailUser = e.target.value;
    setEmail(emailUser);
  };

  const passwordHandler = (e) => {
    const passwordUser = e.target.value;
    setPassword(passwordUser);
  };
  const tooglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const signupClick = () => {
    const data = {
      username: username,
      email: email,
      password: password,
    };
    axios
      .post(`${process.env.REACT_APP_HOST}/api-v1/signup`, data)
      .then((result) => {
        if (result) {
          if (result.data) {
            setUsername("");
            setEmail("");
            setPassword("");
            setAlert(result.data.message);
            setTimeout(() => {
              setAlert("");
              history.push("/login");
            }, 3000);
          }
        }
      })
      .catch((e) => {
        setError(e.response.data.message);
        setTimeout(() => {
          setError("");
        }, 5000);
      });
  };

  return (
    <>
      <div className="container">
        {/* <Header isCentered /> */}
        <div className="row">
          <div className="col-tag col-6 d-none d-md-block">
            <CardWelcome />
          </div>
          <div className="col-6 p-5">
            <div className="container">
              <h5 className="title-signup">Sign up</h5>
              <p className="tagline-welcome mt-2">
                Create your account and get started!
              </p>
              <div className="input-group-form">
                <div className="form-group">
                  {error && (
                    <div class="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}
                  {alert && (
                    <div class="alert alert-success" role="alert">
                      {alert}
                    </div>
                  )}
                  <h4 htmlFor="exampleInputUsername">Username</h4>
                  <input
                    type="text"
                    value={username}
                    onChange={usernameHandler}
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="example"
                  />
                </div>
                <div className="form-group">
                  <h4>Email</h4>
                  <input
                    type="email"
                    value={email}
                    onChange={emailHandler}
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="example@example.com"
                  />
                </div>
                <div className="form-group">
                  <div className="input-password">
                    <h4>Password</h4>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={passwordHandler}
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="example"
                    />
                    <div className="input-group-append align-items-center">
                      <label
                        className="input-group-text  mt-1"
                        style={{
                          backgroundColor: "white",
                          border: "0px",
                          fontFamily: "Poppins",
                        }}>
                        <input
                          type="checkbox"
                          style={{
                            marginRight: "5px",
                            transform: "scale(1.5)",
                          }}
                          checked={showPassword}
                          className="mr-2"
                          onChange={() => tooglePasswordVisibility()}
                        />
                        Show Password
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <button
                    className="btn btn-primary mt-3"
                    onClick={signupClick}>
                    Signup
                  </button>
                  {/* <button className="btn-signup">
                    <a href="/login" className="signup-link"></a>
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signup;
