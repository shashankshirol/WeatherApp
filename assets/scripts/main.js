const api = {
    key: "768f0646466c1b1d1712249018788780",
    base: "https://api.openweathermap.org/data/2.5/"
};

const searchbox = document.querySelector('.search-box');
const about = document.querySelector('.about');
searchbox.addEventListener('keypress', setQuery);
searchbox.addEventListener('focus', function(){
    about.style.display = 'none';
});
searchbox.addEventListener('focusout', function(){
    about.style.display = 'flex';
});
function setQuery(event){
    if(event.keyCode == 13){
        getResults(searchbox.value);
        searchbox.blur();
    }
}

function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=metric&&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults(weather){
    console.log(weather);
    if(weather.cod !== "404"){
        let city = document.querySelector('.location .city');
        city.innerText = `${weather.name}, ${weather.sys.country}`;
    
        let now = new Date();
        let date = document.querySelector('.location .date');
        date.innerText = dateBuilder(now);

        let temp = document.querySelector('.current .temp');
        temp.innerHTML = `${Math.round(weather.main.temp)}<span>&#176;c</span>`

        let weather_el = document.querySelector('.current .weather');
        weather_el.innerText = weather.weather[0].main;

        let hi_low = document.querySelector(' .current .hi-low');
        hi_low.innerHTML = `${Math.round(weather.main.temp_min)}&#176;c / ${Math.round(weather.main.temp_max)}&#176;c`;
    }else{
        let city = document.querySelector('.location .city');
        city.innerText = "Enter a valid city!";
    }
}

function dateBuilder(d){
    let months = ["January", "February", "March", "April", "May", "June", "July",
                    "August", "September", "October", "November", "December"];
    
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month}, ${year}`;
}