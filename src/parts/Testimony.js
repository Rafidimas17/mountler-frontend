import React from "react";
import Star from "../elements/Star";
import Button from "../elements/Button";
import { Fade } from "react-awesome-reveal";
export default function Testimony({ data }) {
  return (
    <Fade left>
      <section className="container">
        <div className="row d-flex justify-content-between align-items-center">
          <div className="col-lg-6 col-sm-12">
            <div className="testimonial-hero" style={{ margin: `0 auto` }}>
              <img
                src={`${process.env.REACT_APP_HOST}/${data.imageUrl}`}
                alt="Testimonial"
                className="position-absolute"
                style={{ zIndex: 1 }}
              />
            </div>
          </div>
          <div className="col-lg-6 col-sm-12">
            <h4 style={{ marginBottom: 40, marginTop: 40 }}>{data.name}</h4>
            <Star value={data.rate} width={35} height={35} spacing={4} />
            <h5 className="h2 font-weight-medium line-height-2 my-3">
              {data.content}
            </h5>
            <span className="text-gray-500" style={{ fontSize: 16 }}>
              {data.familyName}, {data.familyOccupation}
            </span>

            <div>
              <Button
                className="btn px-5"
                style={{
                  marginTop: 40,
                  borderTopLeftRadius: 6,
                  borderTopRightRadius: 6,
                  borderBottomLeftRadius: 6,
                  borderBottomRightRadius: 6,
                  fontSize: 15,
                  fontFamily: "Poppins",
                }}
                hasShadow
                isPrimary
                type="link"
                href={`/testimonial/${data._id}`}>
                Read story
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Fade>
  );
}
