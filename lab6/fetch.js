window.addEventListener("load", function () {
  const API_KEY = "2647e6e2577161f590f6002bb89571cb";
  const SECOND_KEY = "RLL7C39CSZU8F593DTZC6AZP3";
  const root = document.querySelector(":root");

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  function setLight() {
    root.style.setProperty("--primary", "rgb(132, 185, 206)");
    root.style.setProperty("--secondary", "rgb(68, 108, 124)");
    root.style.setProperty("--trinary", "rgb(42, 78, 92)");
    root.style.setProperty("--invert", "90%");
    root.style.setProperty("--text", "white");
  }

  function setDark() {
    root.style.setProperty("--primary", "#040418");
    root.style.setProperty("--secondary", "#3a3939");
    root.style.setProperty("--trinary", "#101010");
    root.style.setProperty("--invert", "90%");
    root.style.setProperty("--text", "white");
  }

  function hue(temperature) {
    if (63 < temperature && temperature < 100) {
      return [117 - temperature, 60];
    } else if (temperature <= 63 && temperature > 32) {
      return [222 - temperature, 60];
    } else if (temperature <= 32 && temperature > 20) {
      return [222 - temperature, 60 + (temperature - 20) / 2];
    } else if (temperature <= 20) {
      return [190, 60];
    } else {
      return [17, 60];
    }
  }

  async function useCurrentData() {
    await fetch("currentdata.php", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        data = JSON.parse(data);
        console.log(data);
        console.log("mew");
        const currentTime = new Date();
        const sunriseTime = new Date(data.sys.sunrise * 1000);
        const sunsetTime = new Date(data.sys.sunset * 1000);
        console.log(sunriseTime);
        console.log(sunsetTime);

        document.querySelector(
          "#feels-like-number"
        ).innerHTML = `${data.main.feels_like}&deg`;
        document.querySelector("#rain-number").innerHTML = `${
          data.rain ? data.rain["1h"] : 0
        }"`;
        document.querySelector("#viz-number").innerHTML = `${Math.round(
          data.visibility / 1609
        )}mi`;
        document.querySelector(
          "#hum-number"
        ).innerHTML = `${data.main.humidity}%`;
        document.querySelector(
          "#pressure-number"
        ).innerHTML = `${data.main.pressure}hPa`;
        const riseset = document.querySelector("#ss");
        const sunTime = document.querySelector("#sun-time");
        let ampm = "AM";
        let hours = 0;
        let minutes = 0;
        if (currentTime < sunsetTime && currentTime > sunriseTime) {
          riseset.innerHTML = `<span><img src="icons/sunset.png" alt="temp" /></span>
                SUNSET`;
          hours = sunsetTime.getHours();
          minutes = sunsetTime.getMinutes();
          if (hours > 12) {
            ampm = "PM";
            hours -= 12;
          } else if (hours == 12) {
            ampm = "PM";
          } else if (hours == 0) {
            hours = 12;
          }
          sunTime.innerHTML = `${hours}:${minutes} ${ampm}`;

          setLight();
        } else {
          riseset.innerHTML = `<span><img src="icons/sunrise.png" alt="temp" /></span>
                SUNRISE`;
          hours = sunriseTime.getHours();
          minutes = sunriseTime.getMinutes();

          if (hours > 12) {
            ampm = "PM";
            hours -= 12;
          } else if (hours == 12) {
            ampm = "PM";
          } else if (hours == 0) {
            hours = 12;
          }
          sunTime.innerHTML = `${hours}:${minutes} ${ampm}`;
          setDark();
        }

        document.querySelector(".temp").innerHTML = `${Math.round(
          data.main.temp
        )}&deg;`;
        document.querySelector("#edit").addEventListener("click", function (e) {
          const divSelector = document.querySelector(".main-degree");
          tempCode = divSelector.innerHTML;
          console.log(data.main.temp);
          divSelector.innerHTML = `<input type="number" id="number-change" value="${data.main.temp}"/> <button id="done"><img src="icons/done.png" alt="done"></button>`;
          document
            .querySelector("#done")
            .addEventListener("click", async function (e) {
              await fetch("updateTemp.php", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  num: document.querySelector("#number-change").value,
                }),
              }).then((response) => {
                divSelector.innerHTML = tempCode;
                useCurrentData();
              });
            });
        });
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(
          ".image"
        ).innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon" />`;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function useForecastData() {
    await fetch("forecastdata.php", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        data = JSON.parse(data);
        document.querySelector("#wind-speed-number").innerHTML =
          data.currentConditions.windspeed;
        document.querySelector("#wind-gust-number").innerHTML =
          data.currentConditions.windgust;

        document
          .getElementById("pointer")
          .querySelector("img").style.transform =
          "rotate(" + (135 + data.currentConditions.winddir) + "deg)";
        root.style.setProperty(
          "--wind-upper",
          `${135 + data.currentConditions.winddir + 1}deg`
        );
        root.style.setProperty(
          "--wind-lower",
          `${135 + data.currentConditions.winddir - 1}deg`
        );

        const forecast = document.querySelector(".forecast");
        forecast.innerHTML = "";
        let currDay = "";
        let dayInfo = {};
        let maxTemp = 0;
        let minTemp = 200;
        for (let i = 0; i < 7; ++i) {
          dayInfo = data.days[i];
          if (dayInfo.feelslikemax > maxTemp) {
            maxTemp = dayInfo.feelslikemax;
          }
          if (dayInfo.feelslikemin < minTemp) {
            minTemp = dayInfo.feelslikemin;
          }
          if (i == 0) currDay = "Today";
          else
            currDay =
              daysOfWeek[new Date(dayInfo.datetimeEpoch * 1000).getDay()];
          forecast.insertAdjacentHTML(
            "beforeend",
            `<div class="day">
           <p class="dayofweek">${currDay}</p>
           <img
             src="weather/${dayInfo.icon}.png"
             alt="${dayInfo.icon}"
           />
           <p class="low">${Math.round(dayInfo.feelslikemin)}&deg;</p>
           <div class="temp-bar-wrapper" ><div class="temp-bar" id="${i}"></div></div>
           <p class="high">${Math.round(dayInfo.feelslikemax)}&deg;</p>
         </div>`
          );
          if (i == 6) {
            break;
          }
          forecast.insertAdjacentHTML("beforeend", "<hr/>");
        }
        const difference = maxTemp - minTemp;
        let marginLeft, width, minHue, maxHue, minBrightness, maxBrightness;
        let currBar;
        for (let i = 0; i < 7; ++i) {
          dayInfo = data.days[i];
          marginLeft = ((dayInfo.feelslikemin - minTemp) * 100) / difference;
          width =
            ((dayInfo.feelslikemax - dayInfo.feelslikemin) * 100) / difference;
          currBar = document.getElementById(`${i}`);
          currBar.style.marginLeft = `${marginLeft}%`;
          currBar.style.width = `${width}%`;

          [minHue, minBrightness] = hue(dayInfo.feelslikemin);
          [maxHue, maxBrightness] = hue(dayInfo.feelslikemax);
          currBar.style.backgroundImage = `linear-gradient(
   to right,
   hsla(${minHue}, 100%, 59%, 1),
   hsla(${maxHue}, 100%, 59%, 1)`;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function currentAPI() {
    let lat, lon;
    navigator.geolocation.getCurrentPosition(async (position) => {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      const request = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`
      );
      const response = request.json();
      response.then(async (data) => {
        console.log(data);
        await fetch("current.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((d) => {
            useCurrentData();
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
  }

  async function forecastAPI() {
    let lat, lon;
    navigator.geolocation.getCurrentPosition(async (position) => {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      const request = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?key=${SECOND_KEY}`
      );
      const response = request.json();
      response.then((data) => {
        console.log(data);
        fetch("forecast.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((d) => {
            useForecastData();
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
  }

  document
    .querySelector("#current-button")
    .addEventListener("click", currentAPI);
  document
    .querySelector("#forecast-button")
    .addEventListener("click", forecastAPI);
  let tempCode;

  setTimeout(() => {
    document.querySelector(".container").style.display = "block";
    document.querySelector(".loader-wrapper").style.display = "none";
    document.querySelectorAll(".update-buttons")[0].style.display = "inline";
    document.querySelectorAll(".update-buttons")[1].style.display = "inline";

    useCurrentData();
    useForecastData();
  }, 1000);
});
