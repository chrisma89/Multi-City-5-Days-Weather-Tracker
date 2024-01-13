
let submitBtn = $("#search-button");

// unique APIKey
const apiKey = "3d834375601783e4927040748b9cd39c";

// querurl
// // 
submitBtn.on("click", function(e){
  e.preventDefault();
let cityName = $("#search-input").val().trim()

let btngroup = $("#history")

let newBtn = $("<button>").text(cityName).addClass("list-group-button mb-3").css({
    "font-size": "25px" , 
    "width" : "650%" ,
    })

    

btngroup.append(newBtn)

let queryURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&weather&limit=5&appid=${apiKey}`



// fetch call
fetch(queryURL)
.then(function (response) {
    return response.json()
})
.then(function (data) { 
    console.log(cityName)
    console.log(data)
    console.log(`geo data: ${data}`);
    let latitude = data[0].lat
    let longitude = data[0].lon
    let forecastURl = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
   
    // https://api.openweathermap.org/data/2.5/onecall?lat=19.0760&lon=72.8777&appid={yourAPIkey}
    fetch(forecastURl)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        console.log(data);
        
  const cityDisplay = $("#today")

  let cityDisplayHeading =($("<h2>").text(cityName + " (" + dayjs().format("DD/MM/YYYY") + ")" ));

  let weatherIconSrc = data.list[0].weather[0].icon
 
 let weatherIcon = $("<img>").attr("src","http://openweathermap.org/img/wn/" + weatherIconSrc + ".png")
  cityDisplayHeading.append(weatherIcon)

  
  let cityTemp = ($("<p>").text ("Temp : " + parseInt((data.list[0].main.temp) - (273.15)) + " °C "));


  let cityWind = ($("<p>").text ("Wind : " + (data.list[0].wind.speed) + " KPH "));


  let cityHumidity = ($("<p>").text ("Humidity : " + (data.list[0].main.humidity) + " % "));

  cityDisplay.append(cityDisplayHeading, cityTemp, cityWind,cityHumidity)
       day5Forecast(data)
    })

})
;
})

function day5Forecast (data) {
    console.log(data)

    let forecastSection = $(".card-header")

    let forecastHeading = $("<h3>").text("5-Day Forecast: ").css({
        "margin-left" : "10px",
    })
    
    
    forecastSection.prepend(forecastHeading)

    let forecastSubsection =$(".card-body")

    let forecastDate = $("<div>").text(dayjs(data.list[0].dt_text).format("DD/MM/YYYY"))

    forecastSubsection.append(forecastDate)
    let weatherIconSrc = data.list[0].weather[0].icon
 
    let weatherIcon = $("<img>").attr("src","http://openweathermap.org/img/wn/" + weatherIconSrc + ".png")
     forecastSubsection.append(weatherIcon)
   
     
     let forecastTemp = ($("<p>").text ("Temp: " + parseInt((data.list[0].main.temp) - (273.15)) + " °C "));
   
   
     let forecastWind = ($("<p>").text ("Wind: " + (data.list[0].wind.speed) + " KPH "));
   
   
     let forecastHumidity = ($("<p>").text ("Humidity: " + (data.list[0].main.humidity) + " % "));
   
     forecastSubsection.append(forecastTemp, forecastWind,forecastHumidity)
}