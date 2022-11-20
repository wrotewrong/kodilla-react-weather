import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = () => {
  let [finalData, setFinalData] = useState('');
  let [pending, setPending] = useState(false);
  let [error, setError] = useState(false);

  const handleCityChange = useCallback((city) => {
    setPending(true);
    setError(false);
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b5b4985111af5d4a7d5fa8049a8a585f&units=metric`
    ).then((res) => {
      if (res.status === 200) {
        return res.json().then((data) => {
          const weatherData = {
            city: data.name,
            temp: data.main.temp,
            icon: data.weather[0].icon,
            description: data.weather[0].main,
          };

          setFinalData(weatherData);
          setPending(false);
        });
      } else {
        setPending(false);
        setError(true);
      }
    });
  }, []);

  return (
    <section>
      <PickCity action={handleCityChange} />
      {finalData && !pending && !error && <WeatherSummary data={finalData} />}
      {pending && <Loader />}
      {error && <ErrorBox />}
    </section>
  );
};

export default WeatherBox;
