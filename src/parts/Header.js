import React from "react";

import Button from "../elements/Button";
import BrandIcon from "./IconText";
import { Fade } from "react-awesome-reveal";

export default function Header(props) {
  const getNavLinkClass = (path) => {
    return props.location.pathname === path ? " active" : "";
  };

  const base64Url = props.data.split(".")[1];
  const decodedValue = JSON.parse(window.atob(base64Url));
  const removeToken = () => {
    localStorage.removeItem("token");
    window.location.reload(true);
  };
  if (props.isCentered)
    return (
      <header className="spacing-sm">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light">
            <Button className="brand-text-icon mx-auto" href="" type="link">
              Cakra<span className="text-gray-900">wala.</span>
            </Button>
          </nav>
        </div>
      </header>
    );

  return (
    <Fade>
      <header className="spacing-sm">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light">
            <BrandIcon />
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ml-auto">
                <li className={`nav-item${getNavLinkClass("/")}`}>
                  <Button className="nav-link" type="link" href="/">
                    Home
                  </Button>
                </li>
                <li className={`nav-item${getNavLinkClass("/browse-by")}`}>
                  <Button className="nav-link" type="link" href="/browse-by">
                    Porter Order
                  </Button>
                </li>
                <li className={`nav-item${getNavLinkClass("/stories")}`}>
                  <Button className="nav-link" type="link" href="/stories">
                    Stories
                  </Button>
                </li>
                <li className={`nav-item${getNavLinkClass("/agents")}`}>
                  {/* <Button
                    className="nav-link btn btn-shadow"
                    type="link"
                    href="/login"
                    style={{
                      borderRadius: 10,
                      backgroundColor: "#3252DF",
                      color: "#FDFDFD",
                    }}
                  >
                    Login
                  </Button> */}
                  <div className="dropdown">
                    <button
                      className="nav-link"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      style={{
                        fontFamily: "Poppins",
                        fontSize: 18,
                        backgroundColor: "white",
                        border: "none",
                        color: "#152C58",
                        outline: "none",
                      }}>
                      Halo, {decodedValue.username}👋
                    </button>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton">
                      <a
                        className="dropdown-item"
                        onClick={() => removeToken()}
                        style={{
                          fontFamily: "Poppins",
                          fontSize: 16,
                          border: "none",
                          outline: "none",
                        }}>
                        Logout
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </Fade>
  );
}
