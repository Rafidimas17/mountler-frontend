import React from "react";
import {
  Mandiri,
  BCA,
  BRI,
  BNI,
  Visa,
  Mastercard,
  Ovo,
  Linkaja,
  Dana,
  Gopay,
} from "../assets";
import IconText from "./IconText";

import "../assets/scss/style.scss";
import { Fade } from "react-awesome-reveal";
export default function Footer() {
  return (
    <Fade>
      <div className="container" style={{ borderTop: `1px solid #F0F1F6` }}>
        <div className="row d-flex justify-content-start">
          <div className="col-sm-12 col-lg-auto mr-5" style={{ width: 350 }}>
            <IconText />
            <p className="brand-tagline">
              Nikmati pendakian secara mudah dan tak terlupakan.
            </p>
          </div>
          <div className="col-sm-12 col-lg-auto">
            <p style={{ fontFamily: "Poppins" }} className="mt-3">
              Pembayaran mudah melalui :
            </p>
            <div className="row d-block">
              <div
                className="col-auto col-sm-12 d-flex  align-items-center"
                style={{ gap: 16 }}>
                <img
                  src={Mastercard}
                  style={{ width: "70px", height: "40px" }}
                />
                <img src={Visa} style={{ width: "70px", height: "40px" }} />
                <img src={BCA} style={{ width: "100px", height: "60px" }} />
                <img src={BNI} style={{ width: "70px", height: "40px" }} />
                <img src={BRI} style={{ width: "70px", height: "40px" }} />
                <img src={Mandiri} style={{ width: "70px", height: "30px" }} />
              </div>
              <div
                className="col-auto col-sm-12 d-flex  align-items-center"
                style={{ gap: 16 }}>
                <img src={Linkaja} style={{ width: "70px", height: "40px" }} />
                <img src={Ovo} style={{ width: "50px", height: "30px" }} />
                <img src={Gopay} style={{ width: "70px", height: "60px" }} />
                <img src={Dana} style={{ width: "70px", height: "60px" }} />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col text-center copyrights" id="copyrights">
            Copyright 2022 • All rights reserved • Cakrawala
          </div>
        </div>
      </div>
    </Fade>
  );
}
