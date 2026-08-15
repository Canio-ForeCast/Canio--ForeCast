let name="";
let currentWeather="";
let temperature = 0;
let feelsLike = 0;
let humidity = 0;
let windSpeed = 0;

function getName(){

    const usernameBox = document.getElementById("username");

    if (usernameBox) {
        name = usernameBox.value;
    }

    navigator.geolocation.getCurrentPosition(

        function(position){

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            function changeBackground(weather) {

                document.body.classList.remove(
                    "sunny",
                    "cloudy",
                    "rainy",
                    "storm",
                    "snow",
                    "night"
                );

                const message = document.getElementById("message");

                switch (weather) {

                    case "Clear":

                        document.body.classList.add("sunny");

                        if (message) {
                            message.innerHTML =
                            `☀️☀️, Its a sunny day ${name} No tension`;
                        }

                        break;


                    case "Clouds":

                        document.body.classList.add("cloudy");

                        if (message) {
                            message.innerHTML =
                            `☁️ its an cloudy day ${name} Be careful, for security carry an umbrella`;
                        }

                        break;


                    case "Rain":

                    case "Drizzle":

                        document.body.classList.add("rainy");

                        if (message) {
                            message.innerHTML =
                            `🌧️Its an rainy day ${name},must carry an umbrella 🌧️`;
                        }

                        break;


                    case "Thunderstorm":

                        document.body.classList.add("storm");

                        if (message) {
                            message.innerHTML =
                            `⛈️ thunderstorm are there ${name} be careful⛈️`;
                        }

                        break;


                    case "Snow":

                        document.body.classList.add("snow");

                        if (message) {
                            message.innerHTML =
                            `☃️☃️its snow outside ${name} enjoyyyyyy, me coming soon👋`;
                        }

                        break;


                    default:

                        document.body.classList.add("night");

                }
            }


            /* =========================
               CURRENT WEATHER
            ========================= */

            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=weather_code,temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m`)

            .then(response => response.json())

            .then(data => {

                const weather_code = data.current.weather_code;

                temperature = data.current.temperature_2m;

                feelsLike = data.current.apparent_temperature;

                humidity = data.current.relative_humidity_2m;

                windSpeed = data.current.wind_speed_10m;


                /* DISPLAY CURRENT WEATHER */

                const tempBox =
                    document.getElementById("temperature");

                const feelsBox =
                    document.getElementById("feelsLike");

                const humidityBox =
                    document.getElementById("humidity");

                const windBox =
                    document.getElementById("wind");


                if (tempBox) {

                    tempBox.textContent =
                    "Current Temperature: " +
                    temperature +
                    "°C";

                }


                if (feelsBox) {

                    feelsBox.textContent =
                    "Feels like: " +
                    feelsLike +
                    "°C";

                }


                if (humidityBox) {

                    humidityBox.textContent =
                    humidity +
                    "%";

                }


                if (windBox) {

                    windBox.textContent =
                    windSpeed +
                    " km/h";

                }


                /* WEATHER TYPE */

                let weather = "";
                if (weather_code === 0) {
                    weather = "Clear";
                    
                }
                else if (weather_code >= 1 && weather_code <= 3) {
                    weather = "Clouds";
                    
                }
                else if (weather_code >= 45 && weather_code <= 48) {
                    weather = "Fog";
                    
                }
                else if (weather_code >= 51 && weather_code <= 55) {
                    weather = "Drizzle";
                    
                }
                else if (weather_code >= 56 && weather_code <= 57) {
                    weather = "Drizzle";
                    
                }
                else if (weather_code >= 61 && weather_code <= 65) {
                    weather = "Rain";
                    
                }
                else if (weather_code >= 66 && weather_code <= 67) {
                    weather = "Rain";
                    
                }
                else if (weather_code >= 71 && weather_code <= 77) {
                    weather = "Snow";
                    
                }
                else if (weather_code >= 80 && weather_code <= 82) {
                    weather = "Rain";
                    
                }
                else if (weather_code >= 85 && weather_code <= 86) {
                    weather = "Snow";
                    
                }
                else if (weather_code >= 95 && weather_code <= 99) {
                    weather = "Thunderstorm";
                    
                }
                else {
                    weather = "Clouds";
                    
                }
                changeBackground(weather);

            })

            .catch(error => console.error(error));


/* =========================
   FUTURE DAILY WEATHER
========================= */

fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max&timezone=auto`)

.then(response => response.json())

.then(data => {

    const dates = data.daily.time;

    const weatherCodes = data.daily.weather_code;

    const maxTemps =
        data.daily.temperature_2m_max;

    const minTemps =
        data.daily.temperature_2m_min;

    const rain =
        data.daily.precipitation_sum;

    const wind =
        data.daily.wind_speed_10m_max;


    /* =========================
       FUTURE WEATHER DROPDOWN
    ========================= */

    const futureDate =
        document.getElementById("futureDate");

    const futureWeather =
        document.getElementById("futureWeather");


    if (futureDate && futureWeather) {

        futureDate.innerHTML =
            `<option value="">Select a date</option>`;


        for (let i = 0; i < dates.length; i++) {

            const option =
                document.createElement("option");

            option.value = i;

            option.textContent = dates[i];

            futureDate.appendChild(option);

        }


        futureDate.onchange = function () {

            const selectedIndex = this.value;


            if (selectedIndex === "") {

                futureWeather.innerHTML = "";

                return;

            }


            const i =
                Number(selectedIndex);


            futureWeather.innerHTML = `

                <div class="future-weather-card">

                    <h3>📅 ${dates[i]}</h3>

                    <p>
                        🌡️ ${minTemps[i]}°C -
                        ${maxTemps[i]}°C
                    </p>

                    <p>
                        🌧️ Rain:
                        ${rain[i]} mm
                    </p>

                    <p>
                        💨 Wind:
                        ${wind[i]} km/h
                    </p>

                    <p>
                        🌤️ Weather Code:
                        ${weatherCodes[i]}
                    </p>

                </div>

            `;

        };

    }

})

.catch(error => console.error(error));

        }

    );

}