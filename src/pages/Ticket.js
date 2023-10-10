import React, { Component } from "react";
import Sidebar from "../parts/Sidebar";
import { LogoTicket, QRCode } from "../assets";
import { Redirect } from "react-router-dom";
import Header from "../parts/Header";

class Ticket extends Component {
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
        <Header {...this.props} data={token} />
        <div
          className="container"
          style={{
            marginTop: 60,
            zIndex: 2,
          }}>
          <div className="row d-flex justify-content-between">
            <Sidebar />
            <div className="col-8">
              <div className="ticket-card">
                <div className="header-ticket d-flex justify-content-between pt-2 px-4 align-items-center">
                  <img src={LogoTicket} />
                  <h5 className="booking-number pr-4">MSYASBAJ</h5>
                </div>
                <div className="row justify-content-between p-4">
                  <div className="identity-information col-8">
                    <div className="destination">
                      <h5>Gunung Rinjani </h5>
                      <h5> | </h5>
                      <h5>Sembalun</h5>
                    </div>
                    <h5 className="nameUser">Rafi Dimas Ariyanto</h5>
                    <h5 className="idUser">23745265467325467</h5>
                    <div className="dateHiking row">
                      <div className="col-6">
                        <h5 className="title-date">Tanggal Naik</h5>
                        <h5 className="date-value">17 September 2023</h5>
                      </div>
                      <div className="col-6">
                        <h5 className="title-date">Tanggal Naik</h5>
                        <h5 className="date-value">17 September 2023</h5>
                      </div>
                    </div>
                  </div>
                  <div className="qr-code-space col-4">
                    <h5 className="text-scan-title">
                      Pindai kode ini di Basecamp
                    </h5>
                    <img src={QRCode} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Ticket;
