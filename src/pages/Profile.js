import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../parts/Header";
import { IconPersonal } from "../assets";
import { IconLogout } from "../assets";
import { IconMembership } from "../assets";
import Sidebar from "../parts/Sidebar";
import { Redirect } from "react-router-dom";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("token"),
    };
  }
  render() {
    const { token } = this.state;
    if (!token) {
      return <Redirect to="/login" />;
    }
    return (
      <>
        <Header {...this.props} data={token}></Header>
        <div
          className="container"
          style={{
            marginTop: 60,
            zIndex: 2,
          }}>
          <div className="row">
            <Sidebar />
            <div className="personal-profile col m-2">
              <h2 className="ml-2 mt-3">Personal Information</h2>
              <hr></hr>
              {/* <span className="border-bottom">asa</span> */}
              <div className="information-user row m-1 border">
                <div className="col-1 d-flex align-items-center">
                  <img
                    src="https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="icon-personal"
                    className="user-photo"
                  />
                </div>
                <div className="col-7 ml-2">
                  <h4 className="name-user mx-auto mt-4 mb-0">
                    Furky R Syahroni
                  </h4>
                  {/* <h4></h4> */}
                </div>
              </div>
              <hr></hr>
              <h4 className="account-info mt-2">Account Information</h4>
              <div className="row m-1">
                <div className="first-col col-lg-6 ">
                  <h4 className="title-personal">Username</h4>
                  <h4 className="data-personal">Furky R</h4>
                  <h4 className="title-personal mt-3">No ID Card</h4>
                  <h4 className="data-personal">2333423432143234</h4>
                </div>
                <div className="last-col col-lg-6" style={{ height: "100%" }}>
                  <h4 className="title-personal">Email</h4>
                  <h4 className="data-personal">furky.syahroni@mountler.com</h4>

                  <h4 className="title-personal mt-3">No ID</h4>
                  <h4 className="data-personal">2333423432143234</h4>
                </div>
              </div>
              <hr></hr>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Profile;
