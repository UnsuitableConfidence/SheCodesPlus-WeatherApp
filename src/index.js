function formatTime(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hour = date.getHours().toString().padStart(2, "0");
  let minute = date.getMinutes().toString().padStart(2, "0");

  return `${day} ${hour}:${minute}`;
}

function getOrdinal(date) {
  if (date === 1 || date === 21 || date === 31) {
    return "st";
  } else if (date === 2 || date === 22) {
    return "nd";
  } else if (date === 3 || date === 23) {
    return "rd";
  } else {
    return "th";
  }
}
function formatDate(date) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let dateNum = date.getDate();
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  let ordinal = getOrdinal(dateNum);
  return `${dateNum} <sup>${ordinal}</sup> ${month} ${year}`;
}

function formatForecastDay(forecastDate) {
  let date = new Date(forecastDate * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayDailyForecast(response) {
  console.log(response.data);

  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="forecast-box-daily">
            <div class=forecast-daily-day>${formatForecastDay(day.time)}</div>
            <div><img src="${
              day.condition.icon_url
            }" class="forecast-daily-icon"/></div>
            <div class="forecast-daily-temp">
              <div class="forecast-daily-max">${Math.round(
                day.temperature.maximum
              )}<sup id="unit-main">°C</sup></div>
              <div class="forecast-daily-min">${Math.round(
                day.temperature.minimum
              )}<sup id="unit-main">°C</sup></div>
          </div>
          </div>`;
    }
  });
  let forecastDaily = document.querySelector("#forecast-boxes-daily");
  forecastDaily.innerHTML = forecastHTML;
}

function getDailyForecast(city) {
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiURL).then(displayDailyForecast);
  //TODO update so can select unit
}

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
  //MoreInfo: Humidity/Windspeed/Pressure/RealFeel
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
  //Time and Date
  let currentTimeElement = document.querySelector("#current-time");
  let currentDateElement = document.querySelector("#current-date");
  let timeAndDate = new Date(response.data.time * 1000);
  console.log(timeAndDate);
  //currentTimeElement.innerHTML = `${timeAndDate.getDay()}, ${timeAndDate.getHours()}:${timeAndDate.getMinutes()}`;
  currentTimeElement.innerHTML = formatTime(timeAndDate);
  //  currentDateElement.innerHTML = `${timeAndDate.getDate()} ${timeAndDate.getMonth()}, ${timeAndDate.getFullYear()}`;
  currentDateElement.innerHTML = formatDate(timeAndDate);
  //Weather Icon
  let iconElement = document.querySelector("#weather-icon");
  let icon = `<img src="${response.data.condition.icon_url}" alt="${response.data.condition.icon}">`;
  iconElement.innerHTML = icon;

  getDailyForecast(response.data.city);
}

function searchCity(city) {
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  //TODO update so can select unit
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

  lastSearchedCity = searchInput.value;
}

let apiKey = "2302c5a95dc704b0f5a33b6ffd9o3dta";
//let apiKey = "bd79ao40tde3dec118ca46bc3e6dd55f";
let units = "metric";
let lastSearchedCity = "london";

/*function toggleUnit(event) {
  event.preventDefault();
  units = units === "metric" ? "imperial" : "metric";
  unitToggle.innerHTML = units === "metric" ? "C/F" : "F/C";
  searchCity(lastSearchedCity);
}

let unitToggle = document.querySelector("#unit-toggle");
unitToggle.addEventListener("click", toggleUnit);*/

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmit);

searchCity(lastSearchedCity);

//TODO Add unit change button
//TODO format forward and back buttons on MoreInfo
//TODO Forecast
//TODO Hourly/Daily forecast
//TODO reformat icons for forecast
//TODO forward and back buttons on forecast
//TODO Add time-based colour for background
//TODO Add overlay for icon/background
