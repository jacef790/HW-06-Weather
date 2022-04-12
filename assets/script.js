//  VARIABLES

const APIkey = 'f1d7a15d2fb8ab8c4c676b5232eb5ca3';
let searchCityEl = document.querySelector('#search-city');
let cityTextEl = document.querySelector('#currentCityName');
let currentCityName;
let weather = [];
let cityList = [];

// FUNCTIONS

    // Update weather info

function showWeather(weather) {  
    $("#day0-wind").text(weather[0].wind);
    $("#day0-UV").text(weather[0].UV);
    $(`#currentCityName`).text(currentCityName);
    
    // UV index background color
    if (weather[0].UV > 6) {UV = 'Red'};
    if (weather[0].UV <= 6) {UV = 'Yellow'}; 
    if (weather[0].UV <= 3) {UV = 'Green'}; 
    $(`#day0-UV`).css( "background-color", UV);
    for (var i = 0; i <= 5; i++) {
        $(`#day`+i+`-temp`).text(weather[i].temp);
        $(`#day`+i+`-icon`).html(weather[i].icon);
        $(`#day`+i+`-hum`).text(weather[i].hum);
        $(`#day`+i+`-date`).html(weather[i].date);
        $(`#day`+i+`-icon`).attr("src",weather[i].icon);
    }
}

    // previous searched cities

function showCityList(cityList) { 
    var varText = "";
    for (var i = 0; i < cityList.length; i++) {
      varText += `<li class="btn list-group-item list-group-item-action d-flex justify-content-between align-items-center" onclick="searchCity('`+cityList[i]+`')">`+cityList[i]+`</li>`;
    }
    $(`#cityListGroup`).html(varText);
}

    // Save to local storage

function updateCityList(currentCityName) {  
    cityList.indexOf(currentCityName) === -1 ? cityList.push(currentCityName):
    localStorage.setItem("cityList", JSON.stringify(cityList)); 
    showCityList(cityList);
}

    // 5 day forecast

function search(varLat, varLon, currentCityName) {  
    var locQueryUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=`+varLat+`&lon=`+varLon+`&exclude=hourly&units=imperial&appid=f1d7a15d2fb8ab8c4c676b5232eb5ca3`;
    fetch(locQueryUrl)
      .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }
        return response.json();
      })
      .then(function (locRes) {
        weather = [];
        updateCityList(currentCityName);
        for (var i = 0; i < 7; i++) {
             var wDay = {
                 "date":locRes.daily[i].dt,
                 "temp":locRes.daily[i].temp.day+` °F`,
                 "hum":locRes.daily[i].humidity+`%`,
                 "wind":locRes.daily[i].wind_speed+` MPH`,
                 "UV":locRes.daily[i].uvi,
                 "icon":`https://openweathermap.org/img/wn/`+locRes.daily[i].weather[0].icon+`.png`
             }
        wDay.date=wDay.date * 1000;
        const dateObject = new Date(wDay.date);
        wDay.date=dateObject.toLocaleDateString();
        weather.push(wDay);
        }   
        showWeather(weather);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

        // City Search

function searchCity(query) {
    var locQueryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=`+query+`&appid=f1d7a15d2fb8ab8c4c676b5232eb5ca3`;
 
    fetch(locQueryUrl)
      .then(function (response) {
        if (!response.ok) {
          $("#search-input")[0].reset()
        }
        return response.json();
      })
      .then(function (locRes) {
        varLat = locRes.city.coord.lat;
        varLon = locRes.city.coord.lon;
        currentCityName = query;
        search(varLat, varLon, currentCityName);
    })
      .catch(function (error) {
        console.error(error);
      });
}

    // Search button
function searchBtnSubmit(event) {
    event.preventDefault();
    var searchInputVal = document.querySelector('#search-input').value;
    if (!searchInputVal) {
      alert('You need a search input value!');
      return;
    }
    searchCity(searchInputVal);
  }

    // Show previous searched cities in column

function loadCityList(cityList) { 
    cityList = JSON.parse(localStorage.getItem("cityList"));
    return cityList;
}
searchCityEl.addEventListener('submit', searchBtnSubmit);

cityList = loadCityList(cityList);
searchCity("El Paso");