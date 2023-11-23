import React, { useState } from "react";

const StarRating = ({ handleRating }) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (starNumber) => {
    setRating(starNumber);
    handleRating(starNumber);
  };

  const ratingText = (rating) => {
    switch (rating) {
      case 1:
        return "Sangat Buruk";
      case 2:
        return "Buruk";
      case 3:
        return "Biasa";
      case 4:
        return "Baik";
      case 5:
        return "Sangat Baik";
      default:
        return "";
    }
  };

  return (
    <div
      className="d-flex flex-row align-items-center mb-1"
      style={{ gap: 10 }}>
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          style={{
            color: index < rating ? "gold" : "#D8D9DA",

            cursor: "pointer",
            fontSize: "45px",
          }}
          onClick={() => handleStarClick(index + 1)}>
          ★
        </span>
      ))}
      <span
        className="mt-1"
        style={{ fontFamily: "Poppins", fontSize: 16, color: "#45474B" }}>
        {ratingText(rating)}
      </span>
    </div>
  );
};

export default StarRating;
