import React from "react";
import Star from "../elements/Star";
import Button from "../elements/Button";

import { Fade } from "react-awesome-reveal";
import { hiking } from "../assets";
export default function Testimony({ data }) {
  return (
    <Fade left>
      <section className="container">
        <h4>Review pendaki</h4>
        <div className="row d-flex justify-content-start align-items-center">
          <div className="col-6 col-lg-2">
            <div
              className="card d-flex flex-colum justify-content-between border border-rounded"
              style={{ gap: 16 }}>
              <img
                src={hiking}
                style={{
                  height: 200,
                  width: "100%",
                  borderRadius: "15px 15px 0px 0px",
                  objectFit: "contain",
                }}
              />
              <h5 className="p-2">Agus waluyo</h5>
              <Star value={data.rate} width={20} height={20} spacing={4} />
              <p
                className="p-2"
                style={{ fontFamily: "Poppins", fontSize: 12 }}>
                Sangat bagus dan tidak dapat terlupakan
              </p>
            </div>
          </div>
        </div>
      </section>
    </Fade>
  );
}
