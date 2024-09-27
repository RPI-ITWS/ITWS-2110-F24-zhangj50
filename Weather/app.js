window.addEventListener("load", function () {
  const API_KEY = "2647e6e2577161f590f6002bb89571cb";
  async function currentAPI(lat, lon) {
    const request = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    const response = request.json();
    response.then((data) => {
      console.log(data);
    });
  }
  async function forecastAPI(lat, lon) {
    const request = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    const response = request.json();
    response.then((data) => {
      console.log(data);
    });
  }
  navigator.geolocation.getCurrentPosition((position) => {
    currentAPI(position.coords.latitude, position.coords.longitude);
    forecastAPI(position.coords.latitude, position.coords.longitude);
  });
});
