import React from "react";

import Button from "../elements/Button";
import BrandIcon from "./IconText";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

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
    <header className="spacing-sm">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light">
          <BrandIcon />
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className={`nav-item${getNavLinkClass("/")}`}>
                <Button className="nav-link" type="link" href="/">
                  Home
                </Button>
              </li>
              <li className={`nav-item${getNavLinkClass("/porter")}`}>
                <Button className="nav-link" type="link" href="/porter">
                  Porter Order
                </Button>
              </li>
              <li className={`nav-item${getNavLinkClass("/stories")}`}>
                <Button className="nav-link" type="link" href="/stories">
                  Stories
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
                      backgroundColor: "white",
                      border: "none",
                      color: "#152C58",
                      outline: "none",
                    }}>
                    Halo, {decodedValue.username}
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
                    <Link
                      to="pesanan"
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
                        href="/menunggu-pembayaran">
                        Menunggu pembayaran
                      </Button>
                    </Link>
                    <Link
                      to="tiket-aktif"
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
