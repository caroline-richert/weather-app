// Default City name
let city = "Berlin";

// Call API with default city
fetchWeatherInformation(city);

// Handle form submission
let weatherSearch = document.querySelector(".weather-search");
weatherSearch.addEventListener("submit", searchCity);

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".weather-search-input");
  fetchWeatherInformation(searchInput.value);
}

// Call weather API
function fetchWeatherInformation(city) {
  let apiUnit = "metric";
  let apiKey = "f38202399f30f738fecfffbd7ad57622";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}`;

  axios
    .get(`${apiUrl}&&appid=${apiKey}&units=${apiUnit}`)
    .then(showTemperature)
    .catch((error) => {
      console.log("API error", error);
    });
}

// Handle API data
function showTemperature(response) {
  console.log("response", response.data);
  let cityElement = document.querySelector(".city-name");
  cityElement.textContent = response.data.name;
  let tempElement = document.querySelector(".temp");
  celsiusTemp = Math.round(response.data.main.temp)
  let tempData = celsiusTemp;
  tempElement.textContent = tempData;
  let minElement = document.querySelector(".current-min");
  let minData = Math.round(response.data.main.temp_min);
  minElement.textContent = minData;
  let maxElement = document.querySelector(".current-max");
  let maxData = Math.round(response.data.main.temp_max);
  maxElement.textContent = maxData;
  let weatherDesription = document.querySelector(".weather-description");
  weatherDesription.textContent = response.data.weather[0].description;
  let windspeed = document.querySelector(".weather-wind");
  windspeed.textContent = Math.round(response.data.wind.speed);
  let iconData = response.data.weather[0].icon;
  let weatherIcon = document.querySelector(".weather--icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconData}@2x.png`
  );
}

// Toogle Temperature Units
function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector(".temp");
  temperatureElement.textContent = Math.round(fahrenheitTemp);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temp");
  temperatureElement.textContent = celsiusTemp;
}

let celsiusTemp

let fahrenheitLink = document.querySelector(".fahrenheit");
fahrenheitLink.addEventListener('click', displayFahrenheitTemp)

let celsiusLink = document.querySelector(".celsius");
celsiusLink.addEventListener('click', displayCelsiusTemp)

// current Date and Time
let dateElement = document.querySelector(".current-time");
let currentTime = new Date();
dateElement.textContent = formatDate(currentTime);

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let currentDay = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[currentDay];
  return `${day} ${hours}:${minutes}`;
}
