import React from "react";

export default function ReservationSummary({ checkout }) {
  const startDate = new Date(checkout.date.startDate);
  const dayStart = startDate.toLocaleString("en-us", { weekday: "short" });
  const dateStart = startDate.getDate();
  const monthStart = startDate.getMonth() + 1; // Perhatikan penambahan +1 karena indeks bulan dimulai dari 0
  const yearStart = startDate.getFullYear();

  const formattedDateStart = `${dayStart}, ${dateStart}/${monthStart}/${yearStart}`;

  const endDate = new Date(checkout.date.endDate);
  const dayEnd = endDate.toLocaleString("en-us", { weekday: "short" });
  const dateEnd = endDate.getDate();
  const monthEnd = endDate.getMonth() + 1; // Perhatikan penambahan +1 karena indeks bulan dimulai dari 0
  const yearEnd = endDate.getFullYear();

  const formattedDateEnd = `${dayEnd}, ${dateEnd}/${monthEnd}/${yearEnd}`;
  return (
    <div
      className="col-4 d-none d-lg-block p-3 mb-5 bg-white rounded"
      style={{
        boxShadow: "0 6px 60px #3333330f",
        backgroundColor: "white",
        borderRadius: 24,
        height: "100%",
        position: "static",
      }}>
      <h3
        className="m-3"
        style={{
          fontFamily: "Poppins",
          fontWeight: 600,
          fontSize: 20,
        }}>
        Ringkasan pesanan
      </h3>

      <div
        className="container"
        style={{
          border: "2.5px solid #A5A5A5",
          borderRadius: 10,
        }}     
      >
        <div className="row p-2">
          <div className="col">
            <h6
              className="checkin"
              style={{
                fontWeight: 700,
                fontFamily: "Poppins",
                color: "#3d3d3d",
                fontSize: 16,
              }}>
              Check-in :
            </h6>
            <p
              className="checkin"
              style={{
                color: "#0B165B",
                fontFamily: "Poppins",
                fontSize: 14,
              }}>
              {formattedDateStart}
            </p>
            <h6
              className="checkin mt-4"
              style={{
                fontWeight: 700,
                fontFamily: "Poppins",
                color: "#3d3d3d",
                fontSize: 16,
              }}>
              Durasi :
            </h6>
            <h6
              className="date-out"
              style={{
                color: "#0B165B",
                fontSize: 16,
                fontWeight: 500,
                fontFamily: "Poppins",
                float: "left",
                marginTop: 2,
              }}>
              {checkout.duration} Hari
            </h6>
          </div>
          <div className="col">
            <h6
              className="checkout"
              style={{
                fontWeight: 700,
                fontSize: 16,
                fontFamily: "Poppins",
                color: "#3d3d3d",
              }}>
              Check-out :
            </h6>
            <p
              className="date-out"
              style={{
                color: "#0B165B",
                fontSize: 14,
                fontFamily: "Poppins",
              }}>
              {formattedDateEnd}
            </p>
            <h6
              className="checkin mt-4"
              style={{
                fontWeight: 700,
                fontFamily: "Poppins",
                color: "#3d3d3d",
                fontSize: 16,
              }}>
              Jalur :
            </h6>
            <h6
              className="date-out"
              style={{
                color: "#0B165B",
                fontFamily: "Poppins",
                fontWeight: 500,
                fontSize: 14,
              }}>
              {checkout.track}
            </h6>
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <h6
              className="checkin ml-2"
              style={{
                fontWeight: 700,
                fontFamily: "Poppins",
                color: "#3d3d3d",
                fontSize: 16,
              }}>
              Gunung pilihan :
            </h6>
            <h6
              className="date-out ml-2"
              style={{
                color: "#0B165B",
                fontFamily: "Poppins",
                fontWeight: 500,
                fontSize: 14,
              }}>
              {checkout.name}
            </h6>
          </div>
        </div>
        <div className="row p-2">
          <div className="col">
            <div className="row">
              <div className="col"></div>
            </div>
            <h5
              className="titleTotalPrice mt-2"
              style={{
                float: "left",
                color: "#0B165B",
                fontWeight: 600,
                fontSize: 18,
                fontFamily: "Poppins",
              }}>
              Total harga
            </h5>
            <h5
              className="totalPrice mt-2"
              style={{
                float: "right",
                color: "#0B165B",
                fontWeight: 600,
                fontSize: 18,
                fontFamily: "Poppins",
              }}>
              Rp {checkout.duration * checkout.price}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}
