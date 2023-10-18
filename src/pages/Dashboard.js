import React, { Component } from "react";
import Header from "../parts/Header";
import Sidebar from "../parts/Sidebar";
import { Redirect } from "react-router-dom";
import Button from "../elements/Button";
import { TicketNotFound } from "../assets";
import axios from "axios";
import jwt_decode from "jwt-decode";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("token"),
      orders: [], // Menambah state untuk menyimpan data pesanan dari API
    };
  }

  componentDidMount() {
    const { token } = this.state;
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.id;
    axios
      .get(`${process.env.REACT_APP_HOST}/api-v1/dashboard/${userId}`)
      .then((response) => {
        const data = response.data;
        this.setState({ orders: data }); // Menyimpan data pesanan dari API ke dalam state
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  render() {
    const { token, orders } = this.state;
    if (!token) {
      return <Redirect to="/login" />;
    }

    // console.log(orders);
    // orders.map((item) => {
    //   console.log(item.payments.payment_status);
    // });

    function formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.getMonth() + 1; // Ingat bulan dimulai dari 0
      const year = date.getFullYear();

      // Menggunakan template string untuk menghasilkan format "dd-mm-yyyy"
      return `${day}-${month}-${year}`;
    }

    const sortedOrders = orders.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA; // Mengurutkan dari yang terbaru ke yang terlama
    });

    // Mengambil data terbaru
    const latestOrder = sortedOrders[0];

    const filteredOrders = orders.filter(
      (order) => order.payments.payment_status === "waiting"
    );
    return (
      <>
        <Header {...this.props} data={token}></Header>
        <div
          className="container"
          style={{
            marginTop: 60,
            zIndex: 2,
          }}>
          <div className="row d-flex justify-content-between">
            <Sidebar />
            <div className="col-8">
              <div className="personal">
                <h3 className="title-inform mt-2">Your Orders</h3>
                <button id="history-order">Riwayat Pesanan</button>
              </div>
              {orders.length === 0 ? (
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
              ) : (
                orders.map((order) => (
                  <div className="ticket-information-found" key={order._id}>
                    <div className="row d-flex justify-content-start">
                      <div className="col-2 d-block">
                        <h3
                          style={{
                            fontFamily: "Poppins",
                            fontSize: 18,
                            fontWeight: 600,
                          }}>
                          Invoice
                        </h3>
                        <h6
                          style={{
                            fontFamily: "Poppins",
                            fontSize: 16,
                            fontWeight: 500,
                          }}>
                          {order.invoice}
                        </h6>
                      </div>
                      <div className="col-3 d-block justify-content-space-between">
                        <h3
                          style={{
                            fontFamily: "Poppins",
                            fontSize: 18,
                            fontWeight: 600,
                          }}>
                          Tanggal Naik
                        </h3>
                        <h6
                          style={{
                            fontFamily: "Poppins",
                            fontSize: 16,
                            fontWeight: 500,
                          }}>
                          {formatDate(latestOrder.bookingStartDate)}
                        </h6>
                      </div>
                      <div className="col-4">
                        <h3
                          style={{
                            fontFamily: "Poppins",
                            fontSize: 18,
                            fontWeight: 600,
                          }}>
                          Tanggal Turun
                        </h3>
                        <h6
                          style={{
                            fontFamily: "Poppins",
                            fontSize: 16,
                            fontWeight: 500,
                          }}>
                          {formatDate(latestOrder.bookingEndDate)}
                        </h6>
                      </div>
                      {order.payments.payment_status === "waiting" ? (
                        <div className="col-2 d-flex align-items-center justify-content-center">
                          <a
                            href={
                              order.payments.midtrans_url
                                ? order.payments.midtrans_url.replace(/"/g, "")
                                : ""
                            }
                            target="_blank"
                            rel="noopener noreferrer">
                            <button
                              className="btn btn-primary"
                              style={{
                                fontFamily: "Poppins",
                                fontSize: 14,
                                fontWeight: 500,
                              }}>
                              Paid now
                            </button>
                          </a>
                        </div>
                      ) : order.payments.payment_status === "paid" ? (
                        <a
                          href={
                            order.payments.midtrans_url
                              ? order.payments.midtrans_url.replace(/"/g, "")
                              : ""
                          }
                          target="_blank"
                          rel="noopener noreferrer">
                          <Button
                            className="btn btn-primary"
                            type="link"
                            href={`/ticket-show/${order._id}`}
                            style={{
                              fontFamily: "Poppins",
                              fontSize: 14,
                              fontWeight: 500,
                            }}>
                            Show ticket
                          </Button>
                        </a>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Dashboard;
