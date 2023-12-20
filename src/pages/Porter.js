import React, { Component } from "react";
import Cookies from "js-cookie";
import Header from "../parts/Header";
import axios from "axios";
import Modal from "../elements/Modal";
import WhatsAppButton from "../elements/WaButton";
import Breadcrumb from "../elements/Breadcrumb";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Button from "../elements/Button";
class Porter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: Cookies.get("token"),
      searchValue: "",
      porters: [],
      status: false,
      dataSelected: {},
    };
  }
  componentDidMount() {
    document.title = "Cakrawala | Porter";
  }
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
  handleModal = (modalStatus) => {
    this.setState({ status: modalStatus });
  };

  handleCloseModal = () => {
    this.setState({ status: false });
  };
  handleInputChange = (event) => {
    this.setState({ searchValue: event.target.value });
  };
  fetchData = async () => {
    const { searchValue } = this.state;

    try {
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ACCESS_KEY}`,
        },
      };
      const url = `${process.env.REACT_APP_HOST}/api-v1/list-porter/${searchValue}`;
      axios.get(url, axiosConfig).then((response) => {
        // Setel data yang diterima dari API ke dalam state ticketData
        this.setState({ porters: response.data.payload });
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  handleOrder = async (id) => {
    const { searchValue, porters } = this.state;
    this.handleModal(true);
    const itemData = porters.find((item) => item.id === id);
    this.setState({ dataSelected: itemData });
  };

  render() {
    const { token, searchValue, porters, status, dataSelected } = this.state;
    // console.log(porters);
    const breadcrumb = [
      { pageTitle: "Beranda", pageHref: "" },
      { pageTitle: "Porter", pageHref: "" },
    ];
    return (
      <>
        <div
          className="d-flex flex-column"
          style={{
            position: "fixed",
            top: 0,
            backdropFilter: "blur(10px)",
            right: 0,
            bottom: 0,
            left: 0,
            margin: "0 auto",
            overflowY: "auto",
          }}>
          <Header {...this.props} data={token} />
          <div className="container" style={{ marginTop: 10, zIndex: 2 }}>
            <Breadcrumb data={breadcrumb} />
            <h5 className="text-primary text-center">
              Dapatkan porter terbaikmu sekarang
            </h5>
            <h6 className="text-secondary text-center">
              Pesan porter pendakianmu dan nikmati pendakian dengan lebih mudah{" "}
            </h6>
            <div className="row d-flex justify-content-center p-5" style={{ gap:16 }}>
              <div class="input-container">
                <input
                  type="text"
                  name="text"
                  className="input"
                  placeholder="Kode pembayaran"
                  value={searchValue}
                  onChange={this.handleInputChange}
                />               
              </div>
              <Button className='btn btn-primary' onClick={this.fetchData}>Cek Ketersediaan Porter</Button>
            </div>
          </div>
          <div className="container">
            <div className="row d-flex justify-content-start">
              {porters.map((item) => {
                return (
                  <>
                    <div className="col-lg-4 col-sm-12 mt-2">
                      <div className="card border border-rounded">
                        <div className="card-body">
                          <img
                            src={`${process.env.REACT_APP_HOST}/${item.imageUrl}`}
                            alt="image-porter"
                            className="img-fluid"
                          />
                          <h5 className="fw-500">{item.name}</h5>
                          <h6>{item.age} Tahun</h6>
                          <h6>{item.noHandphone}</h6>
                          <button
                            className="btn btn-primary"
                            onClick={() => this.handleOrder(item.id)}>
                            Pesan
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
        <Modal
          data={dataSelected} // Adjust based on your data structure
          status={status}
          statusResponse={this.showSwal}
          onCloseModal={this.handleCloseModal}
        />
        <WhatsAppButton />
      </>
    );
  }
}
export default Porter;
