window.addEventListener("load", () => {
  let long;
  let lat;
  let tempDegree = document.querySelector(".temperature-degree");
  let tempDescription = document.querySelector(".temperature-description");
  let locationTimezone = document.querySelector(".location-timezone");
  let day = document.querySelector(".day");
  let date = document.querySelector(".date");
  let windSpeed = document.querySelector(".wind-speed");
  let iconSrc = document.querySelector(".icon");
  const temperatureSection = document.querySelector(".temperature");
  const temperatureSpan = document.querySelector(".degree-section .temptoggle");
  const apiKey = "cfaRn6UaXbmR6pKDvVuJDgW0TsVMvUSJ";

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=678afea2cacd45f15cb8c12cf204d91e`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          //Set DOM elements from API
          tempDegree.innerHTML = data.main.temp;
          locationTimezone.innerHTML = `${data.name} ${data.sys.country}`;
          tempDescription.innerHTML = data.weather[0].description;
          //Get date

          //   day.getDate();
          // Set Icons
          let main = data.weather[0].main;
          let description = data.weather[0].description;
          //   iconSrc.src = `../climacon-cloud_${main}_${description}.svg`;
          iconSrc.src = `../icons/climacon-${main}.svg`;
          console.log(iconSrc.src);

          //Formula for temperature conversion
          let Farenheit = tempDegree.innerHTML * (9 / 5) + 32;

          //Toggle Degrees/Celcius
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.innerHTML === "C") {
              temperatureSpan.innerHTML = "F";
              tempDegree.innerHTML = Math.floor(Farenheit);
              console.log(temperatureSpan);
            } else {
              temperatureSpan.innerHTML = "C";
              tempDegree.innerHTML = data.main.temp;
            }
          });
        });
    });
  }
});
