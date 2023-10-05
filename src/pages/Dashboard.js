import React, { Component } from "react";
import Header from "../parts/Header";
import Sidebar from "../parts/Sidebar";
import { Redirect } from "react-router-dom";
import Button from "../elements/Button";
import { TicketNotFound } from "../assets";

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
            <div className="col-8">
              <div className="personal">
                <h3 className="title-inform mt-2">Your Orders</h3>
                <button id="history-order">Riwayat Pesanan</button>
              </div>
              <div className="ticket-information">
                <img
                  src={TicketNotFound}
                  className="image-not-found"
                  alt="image if not item found"
                />
                <h6>Tidak ada ticket aktif </h6>
                <p>
                  Semua ticketmu akan ditampilkan disini. <br></br>
                  <span className="info-ticket">
                    Yuk rencanakan pendakianmu sekarang!
                  </span>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Profile;
