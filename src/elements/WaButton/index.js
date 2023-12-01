import React from "react";
import "./index.scss"; // Assuming you have an SVG file for the WhatsApp icon
import { Wa } from "../../assets";
const WhatsAppButton = () => {
  const phoneNumber = "6289613260405";
  const textQuery = encodeURIComponent(
    "Hai, saya mau tanya apakah ada kendala di website Mountler?"
  );

  const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${textQuery}`;

  return (
    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
      <button id="wa" className="btn-floating d-flex align-items-center">
        <img src={Wa} alt="wa" width="28px" />
        <span>Call Us Now!</span>
      </button>
    </a>
  );
};

export default WhatsAppButton;
