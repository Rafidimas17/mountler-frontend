import React from "react";

import Button from "../elements/Button";

import jsonLogo from "../json/logo.json";

export default function IconText({ data }) {
  return (
    <Button className="brand-text-icon" href="" type="link">
      <img src={jsonLogo.logo} />
    </Button>
  );
}
