// one var for the btn and one for the place on the page we want to put our events 
var button = document.querySelector(".form")
var eventList = document.querySelector(".event-list")
var cityInput = document.querySelector("#city-input")
//creating a function to fetch the open weather api, I used this one because the search parameters are citys not longitude and latitude
var getWeather = function () {
    var openWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=miami&appid=82b88905657c227b366aeed2a3762dff"
    fetch(openWeatherUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
        })
    }

    var getEvent = function (event) {
        console.log(event.target)
        console.log(cityInput.value)
        event.preventDefault()
        var eventbriteUrl = `https://app.ticketmaster.com/discovery/v2/events.json?city=${cityInput.value}&apikey=E2I7ya5FHRR8ZB0ACIGyv02xtzcbvJSw`
        fetch(eventbriteUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data)
                for (var i = 0; i < data.length; i++) {
                    // Create a list element
                    var listItem = document.createElement('li');

                    // Set the text of the list element to the JSON response's .html_url property
                    listItem.textContent = data[i].html_url;
                    eventList.appendChild(listItem);
                    
                }

            });
    }



button.addEventListener('submit', getEvent)