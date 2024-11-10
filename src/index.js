function refreshData(response) {
  //Current temperature
  let currentTemperatureElement = document.querySelector(
    "#current-temperature"
  );
  console.log(response.data.temperature.current);
  let currentTemperature = Math.round(response.data.temperature.current);
  currentTemperatureElement.innerHTML = currentTemperature;
  //Current weather
  let currentWeatherElement = document.querySelector("#current-weather");
  console.log(response.data.condition.description);
  let currentWeather = response.data.condition.description;
  currentWeatherElement.innerHTML = currentWeather;
  //MoreInfo
  //Humidity/Windspeed/Pressure/RealFeel
  let realfeelElement = document.querySelector("#realfeel");
  let realfeel = Math.round(response.data.temperature.feels_like);
  realfeelElement.innerHTML = realfeel;

  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.temperature.humidity;
  humidityElement.innerHTML = humidity;

  let windspeedElement = document.querySelector("#windspeed");
  let windspeed = response.data.wind.speed;
  windspeedElement.innerHTML = windspeed;

  let pressureElement = document.querySelector("#pressure");
  let pressure = response.data.temperature.pressure;
  pressureElement.innerHTML = pressure;
  //Add units to the HTML
}

function searchCity(city) {
  let apiKey = "2302c5a95dc704b0f5a33b6ffd9o3dta";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  //update so can select unit
  axios.get(apiURL).then(refreshData);
  console.log(apiURL);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  console.log(searchInput.value);
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmit);

searchCity("london");
