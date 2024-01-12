
let submitBtn = $("#search-button");

// unique APIKey
const apiKey = "3d834375601783e4927040748b9cd39c";

// querurl
// // 
submitBtn.on("click", function(e){
  e.preventDefault();
let cityName = $("#search-input").val().trim()
let queryURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`

// let latitude = 51.5073219;
// let longitude = -0.1276474;

// fetch call
fetch(queryURL)
.then(function (response) {
    return response.json()
})
.then(function (data) { 
    console.log(cityName)
    console.log(`geo data: ${data}`);
    let latitude = data[0].lat
    let longitude = data[0].lon
    let forecastURl = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
    fetch(forecastURl)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        console.log(data);
        
  const cityDisplay = $(".currentcity")

  let cityDisplayHeading =($("<div>").addClass("col-lg-9 pb=3").text(cityName + " (" + dayjs().format("MM/DD/YYYY") + ")" ));

  cityDisplay.append(cityDisplayHeading)

  
  let cityTemp = ($("<p>").text ("Temp : " + parseInt((data.list[0].main.temp) - (273.15)) + " °C "));

  cityDisplay.append(cityTemp)

  let cityWind = ($("<p>").text ("Wind : " + (data.list[0].wind.speed) + " KPH "));

  cityDisplay.append(cityWind)

  let cityHumidity = ($("<p>").text ("Humidity : " + (data.list[0].main.humidity) + " % "));

  cityDisplay.append(cityHumidity)
       
    })

// 

})
})

