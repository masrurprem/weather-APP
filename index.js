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

app.get("/weather", async (req, res) => {
  const city = req.query.city;
  const apiKey = "232f36b248a6d3f4b730230b5203f015";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const response = await fetch(apiUrl);
  if (!response.ok) {
    res.json({
      status: +response.status,
      payload: await response.json(),
    });
  }
  res.json({
    status: +response.status,
    payload: await response.json(),
  });
});

app.listen(port, (err) => {
  if (err) {
    console.log("error connecting the server");
    process.exit(1);
  }
  console.log("listening to the server from port: ", port);
});
