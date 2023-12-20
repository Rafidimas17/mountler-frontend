import React, { useState } from "react";
import Button from "../elements/Button";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Ganti ini dengan library ikon yang Anda gunakan
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"; // Ganti ini dengan ikon mata dan mata tertutup yang sesuai
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
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const signupClick = () => {
    const data = {
      username: username,
      email: email,
      password: password,
    };
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_ACCESS_KEY}`,
      },
    };
    axios
      .post(`${process.env.REACT_APP_HOST}/api-v1/signup`, data, axiosConfig)
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
        }, 2000);
      });
  };

  return (
    <>
      <div className="container">
        {/* <Header isCentered /> */}
        <div className="row">
          <div className="col-tag col-6 d-md-block d-none">
            <CardWelcome />
          </div>
          <div className="col-md-6 col-sm-12 p-5">
            <div className="container">
              <h5 className="title-signup">Sign up</h5>
              <p className="tagline-welcome mt-2">
                Buat akun dan mulai petualanganmu!
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
                  <h4>Password</h4>
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
                      onChange={passwordHandler}
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
