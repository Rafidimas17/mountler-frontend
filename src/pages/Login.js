import React, { useState } from "react";
import Cookies from "js-cookie";
import Button from "../elements/Button";
import CardWelcome from "../parts/CardWelcome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Ganti ini dengan library ikon yang Anda gunakan
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"; // Ganti ini dengan ikon mata dan mata tertutup yang sesuai

import { Link, Redirect } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [direct, setRedirect] = useState(false);
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  // const [password, setPassword] = useState("");

  const usernameChange = (e) => {
    const usernameUser = e.target.value;
    setUsername(usernameUser);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    const data = {
      username: username,
      password: password,
    };
    const accessKey = process.env.REACT_APP_ACCESS_KEY;

    axios
      .post(`${process.env.REACT_APP_HOST}/api-v1/login`, data, {
        headers: {
          Authorization: `Bearer ${accessKey}`,
        },
      })
      .then((result) => {
        if (result) {
          // console.log(result);
          // Save the token in a cookie
          Cookies.set("token", result.data.token, { expires: 7 }); // Adjust the expiry as needed
          setRedirect(true);
        }
      })
      .catch((e) => {
        setError(e.response.data.message);
        setTimeout(() => {
          setError("");
        }, 2000);
      });
  };
  return (
    <>
      {direct && <Redirect to="/" />}
      <div className="container">
        <div className="row">
          <div className="col-tag col-6 d-md-block d-none">
            <CardWelcome />
          </div>
          <div className="col-md-6 col-sm-12 p-5">
            <div className="container">
              <h5 className="title-signup">Login</h5>
              <p className="tagline-welcome mt-2">
                Belum punya akun?{" "}
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
                  <h4 htmlFor="exampleInputusername">Username/email</h4>
                  <input
                    type="text"
                    value={username}
                    className="form-control"
                    onChange={usernameChange}
                    id="exampleInputusername1"
                    aria-describedby="usernameHelp"
                    placeholder="username / email"
                  />
                </div>
                <div className="form-group">
                  {/* <h4 htmlFor="exampleInputPassword">
                    Password
                    <Link to="/forgotpassword">
                      <span
                        htmlFor="exampleForgotPassword"
                        className="forgot-password float-right">
                        Forgot Password?
                      </span>
                    </Link>
                  </h4> */}
                  <h4 htmlFor="exampleInputusername">Password</h4>
                  <div
                    class="inputForm"
                    style={{
                      fontFamily: "Poppins",
                      border: "1px solid #5d5d5d",
                      borderRadius: 8,
                      height: "50px",
                      display: "flex",
                      alignItems: "center",
                      transition: "0.2s ease-in-out",
                    }}>
                    {/* <svg height="20" viewBox="-64 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path><path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path></svg>         */}

                    <input
                      type={showPassword ? "text" : "password"}
                      className="input-password"
                      placeholder="password"
                      value={password}
                      onChange={passwordChange}
                    />
                    <button
                      style={{ backgroundColor: "white", border: "none" }}
                      onClick={togglePasswordVisibility}>
                      <FontAwesomeIcon
                        icon={showPassword ? faEye : faEyeSlash}
                      />
                    </button>
                  </div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
