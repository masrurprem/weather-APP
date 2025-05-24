/*
File:
Description:
Author:

*/

// DOM
const inputCity = document.querySelector(".city--input");
const submitForm = document.querySelector("form");
const temp = document.querySelector("#temp");
const city = document.querySelector("#city--name");
const hum = document.querySelector(".hum--value");
const wind = document.querySelector(".wind--value");
const totWeather = document.querySelector(".weather-app");
const weatherDisp1 = document.querySelector(".weatherWindow--1");
const weatherDisp2 = document.querySelector(".weatherWindow--2");
const weatherIcon = document.querySelector("#weather_image");
const locationNotfound = document.querySelector(".location--error");
const overlay = document.querySelector(".overlay");
const spinner = document.querySelector(".spinner");
const landing = document.querySelector(".landing--txt");

// overlay handlers
function overlayOn() {
  overlay.classList.remove("hidden");
}

function overlayOff() {
  overlay.classList.add("hidden");
}
// loading spinner handlers
function showSpinner() {
  spinner.classList.remove("hidden");
}

function hideSpinner() {
  spinner.classList.add("hidden");
}

// Weather Data Request: Event Handling
submitForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  showSpinner();
  overlayOn();
  const requested_city = inputCity.value;
  console.log(requested_city);

  const response = await fetch(
    `http://localhost:3000/weather?city=${requested_city}`
  );
  //console.log("the response obj to client: ", response);

  const weatherData = await response.json();
  console.log("data to client side: ", weatherData);

  overlayOff();
  hideSpinner();

  if (weatherData.status === 404) {
    landing.classList.add("hidden");
    weatherDisp1.classList.add("hidden");
    weatherDisp2.classList.add("hidden");
    locationNotfound.classList.remove("hidden");
  } else if (weatherData.status === 200) {
    landing.classList.add("hidden");
    locationNotfound.classList.add("hidden");
    weatherDisp1.classList.remove("hidden");
    weatherDisp2.classList.remove("hidden");

    //
    temp.textContent = `${Math.round(weatherData.temp)}°C`;
    city.textContent = `${weatherData.city}`;
    hum.textContent = `${weatherData.humidity}%`;
    wind.textContent = `${weatherData.windSpeed} Km/h`;

    // Update weather icon
    const weather = weatherData.weathIcon;

    if (weather === "Clear") {
      weatherIcon.src = "/images/sun.png";
    } else if (weather === "Clouds") {
      weatherIcon.src = "/images/cloud.png";
    } else if (weather === "Rain") {
      weatherIcon.src = "/images/rain.png";
    } else if (weather === "Drizzle") {
      weatherIcon.src = "/images/drizzle.png";
    } else if (weather === "Thunderstorm") {
      weatherIcon.src = "/images/thunderStorm.png";
    }
  }
});

////////////
const apiKey = "pk.2b24b7388f4b618a770103f06de68764";

async function fetchCity(coords) {
  const response = await fetch(
    `https://us1.locationiq.com/v1/reverse?key=${apiKey}&lat=${coords.latitude}&lon=${coords.longitude}&format=json`
  );
  const data = await response.json();
  return data.address.city;
}

navigator.geolocation.getCurrentPosition(async (position) => {
  const location = await fetchCity(position.coords);
  console.log("the city on the console: ", location);
  showSpinner();
  overlayOn();

  const response = await fetch(
    `http://localhost:3000/weather?city=${location}`
  );
  //console.log("the response obj to client: ", response);

  const weatherData = await response.json();
  console.log("the response obj to client: ", weatherData.city);
  overlayOff();
  hideSpinner();
  landing.classList.add("hidden");
  locationNotfound.classList.add("hidden");
  weatherDisp1.classList.remove("hidden");
  weatherDisp2.classList.remove("hidden");

  //
  temp.textContent = `${Math.round(weatherData.temp)}°C`;
  city.textContent = `${weatherData.city}`;
  hum.textContent = `${weatherData.humidity}%`;
  wind.textContent = `${weatherData.windSpeed} Km/h`;

  //
  // Update weather icon
  const weather = weatherData.weathIcon;

  if (weather === "Clear") {
    weatherIcon.src = "/images/sun.png";
  } else if (weather === "Clouds") {
    weatherIcon.src = "/images/cloud.png";
  } else if (weather === "Rain") {
    weatherIcon.src = "/images/rain.png";
  } else if (weather === "Drizzle") {
    weatherIcon.src = "/images/drizzle.png";
  } else if (weather === "Thunderstorm") {
    weatherIcon.src = "/images/thunderStorm.png";
  }
});
