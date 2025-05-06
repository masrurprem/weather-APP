/*
Project: Weather App
Desc: Getting Weather Data for the Input City
Author: masrur ul alam
*/

// modules and dependencies
const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// Middleware to serve static files
app.use(express.static("public"));

// render html homepage with default static setting
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "/index.html"));
});

//route handler for GET request from weather API with async await
app.get("/weather", async (req, res) => {
  console.log("request has hit");
  // necessary particular for API call
  const city = req.query.city;
  console.log("the city is:", city);
  const apiKey = "232f36b248a6d3f4b730230b5203f015";

  // complete dynamic api url
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  // fetch weather data via api call and getting response
  try {
    const response = await fetch(apiUrl);
    // check on response
    if (!response.ok) {
      res.status(500).send("there was a api call problem");
    }
    const weather = await response.json();
    console.log("the requested data:");
    console.log(weather); // actual weather data as js object parsed from JSON

    res.json(weather); // sending response to frontend side fetch request
  } catch (er) {
    //console.log(er);
    res.status(404).send("error fetching weather data");
  }
});

// listening to server via port
app.listen(port, (err) => {
  if (err) {
    console.log("error connecting the server");
  }
  console.log("listening to the server from port: ", port);
});
