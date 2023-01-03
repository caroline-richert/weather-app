// Global variables with default city
let city = "Berlin";
let apiUnit = "metric";
let apiKey = "oefc7407ecc6003ed89266cf0ba020bt";

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
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}`;

  axios
    .get(`${apiUrl}&key=${apiKey}&units=${apiUnit}`)
    .then(showTemperature)
    .catch((error) => {
      console.log("API error", error);
    });
}

// SCript for forecast

function fetchForecastInformation(coordinates) {

  let forecastAPI =
    `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}`

  axios
    .get(`${forecastAPI}&key=${apiKey}&units=${apiUnit}`)
    .then(displayForecast)
    .catch((error) => {
      console.log("API error", error);
    });
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000 );
  let day = date.getDay()
  let days = ["Mo", "Die", "Mi", "Do", "Fr", "Sa", "So"];


  return days[day];
};


function displayForecast(response) {
  console.log("Daily Forecast data", response.data.daily);
  
  let forecastData = response.data.daily;
  let forecastElement = document.querySelector(".weather-forecast");
  let forecastHTML = "";

  forecastData.forEach(function (forecastDay, index) {
    if(index < 5 ){
    forecastHTML = forecastHTML +
      `<div class="forecast-items">
      <h5 class="forecast-day">${formatDay(forecastDay.time)}</h2>
      <h6 class="forecast-temp">${Math.round(forecastDay.temperature.day)}°C</h6>
      <img class="forecast--icon" src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png"/>
    </div>`;
  };
  })

  forecastElement.innerHTML = forecastHTML;
}

// Handle API data
function showTemperature(response) {
  console.log("Weather", response.data);
  let cityElement = document.querySelector(".city-name");
  cityElement.textContent = response.data.city;
  let tempElement = document.querySelector(".temp");
  celsiusTemp = Math.round(response.data.temperature.current)
  let tempData = celsiusTemp;
  tempElement.textContent = tempData;
  let weatherDesription = document.querySelector(".weather-description");
  weatherDesription.textContent = response.data.condition.description;
  let windspeed = document.querySelector(".weather-wind");
  windspeed.textContent = "wind speed: " + Math.round(response.data.wind.speed) + " kmh";
  let iconData = response.data.condition.icon;
  let weatherIcon = document.querySelector(".weather--icon");
  weatherIcon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${iconData}.png`
  );

  fetchForecastInformation(response.data.coordinates);
}


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
  return `Last updated: ${day} ${hours}:${minutes}`;
}



