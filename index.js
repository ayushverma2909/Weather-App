import express from "express";
import axios from "axios";


const APIKey = `Your API`;
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render("index.ejs");
});


app.get("/weather", async (req, res) => {
    const cityName = req.query.city;

    try {
        const geoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`;
        const geoResponse = await axios.get(geoUrl);
        const geoData = geoResponse.data;

        res.render("index.ejs", {
            temperature: (geoData.main.temp)-273,
            countryName: geoData.sys.country,
            description: geoData.weather[0].description,
            currentCity: geoData.name,
        })
    } catch (error) {
        res.render("index.ejs", {
            error: "City not found. Please enter a valid city name.",
        })
    }
})

app.listen(port, () =>{
    console.log(`server is running on port ${port}`);
});