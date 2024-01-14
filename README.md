# Chrisma-5DAY-Weather-Dashboard

## About the Project

The 5day weather dashboard has been created to display the current weather conditions and the forecast for 5 days,for a city that the user searches for. 

Upon opening the application, the user is presented with a search bar to type in a city's name to view its weather forecasts. This search bar has been made possible through bootstrap form, which has an input section with a placeholder text and a submit button. When the submit button is clicked, the application is dynamically updated with weather conditions for today and a 5 day weather forecast is also displayed. 

Server APIs are in use in the application. Jquery has been used to fetch data from the openweathermap.org using APIs, which are then manipulated with jquery and JSON to disply the weather information. The first fetch call brings in the geo data for the city that the user wants the weather conditions first and this data is then used in the construction of the second API fetch call to get the forecast data. 

The user's search city is then added to the sidebar as a button that is dynamically created. This button also carries an event listener and upon clicking the button, the weather forecast is displayed again for the user to view. The search cities are stored in the local storage and this enables the history to be available to the user when they refresh the page or reload the application.



## Built with

This repository has been built using 

-HTML5
-CSS3
-Javascript
-jQuery
-Git 
-Github 
-Server APIs 
-dayjs

## Resources:
-https://openweathermap.org/api
-https://day.js.org/
-https://www.geeksforgeeks.org/how-to-store-an-array-in-localstorage/
-https://stackoverflow.com/questions/1359699/clear-dynamic-content-with-jquery
-https://api.jquery.com/empty/
-https://getbootstrap.com/docs/4.2/utilities/flex/
-https://openweathermap.org/weather-conditions
-https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals




### Installation

This webpage can be rendered by visiting the url : https://chrisma89.github.io/Chrisma-5DAY-Weather-Dashboard/
The code can be viewed at github: https://github.com/chrisma89/Chrisma-5DAY-Weather-Dashboard

### Usage


The screenshot of the webpage is below : ![webpagescreenshot]()

### Credits
- Thank you to the curriculum team behind bootcampspot for the starter files.


### Licence
The standard MIT Licence is in use for this repository.