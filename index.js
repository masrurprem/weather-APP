const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

//middleware
app.use(express.static("public"));

// default frontend homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "/index.html"));
});

// weather route handling
app.get("/weather", async (req, res) => {
  const apiKey = "232f36b248a6d3f4b730230b5203f015";
  const city_name = req.query.city;

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${apiKey}&units=metric`;

  const response = await fetch(apiUrl);

  if (!response.ok) {
    return res.json({
      status: response.status,
      payload: await response.json(),
    });
  }
  const data = await response.json();

  return res.json({
    status: response.status,
    temp: data.main.temp,
    city: data.name,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    weathIcon: data.weather[0].main,
  });
});

// server  listening from port
app.listen(port, (error) => {
  if (error) {
    console.log("error connecting server");
    process.exit(1);
  }
  console.log(`server connected at http://localhost:${port}`);
});
