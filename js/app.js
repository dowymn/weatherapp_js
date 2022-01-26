'use strict'

$(document).ready(function() {
    var weather = "";
    var fullWeather = "";

    $('#go_button').click(function() {

        if ( $('#search_bar').value!="" ) {

            // we disable the button to prevent multiple clicks
            $("#go_button").disabled=true;

            // if this is the first ciry the user enters, hides the button
            if ( weather == "" ) {
                $("#see_more").slideUp("slow", function() {});
            }

            // we make sure the weather and fullWeather variables are empty
            // to allow the user to check the weather for another city without refreshing the page
            weather = "";
            fullWeather = "";

            // see_more button initialization
            $("#see_more").text("Afficher plus");

            // short weather bloc initialization
            $(".weather").slideUp("slow", function() {});
            $(".weather").slideDown("slow", function() {});

            // full weather bloc initialization
            $(".full_weather").slideUp("slow", function() {});

            var request = "https://api.openweathermap.org/data/2.5/weather?q=" 
            + $('#search_bar').val()
            + ",fr&APPID=ee07e2bf337034f905cde0bdedae3db8";

            $.ajax({
                url: request,
                dataType: "json",
                success:
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
                        var hh = today.getHours();
                        if ( hh < 10 ) {
                            hh = "0"+hh;
                        }
                        var mn = today.getMinutes()
                        if ( mn < 10 ) {
                            mn = "0"+mn;
                        }
                        weather += "<img src=\"./icons/other/wi-time-2.svg\"/>" + dd + "/" + mm + "/" + today.getFullYear() + ", "; 
                        weather += hh + "h" + mn + "<br/>";

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
                        //fullWeather += weather;

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
                        $('.weather').html(weather);
                        $(".full_weather").html(fullWeather);

                        // we enable the "GO" button
                        $("#go_button").disabled=false;
                        // and we show the "Afficher plus" button
                        //$("#see_more").css('display','block');
                        $("#see_more").slideDown("slow", function() {});
                    },
                error:
                    function() {
                        $("#see_more").slideUp("slow", function() {});
                        $('.weather').html("Veuillez entrer une ville existante.");
                    }
            });
        }
    });

    $('#see_more').click(function() {

        if ( weather != "" ) {

            if ( $("#see_more").text() == "Afficher plus" ) {
                $(".full_weather").slideDown("slow", function() {});
                $("#see_more").text("Afficher moins");
            } else {
                $(".full_weather").slideUp("slow", function() {});
                $("#see_more").text("Afficher plus");
            }
        }

    });

    $("#home").click(function() {

        $("#home_view").css('display','block');
        $("#contact_view").css('display','none');
        $("#help_view").css('display','none');

    });

    $("#contact").click(function() {

        $("#home_view").css('display','none');
        $("#contact_view").css('display','block');
        $("#help_view").css('display','none');

    });

    $("#help").click(function() {

        $("#home_view").css('display','none');
        $("#contact_view").css('display','none');
        $("#help_view").css('display','block');

    });

    $("#back_to_home").click(function() {

        $("#home_view").css('display','block');
        $("#contact_view").css('display','none');
        $("#help_view").css('display','none');

    });

    $("#logo").click(function() {

        $("#home_view").css('display','block');
        $("#contact_view").css('display','none');
        $("#help_view").css('display','none');

    });
});