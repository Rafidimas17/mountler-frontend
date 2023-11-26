import React from "react";
import { Fade } from "react-awesome-reveal";
import { ImageCompleted } from "../../assets";
export default function Completed() {
  return (
    <Fade>
      <div className="container" style={{ marginBottom: 30 }}>
        <div className="row justify-content-center text-center">
          <div className="col-lg-5 col-sm-12">
            <img
              src={ImageCompleted}
              className="img-fluid"
              style={{ width: "60%" }}
              alt="completed checkout"
            />
            <p className="text-gray-500">
              Yeay, pesanan kamu berhasil dibuat. Selanjutnya lakukan pembayaran
              dan mulai pendakian
            </p>
          </div>
        </div>
      </div>
    </Fade>
  );
}
