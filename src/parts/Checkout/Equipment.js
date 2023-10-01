import React from "react";
import { Fade } from "react-awesome-reveal";

import { InputText, InputFile } from "../../elements/Form";

export default function Equipment(props) {
  const { data, checkout } = props;

  return (
    <Fade>
      <div className="container" style={{ marginBottom: 30 }}></div>
    </Fade>
  );
}
