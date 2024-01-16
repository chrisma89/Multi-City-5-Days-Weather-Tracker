// unique APIKey
const apiKey = "3d834375601783e4927040748b9cd39c";

// target the search button using jquery
let submitBtn = $("#search-button");

// Adding event-listener to search button and calling the create button and storage functions
submitBtn.on("click", function (e) {
  e.preventDefault();
  let cityName = $("#search-input").val().trim();
  $("#search-input").val("");
  createNewButton(cityName);
  todayForecast(cityName)
  addToStorage(cityName);
});

// function to call the api and dispaly current weather conditions
function todayForecast(cityName) {
  let queryURL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&weather&limit=5&appid=${apiKey}`;

  // fetch call one to get geo data
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      
      // assign variables to store necessary data for second fetch call
      let latitude = data[0].lat;
      let longitude = data[0].lon;
      let forecastURl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

      // fetch call two to collect 5 day forecast data
      fetch(forecastURl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          // target html element to dynamically add data
          const cityDisplay = $("#today").addClass("card d-flex");
          cityDisplay.empty();
          let cityDisplayHeading = $("<h2>").text(
            cityName + " (" + dayjs().format("DD/MM/YYYY") + ")"
          );
          let weatherIconSrc = data.list[0].weather[0].icon;
          let weatherIcon = $("<img>").attr(
            "src",
            "https://openweathermap.org/img/wn/" + weatherIconSrc + ".png"
          );
          cityDisplayHeading.append(weatherIcon);
          let cityTemp = $("<p>").text(
            "Temp : " + parseInt(data.list[0].main.temp - 273.15) + " °C "
          );
          let cityWind = $("<p>").text(
            "Wind : " + data.list[0].wind.speed + " KPH "
          );
          let cityHumidity = $("<p>").text(
            "Humidity : " + data.list[0].main.humidity + " % "
          );
          cityDisplay.append(
            cityDisplayHeading,
            cityTemp,
            cityWind,
            cityHumidity
          );

          // call function to display the forcast data
          day5Forecast(data);
        });
    });
}

// function to display 5 day forecast weather
function day5Forecast(data) {
  // 5 day forecast heading- created dynamically
  let forecastSection = $("#forecast");
  let forecastSubsection = $(".card-container");
  forecastSubsection.empty();
  forecastSection.empty();
  let forecastHeading = $("<h3>").text("5-Day Forecast: ").css({
    "margin-left": "0px",
  });
  forecastSection.prepend(forecastHeading);

  // 5 day forecasts cards generated and styled with for loop
  let forecastArray = data.list;

   // start i at 7, because the last day in the data doesnt have the current time slot.
  // since forecast is in 3-hour slot , we increment by 8

  for (let i = 7; i < forecastArray.length; i += 8) {
    let forecastCards = $("<div>").addClass("five-day-card d-flex");

    // variables created for date, icon, time, wind and humidity and appended to card
    let forecastDate = $("<h5>").text(
      dayjs(data.list[i].dt_txt).format("DD/MM/YYYY")
    );
    let weatherIconSrc = data.list[i].weather[0].icon;
    let weatherIcon = $("<img>").attr(
      "src",
      "https://openweathermap.org/img/wn/" + weatherIconSrc + ".png"
    );
    let forecastTemp = $("<p>").text(
      "Temp: " + parseInt(data.list[i].main.temp - 273.15) + " °C "
    );
    let forecastWind = $("<p>").text(
      "Wind: " + data.list[i].wind.speed + " KPH "
    );
    let forecastHumidity = $("<p>").text(
      "Humidity: " + data.list[i].main.humidity + " % "
    );
    forecastCards.append(
      forecastDate,
      weatherIcon,
      forecastTemp,
      forecastWind,
      forecastHumidity
    );
    forecastSubsection.append(forecastCards);
  }
}

// function to create new button for user search
function createNewButton(cityName) {
  let btngroup = $("#history");
  if (btngroup.find(`button:contains('${cityName}')`).length === 0) {
    let newBtn = $("<button>")
      .text(cityName)
      .addClass("list-group-button mb-3 history-btn")
      .css({
        "font-size": "25px",
        "width": "675%",
        "margin-left": "-7px",
      });
    btngroup.append(newBtn);

    // event listeners added to dynamically created buttons and forecast function called
    newBtn.on("click", function (e) {
      e.preventDefault();
      todayForecast(cityName);
    });
  }
}

// function to store user's search input into local storage
function addToStorage(cityName) {
  let storageArray = JSON.parse(localStorage.getItem("cities")) || [];

  if (!storageArray.includes(cityName)) {
    storageArray.push(cityName);
  }
  localStorage.setItem("cities", JSON.stringify(storageArray));
}

// reload user's search buttons onto page on reload
$(document).ready(function () {
  let storageArray = localStorage.getItem("cities");
  if (storageArray) {
    let reloadArray = JSON.parse(storageArray);

    reloadArray.forEach(function (cityName) {
      createNewButton(cityName);
    });
  }
});
