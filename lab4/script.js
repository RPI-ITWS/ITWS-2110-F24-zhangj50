const OPENWEATHER_API_KEY = "2647e6e2577161f590f6002bb89571cb";
const VISUALCROSSING_API_KEY = "RLL7C39CSZU8F593DTZC6AZP3";
const city = "New York";

// Helper to format temperature to Fahrenheit
const formatTempF = (temp) => `${Math.round(temp)}°F`;

// Fetch and display current weather from OpenWeatherMap
async function fetchCurrentWeather() {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${OPENWEATHER_API_KEY}`
  );
  const data = await response.json();
  document.getElementById("city").innerText = data.name;
  document.getElementById(
    "icon"
  ).innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon">`;
  document.getElementById("temperature").innerText = formatTempF(
    data.main.temp
  );
}

// Fetch and display 7-day forecast from VisualCrossing
async function fetchForecast() {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=${VISUALCROSSING_API_KEY}`
  );
  const data = await response.json();
  const forecast = data.days.slice(0, 7);
  const forecastEl = document.getElementById("forecast");
  forecastEl.innerHTML = ""; // Clear previous data

  forecast.forEach((day) => {
    const date = new Date(day.datetime);
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "short" });
    const iconUrl = day.icon;

    const lowTempF = formatTempF(day.tempmin);
    const highTempF = formatTempF(day.tempmax);
    const lowPercentage = ((day.tempmin + 30) / 100) * 100;
    const highPercentage = ((day.tempmax + 30) / 100) * 100;

    forecastEl.innerHTML += `
           <div class="forecast-day">
               <div class="forecast-info">
                   <span>${dayOfWeek}</span>
                   <img src="https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/4th%20Set%20-%20Color/${iconUrl}.png" alt="icon" class="forecast-icon">
                   <span>${lowTempF}</span>
                   <div class="weather-bar-container">
                       <div class="weather-bar" style="left: ${lowPercentage}%; width: ${
      highPercentage - lowPercentage
    }%"></div>
                   </div>
                   <span>${highTempF}</span>
               </div>
           </div>`;
  });
}

// Fetch additional weather details from VisualCrossing
async function fetchAdditionalWeatherDetails() {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=${VISUALCROSSING_API_KEY}`
  );
  const data = await response.json();
  const currentConditions = data.currentConditions;

  document.getElementById(
    "wind-gust"
  ).innerText = `Wind Gust: ${currentConditions.windgust} mph`;
  document.getElementById(
    "wind-speed"
  ).innerText = `Wind Speed: ${currentConditions.windspeed} mph`;
  document.getElementById(
    "wind-direction"
  ).innerText = `Wind Direction: ${currentConditions.winddir}°`;
  document.getElementById("feels-like").innerText = `Feels Like: ${formatTempF(
    currentConditions.feelslike
  )}`;
  document.getElementById(
    "precipitation"
  ).innerText = `Precipitation: ${currentConditions.precip} in`;
  document.getElementById(
    "visibility"
  ).innerText = `Visibility: ${currentConditions.visibility} mi`;
  document.getElementById(
    "humidity"
  ).innerText = `Humidity: ${currentConditions.humidity}%`;
  document.getElementById(
    "sunrise-sunset"
  ).innerText = `Sunrise: ${currentConditions.sunrise} / Sunset: ${currentConditions.sunset}`;
  document.getElementById(
    "pressure"
  ).innerText = `Pressure: ${currentConditions.pressure} hPa`;
}

// Fetch all weather data
fetchCurrentWeather();
fetchForecast();
fetchAdditionalWeatherDetails();
