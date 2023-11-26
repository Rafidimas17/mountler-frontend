import React, { Component } from "react";
import Header from "../parts/Header";
import Breadcrumb from "../elements/Breadcrumb";
import { Redirect, Link } from "react-router-dom";
import Button from "../elements/Button";
import { TicketNotFound } from "../assets";
import axios from "axios";
import jwt_decode from "jwt-decode";

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("token"),
      breadcrumb: [
        { pageTitle: "Beranda", pageHref: "" },
        { pageTitle: "Riwayat transaksi", pageHref: "" },
      ],
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
    const { token, orders, breadcrumb } = this.state;
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
      (order) => order.boarding.boarding_status === "Selesai"
    );

    const inactiveOrder = sortedOrders.find(
      (item) => item.boarding.boarding_status === "Selesai"
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
                <h3 className="title-inform mt-2">Riwayat transaksi</h3>
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
                          {formatDate(latestOrder.bookingStartDate)}
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
                          {formatDate(latestOrder.bookingEndDate)}
                        </h6>
                      </div>
                      {order.boarding.boarding_status === "Selesai" ? (
                        // Jika status pembayaran adalah "Selesai"
                        <>
                          <div className="d-lg-block d-none col-lg-2 order-2">
                            <h6
                              style={{
                                fontFamily: "Poppins",
                                fontSize: 16,
                                color: "#333333",
                                backgroundColor: "white",
                                border: "1px solid #2D2D2D",
                                borderRadius: 8,
                                textAlign: "center",
                                lineHeight: 2,
                                fontWeight: 500,
                              }}>
                              Selesai
                            </h6>
                          </div>
                          <div className="d-block d-lg-none col-6 order-2">
                            <h6
                              style={{
                                fontFamily: "Poppins",
                                fontSize: 16,
                                color: "#333333",
                                backgroundColor: "white",
                                border: "1px solid #2D2D2D",
                                borderRadius: 8,
                                textAlign: "center",
                                lineHeight: 2,
                                fontWeight: 500,
                              }}>
                              Selesai
                            </h6>
                          </div>
                        </>
                      ) : (
                        // Jika status pembayaran bukan "Selesai"
                        <></>
                      )}

                      <div className="col-12 col-lg-3 order-5 d-flex align-items-center justify-content-center">
                        <Link to={`properties/${order.itemId._id}`}>
                          <Button
                            className="btn btn-primary"
                            style={{
                              fontFamily: "Poppins",
                              fontSize: 14,
                              fontWeight: 500,
                            }}>
                            Pesan lagi
                          </Button>
                        </Link>
                      </div>
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

export default History;
