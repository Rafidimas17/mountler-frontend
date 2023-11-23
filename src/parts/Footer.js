import React from "react";

import IconText from "./IconText";
import Button from "../elements/Button";
import "../assets/scss/style.scss";
import { Fade } from "react-awesome-reveal";
export default function Footer() {
  return (
    <Fade>
      <div className="container" style={{ borderTop: `1px solid #F0F1F6` }}>
        <div className="row d-flex justify-content-between">
          <div className="col-sm-12 col-lg-auto mr-5" style={{ width: 350 }}>
            <IconText />
            <p className="brand-tagline">
              We make your advanture easy and memorable
            </p>
          </div>
          <div className="col-sm-12 col-lg-auto">
            <ul className="list-group">
              <li
                className="list-groups-item"
                style={{ padding: `0.3125rem 0`, border: 0 }}>
                <h5>Book of Mountain</h5>
              </li>
              <li
                className="list-groups-item"
                style={{ padding: `0.3125rem 0`, border: 0 }}>
                <Button className="btn-link" type="link" href="/payment">
                  Payment
                </Button>
              </li>
            </ul>
          </div>
          <div className="col-sm-12 col-lg-2">
            <ul className="list-group list-group-flush">
              <li
                className="list-groups-item"
                style={{ padding: `0.3125rem 0`, border: 0 }}>
                <h5>Explore us</h5>
              </li>
              <li
                className="list-groups-item"
                style={{ padding: `0.3125rem 0`, border: 0 }}>
                <Button className="btn-link" type="link" href="/payment">
                  About
                </Button>
              </li>
              <li
                className="list-groups-item"
                style={{ padding: `0.3125rem 0`, border: 0 }}>
                <Button className="btn-link" type="link" href="/payment">
                  Privacy Policy
                </Button>
              </li>
              <li
                className="list-groups-item"
                style={{ padding: `0.3125rem 0`, border: 0 }}>
                <Button className="btn-link" type="link" href="/payment">
                  Terms & Conditions
                </Button>
              </li>
            </ul>
          </div>
          <div className="col-sm-12 col-lg-3">
            <ul className="list-group list-group-flush">
              <li
                className="list-groups-item"
                style={{ padding: `0.3125rem 0`, border: 0 }}>
                <h5>Getting Touch</h5>
              </li>
              <li
                className="list-groups-item"
                style={{ padding: `0.3125rem 0`, border: 0 }}>
                <Button className="btn-link" type="link" href="/payment">
                  ckr.support@gmail.com
                </Button>
              </li>
              <li
                className="list-groups-item"
                style={{ padding: `0.3125rem 0`, border: 0 }}>
                <Button
                  className="btn-link"
                  type="link"
                  href="/payment"
                  style={{ color: `$gray-500`, fontWeight: 300 }}>
                  089-613-260-405
                </Button>
              </li>
              <li
                className="list-groups-item"
                style={{ padding: `0.3125rem 0`, border: 0 }}>
                <Button className="btn-link" type="link" href="/payment">
                  Cakrawala, Surabaya
                </Button>
              </li>
            </ul>
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
