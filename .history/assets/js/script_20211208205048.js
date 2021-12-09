// one var for the btn and one for the place on the page we want to put our events 
var button = document.querySelector(".form")
var eventList = document.querySelector(".event-list")
// this one if to grab whatever is input into our input box
var cityInput = document.querySelector("#city-input")
//creating a function to fetch the open weather api, I used this one because the search parameters are citys not longitude and latitude
var getWeather = function () {
    var openWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=miami&appid=82b88905657c227b366aeed2a3762dff"
    fetch(openWeatherUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            //TODO: get the weather on the page 
        })
    }
// this function is to grab the event and put them on the page 
    var getEvent = function (event) {
        console.log(event.target)
        console.log(cityInput.value)
        event.preventDefault()
        //made the url dynamis so it worked
        var eventbriteUrl = `https://app.ticketmaster.com/discovery/v2/events.json?city=${cityInput.value}&apikey=E2I7ya5FHRR8ZB0ACIGyv02xtzcbvJSw`
        fetch(eventbriteUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data)
                //the for loop is so it runs through all the urls of the event and puts them on the page
                for (var i = 0; i < data._embedded.events.length; i++) {
                    // Create a list element
                    var listItem = document.createElement('li');

                    // so here we are using innerhtml because intertext and textcontent don't allow us to add html elements in with dynamically generated titles and links
                    listItem.innerHTML = `<a href=${data._embedded.events[i].url}>${data._embedded.events[i].name}</a>`;
                    eventList.appendChild(listItem);
                    
                }

            });
    }


//need one function to call both at the same time
    var doBoth = function(){
        getEvent()
        getWeather()
    }



button.addEventListener('submit', doBoth)