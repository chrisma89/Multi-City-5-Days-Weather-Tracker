let submitBtn = $("#search-button");
// unique APIKey
const apiKey = "3d834375601783e4927040748b9cd39c";
// querurl
submitBtn.on("click", function(e){
  e.preventDefault();
let cityName = $("#search-input").val().trim()
 $("#search-input").val("")

createNewButton(cityName)
addToStorage(cityName)


})

function todayForecast (cityName){
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
    fetch(forecastURl)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        console.log(data);        
  const cityDisplay = $("#today")
  cityDisplay.empty()
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
}
function day5Forecast (data) {
    console.log(data)
    // 5 day forecast heading- created dynamically
    let forecastSection = $("#forecast") 
    let forecastSubsection =$(".card-container")
    forecastSubsection.empty()
    forecastSection.empty()
    let forecastHeading = $("<h3>").text("5-Day Forecast: ").css({
        "margin-left" : "10px",
    })
    forecastSection.prepend(forecastHeading)
    // 5 day forecasts cards generated and styled
    // link to html
    let array = data.list
    console.log(array)
     for(let i = 7; i < 40; i += 7){
 
    let forecastbad = $("<div>").addClass("five-day-card")
   
    // variables created for date, icon, time, wind and humidity and appended to card
    let forecastDate = $("<h5>").text(dayjs(data.list[i].dt_txt).format("DD/MM/YYYY"))
    let weatherIconSrc = data.list[i].weather[0].icon
    let weatherIcon = $("<img>").attr("src","http://openweathermap.org/img/wn/" + weatherIconSrc + ".png")
   let forecastTemp = ($("<p>").text ("Temp: " + parseInt((data.list[i].main.temp) - (273.15)) + " °C "));
   let forecastWind = ($("<p>").text ("Wind: " + (data.list[i].wind.speed) + " KPH "));
    let forecastHumidity = ($("<p>").text ("Humidity: " + (data.list[i].main.humidity) + " % "));
    forecastbad.append(forecastDate, weatherIcon, forecastTemp, forecastWind,forecastHumidity)
    forecastSubsection.append(forecastbad)
    }
}
function createNewButton (cityName){
    let btngroup = $("#history")
    if (btngroup.find(`button:contains('${cityName}')`).length === 0){
let newBtn = $("<button>").text(cityName).addClass("list-group-button mb-3").css({
    "font-size": "25px" , 
    "width" : "650%" ,
    })
    btngroup.append(newBtn)
  
newBtn.on("click", function(e){
    e.preventDefault();
    todayForecast(cityName)
    });
    
}
}

function addToStorage (cityName) {

   
      
        let storageArray= JSON.parse(localStorage.getItem("cities")) || [];

        if(!storageArray.includes(cityName)){
            storageArray.push(cityName)
        }
        localStorage.setItem("cities", JSON.stringify(storageArray))
        
       
    //   localStorage.setItem("Button", newBtn)
    // buttonArray =[];
    // buttonArray.push(newBtn)
}

$(document).ready(function(){
  let storageArray = localStorage.getItem("cities");
if(storageArray){
  let reloadArray = JSON.parse(storageArray)

   reloadArray.forEach(function(cityName){
    createNewButton(cityName)
   })
}
})