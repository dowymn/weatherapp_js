'use strict'

var weather = "";
var fullWeather = "";

const goButton = document.querySelector('#go_button');
goButton.addEventListener('click', function() {

    if ( document.getElementById('search_bar').value!="" ) {

        // we disable the button to prevent multiple clicks
        document.getElementById("go_button").disabled=true;

        // we make sure the weather and fullWeather variables are empty
        // to allow the user to check the weather for another city without refreshing the page
        weather = "";
        fullWeather = "";

        document.getElementById("see_more").innerText = "Afficher plus";

        var request = "https://api.openweathermap.org/data/2.5/weather?q=" 
        + document.getElementById('search_bar').value 
        + ",fr&APPID=ee07e2bf337034f905cde0bdedae3db8";

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var myArr = JSON.parse(this.responseText);
                computeJson(myArr);
            }
        };
        xmlhttp.open("GET", request, true);
        xmlhttp.send();
        
        // here we get the elements from je JSON
        function computeJson(arr) {

            // we show the chosen city
            weather = "<br/>";
            weather += "<img src=\"./icons/other/wi-wind-deg.svg\"/>" + arr.name + ", " + arr.sys.country + "<br/>";

            // we show the current date and time
            var today = new Date();
            var dd = today.getDay();
            if ( dd < 10 ) {
                dd = "0"+dd;
            }
            var mm = today.getMonth()+1;
            if ( mm < 10 ) {
                mm = "0"+mm;
            }
            weather += "<img src=\"./icons/other/wi-time-2.svg\"/>" + dd + "/" + mm + "/" + today.getFullYear() + ", "; 
            weather += today.getHours() + "h" + today.getMinutes() + "<br/>";

            // the weather icon will change according to the current weather
            var image = "";
            var w = arr.weather[0].description;
            if ( w.includes("clear sky") ) {
                image = "wi-day-sunny";
            } else if ( w.includes("overcast clouds") ) {
                image = "wi-cloud";
            } else if ( w.includes("cloud") ) {
                image = "wi-day-cloudy";
            } else if ( w.includes("rain") ) {
                image = "wi-day-rain";
            } else if ( w.includes("snow") ) {
                image = "wi-snow";
            } else if ( w.includes("storm") ) {
                image = "wi-day-storm-showers";
            } else {
                image = "wi-day-fog";
            }
            weather += "<br/>";
            weather += "<img id=\"icon\" src=\"./icons/weather/" + image + ".svg\"/>";
            weather += " " + w;
            weather += "<br/><br/>";

            // the fullWeather will begin with the same information than the short weather
            fullWeather += weather;

            // temperature information
            fullWeather += "<img src=\"./icons/other/wi-thermometer.svg\"/>" + "Température : " + (arr.main.temp - 273.15).toFixed(1) + " °C <br/>";
            fullWeather += "&emsp;&emsp;&ensp;" + "Ressentie : " + (arr.main.feels_like - 273.15).toFixed(1) + " °C <br/>";
            fullWeather += "&emsp;&emsp;&ensp;" + "Min : " + (arr.main.temp_min - 273.15).toFixed(1) + " °C <br/>";
            fullWeather += "&emsp;&emsp;&ensp;" + "Max : " + (arr.main.temp_max - 273.15).toFixed(1) + " °C <br/><br/>";

            // pressure, humidity and wind
            fullWeather += "<img src=\"./icons/other/wi-barometer.svg\"/>" + "Pression : " + arr.main.pressure + " hPa <br/>";
            fullWeather += "<img src=\"./icons/other/wi-humidity.svg\"/>" + "Humidité : " + arr.main.humidity + " % <br/>";
            fullWeather += "<img src=\"./icons/other/wi-strong-wind.svg\"/>" + "Vent : " + arr.wind.speed + " m/s <br/><br/>";

            // sunrise and sunset hours
            var sunrise = new Date(arr.sys.sunrise * 1000);
            fullWeather += "<img src=\"./icons/other/wi-horizon-alt.svg\"/>" + "Lever de soleil : " + sunrise.getHours() + "h" + sunrise.getMinutes() + "<br/>";
            var sunset = new Date(arr.sys.sunset * 1000);
            fullWeather += "<img src=\"./icons/other/wi-horizon.svg\"/>" + "Coucher de soleil : " + sunset.getHours() + "h" + sunset.getMinutes() + "<br/>";

            // we add the weather information to the weather block
            document.getElementById("weather_result").innerHTML = weather;

            // we enable the "GO" button
            document.getElementById("go_button").disabled=false;
            // and we show the "Afficher plus" button
            document.getElementById("see_more").style.display='block';

        }
    }

});

const seeMoreButton = document.querySelector('#see_more');
seeMoreButton.addEventListener('click', function() {

    if ( weather != "" ) {

        if ( document.getElementById("see_more").innerText == "Afficher plus" ) {
            document.getElementById("weather_result").innerHTML = fullWeather;
            document.getElementById("see_more").innerText = "Afficher moins";
        } else {
            document.getElementById("weather_result").innerHTML = weather;
            document.getElementById("see_more").innerText = "Afficher plus";
        }
    }

})

const homeButton = document.querySelector('#home');
homeButton.addEventListener('click', function() {

    document.getElementById("home_view").style.display='block';
    document.getElementById("contact_view").style.display='none';
    document.getElementById("help_view").style.display='none';

})

const contactButton = document.querySelector('#contact');
contactButton.addEventListener('click', function() {

    document.getElementById("home_view").style.display='none';
    document.getElementById("contact_view").style.display='block';
    document.getElementById("help_view").style.display='none';

})

const helpButton = document.querySelector('#help');
helpButton.addEventListener('click', function() {

    document.getElementById("home_view").style.display='none';
    document.getElementById("contact_view").style.display='none';
    document.getElementById("help_view").style.display='block';

})

const backHomeButton = document.querySelector('#back_to_home');
backHomeButton.addEventListener('click', function() {

    document.getElementById("home_view").style.display='block';
    document.getElementById("contact_view").style.display='none';
    document.getElementById("help_view").style.display='none';

})

const logoClick = document.querySelector('#logo');
logoClick.addEventListener('click', function() {

    document.getElementById("home_view").style.display='block';
    document.getElementById("contact_view").style.display='none';
    document.getElementById("help_view").style.display='none';

})