import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../elements/Button";
import BrandIcon from "./IconText";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Cookies from "js-cookie";

export default function Header(props) {
  const getNavLinkClass = (path) => {
    return props.location.pathname === path ? " active" : "";
  };
  const [isShowed, setIsShowed] = useState(false);
  const history = useHistory();
  const handleToggle = () => {
    setIsShowed(!isShowed);
  };
  const base64Url = props.data.split(".")[1];
  const decodedValue = JSON.parse(window.atob(base64Url));
  const removeToken = () => {
    Cookies.remove("token");

    history.push("/login");
  };
  if (props.isCentered)
    return (
      <header className="spacing-sm">
        <div className="container">
          <nav className="navbar d-flex justify-content-center navbar-light">
            <BrandIcon />
          </nav>
        </div>
      </header>
    );

  return (
    <header className="spacing-sm">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light">
          <BrandIcon />
          <button
            className="d-sm-block d-lg-none"
            type="button"
            onClick={handleToggle}
            data-bs-toggle="collapse"
            style={{ backgroundColor: "white", border: "none" }}
            data-bs-target="#navbarText"
            aria-controls="navbarText">
            <span>
              {isShowed ? (
                <i className="fa fa-times-circle fa-lg" aria-hidden="true"></i>
              ) : (
                <i className="fa fa-bars fa-lg" aria-hidden="true"></i>
              )}
            </span>
          </button>
          {/* </div> */}
          <div
            className={`collapse navbar-collapse justify-content-end ${
              isShowed ? "show" : ""
            }`}>
            <ul className="navbar-nav ml-auto">
              <li className={`nav-item${getNavLinkClass("/")}`}>
                <Button className="nav-link" type="link" href="/">
                  Beranda
                </Button>
              </li>
              <li className={`nav-item${getNavLinkClass("/porter")}`}>
                <Button className="nav-link" type="link" href="/porter">
                  Porter
                </Button>
              </li>
              <li className={`nav-item${getNavLinkClass("/tentang-kami")}`}>
                <Button className="nav-link" type="link" href="/tentang-kami">
                  Tentang Kami
                </Button>
              </li>
              <li>
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
                      fontSize: 16,
                      backgroundColor: " rgb(180, 230, 250)",
                      border: "none",
                      borderRadius: 8,
                      color: "#152C58",
                      outline: "none",
                    }}>
                    Halo, {decodedValue.username}
                    <span style={{ marginLeft: "5px" }}>&#9662;</span>
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                    style={{
                      gap: 8,
                      width: "220px",
                      margin: "20px 100px 0px -20px",
                    }}>
                    <h6
                      className="pl-4 mt-2"
                      style={{
                        fontFamily: "Poppins",
                        fontSize: 16,
                        border: "none",
                        outline: "none",
                        fontWeight: 600,
                      }}>
                      Akun saya
                    </h6>

                    <Button
                      className="nav-link pl-4"
                      type="link"
                      href="/menunggu-pembayaran"
                      style={{
                        fontFamily: "Poppins",
                        fontSize: 14,
                        border: "none",
                        outline: "none",
                        cursor: "pointer",
                        textDecoration: "none",
                        color: "#2A2A2A",
                      }}>
                      Menunggu pembayaran
                    </Button>

                    <Link
                      to="tiket-aktif"
                      className="nav-item"
                      style={{ textDecoration: "none", color: "#2A2A2A" }}>
                      <Button
                        className="nav-link pl-4"
                        type="link"
                        style={{
                          fontFamily: "Poppins",
                          fontSize: 14,
                          border: "none",
                          outline: "none",
                          cursor: "pointer",
                          textDecoration: "none",
                          color: "#2A2A2A",
                        }}
                        href="/pesanan-saya">
                        Pesanan saya
                      </Button>
                    </Link>
                    <Link
                      to="riwayat"
                      style={{ textDecoration: "none", color: "#2A2A2A" }}>
                      <Button
                        className="nav-link pl-4"
                        type="link"
                        style={{
                          fontFamily: "Poppins",
                          fontSize: 14,
                          border: "none",
                          outline: "none",
                          cursor: "pointer",
                          textDecoration: "none",
                          color: "#2A2A2A",
                        }}
                        href="/riwayat">
                        Riwayat transaksi
                      </Button>
                    </Link>

                    <a
                      className="dropdown-item"
                      style={{
                        fontFamily: "Poppins",
                        fontSize: 14,
                        border: "none",
                        outline: "none",
                        cursor: "pointer",
                        textDecoration: "none",
                        color: "#2A2A2A",
                      }}
                      onClick={() => removeToken()}>
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
  );
}
