import { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ latlng }) => {
  const [weatherData, setWeatherData] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const getWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${process.env.REACT_APP_API_KEY}&units=metric`,
          {
            signal: controller.signal,
          }
        );

        setWeatherData(response.data);

        setShow(true);
      } catch (err) {
        console.error(err);
      }
    };
    getWeatherData();
    return () => {
      controller.abort();
    };
  }, [latlng]);

  return (
    <>
      {show && (
        <div>
          <p>temperature {weatherData.main.temp} Celsius</p>
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt='tempicon'
          />
          <p>wind {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </>
  );
};

export default Weather;
