import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";

import { InputText, InputFile } from "../../elements/Form";

export default function Equipment(props) {
  const { data, checkout } = props;
  const [jumlah, setJumlah] = useState("");

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setJumlah(inputValue);
  };

  return (
    <Fade>
      <div className="container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "0",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="card-equipment">
          <form>
            <div class="form-row  align-items-center p-3">
              <div class="col-4">
                <h5 className="mt-4">Tenda</h5>
              </div>
              <div class="col">
                <div className="row  align-items-center">
                  <div className="col">
                    {" "}
                    <h6>Jumlah</h6>
                    <input
                      type="number"
                      min={0}
                      className="form-control"
                      placeholder={jumlah === 0 ? "Jumlah" : "Jumlah"}
                      value={jumlah}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col">
                    {" "}
                    <h6>Kapasitas</h6>
                    <input
                      type="number"
                      min={0}
                      className="form-control"
                      placeholder={jumlah === 0 ? "Jumlah" : "Jumlah"}
                      value={jumlah}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div class="col-2 align-items-center">
                <h6 className="mt-4">Unit</h6>
              </div>
            </div>
            <div class="form-row align-items-center p-3">
              <div class="col-4">
                <h5>Kompor Nesting</h5>
              </div>
              <div class="col">
                <input
                  type="number"
                  min={0}
                  className="form-control"
                  placeholder={jumlah === 0 ? "Jumlah" : "Jumlah"}
                  value={jumlah}
                  onChange={handleInputChange}
                />
              </div>
              <div class="col-2">
                <h6>Set</h6>
              </div>
            </div>
            <div class="form-row p-3  align-items-center">
              <div class="col-4">
                <h5>Carrier</h5>
              </div>
              <div class="col">
                <input
                  type="number"
                  min={0}
                  className="form-control"
                  placeholder={jumlah === 0 ? "Jumlah" : "Jumlah"}
                  value={jumlah}
                  onChange={handleInputChange}
                />
              </div>
              <div class="col-2">
                <h6>Unit</h6>
              </div>
            </div>
            <div class="form-row p-3  align-items-center">
              <div class="col-4">
                <h5>Matras</h5>
              </div>
              <div class="col">
                <input
                  type="number"
                  min={0}
                  className="form-control"
                  placeholder={jumlah === 0 ? "Jumlah" : "Jumlah"}
                  value={jumlah}
                  onChange={handleInputChange}
                />
              </div>
              <div class="col-2">
                <h6>Unit</h6>
              </div>
            </div>
            <div class="form-row p-3  align-items-center">
              <div class="col-4">
                <h5>Sleeping Bag</h5>
              </div>
              <div class="col">
                <input
                  type="number"
                  min={0}
                  className="form-control"
                  placeholder={jumlah === 0 ? "Jumlah" : "Jumlah"}
                  value={jumlah}
                  onChange={handleInputChange}
                />
              </div>
              <div class="col-2">
                <h6>Unit</h6>
              </div>
            </div>
            <div class="form-row p-3  align-items-center">
              <div class="col-4">
                <h5>Headlamp</h5>
              </div>
              <div class="col">
                <input
                  type="number"
                  min={0}
                  className="form-control"
                  placeholder={jumlah === 0 ? "Jumlah" : "Jumlah"}
                  value={jumlah}
                  onChange={handleInputChange}
                />
              </div>
              <div class="col-2">
                <h6>Unit</h6>
              </div>
            </div>
            <div class="form-row p-3  align-items-center">
              <div class="col-4">
                <h5>P3K Kit</h5>
              </div>
              <div class="col">
                <input
                  type="number"
                  min={0}
                  className="form-control"
                  placeholder={jumlah === 0 ? "Jumlah" : "Jumlah"}
                  value={jumlah}
                  onChange={handleInputChange}
                />
              </div>
              <div class="col-2">
                <h6>Set</h6>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fade>
  );
}
