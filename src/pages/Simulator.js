import React, { Component } from "react";
import Header from "../parts/Header";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

class Simulator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("token"),
      searchValue: "",
      statusResponse: "",
      status: false,
      dataSelected: {},
    };
  }
  handleInputChange = (event) => {
    this.setState({ searchValue: event.target.value });
    console.log(this.state.searchValue);
  };
  fetchData = async () => {
    const { searchValue } = this.state;

    try {
      const url = `${process.env.REACT_APP_HOST}/admin/status/scan-qr/${searchValue}`;
      axios.post(url).then((response) => {
        // Setel data yang diterima dari API ke dalam state ticketData
        this.setState({ statusResponse: response.data.message });
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  showSwal = (responsePayload) => {
    withReactContent(Swal)
      .fire({
        icon: "success",
        title: responsePayload.payload,
        showConfirmButton: false,
        timer: 1500,
      })
      .then(() => {
        // Redirect to the Midtrans URL after SweetAlert is closed
        window.location.href = responsePayload.midtrans_url;
      });
  };
  render() {
    const { token, searchValue } = this.state;
    return (
      <>
        <Header {...this.props} data={token} />;
        <div className="container" style={{ padding: 100 }}>
          <h5 className="text-primary text-center">
            Selamat datang di boarding simulator
          </h5>
          <h6 className="text-secondary text-center">
            Scan qr code pada ticket anda dengan memasukan copy image address{" "}
          </h6>
          <div className="row d-flex justify-content-center p-5">
            <div class="input-container">
              <input
                type="text"
                name="text"
                className="input"
                placeholder="Paste address qrcode mu disini"
                value={searchValue}
                onChange={this.handleInputChange}
              />
              <span className="icon" onClick={this.fetchData}>
                <svg
                  width="19px"
                  height="19px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      opacity="1"
                      d="M14 5H20"
                      stroke="#000"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"></path>{" "}
                    <path
                      opacity="1"
                      d="M14 8H17"
                      stroke="#000"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"></path>{" "}
                    <path
                      d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2"
                      stroke="#000"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"></path>{" "}
                    <path
                      opacity="1"
                      d="M22 22L20 20"
                      stroke="#000"
                      stroke-width="3.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"></path>{" "}
                  </g>
                </svg>
              </span>
            </div>
          </div>
        </div>
        ;
      </>
    );
  }
}

export default Simulator;