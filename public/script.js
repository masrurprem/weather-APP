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
const weatherIcon = document.querySelector(".weather_image");
const locationNotfound = document.querySelector(".location--error");

// Event Handing
submitForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const requested_city = inputCity.value;
  console.log(requested_city);

  const response = await fetch(
    `http://localhost:3000/weather?city=${requested_city}`
  );
  //console.log("the response obj to client: ", response);

  const weatherData = await response.json();
  //console.log("data to client side: ", weatherData);

  if (weatherData.status === 404) {
    weatherDisp1.classList.add("hidden");
    weatherDisp2.classList.add("hidden");
    locationNotfound.classList.remove("hidden");
  } else if (weatherData.status === 200) {
    locationNotfound.classList.add("hidden");
    weatherDisp1.classList.remove("hidden");
    weatherDisp2.classList.remove("hidden");

    //
    temp.textContent = `${Math.round(weatherData.temp)}°C`;
    city.textContent = `${weatherData.city}`;
    hum.textContent = `${weatherData.humidity}%`;
    wind.textContent = `${weatherData.windSpeed} Km/h`;
    // Update weather icon
  }
});
