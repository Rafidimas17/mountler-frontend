import React from "react";
import { Fade } from "react-awesome-reveal";

import { InputText, InputFile } from "../../elements/Form";

export default function Equipment(props) {
  const { data, checkout } = props;

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
                    placeholder="Jumlah"
                    id="jumlahTenda"
                    name="jumlahTenda"
                    value={data.jumlahTenda}
                    onChange={props.onChange}
                  />
                </div>
                <div className="col">
                  {" "}
                  <h6>Kapasitas</h6>
                  <input
                    type="number"
                    min={0}
                    className="form-control"
                    placeholder="Kapasitas"
                    id="jumlahKapasitas"
                    name="jumlahKapasitas"
                    value={data.jumlahKapasitas}
                    onChange={props.onChange}
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
                placeholder="Jumlah"
                id="jumlahKompor"
                name="jumlahKompor"
                value={data.jumlahKompor}
                onChange={props.onChange}
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
                placeholder="Jumlah"
                id="jumlahCarrier"
                name="jumlahCarrier"
                value={data.jumlahCarrier}
                onChange={props.onChange}
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
                id="jumlahMatras"
                name="jumlahMatras"
                value={data.jumlahMatras}
                onChange={props.onChange}
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
                id="jumlahSB"
                name="jumlahSB"
                value={data.jumlahSB}
                onChange={props.onChange}
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
                id="jumlahHeadlamp"
                name="jumlahHeadlamp"
                value={data.jumlahHeadlamp}
                onChange={props.onChange}
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
                id="jumlahP3k"
                name="jumlahP3k"
                value={data.jumlahP3k}
                onChange={props.onChange}
              />
            </div>
            <div class="col-2">
              <h6>Set</h6>
            </div>
          </div>
          \
        </div>
      </div>
    </Fade>
  );
}
