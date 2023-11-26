import React from "react";
import Star from "../elements/Star";
import Button from "../elements/Button";

import { Fade } from "react-awesome-reveal";
import { hiking } from "../assets";
export default function Testimony({ data }) {
  console.log(data);
  return (
    <Fade left>
      <section className="container">
        <h4>Review pendaki</h4>
        <div className="row d-flex justify-content-start align-items-center">
          {data.map((item) => (
            <div className="col-6 col-lg-2" key={item._id}>
              <div
                className="card d-flex flex-colum justify-content-between border border-rounded"
                style={{ gap: 16 }}>
                <img
                  src={`${process.env.REACT_APP_HOST}/${item.imageUrl}`}
                  alt={item._id}
                  style={{
                    height: 200,
                    width: "auto",
                    borderRadius: "15px 15px 0px 0px",
                    objectFit: "contain",
                  }}
                />
                <h5 className="p-2">{item.name}</h5>
                <Star value={item.rate} width={20} height={20} spacing={4} />
                <p
                  className="p-2"
                  style={{ fontFamily: "Poppins", fontSize: 12 }}>
                  {item.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Fade>
  );
}
