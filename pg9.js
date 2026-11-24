const express = require("express"); 
const app = express(); 
const PORT = 3002; 

app.get("/weather", async (req, res) => { 
    try { 
        const latitude = 12.9716; 
        const longitude = 77.5946; 
        
        // Fixed: Removed the accidental space in wind_speed_10m
        const apiURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`; 
        
        const response = await fetch(apiURL); 
        if (!response.ok) { 
            throw new Error("Weather service request failed"); 
        } 
        
        const result = await response.json(); 
        
        res.status(200).json({ 
            success: true, 
            city: "bengaluru", 
            temperature: result.current.temperature_2m, 
            temperatureUnit: result.current_units.temperature_2m, // Fixed: cuurent_unit -> current_units
            humidity: result.current.relative_humidity_2m, 
            humidityUnit: result.current_units.relative_humidity_2m, 
            windspeed: result.current.wind_speed_10m, 
            windSpeedUnit: result.current_units.wind_speed_10m // Fixed: Added result. prefix
        }); 
    } catch (error) { 
        // Debug tip: Always log the error to your console so you can see exactly what failed
        console.error(error);
        res.status(502).json({ 
            success: false, 
            message: "unable to fetch weather data" 
        }); 
    } 
}); 

app.listen(PORT, () => { 
    console.log(`Weather API running at http://localhost:${PORT}`); 
});
