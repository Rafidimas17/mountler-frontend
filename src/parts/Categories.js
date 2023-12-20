import React from "react";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";


export default function Categories({ data }) {
  return data.map((category, index1) => {
    if (category.itemId.length === 0) return null;
    return (
      <section className="container" key={`category-${index1}`}>
        <Fade bottom>
          <h4 className="mb-3 font-weight-medium">{category.name}</h4>
          <div className="container-grid">
            {category.itemId.length === 0 ? (
              <div className="row">
                <div className="col-auto align-itemId-center">
                  There is no destination at this catgeory
                </div>
              </div>
            ) : (
              category.itemId.map((item, index2) => {
                return (
                  <div
                    className="item column-3 row-1"
                    key={`category-${index1}-item-${index2}`}>
                    <Link to={`/properties/${item._id}`} style={{ textDecoration:"none" }}>
                    <div className="card">
                      {item.isPopular && (
                        <div className="tag">
                          Popular{" "}
                          <span className="font-weight-light">Choice</span>
                        </div>
                      )}
                      <figure className="img-wrapper" style={{ height: 180 }}>
                        <img
                          src={
                            item.imageId[0]
                              ? `${process.env.REACT_APP_HOST}/${item.imageId[0].imageUrl}`
                              : ""
                          }
                          alt={item.title}
                          className="img-cover"
                        />
                      </figure>
                      <div className="meta-wrapper d-flex flex-column justify-content-start">                        
                          <h5 className="h4 text-gray-900">
                            {item.title}
                          </h5>
                       
                        <span className="text-gray-500">
                          {item.trackId[0].city}, {item.trackId[0].province}
                        </span>
                      </div>
                    </div>
                    </Link>
                  </div>
                );
              })
            )}
          </div>
        </Fade>
      </section>
    );
  });
}
