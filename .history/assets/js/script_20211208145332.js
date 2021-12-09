var button = document.querySelector(".btn1")
var eventList = document.querySelector(".event-list")
var getWeather = function(){
    var openWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=${nameInputEl.value.trim()}&appid=82b88905657c227b366aeed2a3762dff"
       fetch(openWeatherUrl)
.then(function (response) {
    return response.json();
})
.then(function(data) {
})
var getEvent = function (){
    var eventbriteUrl = "https://www.eventbriteapi.com/v3/users/me/?token=LMIDU5RTJRH3MM6FEHRV"
    fetch(eventbriteUrl)
.then(function (response) {
    return response.json();
})
.then(function(data) {
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