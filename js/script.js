const apiKey = "b60c8cef9be77e0e295b15f1a5a61875";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&appid=b60c8cef9be77e0e295b15f1a5a61875&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherCard = document.querySelector(".weather-card");
const weatherIcon = document.querySelector(".weather-icon");
const bodyBg = document.querySelector("body")

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    if (response.status < 200 || response.status > 299) {
        document.querySelector(".error").classList.remove("hidden");
        document.querySelector(".weather").classList.add("hidden");
    }
    else {
        document.querySelector(".error").classList.add("hidden");
        document.querySelector(".weather").classList.remove("hidden");
    }

        if (!city) {
        document.querySelector(".error").classList.add("hidden");
        document.querySelector(".weather").style.display = "none";
    }
    
    var data = await response.json();

    console.log(data);

    
    if (data.cod && data.cod === "404") {
        document.querySelector(".error").classList.remove("hidden");
        document.querySelector(".weather").style.display = "none";
        return;
    }

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main === 'Clouds') {
            weatherIcon.src = "images/clouds.png";
            document.querySelector('body').style.background = "url('images/clouds-back.gif')";
           
        } else if (data.weather[0].main === 'Clear') {
            weatherIcon.src = "images/clear.png"
            document.querySelector('body').style.background = "url('images/sun-back-2.gif')";
        } else if (data.weather[0].main === 'Rain') {
            weatherIcon.src = "images/rain.png";
            document.querySelector('body').style.background = "url('images/rain-back.gif')";
        }  else if (data.weather[0].main === 'Snow') {
            weatherIcon.src = "images/snow.png";
            document.querySelector('body').style.background = "url('images/snow-back.gif')";
        } else if (data.weather[0].main === 'Clouds'){
            weatherIcon.src = "images/clouds-back.png";
        }else if (data.weather[0].main === 'Drizzle'){
            weatherIcon.src = "images/drizzle.png";
        }else if (data.weather[0].main === 'Mist'){
            weatherIcon.src = "images/mist.png";
        }
        
    bodyBg.style.backgroundRepeat = 'no-repeat';
    bodyBg.style.backgroundSize = 'cover';
    weatherCard.style.backgroundRepeat = 'no-repeat';
    weatherCard.style.backgroundSize = 'cover';
    
    document.querySelector(".weather").style.display = "block";
    
}

searchBox.addEventListener("input", () => {
    checkWeather(searchBox.value);
});
