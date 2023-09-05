import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import './Card.scss';
import axios from "axios";
const VerifyEmail = () => {
    const [validUrl, setValidUrl] = useState(false);
    const param = useParams();
  
    const handleVerifyEmail = async () => {
      try {
        await axios.get(`${process.env.REACT_APP_HOST}/users/verify-email/${param.tokenAktif}`);
        setValidUrl(true);
      } catch (error) {
        console.error(error);
        setValidUrl(false);
      }
    };
return (
    <div className="card-holder">
  <div className="card-verify">
    <div className="header">
      <div className="image">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M20 7L9.00004 18L3.99994 13" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </g>
        </svg>
      </div>
      <div className="content">
        <span className="title">Aktivasi Akun</span>
        <p className="message">Terima kasih telah mendaftar! Silakan klik tombol dibawah ini untuk menikmati layanan dari platform kami.</p>
      </div>
    </div>
    <div className="actions">
        <Link to="/login">
        <button className="history" onClick={handleVerifyEmail}>Aktivasi</button>
        </Link>
    </div>
  </div>
  </div>
);
};

export default VerifyEmail;

