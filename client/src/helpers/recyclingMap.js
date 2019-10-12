// API Key: c9787ace9febf338

export default function displayLocation() {

    var place = $(this).attr("data-name");
  
    var APIkey = "c9787ace9febf338";
  

    var queryURL = "https://cors-anywhere.herokuapp.com/earth911.getLocationDetails?query=plastic&api_key=" + APIkey;

  
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function (response) {
        console.log(response);
  
        // var city = response.city;
        // var userCity = $("<p>").text("Location: " + city);
        // var weather = reponse.weather[0].description;
        // var condition = $("<p>").text("Current Weather: " + weather);
        // var temp = response.main.temp;
        // var tempOutside = $("<p>").text("Current Temperature: " + temp)
        // $("#weather-section").append(userCity);
        // $("#weather-section").append(condition);
        // $("#weather-section").append(tempOutside);
  
  
      })
  }