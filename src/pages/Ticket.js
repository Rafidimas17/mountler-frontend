import React, { Component } from "react";
import Sidebar from "../parts/Sidebar";
import { LogoTicket, QRCode } from "../assets";
import { Redirect } from "react-router-dom";
import Header from "../parts/Header";
import axios from "axios";
import Breadcrumb from "../elements/Breadcrumb";
import Tabs from "../elements/Tabs";
import "./tabs.css";
class Ticket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("token"),
      params: "",
      isLoading: true,
      error: null,
      display: "d-flex",
      status: "",
      dataItem: {},
      ticketData: [],
      breadcrumb: [
        { pageTitle: "Beranda", pageHref: "" },
        { pageTitle: "Pesanan saya", pageHref: "" },
      ],
    };
  }
  handleStatus = (index) => {
    this.setState({ status: index });
  };
  componentDidMount() {
    const { match } = this.props;
    const paramsId = match.params.id;
    this.setState({ params: paramsId });

    const url = `${process.env.REACT_APP_HOST}/api-v1/ticket-show/${paramsId}`;
    axios
      .get(url)
      .then((response) => {
        // Setel data yang diterima dari API ke dalam state ticketData
        this.setState({ ticketData: response.data.payload, isLoading: false });
      })
      .catch((error) => {
        this.setState({
          error: error.message, // Handle error
          isLoading: false, // Set loading to false
        });
      });
  }

  render() {
    const {
      token,
      breadcrumb,
      isLoading,
      ticketData,
      error,
      display,
      status,
      dataItem,
    } = this.state;

    if (!token) {
      return <Redirect to="/login" />;
    }

    if (isLoading) {
      return (
        <div className="container">
          <div
            className="row align-items-center justify-content-center text-center"
            style={{ height: "100vh" }}>
            <div className="col-3">
              <div className="spinner-grow text-light" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-light" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-light" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-light" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-light" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      ); // Display a loading message or spinner
    }

    if (error) {
      return <div>Error: {error}</div>; // Display an error message
    }

    if (ticketData) {
      const tabsData = [
        {
          title: <>Tiket</>,
          content: (
            <>
              <div className="row d-flex justify-content-center">
                {/* <Sidebar /> */}
                <div
                  className="col-lg-8 col-sm-12 d-flex flex-column"
                  style={{ gap: 16 }}>
                  {ticketData.memberData.map((item) => {
                    return (
                      <div className="ticket-card">
                        <div className="header-ticket d-flex justify-content-between pt-2 px-4 align-items-center">
                          <img src={LogoTicket} />
                          <h5 className="booking-number pr-4">
                            {this.state.ticketData.invoice}
                          </h5>
                        </div>
                        <div className="row justify-content-between p-4 mb-4">
                          <div className="identity-information col-lg-8 col-sm-12 mb-4">
                            <div className="destination">
                              <h5> {this.state.ticketData.item}</h5>
                              <h5> | </h5>
                              <h5> {this.state.ticketData.track}</h5>
                            </div>
                            <h5 className="nameUser">{item.nama}</h5>
                            <h5 className="idUser">{item.no_id}</h5>
                            <div className="dateHiking row">
                              <div className="col-6">
                                <h5 className="title-date">Tanggal Naik</h5>
                                <h5 className="date-value">
                                  {this.state.ticketData.startDate}
                                </h5>
                              </div>
                              <div className="col-6">
                                <h5 className="title-date">Tanggal Turun</h5>
                                <h5 className="date-value">
                                  {" "}
                                  {this.state.ticketData.endDate}
                                </h5>
                              </div>
                            </div>
                          </div>
                          <div className="qr-code-space col-lg-4 col-sm-12">
                            <h5 className="text-scan-title">
                              Pindai kode ini di Basecamp
                            </h5>
                            <img
                              src={`${process.env.REACT_APP_HOST}${item.qrStart}`}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ),
        },
        {
          title: <>Porter</>,
          content: (
            <>
              <div className="row d-flex justify-content-center">
                {/* <Sidebar /> */}
                <div
                  className="col-lg-8 col-sm-12 d-flex flex-column"
                  style={{ gap: 16 }}>
                  {ticketData.porterData.map((item) => {
                    return (
                      <div className="ticket-card">
                        <div className="header-ticket d-flex justify-content-between pt-2 px-4 align-items-center">
                          <img src={LogoTicket} />
                          <h5 className="booking-number pr-4">
                            {this.state.ticketData.invoice}
                          </h5>
                        </div>
                        <div className="row justify-content-between p-4 mb-4">
                          <div className="identity-information col-lg-8 col-sm-12 mb-4">
                            <div className="destination">
                              <h5> {this.state.ticketData.item}</h5>
                              <h5> | </h5>
                              <h5> {this.state.ticketData.track}</h5>
                            </div>
                            <h5 className="nameUser">{item.name}</h5>
                            <h5 className="idUser">{item.noHandphone}</h5>
                            <div className="dateHiking row">
                              <div className="col-6">
                                <h5 className="title-date">Tanggal Naik</h5>
                                <h5 className="date-value">
                                  {this.state.ticketData.startDate}
                                </h5>
                              </div>
                              <div className="col-6">
                                <h5 className="title-date">Tanggal Turun</h5>
                                <h5 className="date-value">
                                  {" "}
                                  {this.state.ticketData.endDate}
                                </h5>
                              </div>
                            </div>
                          </div>
                          {/* <div className="qr-code-space col-lg-4 col-sm-12">
                            <h5 className="text-scan-title">
                              Pindai kode ini di Basecamp
                            </h5>
                            <img
                              src={`${process.env.REACT_APP_HOST}${item.qrStart}`}
                            />
                          </div> */}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ),
        },
      ];

      return (
        <>
          <Header {...this.props} data={token} />
          <div
            className="container"
            style={{
              marginTop: 60,
              zIndex: 2,
            }}>
            <Tabs
              tabsData={tabsData}
              display={display}
              handleActive={this.handleStatus}
            />
          </div>
        </>
      );
    }

    return null;
  }
}
export default Ticket;
