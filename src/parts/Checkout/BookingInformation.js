import React from "react";
import { Fade } from "react-awesome-reveal";
import { InputText } from "../../elements/Form";
import ReservationSummary from "./ReservationSummary";
import Form from "react-bootstrap/Form";
import "./booking.scss";
export default function BookingInformation(props) {
  const { data, ItemDetails, checkout } = props;
  const validateInput = (name, value) => {
    switch (name) {
      case "fullname":
        return typeof value === "string" && value.trim() !== "";
      case "no_id":
        return typeof value === "string" && value.length >= 16;
      case "phone":
        return (
          typeof value === "string" && value.length >= 10 && value.length <= 13
        );
      case "address":
        return typeof value === "string" && value.trim() !== "";
      case "email":
        // Menggunakan regex untuk memeriksa apakah alamat email valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      default:
        return true;
    }
  };
  return (
    <Fade>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-sm-12 " style={{ paddingRight: 30 }}>
            <div className="row">
              <div className="col-lg-8 col-sm-12">
                <h5 className="h3">Hikers Information</h5>
                <p style={{ fontFamily: "Poppins" }}>
                  Please fill your information with completed
                </p>
              </div>
              <div
                className="col-lg-4 col-sm-12 d-flex justify-content-end"
                style={{ height: "100%" }}>
                <button
                  className="btn-add mt-2 shadow"
                  onClick={props.handleAddRow}>
                  <span>Add Member</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffffff"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                </button>
              </div>
            </div>
            {data.member.map((item, index) => {
              const label = index === 0 ? "Ketua" : `Anggota ${index}`;

              const isNameValid = validateInput("fullname", item.fullname);
              const isNoIdValid = validateInput("no_id", item.no_id);
              const isPhoneValid = validateInput("phone", item.phone);
              const isAddressValid = validateInput("address", item.address);
              const isEmailValid = validateInput("email", item.email);
              return (
                <Fade delay={300}>
                  <div
                    className="card p-3 mb-5 bg-white rounded mt-3"
                    style={{ boxShadow: "0 6px 60px #3333330f" }}
                    key={`row-${index}`}
                    value={item}
                    id={`item ${index}`}>
                    <div className="row mt-1 p-2">
                      <div className="col">
                        <div className="card">
                          <div className="row d-flex align-items-center">
                            <div className="col-6 col-sm-6">
                              <h5
                                className="h5 p-2"
                                style={{
                                  fontFamily: "Poppins",
                                  fontWeight: 700,
                                }}>
                                {label}
                              </h5>
                            </div>
                            <div className="col-6 col-lg-6 col-sm-3 d-flex justify-content-end">
                              {index !== 0 && (
                                <button
                                  className="Btn"
                                  onClick={() => props.handleRemoveRow(index)}>
                                  <div className="sign">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="#ffffff"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round">
                                      <polyline points="3 6 5 6 21 6"></polyline>
                                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                      <line
                                        x1="10"
                                        y1="11"
                                        x2="10"
                                        y2="17"></line>
                                      <line
                                        x1="14"
                                        y1="11"
                                        x2="14"
                                        y2="17"></line>
                                    </svg>
                                  </div>
                                  <div className="text">Delete</div>
                                </button>
                              )}
                            </div>
                          </div>
                          <div className="row p-2">
                            {/* <div className="col-6 border"></div> */}
                            <div className="col-lg-6 col-sm-12">
                              <h5
                                className="h6"
                                style={{
                                  fontFamily: "Poppins",
                                  fontWeight: 500,
                                }}>
                                Nama
                              </h5>
                              <InputText
                                type="text"
                                name="fullname"
                                value={item.fullname}
                                onChange={(event) =>
                                  props.onChange(event, index)
                                }
                              />
                              {!isNameValid && (
                                <span className="text-danger">
                                  Nama harus diisi dengan benar.
                                </span>
                              )}

                              <h5
                                className="h6"
                                style={{
                                  fontFamily: "Poppins",
                                  fontWeight: 500,
                                }}>
                                Alamat
                              </h5>
                              <InputText
                                type="text"
                                name="address"
                                value={item.address}
                                onChange={(event) =>
                                  props.onChange(event, index)
                                }
                              />
                              {!isAddressValid && (
                                <span className="text-danger">
                                  Alamat harus diisi dengan benar.
                                </span>
                              )}

                              <h5
                                className="h6"
                                style={{
                                  fontFamily: "Poppins",
                                  fontWeight: 500,
                                }}>
                                Email
                              </h5>
                              <InputText
                                type="text"
                                name="email"
                                value={item.email}
                                onChange={(event) =>
                                  props.onChange(event, index)
                                }
                              />
                              {!isEmailValid && (
                                <span className="text-danger">
                                  Email belum sesuai
                                </span>
                              )}
                            </div>
                            <div className="col-lg-6 col-sm-12">
                              <h5
                                className="h6"
                                style={{
                                  fontFamily: "Poppins",
                                  fontWeight: 500,
                                }}>
                                No ID
                              </h5>
                              <InputText
                                type="number"
                                name="no_id"
                                value={item.no_id}
                                onChange={(event) =>
                                  props.onChange(event, index)
                                }
                              />
                              {!isNoIdValid && (
                                <span className="text-danger">
                                  No ID harus minimal 16 karakter.
                                </span>
                              )}

                              <h6
                                style={{
                                  fontFamily: "Poppins",
                                  fontWeight: 500,
                                }}>
                                No Telepon
                              </h6>
                              <InputText
                                type="phone"
                                name="phone"
                                value={item.phone}
                                onChange={(event) =>
                                  props.onChange(event, index)
                                }
                              />
                              {!isPhoneValid && (
                                <span className="text-danger">
                                  No Telepon harus diisi dengan benar.
                                </span>
                              )}
                              <h6
                                style={{
                                  fontFamily: "Poppins",
                                  fontWeight: 500,
                                }}>
                                Jenis Kelamin
                              </h6>
                              <Form.Select
                                className="select"
                                name="gender"
                                onChange={(event) =>
                                  props.onChange(event, index)
                                }
                                value={data.member[index].gender}
                                required
                                style={{ width: "100%" }}>
                                <option value={null}>--Pilih Kelamin--</option>
                                <option value="pria">Laki-Laki</option>
                                <option value="wanita">Perempuan</option>
                              </Form.Select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Fade>
              );
            })}
          </div>
          <ReservationSummary checkout={checkout} ItemDetails={ItemDetails} />
        </div>
      </div>
    </Fade>
  );
}
