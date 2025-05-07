let searchInput=document.querySelector('#searchInput');
let weatherData;


searchInput.addEventListener('input',function(){
  if(searchInput.value.length>2){
    startApp(searchInput.value);

  }
  
})
async function startApp(key) {
   weatherData=await getData(key);
   getTodayData();
   getTomorrowData();
   getAfterTomorrowData();
  console.log(weatherData);
  
}

async function getData(key) {
  let response=await fetch(`http://api.weatherapi.com/v1/forecast.json?key=32ca814255b441fda86125021250505&q=${key}&days=3`);
  let data=await response.json();

  return data;
  
}
// function getTodayData(){
//   let date =new Date(weatherData.location.localtime);
//   // console.log(date.toLocaleDateString('en-us',{weekday:'long'}))
//   document.querySelector('.today #day').innerHTML=date.toLocaleDateString('en-us',{weekday:'long'})
//   document.querySelector('.today #date').innerHTML=date.toLocaleDateString('en-us',{day:'numeric'})
//   document.querySelector('.today #month').innerHTML=date.toLocaleDateString('en-us',{month:'long'})


//   document.querySelector('.today .location').innerHTML=weatherData.location.name
//   document.querySelector('.today .degree .number').innerHTML=weatherData.current.temp_c
//   document.querySelector('.today .degree .icon #todayImage').setAttribute('src',`https:${weatherData.current.condition.icon}`)
//   document.querySelector('.today .custom').innerHTML=weatherData.current.condition.text
//   document.querySelector('.today .humidity').innerHTML=weatherData.current.humidity+'%'
//   document.querySelector('.today .wind').innerHTML=weatherData.current.wind_mph+'km/h'
//   document.querySelector('.today .direction').innerHTML=weatherData.current.wind_dir


// }
function getTodayData(){
  let date = new Date(weatherData.location.localtime);
  document.querySelector('.today #day').innerHTML = date.toLocaleDateString('en-us', {weekday:'long'});
  document.querySelector('.today #date').innerHTML = date.toLocaleDateString('en-us', {day:'numeric'});
  document.querySelector('.today #month').innerHTML = date.toLocaleDateString('en-us', {month:'long'});

  document.querySelector('.today .location').innerHTML = weatherData.location.name;
  document.querySelector('.today .degree .number').innerHTML = weatherData.current.temp_c+`<sup>o</sup>C`;
  document.querySelector('.today .degree .icon #todayImage').setAttribute('src', `https:${weatherData.current.condition.icon}`);
  document.querySelector('.today .custom').innerHTML = weatherData.current.condition.text;
  document.querySelector('.today .humidity').innerHTML = weatherData.current.humidity + '%';
  document.querySelector('.today .wind').innerHTML = weatherData.current.wind_mph + 'km/h';

  const windDirectionMap = {
    N: "North",
    NNE: "North-Northeast",
    NE: "Northeast",
    ENE: "East-Northeast",
    E: "East",
    ESE: "East-Southeast",
    SE: "Southeast",
    SSE: "South-Southeast",
    S: "South",
    SSW: "South-Southwest",
    SW: "Southwest",
    WSW: "West-Southwest",
    W: "West",
    WNW: "West-Northwest",
    NW: "Northwest",
    NNW: "North-Northwest"
  };

  const rawDir = weatherData.current.wind_dir;
  const fullDir = windDirectionMap[rawDir] || rawDir;
  document.querySelector('.today .direction').innerHTML = fullDir;
}

function getTomorrowData(){
  let date =new Date(weatherData.forecast.forecastday[1].date);
  // console.log(date.toLocaleDateString('en-us',{weekday:'long'}))
  document.querySelector('.tomorrow #day').innerHTML=date.toLocaleDateString('en-us',{weekday:'long'})
 
  document.querySelector('.tomorrow  #tomorrowImg').setAttribute('src',`https:${weatherData.forecast.forecastday[1].day.condition.icon}`)
  document.querySelector('.tomorrow .custom').innerHTML=weatherData.forecast.forecastday[1].day.condition.text
  document.querySelector('.tomorrow .maxTemp').innerHTML=weatherData.forecast.forecastday[1].day.maxtemp_c+`<sup>o</sup>C`
  document.querySelector('.tomorrow .minTemp').innerHTML=weatherData.forecast.forecastday[1].day.mintemp_c+`<sup>o</sup>`

}

function getAfterTomorrowData(){
  let date =new Date(weatherData.forecast.forecastday[2].date);
  // console.log(date.toLocaleDateString('en-us',{weekday:'long'}))
  document.querySelector('.afterTomorrow #day').innerHTML=date.toLocaleDateString('en-us',{weekday:'long'})
 
  document.querySelector('.afterTomorrow  #afterTomorrowImg').setAttribute('src',`https:${weatherData.forecast.forecastday[2].day.condition.icon}`)
  document.querySelector('.afterTomorrow .custom').innerHTML=weatherData.forecast.forecastday[2].day.condition.text
  document.querySelector('.afterTomorrow .maxTemp').innerHTML=weatherData.forecast.forecastday[2].day.maxtemp_c+`<sup>o</sup>C`
  document.querySelector('.afterTomorrow .minTemp').innerHTML=weatherData.forecast.forecastday[2].day.mintemp_c+`<sup>o</sup>`

}



navigator.geolocation.getCurrentPosition(
  function(position){
  // console.log(position.coords)
  let liveLocation=position.coords.latitude + ',' + position.coords.longitude;
  // console.log(liveLocation)
  startApp(liveLocation)

},
function(error){
  console.log("couldn't access your location,default to Cairo");
  startApp("cairo");
}
)

