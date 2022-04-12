// Variables

const APIKey = "f1d7a15d2fb8ab8c4c676b5232eb5ca3";
let searchCityEl = document.querySelector("#search-city");
let cityTextEl = document.querySelector("#currentCityName");
let currentCityName;
let weather = [];
let cityList = [];

// Functions

//Update weather info

function showWeather(weather) {
  $("#day0-wind").text(weather[0].wind);
  $("#day0-UV").text(weather[0].UV);
  $("#currentCityName").text(currentCityName);

  for (var i = 0; i <= 5; i++);
  {
    $('#day' + i + '-temp').text(weather[i].temp);
    $('#day' + i + '-icon').html(weather[i].temp);
    $('#day' + i + '-hum').text(weather[i].temp);
    $('#day' + i + '-date').html(weather[i].temp);
    $('#day' + i + '-icon').attr('src', weather[i].icon);
    
  }
}

// Searched city to local storage

function updateCityList(currentCityName) {  
    cityList.indexOf(currentCityName) === -1 ? cityList.push(currentCityName) : console.log("City already on list")
    localStorage.setItem("cityList", JSON.stringify(cityList)); 
    showCityList(cityList);
}

// Previous searched cities to local storage

function showCityList(cityList) {  
    let cityText = '';
    for (var i = 0; i < cityList.length; i++) {
      cityText += `<li class="btn list-group-item list-group-item-action d-flex justify-content-between align-items-center" onclick="searchApi('`+cityList[i]+`')">`+cityList[i]+`</li>`;
    }
    $(`#cityListGroup`).html(cityText);
}


