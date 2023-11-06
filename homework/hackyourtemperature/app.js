import express from "express";
import { keys } from "./sources/keys.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`hello from backend to frontend!`);
});

app.post("/weather", async (req, res) => {
  try {
    const { cityName } = req.body;

    if (!cityName) {
      return res.status(400).send({ message: "Provide a city please!" });
    }
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${keys.API_KEY}`
    );
    
    const data = await response.json();

    if (data.cod === "404") {
      return res.status(404).json({ weatherText: "City is not found OR HTTP error!" });
    } else {
      return res.json({ cityName: data.name, temperature: data.main.temp });
    }
  } catch (error) {
    res.send(`${error}`);
  }
});

export default app;
