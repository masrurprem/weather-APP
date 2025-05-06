console.log("hello i am prem");

const form = document.querySelector("form");
const cityInput = document.querySelector(".input--city");
const displayWeather = document.querySelector(".header");
const dispCity = document.querySelector(".header--2");
//
console.log("before submission city:", cityInput.value);

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const get_city = cityInput.value;
    console.log("after submission city:", get_city);

    const response = await fetch(
      `http://localhost:3000/weather?city=${get_city}`
    );
    // check on response
    if (!response.ok) {
      throw new Error("there was a server side error");
    }

    const weatherData = await response.json();
    console.log("full response:", weatherData);
    const tempt = weatherData.main.temp;
    const cityName = weatherData.name;
    // show weather to client
    displayWeather.textContent = `tempurature is: ${tempt}°C`;
    dispCity.textContent = `city name: ${cityName}`;
  } catch (err) {
    displayWeather.textContent = "error fetching weather data";
    console.log("fetch error is: ", err);
  }
});
