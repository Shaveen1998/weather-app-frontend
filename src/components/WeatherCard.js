import React from 'react';
import '../pages/Weather.css'

const WeatherCard = ({ data }) => {
  return (
    <div className="weather-card">
      <h2>{data.date}</h2>
      <p>Time: {data.time}</p>
      <p>Description: {data.description}</p>
      <p>Temperature: {data.temperature}°C</p>
      <p>Humidity: {data.humidity}%</p>
      <p>Pressure: {data.pressure} hPa</p>
    </div>
  );
};

export default WeatherCard;
