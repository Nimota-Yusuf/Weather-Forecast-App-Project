function city(event) {
  event.preventDefault();
  let form_input = document.querySelector("#form-input");
  searchCity(form_input.value);
}
let searchElement = document.querySelector("form");
searchElement.addEventListener("submit", city);

function searchCity(city) {
  let apiKey = "f8f60a003btf3df78oa2b71e8949ee2f";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;
  axios.get(apiURL).then(display_temperature);
  //console.log(apiURL);
}

function display_temperature(response) {
  let temperature = response.data.temperature.current;
  let temperature_result = document.querySelector("#temperature");
  temperature_result.innerHTML = Math.round(temperature);

  let h1Element = document.querySelector("h1");
  h1Element.innerHTML = response.data.city;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `${response.data.wind.speed}km/h`;

  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = response.data.condition.description;

  let date = new Date(response.data.time * 1000);
  let currentTime = document.querySelector("#current-date");
  currentTime.innerHTML = current_date(date);

  let temperature_icon = document.querySelector("#temperature-emoji");
  let icon = `<img src ='${response.data.condition.icon_url}' class='temperature-emoji'> `;
  temperature_icon.innerHTML = icon;

  applyForecast(response.data.city);
}

function current_date(date) {
  let week_days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = week_days[date.getDay()];
  let hour = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hour}:${minutes},`;
}
searchCity('Nigeria');

function forecast_weather(response) {
    console.log(response.data)

  let forecastElement =""
  response.data.daily.forEach(function(day, index){
    if (index < 6){
  forecastElement =
    forecastElement +
    `
    <div class="forecast-date">
        <div class="forecast-day">${getForecastDay(day.time)}</div>
        <div class="forecast-icon"><img src="${day.condition.icon_url}" alt="Weather-forecast-icon"></div>
        <div class="forecast-temperature">
            <strong class="forecast-temperature-max">${Math.round(
              day.temperature.maximum
            )}°</strong>
            <span class="forecast-temperature-min">${Math.round(
              day.temperature.minimum
            )}°</span>
        </div>
    </div>`;   
    
  let forecast_details = document.querySelector("#weather-forecast");
  forecast_details.innerHTML = forecastElement
}})}
forecast_weather();

function applyForecast(city){
    let apiKey = "f8f60a003btf3df78oa2b71e8949ee2f";
    let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&unit=metric`;
    axios.get(apiURL).then(forecast_weather);
}

function getForecastDay(forecastDay){
    let currentDay = new Date (forecastDay * 1000);
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    return days[currentDay.getDay()]
}