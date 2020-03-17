$(document).ready(function(){
    
    //Local Storage Variables
    var cities = [];
    var citiesListParsed = JSON.parse(localStorage.getItem("citiesList"));

    //Check for saved cities
    if (citiesListParsed === null) {
        console.log("No saved cities.")
    } else {
        cities = citiesListParsed;
        renderCities()
    };

    //Render Cities Function
    function renderCities() {
        $(".placeholder").empty();
        cities.forEach(function(cityName) {
            $(".placeholder").append(`<button id="${cityName}" class="cityButton mb-2">${cityName}</button></br>`)
        });
    };

    //API Calls
    function ajaxCalls() {

        //Weather API (current weather)
        let city = $("#search").val();
        let apiKey = "cd7d43529df40df48776a9d44ca733bb";
        let queryCurrentURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

        $.ajax({
            url: queryCurrentURL,
            method: "GET",
        }).then(function(response) {

            let currentweatherIcon = response.weather[0].icon;
            let currentWeatherDescription = response.weather[0].description;
            let currentWeatherTemp = response.main.temp.toFixed();
            let currentWeatherFeel = response.main.feels_like.toFixed(1);
            let currentWeatherTempMin = response.main.temp_min.toFixed(1);
            let currentWeatherTempMax = response.main.temp_max.toFixed(1);
            let currentWeatherHumidity = response.main.humidity;
            let currentWeatherWind = response.wind.speed.toFixed(1);

            $(".city").text(response.name);
            $("#currentWeatherIcon").attr("src", `http://openweathermap.org/img/wn/${currentweatherIcon}@2x.png`);
            $("#currentWeatherIcon").val("");
            $("#currentWeatherDescription").text(currentWeatherDescription);
            $("#currentWeatherTemp").html(`<span><b>Temperature: </b></span><span>${currentWeatherTemp} \xB0F</span>`);
            $("#currentWeatherFeel").html(`<span><b>Feels like: </b></span><span>${currentWeatherFeel} \xB0F</span>`);
            $("#currentWeatherTempMin").html(`<span><b>Low: </b></span><span>${currentWeatherTempMin} \xB0F</span>`);
            $("#currentWeatherTempMax").html(`<span><b>High: </b></span><span>${currentWeatherTempMax} \xB0F</span>`);
            $("#currentWeatherHumidity").html(`<span><b>Humidity: </b></span><span>${currentWeatherHumidity}%</span>`);
            $("#currentWeatherWind").html(`<span><b>Wind Speed: </b></span><span>${currentWeatherWind} mph</span>`);

            //Current Date and Time
            var date = new Date();

            $("#date").html(`<span><b>Date: </b></span><span>${date.toLocaleDateString()}</span>`);
            $("#time").html(`<span><b>Time: </b></span><span>${date.toLocaleTimeString()}</span>`);

            //UV Index API
            let lat = response.coord.lat; //from weather API
            let lng = response.coord.lon; //from weather API
        
            $.ajax({
            dataType: 'json',
            beforeSend: function(request) {
                request.setRequestHeader('x-access-token', '2ad98383b9163e5b3de004b6a3faba62');
            },
            url: 'https://api.openuv.io/api/v1/uv?lat=' + lat + '&lng=' + lng + '&alt=',
            method: 'GET',
            }).then(function(UVresponse) {

                let currentWeatherUV = UVresponse.result.uv.toFixed();

                $("#currentWeatherUV").html(`<span><b>UV Index: </b></span><div id="UVValue" class="text-center">${currentWeatherUV}</div>`);

                //Change UV color
                if (currentWeatherUV <= 2) {
                    $("#UVValue").css("background-color", "lightgreen");
                    $("#UVValue").css("border", "2px solid green");
                    $("#UVValue").css("border-radius", "2px");
                };
                if (currentWeatherUV >= 3 && currentWeatherUV <= 5) {
                    $("#UVValue").css("background-color", "yellow");
                    $("#UVValue").css("border", "2px solid gold");
                    $("#UVValue").css("border-radius", "2px");
                };
                if (currentWeatherUV >= 6 && currentWeatherUV <= 7) {
                    $("#UVValue").css("background-color", "orange");
                    $("#UVValue").css("border", "2px solid #FF8C00");
                    $("#UVValue").css("border-radius", "2px");
                };
                if (currentWeatherUV >= 8 && currentWeatherUV <= 10) {
                    $("#UVValue").css("background-color", "red");
                    $("#UVValue").css("border", "2px solid maroon");
                    $("#UVValue").css("border-radius", "2px");
                };
                if (currentWeatherUV >= 11) {
                    $("#UVValue").css("background-color", "violet");
                    $("#UVValue").css("border", "2px solid purple");
                    $("#UVValue").css("border-radius", "2px");
                };

            });

        });

        //Weather API (5-day forecast)
        let queryForecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

        $.ajax({
            url: queryForecastURL,
            method: "GET",
        }).then(function(forecastResponse) {

            //Forecast Day 1            
            let forecastDay1Date = forecastResponse.list[4].dt_txt.substring(5,10);
            let forecastDay1Icon = forecastResponse.list[4].weather[0].icon
            let forecastDay1Temp = forecastResponse.list[4].main.temp.toFixed();
            let forecastDay1Humidity = forecastResponse.list[4].main.humidity.toFixed();

            $("#forecastDay1Date").html(`<span><b>${forecastDay1Date}</b></span>`);
            $("#forecastDay1Icon").attr("src", `http://openweathermap.org/img/wn/${forecastDay1Icon}@2x.png`);
            $("#forecastDay1Icon").val("");
            $("#forecastDay1Temp").html(`<span><b>${forecastDay1Temp} \xB0F</b></span>`);
            $("#forecastDay1Humidity").html(`<span><b>Humidity: </b></span><span>${forecastDay1Humidity}%</span>`);

            //Forecast Day 2            
            let forecastDay2Date = forecastResponse.list[12].dt_txt.substring(5,10);
            let forecastDay2Icon = forecastResponse.list[12].weather[0].icon
            let forecastDay2Temp = forecastResponse.list[12].main.temp.toFixed();
            let forecastDay2Humidity = forecastResponse.list[12].main.humidity.toFixed();

            $("#forecastDay2Date").html(`<span><b>${forecastDay2Date}</b></span>`);
            $("#forecastDay2Icon").attr("src", `http://openweathermap.org/img/wn/${forecastDay2Icon}@2x.png`);
            $("#forecastDay2Icon").val("");
            $("#forecastDay2Temp").html(`<span><b>${forecastDay2Temp} \xB0F</b></span>`);
            $("#forecastDay2Humidity").html(`<span><b>Humidity: </b></span><span>${forecastDay2Humidity}%</span>`);

            //Forecast Day 3            
            let forecastDay3Date = forecastResponse.list[20].dt_txt.substring(5,10);
            let forecastDay3Icon = forecastResponse.list[20].weather[0].icon
            let forecastDay3Temp = forecastResponse.list[20].main.temp.toFixed();
            let forecastDay3Humidity = forecastResponse.list[20].main.humidity.toFixed();

            $("#forecastDay3Date").html(`<span><b>${forecastDay3Date}</b></span>`);
            $("#forecastDay3Icon").attr("src", `http://openweathermap.org/img/wn/${forecastDay3Icon}@2x.png`);
            $("#forecastDay3Icon").val("");
            $("#forecastDay3Temp").html(`<span><b>${forecastDay3Temp} \xB0F</b></span>`);
            $("#forecastDay3Humidity").html(`<span><b>Humidity: </b></span><span>${forecastDay3Humidity}%</span>`);

            //Forecast Day 4            
            let forecastDay4Date = forecastResponse.list[28].dt_txt.substring(5,10);
            let forecastDay4Icon = forecastResponse.list[28].weather[0].icon
            let forecastDay4Temp = forecastResponse.list[28].main.temp.toFixed();
            let forecastDay4Humidity = forecastResponse.list[28].main.humidity.toFixed();

            $("#forecastDay4Date").html(`<span><b>${forecastDay4Date}</b></span>`);
            $("#forecastDay4Icon").attr("src", `http://openweathermap.org/img/wn/${forecastDay4Icon}@2x.png`);
            $("#forecastDay4Icon").val("");
            $("#forecastDay4Temp").html(`<span><b>${forecastDay4Temp} \xB0F</b></span>`);
            $("#forecastDay4Humidity").html(`<span><b>Humidity: </b></span><span>${forecastDay4Humidity}%</span>`);

            //Forecast Day 5            
            let forecastDay5Date = forecastResponse.list[36].dt_txt.substring(5,10);
            let forecastDay5Icon = forecastResponse.list[36].weather[0].icon
            let forecastDay5Temp = forecastResponse.list[36].main.temp.toFixed();
            let forecastDay5Humidity = forecastResponse.list[36].main.humidity.toFixed();

            $("#forecastDay5Date").html(`<span><b>${forecastDay5Date}</b></span>`);
            $("#forecastDay5Icon").attr("src", `http://openweathermap.org/img/wn/${forecastDay5Icon}@2x.png`);
            $("#forecastDay5Icon").val("");
            $("#forecastDay5Temp").html(`<span><b>${forecastDay5Temp} \xB0F</b></span>`);
            $("#forecastDay5Humidity").html(`<span><b>Humidity: </b></span><span>${forecastDay5Humidity}%</span>`);

        });

    };

    //City Search Function
    $("#go").on("click", function() {

        let city = $("#search").val();

        ajaxCalls();
        cities.push(city);
        localStorage.setItem("citiesList", JSON.stringify(cities)); //save to localStorage
        renderCities();

    });

    //City Buttons Function
    $(".cityButton").on("click", function() {

        let cityName = $(this).attr("id")

        $("#search").val(cityName)
        ajaxCalls();

    });

});