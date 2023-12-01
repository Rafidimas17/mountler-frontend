import React, { Component } from "react";
import Header from "../parts/Header";
import { Redirect } from "react-router-dom";
import Button from "../elements/Button";
import { TicketNotFound } from "../assets";
import WhatsAppButton from "../elements/WaButton";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Breadcrumb from "../elements/Breadcrumb";

class TicketActive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("token"),
      breadcrumb: [
        { pageTitle: "Beranda", pageHref: "" },
        { pageTitle: "Pesanan saya", pageHref: "" },
      ],
      orders: [], // Menambah state untuk menyimpan data pesanan dari API
    };
  }

  componentDidMount() {
    const { token } = this.state;
    document.title = "Cakrawala | Pesanan";
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.id;
    axios
      .get(`${process.env.REACT_APP_HOST}/api-v1/dashboard/${userId}`)
      .then((response) => {
        const data = response.data;
        const sortedOrders = data.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB.getTime() - dateA.getTime(); // Mengurutkan dari yang terbaru ke yang terlama
        });
        this.setState({ orders: sortedOrders });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  render() {
    const { token, orders, breadcrumb } = this.state;
    if (!token) {
      return <Redirect to="/login" />;
    }

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
      return dateA - dateB; // Mengurutkan dari yang terbaru ke yang terlama
    });

    // Mengambil data terbaru
    const latestOrder = sortedOrders[0];

    const filteredOrders = orders.filter(
      (order) =>
        (order.payments.payment_status === "paid" &&
          order.boarding.boarding_status === "Registrasi") ||
        order.boarding.boarding_status === "check-in"
    );
    const inactiveOrder = sortedOrders.find(
      (item) =>
        item.boarding.boarding_status === "Registrasi" ||
        item.boarding.boarding_status === "check-in"
    );

    return (
      <>
        <Header {...this.props} data={token}></Header>
        <div
          className="container"
          style={{
            marginTop: 10,
            zIndex: 2,
          }}>
          <Breadcrumb data={breadcrumb} />
          <div className="row d-flex justify-content-between">
            <div className="col-lg-12">
              <div className="personal">
                <h3 className="title-inform mt-2">Pesanan saya</h3>
              </div>
              {!inactiveOrder ? (
                <div className="ticket-information">
                  <img
                    src={TicketNotFound}
                    className="image-not-found"
                    alt="image if not item found"
                  />
                  <h6>Tidak ada ticket aktif </h6>
                  <p>
                    Semua ticketmu akan ditampilkan disini. <br />
                    <span className="info-ticket">
                      Yuk rencanakan pendakianmu sekarang!
                    </span>{" "}
                  </p>
                </div>
              ) : (
                // Display active orders
                filteredOrders.map((order) => (
                  <div className="ticket-information-found" key={order._id}>
                    <div className="row d-flex justify-content-between">
                      <div className="col-6 col-lg-2 d-block order-1 pb-4">
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
                      <div className="col-6 col-lg-2 order-3 pb-4 d-block justify-content-space-between">
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
                          {formatDate(order.bookingStartDate)}
                        </h6>
                      </div>
                      <div className="col-6 col-lg-2 order-4">
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
                          {formatDate(order.bookingEndDate)}
                        </h6>
                      </div>
                      {order.boarding.boarding_status === "Registrasi" ? (
                        // Jika status pembayaran adalah "Proses"
                        <>
                          <div className="d-lg-block d-none col-lg-2 order-2">
                            <h6
                              style={{
                                fontFamily: "Poppins",
                                fontSize: 16,
                                color: "#F8DE22",
                                backgroundColor: "white",
                                border: "1px solid #F8FDCF",
                                borderRadius: 8,
                                textAlign: "center",
                                lineHeight: 2,
                                fontWeight: 500,
                              }}>
                              Boarding
                            </h6>
                          </div>
                          <div className="d-block d-lg-none col-6 order-2">
                            <h6
                              style={{
                                fontFamily: "Poppins",
                                fontSize: 16,
                                color: "#F8DE22",
                                backgroundColor: "white",
                                border: "1px solid #F8FDCF",
                                borderRadius: 8,
                                textAlign: "center",
                                lineHeight: 2,
                                fontWeight: 500,
                              }}>
                              Boarding
                            </h6>
                          </div>
                        </>
                      ) : order.boarding.boarding_status === "check-in" ? (
                        // Jika status pembayaran bukan "Proses"
                        <>
                          <div className="d-lg-block d-none col-lg-2 order-2">
                            <h6
                              style={{
                                fontFamily: "Poppins",
                                fontSize: 16,
                                color: "#A8DF8E",
                                backgroundColor: "white",
                                border: "1px solid #F3FDE8",
                                borderRadius: 8,
                                textAlign: "center",
                                lineHeight: 2,
                                fontWeight: 500,
                              }}>
                              Check-in
                            </h6>
                          </div>
                          <div className="d-block d-lg-none col-6 order-2">
                            <h6
                              style={{
                                fontFamily: "Poppins",
                                fontSize: 16,
                                color: "#A8DF8E",
                                backgroundColor: "white",
                                border: "1px solid #F3FDE8",
                                borderRadius: 8,
                                textAlign: "center",
                                lineHeight: 2,
                                fontWeight: 500,
                              }}>
                              Check-in
                            </h6>
                          </div>
                        </>
                      ) : (
                        ""
                      )}

                      {order.payments.payment_status === "waiting" ? (
                        <div className="col-12 col-lg-3 order-5 d-flex align-items-center justify-content-center">
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
                              style={{
                                fontFamily: "Poppins",
                                fontSize: 14,
                                fontWeight: 500,
                              }}>
                              Paid now
                            </Button>
                          </a>
                        </div>
                      ) : order.payments.payment_status === "paid" ? (
                        <div className="col-12 col-lg-3 order-5 d-flex align-items-center justify-content-center">
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
                        </div>
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
        <WhatsAppButton />
      </>
    );
  }
}

export default TicketActive;
