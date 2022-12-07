console.log('Welcome to console Richard!')
const api = {
  key:"15627ae10f7775b3f2792ba6ca963668",
  baseurl:"https://api.openweathermap.org/data/2.5/"
}

//const searchBox = document.getElementsByClassName('search-box')
const searchBox = document.querySelector('.search-box')
//addEventListener doesn't work with getElementsByClassName without an arrayIndex'[]'.That's why I'm using querySelector
searchBox.addEventListener('keypress',(evento)=>{
  if (evento.keyCode == 13){
    getResults(searchBox.value)

  }
})
document.querySelector('.search-tool').addEventListener('click',(evento) => {
    getResults(searchBox.value)
})

//The major portion(important)
const getResults = (query) => {
  fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
  .then(weather => {
    return weather.json()
  })
  .then(displayResults)
}

const displayResults = (weather) => {
  console.log(weather)
  let city = document.querySelector('.location-container .city')
  city.innerText = `${weather.name}, ${weather.sys.country}`

  //new Date() returns a date object with the current date and time.
  let now = new Date()
  let date = document.querySelector('.location-container .date')
  date.innerText = dateBuilder(now)

  let temp = document.querySelector('.current .temp')
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`

  let weather_el = document.querySelector('.current .weather')
  weather_el.innerText = weather.weather[0].main

  let high_low_temp = document.querySelector('.high-low')
  high_low_temp.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`
}
dateBuilder = (d) => {
  let months =["January","February","March","April","May","June","July",
  "August","September","October","November","December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()]
  let date = d.getDate()
  let month = months[d.getMonth()]
  let year = d.getFullYear()

  return `${day}, ${date} ${month} ${year}`

}
