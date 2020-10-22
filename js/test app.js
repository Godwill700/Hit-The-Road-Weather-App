const searchBox = document.querySelector(".search-box");
let long;
let lat;
let tempDegree = document.querySelector(".temperature-degree");
let tempDescription = document.querySelector(".temperature-description");
let hiTemp = document.querySelector(".hi");
let loTemp = document.querySelector(".lo");
let locationTimezone = document.querySelector(".location-timezone");
let currentDateTime = document.querySelector(".current-date");
let date = document.querySelector(".date");
let windSpeed = document.querySelector(".wind-speed");
let iconSrc = document.querySelector(".icon");
let today = new Date();
const temperatureSection = document.querySelector(".temperature");
const temperatureSpan = document.querySelector(".degree-section .temptoggle");
const apiKey = "678afea2cacd45f15cb8c12cf204d91e";

// Set date and time
currentDateTime.innerHTML = today.toUTCString();
// Defining city name
let cityName = document.querySelector(".search-box").value;
searchBox.addEventListener("keyup", (e) => {
  if (e.isComposing || e.keyCode == 13) {
    cityName = e.target.value;
    searchBox.value = "";

    const api = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

    fetch(api)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);

        //Set DOM elements from API
        tempDegree.innerHTML = Math.floor(data.main.temp);
        locationTimezone.innerHTML = `${data.name} ${data.sys.country}`;
        tempDescription.innerHTML = data.weather[0].description;
        // Set Hi-Lo Temp
        hiTemp.innerHTML = Math.floor(data.main.temp_max);
        loTemp.innerHTML = Math.floor(data.main.temp_min);

        // Set Icons
        let main = data.weather[0].main;
        let description = data.weather[0].description;
        iconSrc.src = `../icons/climacon-${main}.svg`;

        //Formula for temperature conversion
        let Farenheit = tempDegree.innerHTML * (9 / 5) + 32;

        //Toggle Degrees/Celcius
        temperatureSection.addEventListener("click", () => {
          if (temperatureSpan.innerHTML === "C") {
            temperatureSpan.innerHTML = "F";
            tempDegree.innerHTML = Math.floor(Farenheit);
            hiTemp.innerHTML = Math.floor(data.main.temp_max * (9 / 5) + 32);
            loTemp.innerHTML = Math.floor(data.main.temp_min * (9 / 5) + 32);
          } else {
            temperatureSpan.innerHTML = "C";
            tempDegree.innerHTML = Math.floor(data.main.temp);
            hiTemp.innerHTML = Math.floor(data.main.temp_max);
            loTemp.innerHTML = Math.floor(data.main.temp_min);
          }
        });

        //Wind conversion
        windSpeed.innerHTML = Math.floor(data.wind.speed * 3.6);
      });
  }
});
