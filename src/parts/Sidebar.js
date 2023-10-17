import React from "react";
import { Link } from "react-router-dom";

import { IconPersonal } from "../assets";
import { IconLogout } from "../assets";
import { IconMembership } from "../assets";
const Sidebar = () => {
  const removeToken = () => {
    localStorage.removeItem("token");
    window.location.reload(true);
  };
  return (
    <div
      className="account-space col-3 m-2 pb-2"
      style={{ width: "100%", height: "100%" }}>
      <div className="card mb-4 p-2 d-flex">
        <h2 className="account-profile mt-3 ml-2">Account</h2>
        {/* <div className="card-body"> */}
        <Link to="/dashboard" className="card-account text-decoration-none">
          <div className="account-inform mt-2 d-flex align-items-center">
            <img
              src={IconPersonal}
              alt="icon-personal"
              className="icon-title"
            />
            <h5 className="m-1">My Dashboard</h5>
          </div>
        </Link>
        <Link to="/profile" className="card-account text-decoration-none">
          <div className="account-inform mt-3  d-flex align-items-center">
            <img
              src={IconMembership}
              alt="icon-personal"
              className="icon-title"
            />
            <h5 className="m-1">Personal Information</h5>
          </div>
        </Link>
        <a
          onClick={() => removeToken()}
          className="card-account text-decoration-none">
          <div
            className="account-inform mt-4
                mb-5">
            <img src={IconLogout} alt="icon-personal" className="icon-title" />
            <h5 className="m-1">Logout</h5>
          </div>
        </a>

        {/* </div> */}
      </div>
    </div>
  );
};
export default Sidebar;
