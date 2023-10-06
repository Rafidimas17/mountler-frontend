import React from "react";
import { Fade } from "react-awesome-reveal";
import { ImageCompleted } from "../../assets";
export default function Completed() {
  return (
    <Fade>
      <div className="container" style={{ marginBottom: 30 }}>
        <div className="row justify-content-center text-center">
          <div className="col-5">
            <img
              src={ImageCompleted}
              className="img-fluid"
              alt="completed checkout"
            />
            <p className="text-gray-500">
              You have successfully checkout and completed your payment. Now,
              get ready to enjoy your best hiking experience!
            </p>
          </div>
        </div>
      </div>
    </Fade>
  );
}
