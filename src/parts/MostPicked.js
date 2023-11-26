import React from "react";
import Button from "../elements/Button";
import { Fade } from "react-awesome-reveal";
function MostPicked(props) {
  return (
    <section className="container" ref={props.refMostPicked}>
      <Fade bottom>
        <h4 className="most-picked-title">Recommended</h4>
        <div className="container-grid">
          {props.data.map((item, index) => {
            return (
              <div
                key={`mostpicked-${index}`}
                className={`item column-4${index === 0 ? " row-2" : " row-1"}`}>
                <div className="card card-featured">
                  <div className="tag">
                    Rp {item.price}
                    <span className="font-weight-light"> / hari</span>
                  </div>
                  <figure className="img-wrapper">
                    <img
                      src={
                        item.imageId[0].imageUrl
                          ? `${process.env.REACT_APP_HOST}/${item.imageId[0].imageUrl}`
                          : ""
                      }
                      alt={item.title}
                      className="img-cover"
                    />
                  </figure>
                  <div className="meta-wrapper">
                    <Button
                      className="btn"
                      type="link"
                      href={`/properties/${item._id}`}>
                      <h5>{item.title}</h5>
                    </Button>
                    <span>
                      {item.trackId[0].city},{item.trackId[0].province}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Fade>
    </section>
  );
}

export default MostPicked;
