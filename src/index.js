function refreshData(response) {
  let currentTemperatureElement = document.querySelector(
    "#current-temperature"
  );
  console.log(response.data.temperature.current);
  let currentTemperature = Math.round(response.data.temperature.current);
  currentTemperatureElement.innerHTML = currentTemperature;
}

function searchCity(city) {
  let apiKey = "2302c5a95dc704b0f5a33b6ffd9o3dta";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  //update so can select unit
  axios.get(apiURL).then(refreshData);
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
