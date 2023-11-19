import React, { Component } from "react";
import Header from "../parts/Header";
import axios from "axios";
import Modal from "../elements/Modal";
class Porter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("token"),
      searchValue: "",
      porters: [],
      status: false,
    };
  }

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
      const url = `${process.env.REACT_APP_HOST}/api-v1/list-porter/${searchValue}`;
      axios.get(url).then((response) => {
        // Setel data yang diterima dari API ke dalam state ticketData
        this.setState({ porters: response.data.payload });
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  handleOrder = async (id) => {
    const { searchValue } = this.state;
    this.handleModal(true);
    // try {
    //   const orderUrl = `${process.env.REACT_APP_HOST}/api-v1/order-porter`;
    //   const data = {
    //     id: id,
    //     invoice: searchValue,
    //   };
    //   // console.log(data);
    //   const response = await axios.post(orderUrl, data, {
    //     headers: {
    //       Authorization: `Bearer iO3quoYg265hlzq30E8RelQc0LOKle4R0yk6CMbgeHgGNcm_mR`, // Assuming your token is stored in the state
    //       // Add any other headers if needed
    //     },
    //   });

    //   // Handle the response accordingly
    //   console.log(response.data);

    //   // You may want to update the state or perform other actions based on the response
    // } catch (error) {
    //   console.error("Error ordering porter:", error);
    //   // Handle the error accordingly
    // }
  };

  render() {
    const { token, searchValue, porters, status } = this.state;
    // console.log(porters);
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
          <div className="container" style={{ padding: 100 }}>
            <div className="row d-flex justify-content-center p-5">
              <div class="input-container">
                <input
                  type="text"
                  name="text"
                  className="input"
                  placeholder="Kode pembayaran"
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
                          <h6>{item.age}</h6>
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
          data={porters} // Adjust based on your data structure
          status={status}
          onCloseModal={this.handleCloseModal}
        />
      </>
    );
  }
}
export default Porter;
