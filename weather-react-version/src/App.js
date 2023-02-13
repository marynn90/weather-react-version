import "./App.css";
import React, { useState } from "react";
import axios from "axios";

export default function App() {
  let [loaded, setLoaded] = useState(false);
  let [temperature, setTemperature] = useState(null);
  let [city, setCity] = useState(null);
  let [wind, setWind] = useState(null);
  let [icon, setIcon] = useState(null);
  let [description, setDescription] = useState(null);
  let [humidity, setHumidity] = useState(null);
  function showTemperature(response) {
    setLoaded(true);
    setTemperature(Math.round(response.data.main.temp));
    setDescription(response.data.weather[0].description);
    setHumidity(response.data.main.humidity);
    setWind(response.data.wind.speed);
    setIcon(
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  }
  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "ad793a6d772939c31783de5822791acf";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature);
  }
  function updateCity(event) {
    setCity(event.target.value);
  }
  if (loaded) {
    return (
      <div className="App">
        <h1>Weather App</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Enter a city... "
            onChange={updateCity}
          />
          <button type="submit">Search</button>
        </form>
        <ul className="description">
          <li>Temperature: {temperature}°C</li>
          <li>Description: {description}</li>
          <li>Humidity: {humidity}%</li>
          <li>Wind: {wind}km/h</li>
          <li>
            <img src={icon} alt="weather-icon" />
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <div className="App">
        <h1>Weather App</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Enter a city... "
            onChange={updateCity}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
}
