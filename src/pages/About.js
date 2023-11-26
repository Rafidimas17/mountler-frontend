import React, { Component } from "react";
import { hiking, Logo } from "../assets";
import Header from "../parts/Header";
class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("token"),
    };
  }
  render() {
    const { token } = this.state;

    return (
      <>
        <Header {...this.props} data={token} />

        <div className="container">
          <div className="row d-flex justify-content-between align-items-center p-4">
            <div className="col-lg-4 col-sm-12">
              <img src={hiking} style={{ width: "100%", height: "100%" }} />
            </div>
            <div className="col-lg-8 col-sm-12 d-flex flex-column align-items-center justify-content-start">
              <div className="row d-flex align-items-center justify-content-start p-4">
                <img src={Logo} className="pl-4" />
                <p
                  className="pl-4 mt-3"
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: 500,
                    fontSize: 16,
                  }}>
                  Sebuah website yang dibangun untuk tugas akhir dan bertujuan
                  untuk membantu para pendaki dan pengelola gunung dalam proses
                  reservasi pendakian secara digital{" "}
                </p>
                <div
                  className="col-lg-6 mt-4 d-flex flex-column justify-content-between"
                  style={{ gap: 36 }}>
                  <div class="card border border-rounded p-3">
                    <h5 class="card-title" style={{ fontFamily: "Poppins" }}>
                      Alamat
                    </h5>
                    <p class="card-text" style={{ fontFamily: "Poppins" }}>
                      Jl. Raya ITS Sukolilo Kampus PENS
                    </p>
                  </div>
                  <div class="card border border-rounded p-3">
                    <h5 class="card-title" style={{ fontFamily: "Poppins" }}>
                      Telepon
                    </h5>
                    <p class="card-text" style={{ fontFamily: "Poppins" }}>
                      (+62)896-1326-0405
                    </p>
                  </div>
                </div>
                <div
                  className="col-lg-6 mt-4 d-flex flex-column justify-content-between"
                  style={{ gap: 36 }}>
                  <div class="card border border-rounded p-3">
                    <h5 class="card-title" style={{ fontFamily: "Poppins" }}>
                      Email
                    </h5>
                    <p class="card-text" style={{ fontFamily: "Poppins" }}>
                      inccakrawala@gmail.com
                    </p>
                  </div>
                  <div class="card border border-rounded p-3">
                    <h5 class="card-title" style={{ fontFamily: "Poppins" }}>
                      Developer Contact
                    </h5>
                    <p class="card-text" style={{ fontFamily: "Poppins" }}>
                      www.rafidimas.site
                    </p>
                  </div>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default About;
