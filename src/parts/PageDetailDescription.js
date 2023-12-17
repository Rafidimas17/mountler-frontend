import React from "react";

export default function PageDetailDescription({ data }) {
  let teks = data.description.replace(/<\/?p>/g, "");
  const featureOrder = ["Shelter", "Porter", "Toilet", "mdpl"];

  // Sorting the features based on the order array
  const sortedFeatures = data.featureId.sort(
    (a, b) => featureOrder.indexOf(a.name) - featureOrder.indexOf(b.name)
  );
  return (
    <main>
      <h4>Deskripsi Gunung</h4>
      <p className="text-justify" style={{ fontFamily: "Poppins" }}>
        {teks}
      </p>
      <div className="row" style={{ marginTop: 30 }}>
        {sortedFeatures.map((feature, index) => {
          return (
            <div
              key={`feature-${index}`}
              className="col-3"
              style={{ marginBottom: 20 }}>
              <img
                width="38"
                className="d-block mb-2"
                src={`${process.env.REACT_APP_HOST}/${feature.imageUrl}`}
                alt={feature.name}
              />{" "}
              <span
                className="text-gray-900 font-weight-bold"
                style={{ fontFamily: "Poppins" }}>
                {feature.qty}{" "}
              </span>
              <span
                className="text-gray-900 font-weight-medium"
                style={{ fontFamily: "Poppins" }}>
                {feature.unit}{" "}
              </span>
              <span
                className="text-gray-900 font-weight-light"
                style={{ fontFamily: "Poppins" }}>
                {feature.name}
              </span>
            </div>
          );
        })}
      </div>
    </main>
  );
}
