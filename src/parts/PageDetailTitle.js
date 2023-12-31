import React from "react";
import { Fade } from "react-awesome-reveal";
import Breadcrumb from "../elements/Breadcrumb";
export default function PageDetailTitle({ data, breadcrumb }) {
  return (
    <section className="container spacing-sm">
      <Fade bottom>
        <div className="row align-items-center">
          <div className="col-lg-auto col-sm-12">
            <Breadcrumb data={breadcrumb} />
          </div>
          <div className="col-lg-12 col-sm-12 text-center">
            <h1 className="h2" style={{ fontFamily: "Poppins", marginTop: 20 }}>
              {data.title}
            </h1>
            <span className="text-gray-600" style={{ fontFamily: "Poppins" }}>
              {data.trackId[0].city},{data.trackId[0].province}
            </span>
          </div>
          <div className="col"></div>
        </div>
      </Fade>
    </section>
  );
}
