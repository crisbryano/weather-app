import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const APIKey = "2c585771fe1cdf285d712e1dd00d7a3a";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true })); // Use bodyParser to parse form data
app.get("/", async (req, res) => {
  try {
    let city = "Depok"; // Define city within the try block
    const result = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`
    );
    let desc = result.data.weather[0].description;
    let capitalizedDesc = desc.charAt(0).toUpperCase() + desc.slice(1);
    let temp = result.data.main.temp;
    temp = Math.round(temp - 273); // Convert to Celsius and round it
    let imgPath = Math.floor(Math.random() * 5) + 1; // Corrected the random number generation
    let time = new Date(result.data.dt * 1000 - (result.data.timezone * 1000));
    const formattedTime = `${time.getDate().toString().padStart(2, '0')}-${(time.getMonth() + 1).toString().padStart(2, '0')}-${time.getFullYear()}`;
    res.render("index.ejs", {
      temp: temp,
      lat: result.data.coord.lat,
      lon: result.data.coord.lon,
      weather: result.data.weather[0].main,
      desc: capitalizedDesc,
      city: result.data.name,
      flag: result.data.sys.country,
      icon: result.data.weather[0].icon,
      wind: result.data.wind.speed,
      humid: result.data.main.humidity,
      path: imgPath, // Corrected the assignment
      pressure: result.data.main.pressure,
      time: formattedTime,
    });
  } catch (error) {
    console.error(error.response.data);
    res.status(500).send("Internal Server Error");
  }
});


app.post("/", async (req, res) => {
  try {
    const city = req.body.city; // Get the city from the form data
    const result = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`
    );
    let desc = result.data.weather[0].description;
    let capitalizedDesc = desc.charAt(0).toUpperCase() + desc.slice(1);
    let temp = result.data.main.temp;
    temp = Math.round(temp - 273); // Convert to Celsius and round it
    let imgPath = Math.floor(Math.random() * 5) + 1; // Corrected the random number generation
    let time = new Date(result.data.dt * 1000 - (result.data.timezone * 1000));
    const formattedTime = `${time.getDate().toString().padStart(2, '0')}-${(time.getMonth() + 1).toString().padStart(2, '0')}-${time.getFullYear()}`;
    res.render("index.ejs", {
      temp: temp,
      lat: result.data.coord.lat,
      lon: result.data.coord.lon,
      weather: result.data.weather[0].main,
      desc: capitalizedDesc,
      city: result.data.name,
      flag: result.data.sys.country,
      icon: result.data.weather[0].icon,
      wind: result.data.wind.speed,
      humid: result.data.main.humidity,
      path: imgPath, // Corrected the assignment
      pressure: result.data.main.pressure,
      time: formattedTime,
    });
  } catch (error) {
    console.error(error.response.data);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
