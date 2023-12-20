import React, { Component } from "react";
import Cookies from "js-cookie";
import Header from "../parts/Header";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { withRouter } from "react-router-dom";
import Review from "./Review";
import Button from "../elements/Button";
class Simulator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: Cookies.get("token"),
      searchValue: "",
      statusResponse: "",
      status: false,
      invoice: "",
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
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ACCESS_KEY}`,
        },
      };
      const url = `${process.env.REACT_APP_HOST}/admin/status/scan-qr`;
      const response = await axios.post(
        url,
        {
          imageUrl: searchValue,
        },
        axiosConfig
      );

      this.setState({ invoice: response.data.invoice_end });
      this.showSwal(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  showSwal = (responsePayload) => {
    withReactContent(Swal)
      .fire({
        icon: "success",
        title: responsePayload.message,
        showConfirmButton: false,
        timer: 1500,
      })
      .then(() => {
        this.setState({ searchValue: "" });
        // Assuming responsePayload is defined somewhere
        if (responsePayload.status === "end") {
          // Add the "invoice_end" parameter to the URL

          const url = responsePayload.url; // or fetch it from responsePayload or elsewhere
          this.props.history.push(`/review/${url}`);
        }
      });
  };

  componentDidMount() {
    document.title = "Cakrawala | Simulator";
  }

  render() {
    const { token, searchValue } = this.state;
    return (
      <>
        <Header data={token} isCentered />;
        <div className="container" style={{ padding: 100 }}>
          <h5 className="text-primary text-center">
            Selamat datang di boarding simulator
          </h5>
          <h6 className="text-secondary text-center">
            Scan qr code pada tiket anda dengan memasukan copy image address{" "}
          </h6>
          <div className="row d-flex justify-content-center p-5" style={{ gap:16 }}>
            <div class="input-container">
              <input
                type="text"
                name="text"
                className="input"
                placeholder="Paste address qrcode mu disini"
                value={searchValue}
                onChange={this.handleInputChange}
              />             
            </div>
            <Button className='btn btn-primary' onClick={this.fetchData}>Cek Status</Button>
          </div>
        </div>
        <div className="d-none">
          <Review dataInvoice={this.state.invoice} />;
        </div>
      </>
    );
  }
}

export default Simulator;
