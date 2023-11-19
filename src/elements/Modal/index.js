import React, { useState } from "react";
import "./index.scss";

const Modal = ({ data, status, onCloseModal }) => {
  const closeModal = () => {
    onCloseModal(false);
  };
  console.log(data);
  return (
    <>
      {status && Object.keys(data).length > 0 ? (
        <div className="main-container" onClick={closeModal}>
          <div className="modal-container">
            {data.map((item) => (
              <div key={item.id}>
                <h5>{item.name}</h5>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="main-container d-none">
          <div className="modal-container">
            {data.map((item) => (
              <div key={item.id}>
                <h5>{item.name}</h5>
              </div>
            ))}
            {/* <img className="modal-image" src={data.images} /> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
