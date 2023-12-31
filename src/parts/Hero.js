import React from "react";
import { hiking } from "../assets";
import { frame } from "../assets";
import { IconCities } from "../assets";
import { IconHiker } from "../assets";
import { IconMountain } from "../assets";
import { Fade } from "react-awesome-reveal";
import Button from "../elements/Button";
import formatNumber from "../utils/formatNumber";
export default function Hero(props) {
  function showMostPicked() {
    window.scrollTo({
      top: props.refMostPicked.current.offsetTop - 30,
      behavior: "smooth",
    });
  }
  return (
    <section className="container pt-4">
      <Fade bottom>
        <div className="row align-items-center mt-5">
          <div className="col-md-6 col-sm-12 d-block pr-5 d-block">
            <h2
              className="h2"
              style={{
                marginLeft: 10,
                fontFamily: "Poppins",
                fontWeight: 600,
                fontSize: 35,
                gap: 16,
                color: "#011A4B",
              }}>
              Tinggalkan Kesibukan,
              <br />
              Mulai Petualangan Seru!
            </h2>
            <p
              className="mb-5 text-gray-900"
              style={{
                marginLeft: 10,
                fontFamily: "Poppins",
                fontWeight: 400,
                fontSize: 18,
              }}>
              Kami menyajikan pengalaman pendakian terbaik di Indonesia. Ayo
              mulai pendakianmu sekarang!
            </p>
            <Button
              className="btn"
              style={{
                marginLeft: 10,
                width: 205,
                height: 45,
                backgroundColor: "#3252DF",
                color: "white",
                fontFamily: "Poppins",
                fontSize: 15,
                boxShadow: "0px 0px 15px rgba(35, 17, 238, 0.42)",
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
              }}
              onClick={showMostPicked}>
              Mulai pendakian
            </Button>
            <div className="row mt-5">
              <div className="col-auto mr-lg-5">
                <img
                  width="48"
                  height="48"
                  src={IconMountain}
                  alt={`${props.data.treasures} Mountain`}
                />
                <h6
                  className="mt-3"
                  style={{
                    fontSize: 18,
                    fontFamily: "Poppins",
                    fontWeight: 500,
                  }}>
                  {formatNumber(props.data.treasures)}{" "}
                  <span
                    className="text-gray-500 font-weight-light"
                    style={{
                      fontSize: 18,
                      fontFamily: "Poppins",
                      fontWeight: 300,
                      width: "fit-content",
                    }}>
                    Gunung
                  </span>
                </h6>
              </div>
              <div className="col-auto mr-lg-5" style={{ width: "fitContent" }}>
                <img
                  width="48"
                  height="48"
                  src={IconHiker}
                  alt={`${props.data.travelers} Hiker`}
                />
                <h6
                  className="mt-3"
                  style={{
                    fontSize: 18,
                    fontFamily: "Poppins",
                    fontWeight: 500,
                  }}>
                  {formatNumber(props.data.travelers)}{" "}
                  <span
                    className="text-gray-500 font-weight-light"
                    style={{
                      fontSize: 18,
                      fontFamily: "Poppins",
                      fontWeight: 300,
                      width: "fit-content",
                    }}>
                    Pendaki
                  </span>
                </h6>
              </div>
              <div className="col-auto mr-lg-5">
                <img
                  width="48"
                  height="48"
                  src={IconCities}
                  alt={`${props.data.cities} Cities`}
                />
                <h6
                  className="mt-3 d-flex w-75"
                  style={{
                    fontSize: 18,
                    fontFamily: "Poppins",
                    fontWeight: 500,
                  }}>
                  {formatNumber(props.data.cities)}{" "}
                  <span
                    className="text-gray-500 ml-1 font-weight-light "
                    style={{
                      fontSize: 18,
                      fontFamily: "Poppins",
                      fontWeight: 300,
                      width: "fit-content",
                    }}>
                    Kota
                  </span>
                </h6>
              </div>
            </div>
          </div>
          <div
            className="col-md-6 col-lg-6 d-md-block d-none"
            style={{ marginTop: 10 }}>
            <div
              style={{
                width: 492,
                height: 396,
                marginTop: 30,
              }}>
              <img
                src={hiking}
                alt="Room with couches"
                className="img-fluid position-absolute"
                style={{
                  width: 492,
                  height: 396,
                  margin: "-30px 0 0 -30px",
                  zIndex: 1,
                  borderTopLeftRadius: 150,
                  borderBottomLeftRadius: 15,
                  borderBottomRightRadius: 15,
                  borderTopRightRadius: 15,
                  // marginRight: 20,
                }}
              />
              <img
                src={frame}
                alt="Room with couches frame"
                className="img-fluid position-absolute"
                style={{
                  margin: "0 -15px -15px 0",
                  borderTopLeftRadius: 150,
                  borderBottomLeftRadius: 15,
                  borderBottomRightRadius: 15,
                  borderTopRightRadius: 15,
                }}
              />
            </div>
          </div>
        </div>
      </Fade>
    </section>
  );
}
