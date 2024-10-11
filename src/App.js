import './App.css';
import { useState } from 'react';

function App() {
  let [city, setCity] = useState('');
  let [wDetails, setwDetails] = useState();
  let [isLoading, setIsLoading] = useState(false);

  let getData = (event) => {
    event.preventDefault();
    setIsLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d34fd3c6dbee04c622bd157d284d2577&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === '404') {
          setwDetails(undefined);
        } else {
          setwDetails(data);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setwDetails(undefined);
      });
    setCity('');
  };

  return (
    <div className="w-full h-screen bg-gradient-to-r from-indigo-500 to-blue-600 flex items-center justify-center">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">Simple Weather App</h1>

        <form onSubmit={getData} className="flex justify-center mb-8">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-64 h-12 px-4 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Enter City Name"
          />
          <button className="bg-blue-600 text-white px-6 py-2 rounded-r-lg hover:bg-blue-700 transition duration-200 ease-in-out">
            Submit
          </button>
        </form>

        <div className="relative bg-gray-100 p-6 rounded-lg shadow-md">
          {isLoading && (
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif"
              width={80}
              className="absolute left-1/2 transform -translate-x-1/2"
              alt="Loading"
            />
          )}

          {wDetails ? (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800">
                {wDetails.name},{' '}
                {wDetails.sys && wDetails.sys.country ? (
                  <span className="bg-yellow-300 rounded-full px-2 py-1">{wDetails.sys.country}</span>
                ) : (
                  <span>Unknown Country</span>
                )}
              </h3>
              <h2 className="text-4xl font-bold text-indigo-600 my-4">{wDetails.main.temp}°C</h2>
              {wDetails.weather && wDetails.weather[0] && (
                <div className="flex flex-col items-center">
                  <img
                    src={`http://openweathermap.org/img/w/${wDetails.weather[0].icon}.png`}
                    alt="Weather Icon"
                    className="w-20 h-20"
                  />
                  <p className="text-lg text-gray-600 capitalize">{wDetails.weather[0].description}</p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-center text-gray-500">No Data Available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
