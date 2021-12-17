// one var for the btn and one for the place on the page we want to put our events 
var button = document.querySelector(".form")
var eventList = document.querySelector("#event-list")
// this one if to grab whatever is input into our input box
var cityInput = document.querySelector("#city-input")
var weatherEl = document.querySelector("#weather")
var cityBtns = document.querySelector("#citybtns")
var hotels = document.querySelector("#hotel-motel")


//creating a function to fetch the open weather api, I used this one because the search parameters are citys not longitude and latitude
function getWeather(event) {
    var cityName = event.target.value || cityInput.value
    console.log(event.target.value)
    var openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=82b88905657c227b366aeed2a3762dff&units=metric`
    fetch(openWeatherUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
        
            // got the current weather on the page was going to make the weather for the day of the event appear but that is an api we'd need to pay for so f that.
            displayWeather(data)

        })

}

// this is to display the weather. I want to create elements then put in the data and then append 
//to the header
function displayWeather(data) {
    weatherEl.innerHTML = ""

    var header = document.createElement('h5')
    weatherEl.append(header)

    var temperatureEl = document.createElement('p')
    var windSpeedEl = document.createElement('p')
    var humidityEl = document.createElement('p')
    temperatureEl.textContent = "Temperature: " + `${data.main.temp}` + "°C"
    windSpeedEl.textContent = "Wind Speed: " + `${data.wind.speed}` + "m/s"
    humidityEl.textContent = "Humidity: " + `${data.main.humidity}` + "%"
    header.innerHTML = "Current weather in " + `${data.name}` + `<img src=http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png>`;
    weatherEl.append(temperatureEl, windSpeedEl, humidityEl)
    
    saveCity(data.name)
    cityButtons()


}
function saveCity(city) {
    var storage = window.localStorage
    //apparently this is an array but I don't see how
    var citiesArray = Object.keys(storage)
  
    //if cities array doesn't include the city we set it in local storage 
    if (!citiesArray.includes(city)) {
        localStorage.setItem(`${city}`, city)

    }

}
function cityButtons() {
    cityBtns.innerHTML = ""
    var storage = window.localStorage
    var citiesArray = Object.keys(storage)

    for (var i = 0; i < citiesArray.length; i++) {
        var createBtn = document.createElement("button")
        createBtn.innerText = citiesArray[i]
        createBtn.value = citiesArray[i]
        createBtn.className = "waves-effect grey btn-small"
        createBtn.setAttribute("data-cityNames", citiesArray[i])
        createBtn.onclick = clickBtns;
        cityBtns.append(createBtn)
    }

}


// this function is to grab the event and put them on the page 
function getEvent(event) {
   
    var cityName = event.target.value || cityInput.value

    //made the url dynamis so it worked
    var eventbriteUrl = `https://app.ticketmaster.com/discovery/v2/events.json?city=${cityName}&apikey=E2I7ya5FHRR8ZB0ACIGyv02xtzcbvJSw`
    fetch(eventbriteUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
           
            displayEvents(data)
            //the for loop is so it runs through all the urls of the event and puts them on the page



        });
}

function displayEvents (data) {
    console.log(eventList)
    eventList.innerHTML = ""
    var header = document.createElement("h5")
    header.textContent = "Events"
    eventList.append(header)
    for (var i = 0; i < 10; i++) {
        // Create a list element
        var listItem = document.createElement('li');

        // so here we are using innerhtml because intertext and textcontent don't allow us to add html elements in with dynamically generated titles and links
        listItem.innerHTML = `<a href=${data._embedded.events[i].url}>${data._embedded.events[i].name}</a>`;
        eventList.appendChild(listItem);
        listItem.className = "collection hoverable"

    }

}



// fetch("https://hotels-com-provider.p.rapidapi.com/v1/hotels/search?checkin_date=2022-03-26&checkout_date=2022-03-27&sort_order=STAR_RATING_HIGHEST_FIRST&destination_id=1708350&adults_number=1&locale=en_US&currency=USD&children_ages=4%2C0%2C15&price_min=10&star_rating_ids=3%2C4%2C5&accommodation_ids=20%2C8%2C15%2C5%2C1&price_max=500&page_number=1&theme_ids=14%2C27%2C25&amenity_ids=527%2C2063&guest_rating_min=4", {
// so I need a function just to call the api to get the destinationid because one
//api searches by location and one api searches by destination id and I don't even know anymore what I did
//because it was basically switching things around until they worked
function getHotelLocation(event) {
    var cityName = event.target.value || cityInput.value
    var hotelLocationUrl = `https://hotels-com-provider.p.rapidapi.com/v1/destinations/search?query=${cityName}&currency=USD&locale=en_US`
    fetch(hotelLocationUrl, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "hotels-com-provider.p.rapidapi.com",
            "x-rapidapi-key": "2b9ffd98f6mshae20938d2317a9cp1dc0c2jsn08bdf7f8962d"
        }
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
         
            //had to call get hotels here because I called gethotellocation with the onclick
            getHotels(data)

        })

}

// this function is the one to get the name of the hotels 
function getHotels (data) {
    //seriously, just to get the destination id, I had to dig
    var destinationId = data.suggestions[0].entities[0].destinationId


    var hotelsUrl = `https://hotels4.p.rapidapi.com/properties/list?destinationId=${destinationId}&pageNumber=1&pageSize=25&checkIn=2020-01-08&checkOut=2020-01-15&adults1=1&sortOrder=PRICE&locale=en_US&currency=USD`
    fetch(hotelsUrl, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "hotels4.p.rapidapi.com",
            "x-rapidapi-key": "2b9ffd98f6mshae20938d2317a9cp1dc0c2jsn08bdf7f8962d"
        }
    })
        .then(function (response) {
            return response.json()
           
        })
        .then(function (data) {
         
            showHotels(data)
            //got the last of

        
        });
}

//make a function to get the data from the hotels on the screen
function showHotels (data) {
    hotels.innerHTML = ""
    
    var header = document.createElement("h5")
    header.textContent = "Hotels"
    hotels.append(header)


    for (var i = 0; i < 5; i++) {
        // Create a list element
        var hotelResults = data.data.body.searchResults.results[i]
        var listItem = document.createElement('li');
        listItem.className = "collection hoverable"
        var hotelName = document.createElement('p')
        var hotelAddress = document.createElement('p')
        var hotelStar = document.createElement('p')

        // so here we are using innerhtml because intertext and textcontent don't allow us to add html elements in with dynamically generated titles and links
        // listItem.innerHTML = `<a href=${data._embedded.events[i].url}>${data._embedded.events[i].name}</a>`;

        hotelName.innerHTML = `<a href=https://hotels.com/ho${hotelResults.id}/?q-check-in=2021-12-17&q-check-out=2021-12-18>${hotelResults.name}</a>`
        //just got object object will have to stringify
        hotelAddress.textContent = "Address: " + hotelResults.address.streetAddress
        console.log(hotelResults.address.streetAddress, hotelResults.starRating)
        hotelStar.textContent = "Star Rating: " + JSON.stringify(hotelResults.starRating) + "/5"
        hotels.appendChild(listItem);
        listItem.append(hotelName, hotelAddress, hotelStar)
    }
}

function clickBtns(event){
    getHotelLocation(event)
    getEvent(event)
    getWeather(event)

}

//need one function to call both at the same time
function doBoth(event) {
    event.preventDefault()
    getHotelLocation(event)
    getEvent(event)
    getWeather(event)

}


//this button is just for  the weather and the events so do both isn't a great name for it
button.addEventListener('submit', doBoth)