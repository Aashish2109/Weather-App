const apiKey = "bcc904fda2735a91724b9d47d17d9460";
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function fetchWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (response.status == 404) {
            document.querySelector(".err").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        }
        else {
            var data = await response.json();

            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
            document.querySelector(".cloudscover1").innerHTML = data.clouds.all + " %";
            document.querySelector(".sunrise").innerHTML = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
            const weatherType = document.querySelector(".weather-type");
            weatherType.textContent = data.weather[0].main;

            if (data.weather[0].main == "Clouds") {
                weatherIcon.src = "images/clouds.png";
            }
            else if (data.weather[0].main == "Clear") {
                weatherIcon.src = "images/clear.png";
            }
            else if (data.weather[0].main == "Rain") {
                weatherIcon.src = "images/rain.jpeg";
            }
            else if (data.weather[0].main == "Drizzle") {
                weatherIcon.src = "images/drizzle.png";
            }
            else if (data.weather[0].main == "Haze") {
                weatherIcon.src = "images/haze.png";
            }
            else {
                weatherIcon.src = "images/mist.png";
            }

        }
    }
    catch (error) {
        console.error(error);
    }
}
searchBtn.addEventListener("click", () => {
    fetchWeather(searchBox.value);
})
searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent the default form submission
        fetchWeather(searchBox.value);
    }
});

