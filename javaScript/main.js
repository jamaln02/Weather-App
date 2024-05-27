const myInput = document.querySelector("input"),
  myCity = document.querySelector(".myCity"),
  myTime = document.querySelector(".myTime"),
  myImg = document.querySelector(".myImg"),
  myWeather = document.querySelector(".myWeather"),
  myTemp = document.querySelector(".myTemp"),
  windSpeed = document.querySelector(".windSpeed"),
  humidity = document.querySelector(".humidity"),
  pressure = document.querySelector(".pressure"),
  myBtn = document.querySelector("button");

myBtn.addEventListener("click", () => {
  if (myInput.value == "") {
    myCity.innerHTML = `<h1 class="text-danger fs-3 fw-bolder ">Nothing To Show </h1>`;
  } else {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${myInput.value}&units=metric&appid=bca2253f8df0f2d43903f9c72c585a5c
`)
      .then((res) => res.json())

      .then((data) => {
        if (data.cod == "404" && data.message == "city not found") {
          myCity.innerHTML = `<h1 class="text-danger fs-3 fw-bolder text-capitalize ">${data.message}</h1>`;
        } else {
          let lon = data.coord.lon;

          let lat = data.coord.lat;

          fetch(`https://api.timezonedb.com/v2.1/get-time-zone?key=W9N5CSYKD4VC&format=json&by=position&lat=${lat}&lng=${lon}
`)
            .then((res2) => res2.json())

            .then((data2) => {
              myCity.innerHTML = data2.cityName;

              myTime.innerHTML = data2.formatted;

              myWeather.innerHTML = data.weather[0].main;

              myTemp.innerHTML = parseInt(data.main.feels_like);

              windSpeed.innerHTML = data.wind.speed;

              humidity.innerHTML = data.main.humidity;

              pressure.innerHTML = data.main.pressure;

              if (data.weather[0].main == "Clouds") {
                myImg.src = `images/clouds.png`;
              } else if (data.weather[0].main == "Clear") {
                myImg.src = `images/sun.png`;
              } else if (data.weather[0].main == "Rain") {
                myImg.src = `images/rainy.png`;
              } else if (data.weather[0].main == "Thunderstorm") {
                myImg.src = `images/Thunderstorm.png`;
              }
            });
        }
      });
  }
});
