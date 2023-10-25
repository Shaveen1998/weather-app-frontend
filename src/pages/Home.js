import React, { useState, useEffect } from 'react';
//import { useAuthContext } from "../hooks/useAuthContext"
import Search from '../components/Search';
import WeatherCard from '../components/WeatherCard';



const Home = () => {
  

  const [weatherData, setWeatherData] = useState({});
  const [showFullWeek, setShowFullWeek] = useState(false);
  const apiKey = 'f3c4637948ee385b3a3e63955eaa2dbc'; 

  useEffect(() => {
    handleSearch(6.9271, 79.8612); // Fetch Colombo's weather data by default
  }, []);

  const handleSearch = (latitude, longitude) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setWeatherData(data))
      .catch((error) => console.error('Error fetching data:', error));
  };


  return (
    <div>
    <Search onSearch={handleSearch} />

    {weatherData.city && (
<div>
  <h1>Weather in {weatherData.city.name}</h1>
  <WeatherCard
    data={{
      date: weatherData.list[0].dt_txt.split(' ')[0],
      time: weatherData.list[0].dt_txt.split(' ')[1],
      description: weatherData.list[0].weather[0].description,
      temperature: (weatherData.list[0].main.temp - 273.15).toFixed(2),
      humidity: weatherData.list[0].main.humidity,
      pressure: weatherData.list[0].main.pressure,
    }}
  />
</div>
)}

{weatherData.list && (
<div>
  <h2>Three-Day Forecast:</h2>
  <div className="weather-cards-row">
    {weatherData.list.slice(0, 24).reduce((days, item, index) => {
      if (index % 8 === 0) {
        const date = item.dt_txt.split(' ')[0];
        const dayWeather = weatherData.list.slice(index, index + 8);
        days.push(
          <div key={index} className="weather-card">
            <h3>{date}</h3>
            <ul>
              {dayWeather.map((timeItem, timeIndex) => (
                <li key={timeIndex}>
                  {timeItem.dt_txt.split(' ')[1]}: {timeItem.weather[0].description}
                </li>
              ))}
            </ul>
          </div>
        );
      }
      return days;
    }, [])}
  </div>
</div>
)}



    <button onClick={() => setShowFullWeek(!showFullWeek)}>
      {showFullWeek ? 'Show Three-Day Forecast' : 'View More'}
    </button>

    {showFullWeek && (
      <div>
        <h2>Next 7 Days Forecast:</h2>
        <ul>
          {weatherData.list.map((item, index) => (
            <li key={index}>
              {item.dt_txt}: {item.weather[0].description}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
  )
}

export default Home