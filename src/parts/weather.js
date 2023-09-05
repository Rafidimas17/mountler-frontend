import React, { useEffect,useState } from "react";
import './weather.scss'
export default function Weather({ data }) {
  const [currentDate, setCurrentDate] = useState('');
  useEffect(() => {
    // Fungsi untuk memperbarui latar belakang berdasarkan suhu
    const currentDate = new Date().toLocaleDateString();
    setCurrentDate(currentDate);
  
    const updateBackgroundTemperature = () => {
      const weatherContainer = document.querySelector('.weather-container');

      // Menghapus kelas sebelumnya
      weatherContainer.classList.remove('cold', 'hot');

      // Menambahkan kelas sesuai dengan suhu
      if (data.temperature !== null) {
        if (data.temperature <= 27) {
          weatherContainer.classList.add('cold');
        } else {
          weatherContainer.classList.add('hot');
        }
      }
    };

    updateBackgroundTemperature();
  }, [data.temperature]);
  return (  
    <section className="container" id="contain">
    <div className="weather-container">
      <div className="weather-info">
        <p className="temperature">{data.temperature !== null ? `${data.temperature}°C` : 'Loading...'}</p>
        <p className="description">{data.description}</p>
      </div>
      <div className="date-info">
        <p className="date">{currentDate}</p>
      </div>
    </div>
    </section>
  );
}
