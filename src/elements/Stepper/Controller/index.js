import React from "react";
import { Fade } from "react-awesome-reveal";

export default function Controller(props) {
  return (
    <Fade>
      <section className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-auto mt-1">{props.children}</div>
        </div>
      </section>
    </Fade>
  );
}
