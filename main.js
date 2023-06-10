const apiKey = "b486d7dcd0630b3d2852c1056d742501";

document.getElementById("search-button").addEventListener("click", getWeatherData);

async function getWeatherData(event) {
    event.preventDefault();

    try {
        const locationName = document.getElementById("weather-input").value.toLowerCase();
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationName}&appid=${apiKey}`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Weather data not found.");
        }

        const data = await response.json();

        // Extract the required weather information from the response data
        const temperatureHigh = data.main.temp_max;
        const temperatureLow = data.main.temp_min;
        const forecast = data.weather[0].description;
        const humidity = data.main.humidity;

        // Convert temperatures from Kelvin to Fahrenheit
        const temperatureHighFahrenheit = ((temperatureHigh - 273.15) * 9/5 + 32).toFixed(2);
        const temperatureLowFahrenheit = ((temperatureLow - 273.15) * 9/5 + 32).toFixed(2);

        // Display the weather information on the webpage
        document.getElementById("high").textContent = `High: ${temperatureHighFahrenheit}°F`;
        document.getElementById("low").textContent = `Low: ${temperatureLowFahrenheit}°F`;
        document.getElementById("forecast").textContent = `Forecast: ${forecast}`;
        document.getElementById("humidity").textContent = `Humidity: ${humidity}%`;
    } catch (error) {
        console.log("Error:", error);
        // Display an error message on the webpage
        document.getElementById("weather-details").textContent = "Error fetching weather data.";
    }
}
