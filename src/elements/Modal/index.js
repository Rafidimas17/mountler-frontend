import React, { useState } from "react";
import "./index.scss";
import Button from "../Button";
import axios from "axios";

const Modal = ({ data, status, onCloseModal, statusResponse }) => {
  const closeModal = () => {
    onCloseModal(false);
  };

  // Function to format date to "DD Month YYYY" format
  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };
  const handleOrder = async (id, invoice) => {
    try {
      const orderUrl = `${process.env.REACT_APP_HOST}/api-v1/order-porter`;
      const data = {
        id: id,
        invoice: invoice,
      };
      // console.log(data);
      const response = await axios.post(orderUrl, data, {
        headers: {
          Authorization: `Bearer iO3quoYg265hlzq30E8RelQc0LOKle4R0yk6CMbgeHgGNcm_mR`, // Assuming your token is stored in the state
          // Add any other headers if needed
        },
      });
      if (response.data.message === "success") {
        statusResponse(response.data);
      } else {
        statusResponse(response.data);
      }

      // You may want to update the state or perform other actions based on the response
    } catch (error) {
      console.error("Error ordering porter:", error);
      // Handle the error accordingly
    }
  };

  const total = data.duration * data.price;

  return (
    <>
      {status && Object.keys(data).length > 0 ? (
        <div className="main-container" onClick={closeModal}>
          <div className="modal-container p-4">
            <h5 className="fw-bold">Ringkasan pemesanan porter</h5>
            <h6>
              Kode pembayaran :{" "}
              <span style={{ color: "#526D82" }}>{data.invoice}</span>
            </h6>
            <h6>
              Tujuan : <span style={{ color: "#526D82" }}>{data.title}</span>
            </h6>
            <h6>
              Nama Porter :{" "}
              <span style={{ color: "#526D82" }}>{data.name}</span>
            </h6>
            <h6>
              Total harga : <span style={{ color: "#526D82" }}>{total}</span>
            </h6>

            <div className="row d-flex justify-content-between">
              <div className="col-6">
                <h6>Tanggal naik</h6>
                <h6 style={{ color: "#526D82" }}>
                  {formatDate(data.startDate)}
                </h6>
              </div>
              <div className="col-6">
                <h6>Tanggal turun</h6>
                <h6 style={{ color: "#526D82" }}>{formatDate(data.endDate)}</h6>
              </div>
            </div>
            <Button
              className="btn btn-primary"
              onClick={() => handleOrder(data.id, data.invoice)}>
              Pesan Sekarang
            </Button>
          </div>
        </div>
      ) : (
        <div className="main-container d-none">
          <div className="modal-container p-4">
            <h5 className="fw-bold">Ringkasan pemesanan porter</h5>
            <h6>
              Kode pembayaran : <span> {data.invoice}</span>
            </h6>
            <h6>
              Tujuan : <span> {data.title}</span>
            </h6>
            <h6>
              Nama Porter : <span> {data.name}</span>
            </h6>
            <h6>
              Total harga : <span style={{ color: "#526D82" }}>{total}</span>
            </h6>

            <div className="row d-flex justify-content-between">
              <div className="col-6">
                <h6>Tanggal naik</h6>
                <h6>{formatDate(data.startDate)}</h6>
              </div>
              <div className="col-6">
                <h6>Tanggal turun</h6>
                <h6>{formatDate(data.endDate)}</h6>
              </div>
            </div>
            <Button
              className="btn btn-primary"
              onClick={() => handleOrder(data.id, data.invoice)}>
              Pesan Sekarang
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
