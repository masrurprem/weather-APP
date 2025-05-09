/*
File:
Description:
Author:

*/

// DOM
const inputCity = document.querySelector(".input--city");
const submitForm = document.querySelector("form");
const temp = document.querySelector(".header--1");
const city = document.querySelector(".header--2");
const hum = document.querySelector(".header--3");
const wind = document.querySelector(".header--4");

// Event Handing
submitForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const requested_city = inputCity.value;
  console.log(requested_city);

  const response = await fetch(
    `http://localhost:3000/weather?city=${requested_city}`
  );
  console.log("the response obj to client: ", response);

  const weatherData = await response.json();
  console.log("data to client side: ", weatherData);

  if (weatherData.status === 404) {
    temp.textContent = "no temp to show";
    city.textContent = weatherData.payload.message;
    hum.textContent = "no humidity to show";
    wind.textContent = "no wind speed to show";
  } else if (weatherData.status === 200) {
    temp.textContent = `Temparature: ${weatherData.temp} °C`;
    city.textContent = `City: ${weatherData.city}`;
    hum.textContent = `Humidity: ${weatherData.humidity}%`;
    wind.textContent = `Wind Speed: ${weatherData.windSpeed} Km/h`;
  }
});
