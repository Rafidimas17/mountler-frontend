import React from "react";
import { Fade } from "react-awesome-reveal";
// import { IconQris } from "../../assets";
import { InputText, InputFile } from "../../elements/Form";

// import logoBca from "assets/images/logo-bca.jpg";

export default function Payment(props) {
  const { data, checkout } = props;
  // console.log(data)
  const tax = 10;
  const subTotal = checkout.price * checkout.duration * data.member.length;
  const grandTotal = (subTotal * tax) / 100 + subTotal;
  // console.log(itemDetails)
  return (
    <Fade>
      <div className="container" style={{ marginBottom: 30 }}>
        <div className="row justify-content-center align-items-center">
          <div className="col-5 border-right py-5" style={{ paddingRight: 80 }}>
            <Fade delay={300}>
              <p className="mb-4" style={{ fontFamily: "Poppins" }}>
                Transfer Pembayaran:
              </p>
              <p style={{ fontFamily: "Poppins" }}>Tax: {tax}%</p>
              <p style={{ fontFamily: "Poppins" }}>Sub total: Rp {subTotal}</p>
              <p style={{ fontFamily: "Poppins" }}>Total: Rp {grandTotal}</p>
              <p style={{ fontFamily: "Poppins" }}>
                Silahkan Melakukan Pembayaran
              </p>
              {checkout.bankId.map((item, index) => {
                return (
                  <div className="row mt-4">
                    <div className="col">
                      <dl>
                        <dd style={{ fontFamily: "Poppins" }}>
                          {item.nameBank}
                        </dd>
                        <dd className="mt-4" style={{ fontFamily: "Poppins" }}>
                          {item.nomorRekening}{" "}
                          <span style={{ fontFamily: "Poppins" }}>a.n</span>{" "}
                          <span style={{ fontFamily: "Poppins" }}>
                            {item.name}
                          </span>
                        </dd>
                      </dl>
                    </div>
                  </div>
                );
              })}
            </Fade>
          </div>
          <div className="col-5 py-5" style={{ paddingLeft: 80 }}>
            <Fade delay={600}>
              <label htmlFor="proofPayment" style={{ fontFamily: "Poppins" }}>
                Upload Bukti Transfer
              </label>
              <InputFile
                accept="image/*"
                id="proofPayment"
                name="proofPayment"
                value={data.proofPayment}
                onChange={props.onChange}
                style={{ fontFamily: "Poppins" }}
              />

              <label htmlFor="bankName" style={{ fontFamily: "Poppins" }}>
                Asal Bank
              </label>
              <InputText
                id="bankName"
                name="bankName"
                type="text"
                value={data.bankName}
                onChange={props.onChange}
              />

              <label htmlFor="bankHolder" style={{ fontFamily: "Poppins" }}>
                Nama Pengirim
              </label>
              <InputText
                id="bankHolder"
                name="bankHolder"
                type="text"
                value={data.bankHolder}
                onChange={props.onChange}
                style={{ fontFamily: "Poppins" }}
              />
            </Fade>
          </div>
        </div>
      </div>
    </Fade>
  );
}
