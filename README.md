# 06-Homework - [Weather Dashboard](https://kyleres.github.io/06-Weather_Dashboard/)

## Introduction
For this homework assignment, we were tasked with creating a weather dashboard to cater to the needs of the traveler described below. The goal was to dive deeper into the world of APIs and to create an application that uses information from more than one API.

## User Story
```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria
```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

## Motivation
My goal for this assignment was to use all my knowledge of third-party APIs and put it to the test. Unlike the previous assignment, this application required the use of more than one API as well as multiple AJAX calls to accomplish. The main parts of this assignemnt were:
    1) Use a weather API to display the current weather in detail
    2) Use the same weather API to display the 5-day forecast
    3) Use a UV API to display the UV index for the same location
    4) Create script that stores city searches and turns them into buttons
    5) Creat script that displays weather information about the city when the city's button is clicked
The most challenging part of ths process was how tedious it all was. Working with more than one API meant that it took more time to go through the docs and understand how they work. Luckily, both of the APIs I worked well with each other (aka I got VERY lucky). That being said, the amount of code it took to get the whole application running was pretty hefty, and there were many things that can (and ultimately did) go wrong. I spent a lot of time troubleshooting issues, but despite the rough look of the app, I'm happy to say that it is functional at best. There is room for improvement (the responsiveness is not the best, and I wish I had more time to work on the search function to only take specific inputs and not make buttons by mistake; maybe add a button to clear the search history), but overall, the fact that I got this app working is something I'm pretty proud of.

## Version List
### v1.0
* created index.html
    * created basic layout
    * styled using Bootstrap
* created script.js
    * created function to call APIs
        * included calls for current weather, UV index and 5-day forecast
        * displayed all weather info to HTML
    * created function for current date and time
    * created city search function for new cities
        * created function to add buttons for new cities
        * created function to save city searches to localStorage
    * created function to render buttons based on saved search info
* created style.css (very minimal code)
* tested application for functionality and responsiveness
* created README.md

## Framework
* created with Bootstrap

## Credits
* [Open Weather API](https://openweathermap.org/api) for the weather information
* [Open UV API](https://www.openuv.io/) for the UV information
* [This](https://timestamp.online/article/how-to-convert-timestamp-to-datetime-in-javascript) article from timestamp.online for information about getting the current time and date
* [JQuery](https://api.jquery.com/) for their extensive library and teaching resources
* [w3schools.com](https://www.w3schools.com/) for all their resources regarding HTML, CSS, JS and JQuery
* Special thanks to my instructor Nick and my awesome TAs Jimi and Chris for trying their best despite the coronavirus outbreak; Be safe guys!
