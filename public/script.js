console.log("hello i am prem");

const form = document.querySelector("form");
const cityInput = document.querySelector(".input--city");
const displayWeather = document.querySelector(".header");
const dispCity = document.querySelector(".header--2");
//
console.log("before submission city:", cityInput.value);

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const get_city = cityInput.value;
  console.log("after submission city:", get_city);
  const response = await fetch(
    `http://localhost:3000/weather?city=${get_city}`
  );
  const weatherData = await response.json();
  if (weatherData.status === 404) {
    displayWeather.textContent = weatherData.payload.message;
    dispCity.textContent = `Please recheck your country name: ${get_city}`;
  } else if (weatherData.status === 200) {
    displayWeather.textContent = `tempurature is: ${weatherData.payload.main.temp}°C`;
    dispCity.textContent = `city name: ${weatherData.payload.name}`;
  }
});
