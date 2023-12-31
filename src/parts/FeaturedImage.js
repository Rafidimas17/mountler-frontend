import React from "react";
import { Fade } from "react-awesome-reveal";
export default function FeaturedImage({ data }) {
  return (
    <section className="container">
      <div className="container-grid sm">
        {data.map((item, index) => {
          return (
             <div
              key={`FeaturedImage-${index}`}
              className={`item column-12 row-1
              `}>
              {/* <Fade bottom delay={300 * index}> */}
              <div className="card h-100">
                <figure className="img-wrapper">
                  <img
                    className="img-cover"
                    src={`${process.env.REACT_APP_HOST}/${item.imageUrl}`}
                    alt={item._id}
                  />
                </figure>
              </div>
              {/* </Fade> */}
            </div>
          );
        })}
      </div>
    </section>
  );
}
